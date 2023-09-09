import json

import boto3

# Initialize AWS clients for DynamoDB and S3
dynamodb = boto3.resource("dynamodb")
supplierTable = dynamodb.Table("Suppliers")


def lambda_handler(event, context):
    try:
        # Extract data from the API Gateway event
        body = event['queryStringParameters']
        supplier_id = body.get("supplier_id")
        response = supplierTable.get_item(Key={"supplier_id": supplier_id})
        if "Item" not in response:
            return {
                "statusCode": 400,
                "body": json.dumps({"message": "Supplier does not exist"}),
            }
        supplier = response["Item"]
        supplier["orders"] = list(supplier.get("orders", []))
        supplier["products"] = list(supplier.get("products", []))
        supplier["tiktokers"] = list(supplier.get("tiktokers", []))
        for key, value in supplier["tiktokers_sales"].items():
            supplier["tiktokers_sales"][key] = str(value)

        return {"statusCode": 200, "body": json.dumps(supplier)}

    except Exception as e:
        print(f"Error: {str(e)}")
        return {"statusCode": 500, "body": str(e)}
