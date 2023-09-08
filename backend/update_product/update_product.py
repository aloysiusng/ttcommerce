import boto3
import json
import base64
from io import BytesIO

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('Products')
s3 = boto3.client('s3')
s3_bucket_name = "images-bucket-13812931"

# expecting this from frontend:
# object name should be product, but dont need to include all fields
#     product_id: SOME_ID
#     product: {
#         "product_name":
#         "supplier_price":
#         "description":
#         "quantity":
#         "supplier_iD":
#         "imageurl":
#     }


def lambda_handler(event, context):
    # product_name = product.get('product_name')
    # supplier_price = product.get('supplier_price')
    # description = product.get('description')
    # quantity = product.get('quantity')
    # supplier_iD = product.get('supplier_iD')
    # imageurl = product.get('imageurl')

    possible_fields = ["product_name", "supplier_price", "description", "quantity", "supplier_iD", "image"]

    # Extract the key of the record to delete from the event data
    body = json.loads(event['body'])
    key = body.get('product_id')
    print(key)
    product = body.get('product')

    # get the current record
    response = table.get_item(Key={'product_id': key})
    print(response)
    update_item = response['Item']
    print(update_item)
    

    try:
        # update the record fields
        for field in possible_fields:
            if field == "image" and product.get(field) != None:
                storage_name = "productName"+"_"+key+".jpg"
                # Upload the image to S3
                # with open(image, 'rb') as image_file:
                # Decode the base64 data into bytes
                image_data = base64.b64decode(product.get(field))
                content_type = 'image/jpeg'
        
                # Create a BytesIO object to treat the image data as a file-like object
                image_stream = BytesIO(image_data)
                s3.upload_fileobj(image_stream, s3_bucket_name, storage_name, ExtraArgs={'ContentType': content_type})
        
                # Get the bucket's region
                region = s3.head_bucket(Bucket=s3_bucket_name)['ResponseMetadata']['HTTPHeaders']['x-amz-bucket-region']

                # Construct the object URL
                image_url = f"https://s3-{region}.amazonaws.com/{s3_bucket_name}/{storage_name}"

                update_item['image_url'] = image_url
            elif product.get(field) != None:
                update_item[field] = product.get(field)

        print(update_item)
        response = table.put_item(Item=update_item)

        return {
            'statusCode': 200,
            'body': 'Record updated successfully'
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': str(e)
        }