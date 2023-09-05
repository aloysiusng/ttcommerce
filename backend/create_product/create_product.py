import json
import boto3
import uuid

# Initialize AWS clients for DynamoDB and S3
dynamodb = boto3.client('dynamodb')
s3 = boto3.client('s3')

def lambda_handler(event, context):
    try:
        # Extract data from the API Gateway event
        body = json.loads(event['body'])
        product_name = body.get("product_name")
        supplier_price = body.get("supplier_price")
        description = body.get("description")
        quantity = body.get("quantity")
        supplier_id =body.get("supplier_id") 
        image = body.get("image")
        
        # Generate a UUID
        uuid_value = str(uuid.uuid4())
        
        storage_name = "productName"+"_"+uuid_value+".jpg"
        # Upload the image to S3
        with open(image, 'rb') as image_file:
            s3.upload_fileobj(image_file, "images_bucket", storage_name)

        expiration_time_in_seconds = 3600000000  # in seconds
        image_url = s3.generate_presigned_url(
            'get_object',
            Params={'Bucket': "images_bucket", 'Key': storage_name},
            ExpiresIn=expiration_time_in_seconds
        )

        # Print the generated image URL
        print(f'Image URL: {image_url}')

        # Access DynamoDB
        dynamo_response = dynamodb.put_item(
            TableName='Products',
            Item ={
                "product_id": {'S': uuid_value },
                'product_name': {'S': product_name },
                'supplier_price':{'S': supplier_price},
                'description':{'S',description},
                'quantity':{'S': quantity },
                'supplier_id':{'S': supplier_id },
                'image_url':{'S': image_url },
            }
        )

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