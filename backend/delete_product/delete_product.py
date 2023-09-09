import json

import boto3

dynamodb = boto3.resource("dynamodb")
productTable = dynamodb.Table("Products")
supplierTable = dynamodb.Table("Suppliers")
s3 = boto3.client("s3")
s3_bucket_name = "images-bucket-13812931"


def lambda_handler(event, context):
    # Extract the key of the record to delete from the event data
    body = json.loads(event["body"])
    key = body.get("product_id")

    try:
        response = productTable.get_item(Key={"product_id": key})
        if "Item" not in response:
            return {
                "statusCode": 400,
                "body": json.dumps({"message": "Product does not exist"}),
            }
        supplierID = response["Item"]["supplier_id"]
        response = supplierTable.get_item(Key={"supplier_id": supplierID})
        if "Item" not in response:
            return {
                "statusCode": 400,
                "body": json.dumps({"message": "Supplier does not exist"}),
            }
        supplier = response["Item"]
        supplier["products"].remove(key)
        if len(supplier["products"]) == 0:
            supplier["products"].add("")

        # delete product from supplier's list of product
        response = supplierTable.put_item(Item=supplier)
        print(response)

        # delete product from product table
        response = productTable.delete_item(Key={"product_id": key})
        print(response)

        # delete product image from s3 bucket
        image_key_s3 = "productName" + "_" + key + ".jpg"
        response = s3.delete_object(Bucket=s3_bucket_name, Key=image_key_s3)
        print(response)

        return {"statusCode": 200, "body": "Record deleted successfully"}
    except Exception as e:
        return {"statusCode": 500, "body": str(e)}
