import json
import boto3

# Initialize AWS clients for DynamoDB and S3
dynamodb = boto3.resource('dynamodb')
supplierTable = dynamodb.Table('Suppliers')
productTable = dynamodb.Table('Products')

def lambda_handler(event, context):
    try:
        # Extract data from the API Gateway event
        body = json.loads(event['body'])
        product_id = body.get("product_id")
        response = productTable.get_item(Key={"product_id": product_id})
        
        return {
            'statusCode': 200,
            'body': json.dumps(response["Item"])
            }

    except Exception as e:
        print(f'Error: {str(e)}')
        return {
            'statusCode': 500,
            'body': str(e)
        }