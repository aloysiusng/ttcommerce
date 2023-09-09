import json

import boto3

# Initialize AWS clients for DynamoDB and S3
dynamodb = boto3.resource("dynamodb")
supplierTable = dynamodb.Table("Suppliers")
tiktokerTable = dynamodb.Table("Tiktokers")


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
        tiktoker_ids = supplier["tiktokers"]
        tiktokers = []
        for tiktoker_id in tiktoker_ids:
            if tiktoker_id != "":
                response = tiktokerTable.get_item(Key={"tiktoker_id": tiktoker_id})
                if "Item" not in response:
                    return {
                        "statusCode": 400,
                        "body": json.dumps({"message": "Tiktoker does not exist"}),
                    }
                # Convert sets to lists in the response
                item = response.get("Item", {})
                item["listings"] = list(item.get("listings", []))
                item["suppliers"] = list(item.get("suppliers", []))
                item["orders"] = list(item.get("orders", []))
                tiktokers.append(item)
        print(tiktokers)

        return {"statusCode": 200, "body": json.dumps(tiktokers)}

    except Exception as e:
        print(f"Error: {str(e)}")
        return {"statusCode": 500, "body": str(e)}
