import json
import boto3

client = boto3.client('dynamodb')

def lambda_handler(event, context):
    try:
        response = client.scan(TableName = "Products",
                                AttributesToGet = ["product_id", "product_name", "product_description", "product_price", "product_quantity", "product_supplier"],
                                Select = "ALL_ATTRIBUTES",
                                Limit = 10)
        return {
            'statusCode': 200,
            # returns an array of products
            'body': json.dumps(response["Items"])
            }

    except Exception as e:
        print(f'Error: {str(e)}')
        return {
            'statusCode': 500,
            'body': str(e)
        }