import json
import boto3
import uuid
import base64
from io import BytesIO

# Initialize AWS clients for DynamoDB and S3
dynamodb = boto3.client('dynamodb')
dynamodbResource = boto3.resource('dynamodb')
s3 = boto3.client('s3')
s3_bucket_name = "images-bucket-13812931"
listingTable = dynamodbResource.Table('Listings')

def lambda_handler(event, context):
    try:
        # Extract data from the API Gateway event
        body = json.loads(event['body'])
        reviewer_id = body.get("reviewer_id")
        listing_id = body.get("listing_id")
        review_content = body.get("review_content")
        rating = body.get("rating")
        image = body.get("image")
        
        # Generate a UUID
        uuid_value = str(uuid.uuid4())
        
        storage_name = "reviewName"+"_"+uuid_value+".jpg"
        # Upload the image to S3
        # with open(image, 'rb') as image_file:
        # Decode the base64 data into bytes
        image_data = base64.b64decode(image)

        # Create a BytesIO object to treat the image data as a file-like object
        image_stream = BytesIO(image_data)
        s3.upload_fileobj(image_stream, s3_bucket_name, storage_name)

        expiration_time_in_seconds = 3600000000  # in seconds
        image_url = s3.generate_presigned_url(
            'get_object',
            Params={'Bucket': s3_bucket_name, 'Key': storage_name},
            ExpiresIn=expiration_time_in_seconds
        )

        # Print the generated image URL
        print(f'Image URL: {image_url}')

        # Access DynamoDB
        dynamo_response = dynamodb.put_item(
            TableName='Reviews',
            Item ={
                "review_id": {'S': uuid_value },
                'reviewer_id': {'S': reviewer_id },
                'listing_id':{'S': listing_id},
                'review_content':{'S': review_content},
                'rating':{'S': rating },
                'image_url':{'S': image_url },
            }
        )

        response = listingTable.get_item(Key={'listing_id': listing_id})
        listing = response['Item']
        if len(listing['reviews']) == 1 and "" in listing['reviews']:
            listing['reviews'].remove("")
        listing['reviews'].add(uuid_value)
        response = listingTable.put_item(Item= listing)
        print(response)

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