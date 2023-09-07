import json
import boto3

# Initialize AWS clients for DynamoDB and S3
dynamodb = boto3.resource('dynamodb')
reviewTable = dynamodb.Table('Reviews')
listingTable = dynamodb.Table('Listing')

def lambda_handler(event, context):
    try:
        # Extract data from the API Gateway event
        body = json.loads(event['body'])
        listing_id = body.get("listing_id")
        response = listingTable.get_item(Key={"listing_id": listing_id})
        listing = response["Item"]
        review_ids = listing["reviews"]
        reviews = []
        for review_id in review_ids:
            if review_id != "":
                response = reviewTable.get_item(Key={"review_id": review_id})
                reviews.append(response["Item"])
        
        print(reviews)

        return {
            'statusCode': 200,
            'body': json.dumps(reviews)
            }

    except Exception as e:
        print(f'Error: {str(e)}')
        return {
            'statusCode': 500,
            'body': str(e)
        }