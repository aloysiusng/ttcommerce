import json
import boto3
import uuid

# Initialize AWS clients for DynamoDB and S3
dynamodb = boto3.client('dynamodb')

def lambda_handler(event, context):
    try:
        # Extract data from the API Gateway event
        body = json.loads(event['body'])
        name = body.get("name")
        username = body.get("username")
        profilepic_url = body.get("profilepic_url")
        
        # Generate a UUID
        uuid_value = str(uuid.uuid4())
        
        response = dynamodb.put_item(
            TableName="Tiktokers",
            Item={
                'tiktoker_id': {'S': uuid_value},
                'name': {'S': name},
                'listings': {'SS': list({""})},
                'orders': {'SS': list({""})},
                'suppliers': {'SS': list({""})},
                'username':{'S': username},
                'profilepic_url': {'S': profilepic_url}
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