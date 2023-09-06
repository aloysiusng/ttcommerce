import boto3
import json

dynamodb = boto3.resource('dynamodb')
orderTable = dynamodb.Table('Orders')
productTable = dynamodb.Table('Products')

def lambda_handler(event, context):
    # Extract the key of the record to delete from the event data
    body = json.loads(event['body'])
    key = body.get('order_id')
    
    try:
        response = orderTable.get_item(Key={'order_id': key})
        orderQuantity = response['Item']['quantity']
        product = response['Item']['product']
        product_id = product.get("product_id")
        response = productTable.get_item(Key={'product_id': product_id})
        product = response['Item']
        product["quantity"] = str(int(orderQuantity) + int(product["quantity"]))

        # delete order from Orders table
        response = orderTable.delete_item(
            Key={
                'order_id': key
            }
        )
        print(response)

        # update product quantity after deleting order
        response = orderTable.put_item(Item= product)
        print(response)

        return {
            'statusCode': 200,
            'body': 'Record deleted successfully'
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': str(e)
        }