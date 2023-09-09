import json
import boto3

# Initialize AWS clients for DynamoDB and S3
dynamodb = boto3.resource('dynamodb')
supplierTable = dynamodb.Table('Suppliers')

def lambda_handler(event, context):
    try:
        # Extract data from the API Gateway event
        body = json.loads(event['body'])
        supplier_id = body.get("supplier_id")
        response = supplierTable.get_item(Key={"supplier_id": supplier_id})
        supplier = response["Item"]
        supplier["orders"] = list(supplier.get("orders", []))
        supplier["products"] = list(supplier.get("products", []))
        supplier["tiktokers"] = list(supplier.get("tiktokers", []))

        return {
            'statusCode': 200,
            'body': json.dumps(supplier)
        }

    except Exception as e:
        print(f'Error: {str(e)}')
        return {
            'statusCode': 500,
            'body': str(e)
        }