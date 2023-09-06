import json
import boto3
import uuid
import base64
from io import BytesIO

# Initialize AWS clients for DynamoDB and S3
dynamodb = boto3.resource('dynamodb')
supplierTable = dynamodb.Table('Suppliers')
productTable = dynamodb.Table('Products')
s3 = boto3.client('s3')
s3_bucket_name = "images-bucket-13812931"

def lambda_handler(event, context):
    try:
        # Extract data from the API Gateway event
        body = json.loads(event['body'])
        product_id = body.get('product_id')
        
        response = productTable.get_item(Key={'product_id': product_id})

        return response

    except Exception as e:
        print(f'Error: {str(e)}')
        return {
            'statusCode': 500,
            'body': str(e)
        }