import json
import boto3
import uuid
import base64
from io import BytesIO

# Initialize AWS clients for DynamoDB and S3
dynamodb = boto3.resource('dynamodb')
supplierTable = dynamodb.Table('Suppliers')
productTable = dynamodb.Table('Products')
listingsTable = dynamodb.Table('Listings')
s3 = boto3.client('s3')
s3_bucket_name = "images-bucket-13812931"

def lambda_handler(event, context):
    try:
        # Extract data from the API Gateway event
        body = json.loads(event['body'])
        product_id = body.get("product_id")
        listing_price = body.get("listing_price")
        tiktoker_id = body.get("tiktoker_id")

        # Generate a UUID
        uuid_value = str(uuid.uuid4())

        ## Need to get supplier_id from products table
        response = productTable.get_item(Key={"product_id": product_id})
        supplier_id = response['Item']['supplier_id']
        ## Need to add tiktoker_id into tiktokers in suppliers table
        response = productTable.get_item(Key={"supplier_id": supplier_id})
        supplier = response['Item']
        supplier['tiktokers'].add(tiktoker_id)
        # add tiktoker into supplier's list of tiktokers
        response = supplierTable.put_item(Item= supplier)

        ## Need to add object into listing table
        response = listingsTable.put_item(
            Item ={
                "listing_id": uuid_value ,
                'tiktoker_id': tiktoker_id ,
                'product_id': product_id,
                'listing_price': listing_price,
                'reviews': {}
            }
        )
    
        response = {
            'statusCode': 200,
            'body': json.dumps({'message': "Successfully created listing with uuid_value: "+uuid_value})
        }
        return response

    except Exception as e:
        print(f'Error: {str(e)}')
        return {
            'statusCode': 500,
            'body': str(e)
        }