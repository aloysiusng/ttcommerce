import json
import boto3

# Initialize AWS clients for DynamoDB and S3
dynamodb = boto3.resource('dynamodb')
supplierTable = dynamodb.Table('Suppliers')
orderTable = dynamodb.Table('Orders')
tiktokerTable = dynamodb.Table('Tiktokers')

def lambda_handler(event, context):
    try:
        # Extract data from the API Gateway event
        body = json.loads(event['body'])
        supplier_id = body.get("supplier_id")
        response = supplierTable.get_item(Key={"supplier_id": supplier_id})
        supplier = response["Item"]
        order_ids = supplier["orders"]
        orders = []
        for order_id in order_ids:
            if order_id != "":
                response = orderTable.get_item(Key={"order_id": order_id})
                order = response["Item"]
                tiktoker_id = order["buyer_id"]
                response = tiktokerTable.get_item(Key={"tiktoker_id": tiktoker_id})
                # Convert sets to lists in the response
                item = response.get("Item", {})
                item["listings"] = list(item.get("listings", []))
                item["suppliers"] = list(item.get("suppliers", []))
                item["orders"] = list(item.get("orders", []))
                
                del order["buyer_id"]
                order["buyer"] = item
                
                orders.append(order)
        
        print(orders)

        return {
            'statusCode': 200,
            'body': json.dumps(orders)
            }

    except Exception as e:
        print(f'Error: {str(e)}')
        return {
            'statusCode': 500,
            'body': str(e)
        }