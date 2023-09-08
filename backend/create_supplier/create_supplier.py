import json
import boto3
import uuid

# Initialize AWS clients for DynamoDB and S3
dynamodb = boto3.resource('dynamodb')
supplierTable = dynamodb.Table('Suppliers')

def lambda_handler(event, context):
    try:
        # Extract data from the API Gateway event
        body = json.loads(event['body'])
        name = body.get("name")
        
        # Generate a UUID
        uuid_value = str(uuid.uuid4())
        
        # Access DynamoDB
        supplier_response = supplierTable.put_item(
            Item ={
                "supplier_id": uuid_value ,
                'name': name ,
                'orders': list(""),
                'products':list(""),
                'tiktokers':list("") ,
            }
        )

        response = {
            'statusCode': 200,
            'body': json.dumps({'message': "Successfully created supplier with id: " + uuid_value})
        }
        return response

    except Exception as e:
        print(f'Error: {str(e)}')
        return {
            'statusCode': 500,
            'body': str(e)
        }