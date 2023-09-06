import json
import boto3

# Initialize AWS clients for DynamoDB and S3
dynamodb = boto3.client('dynamodb')
s3 = boto3.client('s3')

def lambda_handler(event, context):
    try:
        # Extract data from the API Gateway event
        body = json.loads(event['body'])
        product_id = body.get("productId")

        # Access DynamoDB
        dynamo_response = dynamodb.get_item(
            TableName='products',
            Item ={
                "product_id": {'S': uuid_value },
                'productName': {'S': productName },
                'price':{'S': price},
                'description':{'S',description},
                'quantity':{'S': quantity },
                'supplierId':{'S': supplierId },
                'imageUrl':{'S': image_url },
            }
        )

        response = {
            'statusCode': 200,
            'body': json.dumps({'dynamoData': dynamo_response})
        }
        return response

    except Exception as e:
        print(f'Error: {str(e)}')
        return {
            'statusCode': 500,
            'body': json.dumps({'error': 'Internal Server Error'})
        }