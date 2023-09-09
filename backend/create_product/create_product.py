import base64
import json
import uuid
from io import BytesIO

import boto3

# Initialize AWS clients for DynamoDB and S3
dynamodb = boto3.resource("dynamodb")
supplierTable = dynamodb.Table("Suppliers")
productTable = dynamodb.Table("Products")
s3 = boto3.client("s3")
s3_bucket_name = "images-bucket-13812931"


def lambda_handler(event, context):
    try:
        # Extract data from the API Gateway event
        body = json.loads(event["body"])
        product_name = body.get("product_name")
        supplier_price = body.get("supplier_price")
        description = body.get("description")
        quantity = body.get("quantity")
        supplier_id = body.get("supplier_id")
        image = body.get("image")

        # Generate a UUID
        uuid_value = str(uuid.uuid4())

        storage_name = "productName" + "_" + uuid_value + ".jpg"
        # Upload the image to S3
        # with open(image, 'rb') as image_file:
        # Decode the base64 data into bytes
        image_data = base64.b64decode(image)
        content_type = "image/jpeg"

        # Create a BytesIO object to treat the image data as a file-like object
        image_stream = BytesIO(image_data)
        s3.upload_fileobj(
            image_stream,
            s3_bucket_name,
            storage_name,
            ExtraArgs={"ContentType": content_type},
        )

        # Get the bucket's region
        region = s3.head_bucket(Bucket=s3_bucket_name)["ResponseMetadata"][
            "HTTPHeaders"
        ]["x-amz-bucket-region"]

        # Construct the object URL
        image_url = f"https://s3-{region}.amazonaws.com/{s3_bucket_name}/{storage_name}"

        # Print the generated image URL
        print(f"Image URL: {image_url}")

        # Access DynamoDB
        products_response = productTable.put_item(
            Item={
                "product_id": uuid_value,
                "product_name": product_name,
                "supplier_price": supplier_price,
                "description": description,
                "quantity": quantity,
                "supplier_id": supplier_id,
                "image_url": image_url,
            }
        )

        print(products_response)

        supplier_response = supplierTable.get_item(Key={"supplier_id": supplier_id})
        if "Item" not in supplier_response:
            return {
                "statusCode": 400,
                "body": json.dumps({"message": "Supplier does not exist"}),
            }
        supplier = supplier_response["Item"]
        supplier["products"].add(uuid_value)
        # add product to supplier's list of product
        response = supplierTable.put_item(Item=supplier)

        print(response)

        response = {
            "statusCode": 200,
            "body": json.dumps({"productsData": products_response}),
        }
        return response

    except Exception as e:
        print(f"Error: {str(e)}")
        return {"statusCode": 500, "body": str(e)}
