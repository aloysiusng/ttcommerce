import json

import boto3

# Initialize AWS clients for DynamoDB and S3
dynamodb = boto3.resource("dynamodb")
supplierTable = dynamodb.Table("Suppliers")
productTable = dynamodb.Table("Products")


def lambda_handler(event, context):
    try:
        # Extract data from the API Gateway event
        body = json.loads(event["body"])
        supplier_id = body.get("supplier_id")
        response = supplierTable.get_item(Key={"supplier_id": supplier_id})
        if "Item" not in response:
            return {
                "statusCode": 400,
                "body": json.dumps({"message": "Supplier does not exist"}),
            }
        supplier = response["Item"]
        product_ids = supplier["products"]
        products = []
        for product_id in product_ids:
            if product_id != "":
                response = productTable.get_item(Key={"product_id": product_id})
                if "Item" not in response:
                    return {
                        "statusCode": 400,
                        "body": json.dumps({"message": "Product does not exist"}),
                    }
                products.append(response["Item"])

        print(products)

        return {"statusCode": 200, "body": json.dumps(products)}

    except Exception as e:
        print(f"Error: {str(e)}")
        return {"statusCode": 500, "body": str(e)}
