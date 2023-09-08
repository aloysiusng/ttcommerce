import json
import boto3
import uuid

# Initialize AWS clients for DynamoDB and S3
dynamodb = boto3.resource('dynamodb')
tiktokerTable = dynamodb.Table('Tiktokers')

def lambda_handler(event, context):
    try:
        # Extract data from the API Gateway event
        body = json.loads(event['body'])
        name = body.get("name")
        profilepic_url = body.get("profilepic_url")
        username = body.get("username")

        # Generate a UUID
        uuid_value = str(uuid.uuid4())
        
        # Access DynamoDB
        tiktoker_response = tiktokerTable.put_item(
            Item ={
                "tiktoker_id": uuid_value ,
                'listings':  list(""),
                'name': name,
                'orders': list(""),
                'profilepic_url': profilepic_url,
                'suppliers':  list(""),
                'username': username ,
            }
        )

        response = {
            'statusCode': 200,
            'body': json.dumps({'message': "Successfully created tiktoker with id: " + uuid_value})
        }
        return response

    except Exception as e:
        print(f'Error: {str(e)}')
        return {
            'statusCode': 500,
            'body': str(e)
        }