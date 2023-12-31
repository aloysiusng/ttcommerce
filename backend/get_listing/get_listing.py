import json
import boto3
import uuid

# Initialize AWS clients for DynamoDB and S3
dynamodb = boto3.resource('dynamodb')
supplierTable = dynamodb.Table('Suppliers')
productTable = dynamodb.Table('Products')
listingsTable = dynamodb.Table('Listings')
tiktokerTable = dynamodb.Table('Tiktokers')
reviewTable = dynamodb.Table('Reviews')
s3 = boto3.client('s3')
s3_bucket_name = "images-bucket-13812931"
lambda_client = boto3.client('lambda')

def lambda_handler(event, context):
    try:
        # Extract data from the API Gateway event
        body = event['queryStringParameters']
        listing_id = body.get("listing_id")

        listing_response = listingsTable.get_item(Key={"listing_id": listing_id})
        if "Item" not in listing_response:
            return {
                "statusCode": 400,
                "body": json.dumps({"message": "Listing does not exist"})
            }
        # Convert sets to lists in the response
        item = listing_response.get("Item", {})
        item["reviews"] = list(item.get("reviews", []))
        response = {
            'statusCode': 200,
            'body': json.dumps(listing_response["Item"])
        }
        return response

    except Exception as e:
        print(f'Error: {str(e)}')
        return {
            'statusCode': 500,
            'body': str(e)
        }