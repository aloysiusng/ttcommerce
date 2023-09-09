import base64
import json
import uuid
from io import BytesIO

import boto3

# Initialize AWS clients for DynamoDB and S3
dynamodb = boto3.client("dynamodb")
s3 = boto3.client("s3")
s3_bucket_name = "images-bucket-13812931"
users_table = boto3.resource("dynamodb").Table("Users")


def lambda_handler(event, context):
    try:
        # Extract data from the API Gateway event
        body = json.loads(event["body"])
        user_type = body.get("type")
        user_email = body.get("email")
        response = users_table.get_item(Key={"user_email": user_email})

        # validate if user exists
        if "Item" in response:
            return {
                "statusCode": 400,
                "body": json.dumps(
                    {"message": "An account already exists with this email"}
                ),
            }
        # create user
        password = body.get("password")
        user_id = str(uuid.uuid4())
        response = users_table.put_item(
            Item={
                "user_email": user_email,
                "password": password,
                "type": user_type,
                "user_id": user_id,
            }
        )
        okCheck1 = response["ResponseMetadata"]["HTTPStatusCode"] == 200

        if user_type == "tiktoker":
            name = body.get("name")
            username = body.get("username")
            image = body.get("image")
            storage_name = name + "_" + user_id + ".jpg"
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
            image_url = (
                f"https://s3-{region}.amazonaws.com/{s3_bucket_name}/{storage_name}"
            )

            # Print the generated image URL
            print(f"Image URL: {image_url}")

            response = dynamodb.put_item(
                TableName="Tiktokers",
                Item={
                    "tiktoker_id": {"S": user_id},
                    "name": {"S": name},
                    "listings": {"SS": list({""})},
                    "orders": {"SS": list({""})},
                    "suppliers": {"SS": list({""})},
                    "username": {"S": username},
                    "profilepic_url": {"S": image_url},
                },
            )
        else:
            name = body.get("name")
            category = body.get("category")
            description = body.get("description")

            # Generate a UUID
            user_id = str(uuid.uuid4())

            response = dynamodb.put_item(
                TableName="Suppliers",
                Item={
                    "supplier_id": {"S": user_id},
                    "name": {"S": name},
                    "orders": {"SS": list({""})},
                    "products": {"SS": list({""})},
                    "tiktokers": {"SS": list({""})},
                    "tiktokers_sales": {"M": {}},
                    "category": {"S": category},
                    "description": {"S": description},
                },
            )
        okCheck2 = response["ResponseMetadata"]["HTTPStatusCode"] == 200 and okCheck1
        if okCheck2:
            return {
                "statusCode": 200,
                "body": json.dumps(
                    {"message": "User created successfully", "userId": user_id}
                ),
            }
        else:
            return {
                "statusCode": 400,
                "body": json.dumps(
                    {"message": "User could not be created", "userId": user_id}
                ),
            }
    except Exception as e:
        print(f"Error: {str(e)}")
        return {"statusCode": 500, "body": str(e)}
