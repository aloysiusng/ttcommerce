import boto3
import json

dynamodb = boto3.resource('dynamodb')
reviewTable = dynamodb.Table('Reviews')
listingTable = dynamodb.Table('Listings')
s3 = boto3.client('s3')
s3_bucket_name = "images-bucket-13812931"

def lambda_handler(event, context):
    # Extract the key of the record to delete from the event data
    body = json.loads(event['body'])
    key = body.get('review_id')
    
    try:
        response = reviewTable.get_item(Key={'review_id': key})
        listingID = response['Item']['listing_id']
        response = listingTable.get_item(Key={'listing_id': listingID})
        listing = response['Item']
        listing['reviews'].remove(key)
        if len(listing['reviews']) == 0:
            listing['reviews'].add("")

        # delete review from listing's list of reviews
        response = listingTable.put_item(Item= listing)
        print(response)

        # delete review from review table
        response = reviewTable.delete_item(
            Key={
                'review_id': key
            }
        )
        print(response)

        # delete review image from s3 bucket
        image_key_s3 = "reviewName"+"_"+ key +".jpg"
        response = s3.delete_object(Bucket=s3_bucket_name, Key=image_key_s3)
        print(response)

        return {
            'statusCode': 200,
            'body': 'review ' + key + ' deleted successfully'
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': str(e)
        }