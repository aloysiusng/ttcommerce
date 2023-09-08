import json
import boto3

# Initialize AWS clients for DynamoDB and S3
dynamodb = boto3.resource('dynamodb')
tiktokerTable = dynamodb.Table('Tiktokers')

def lambda_handler(event, context):
    try:
        # Extract data from the API Gateway event
        body = json.loads(event['body'])
        tiktoker_id = body.get("tiktoker_id")
        response = tiktokerTable.get_item(Key={"tiktoker_id": tiktoker_id})
        tiktoker = response["Item"]

        return {
            'statusCode': 200,
            'body': json.dumps(tiktoker)
        }

    except Exception as e:
        print(f'Error: {str(e)}')
        return {
            'statusCode': 500,
            'body': str(e)
        }