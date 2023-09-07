import json
import boto3
import uuid
import base64
from io import BytesIO

# Initialize AWS clients for DynamoDB and S3
dynamodb = boto3.client('dynamodb')
dynamodbResource = boto3.resource('dynamodb')
productTable = dynamodbResource.Table('Products')
listingTable = dynamodbResource.Table('Listings')
supplierTable = dynamodbResource.Table('Suppliers')
tiktokerTable = dynamodbResource.Table('Tiktokers')

def lambda_handler(event, context):
    try:
        # Extract data from the API Gateway event
        body = json.loads(event['body'])
        buyer_id = body.get("buyer_id")
        listing_id = body.get("listing_id")
        quantity = body.get("quantity")
        
        # Generate a UUID
        uuid_value = str(uuid.uuid4())
        
        # Get listing
        response = listingTable.get_item(Key={'listing_id': listing_id})
        listing = response['Item']
        product_id = listing["product_id"]

        # Get product
        response = productTable.get_item(Key={'product_id': product_id})
        product = response['Item']
        supplier_id = product['supplier_id']

        # Access DynamoDB
        dynamo_response = dynamodb.put_item(
            TableName='Orders',
            Item ={
                "order_id": {'S': uuid_value },
                "buyer_id": {'S': buyer_id },
                "product": {'M': {
                    "product_id": {'S': product_id },
                    "product_name": {'S': product['product_name'] },
                    "price":{'S': listing['listing_price']},
                    "description":{'S': product['description']},
                    "supplier_id":{'S': product['supplier_id'] },
                    "image_url":{'S': product['image_url'] }
                }},
                "quantity":{'S': quantity },
            }
        )

        product["quantity"] = str(int(product["quantity"]) - int(quantity))

        # update product quantity after creating order
        response = productTable.put_item(Item= product)
        print(response)

        # update tiktoker orders
        response = tiktokerTable.get_item(Key={'tiktoker_id': buyer_id})
        tiktoker = response['Item']
        if "" in tiktoker["orders"]:
            tiktoker["orders"].remove("")
        tiktoker["orders"].add(uuid_value)
        response = tiktokerTable.put_item(Item= tiktoker)

        # update supplier orders
        response = supplierTable.get_item(Key={'supplier_id': supplier_id})
        supplier = response['Item']
        if "" in supplier["orders"]:
            supplier["orders"].remove("")
        supplier["orders"].add(uuid_value)
        response = supplierTable.put_item(Item= supplier)

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