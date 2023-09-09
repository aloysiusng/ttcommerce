import base64
import json
from io import BytesIO

import boto3

dynamodb = boto3.resource("dynamodb")
table = dynamodb.Table("Listings")
s3 = boto3.client("s3")
s3_bucket_name = "images-bucket-13812931"


def lambda_handler(event, context):
    possible_fields = ["listing_price"]

    # Extract the key of the record to delete from the event data
    body = json.loads(event["body"])
    key = body.get("listing_id")
    print(key)
    listing = body.get("listing")

    # get the current record
    response = table.get_item(Key={"listing_id": key})
    if "Item" not in response:
        return {
            "statusCode": 400,
            "body": json.dumps({"message": "Listing does not exist"}),
        }
    print(response)
    update_item = response["Item"]
    print(update_item)

    try:
        # update the record fields
        for field in possible_fields:
            if listing.get(field) != None:
                update_item[field] = listing.get(field)

        print(update_item)
        response = table.put_item(Item=update_item)

        return {"statusCode": 200, "body": "Record updated successfully"}
    except Exception as e:
        return {"statusCode": 500, "body": str(e)}
