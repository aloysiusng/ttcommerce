import json
import boto3
import uuid
import base64
from io import BytesIO

# Initialize AWS clients for DynamoDB and S3
dynamodb = boto3.client('dynamodb')
s3 = boto3.client('s3')
s3_bucket_name = "images-bucket-13812931"

def lambda_handler(event, context):
    try:
        # Extract data from the API Gateway event
        body = json.loads(event['body'])
        name = body.get("name")
        username = body.get("username")
        image = body.get("image")
        
        # Generate a UUID
        uuid_value = str(uuid.uuid4())
        storage_name = name +"_"+uuid_value+".jpg"
        # Upload the image to S3
        # with open(image, 'rb') as image_file:
        # Decode the base64 data into bytes
        image_data = base64.b64decode(image)
        content_type = 'image/jpeg'
        # Create a BytesIO object to treat the image data as a file-like object
        image_stream = BytesIO(image_data)
        s3.upload_fileobj(image_stream, s3_bucket_name, storage_name, ExtraArgs={'ContentType': content_type})
        # Get the bucket's region
        region = s3.head_bucket(Bucket=s3_bucket_name)['ResponseMetadata']['HTTPHeaders']['x-amz-bucket-region']

        # Construct the object URL
        image_url = f"https://s3-{region}.amazonaws.com/{s3_bucket_name}/{storage_name}"

        # Print the generated image URL
        print(f'Image URL: {image_url}')

        response = dynamodb.put_item(
            TableName="Tiktokers",
            Item={
                'tiktoker_id': {'S': uuid_value},
                'name': {'S': name},
                'listings': {'SS': list({""})},
                'orders': {'SS': list({""})},
                'suppliers': {'SS': list({""})},
                'username':{'S': username},
                'profilepic_url': {'S': image_url}
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