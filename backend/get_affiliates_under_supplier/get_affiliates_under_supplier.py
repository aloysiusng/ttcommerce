import json
import boto3

# Initialize AWS clients for DynamoDB and S3
dynamodb = boto3.resource('dynamodb')
supplierTable = dynamodb.Table('Suppliers')
tiktokerTable = dynamodb.Table('Tiktokers')

def lambda_handler(event, context):
    try:
        # Extract data from the API Gateway event
        body = json.loads(event['body'])
        supplier_id = body.get("supplier_id")
        response = supplierTable.get_item(Key={"supplier_id": supplier_id})
        supplier = response["Item"]
        tiktoker_ids = supplier["tiktokers"]
        tiktokers = []
        for tiktoker_id in tiktoker_ids:
            if tiktoker_id != "":
                response = tiktokerTable.get_item(Key={"tiktoker_id": tiktoker_id})
                tiktokers.append(response["Item"])
        
        print(tiktokers)

        return {
            'statusCode': 200,
            'body': json.dumps(tiktokers)
            }

    except Exception as e:
        print(f'Error: {str(e)}')
        return {
            'statusCode': 500,
            'body': str(e)
        }