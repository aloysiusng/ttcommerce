import boto3
import json

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('Products')

def lambda_handler(event, context):
    # Extract the key of the record to delete from the event data
    body = json.loads(event['body'])
    key = body.get('product_id')
    
    try:
        response = table.delete_item(
            Key={
                'product_id': key
            }
        )
        return {
            'statusCode': 200,
            'body': 'Record deleted successfully'
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': str(e)
        }