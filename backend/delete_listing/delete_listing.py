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

def lambda_handler(event, context):
    try:
        # Extract data from the API Gateway event
        body = json.loads(event['body'])
        listing_id = body.get("listing_id")
        # Generate a UUID
        uuid_value = str(uuid.uuid4())

        ## Need to get tiktoker_id -> remove listing_id from listings and supplier_id from suppliers in tiktokers
        ## Need to get supplier_id -> remove tiktoker_id from tiktokers in suppliers
        ## Need to iterate reviews and delete all reviews
        listing_response = listingsTable.get_item(Key={"listing_id": listing_id})
        tiktoker_id = listing_response['Item']['tiktoker_id']
        product_id = response['Item']['product_id']
        reviews_set = response['Item']['reviews']
        listing_response = productTable.get_item(Key={"product_id": product_id})
        supplier_id = listing_response['Item']['supplier_id']
        tiktoker_response = tiktokerTable.get_item(Key={"tiktoker_id": tiktoker_id})
        tiktoker = tiktoker_response['Item']
        supplier_response = supplierTable.get_item(Key={"supplier_id": supplier_id})
        supplier = supplier_response['Item']
        
        # delete listing_id from tiktoker's list of listings
        tiktoker['listings'].remove(listing_id)
        # delete supplier_id from tiktoker's list of suppliers
        tiktoker['suppliers'].remove(supplier_id)
        # delete tiktoker_id from supplier's list of tiktokers
        supplier['tiktokers'].remove(tiktoker_id)
        response = tiktokerTable.put_item(Item= tiktoker)
        response = supplierTable.put_item(Item= supplier)
        # delete listing from Listings
        response = listingsTable.delete_item(
            Key={
                'listing_id': listing_id
            }
        )
        for review in reviews_set:
            response = listingsTable.delete_item(
            Key={
                'review_id': review
            }
        )
        response = {
            'statusCode': 200,
            'body': json.dumps({'message': "Successfully deleted listing with listing_id: "+listing_id})
        }
        return response

    except Exception as e:
        print(f'Error: {str(e)}')
        return {
            'statusCode': 500,
            'body': str(e)
        }