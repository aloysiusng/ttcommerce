import json
import boto3
import uuid

# Initialize AWS clients for DynamoDB and S3
dynamodb = boto3.resource('dynamodb')

def lambda_handler(event, context):
    try:
        # Perform a scan operation to get all records
        response = dynamodb.scan(
            TableName="Tiktokers"
        )

        # Retrieve the items from the response
        items = response.get('Items', [])
        tiktokers = []

        # Iterate through the items
        for item in items:
            item["listings"] = list(item.get("listings", []))
            item["orders"] = list(item.get("orders", []))
            item["suppliers"] = list(item.get("suppliers", []))
            tiktokers.append(item)

        response = {
            'statusCode': 200,
            'body': json.dumps(tiktokers)
        }
        return response

    except Exception as e:
        print(f'Error: {str(e)}')
        return {
            'statusCode': 500,
            'body': str(e)
        }