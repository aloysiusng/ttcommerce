import json
import uuid

import boto3

# Initialize AWS clients for DynamoDB and S3
dynamodb = boto3.resource("dynamodb")
supplierTable = dynamodb.Table("Suppliers")
productTable = dynamodb.Table("Products")
listingsTable = dynamodb.Table("Listings")
tiktokerTable = dynamodb.Table("Tiktokers")
reviewTable = dynamodb.Table("Reviews")
s3 = boto3.client("s3")
s3_bucket_name = "images-bucket-13812931"
lambda_client = boto3.client("lambda")


def lambda_handler(event, context):
    try:
        # Extract data from the API Gateway event
        body = json.loads(event["body"])
        listing_id = body.get("listing_id")

        ## Need to get tiktoker_id -> remove listing_id from listings and supplier_id from suppliers in tiktokers
        ## Need to get supplier_id -> remove tiktoker_id from tiktokers in suppliers
        ## Need to iterate reviews and delete all reviews
        listing_response = listingsTable.get_item(Key={"listing_id": listing_id})
        if "Item" not in listing_response:
            return {
                "statusCode": 400,
                "body": json.dumps({"message": "Listing does not exist"}),
            }
        tiktoker_id = listing_response["Item"]["tiktoker_id"]
        product_id = listing_response["Item"]["product_id"]
        reviews_set = listing_response["Item"]["reviews"]

        if len(reviews_set) != 0:
            for review in reviews_set:
                payload = {"body": json.dumps({"review_id": review})}
                response = lambda_client.invoke(
                    FunctionName="delete_review",
                    InvocationType="RequestResponse",
                    Payload=json.dumps(payload),
                )

        product_response = productTable.get_item(Key={"product_id": product_id})
        if "Item" not in product_response:
            return {
                "statusCode": 400,
                "body": json.dumps({"message": "Product does not exist"}),
            }
        supplier_id = product_response["Item"]["supplier_id"]
        tiktoker_response = tiktokerTable.get_item(Key={"tiktoker_id": tiktoker_id})
        if "Item" not in tiktoker_response:
            return {
                "statusCode": 400,
                "body": json.dumps({"message": "Tiktoker does not exist"}),
            }
        tiktoker = tiktoker_response["Item"]
        supplier_response = supplierTable.get_item(Key={"supplier_id": supplier_id})
        if "Item" not in supplier_response:
            return {
                "statusCode": 400,
                "body": json.dumps({"message": "Supplier does not exist"}),
            }
        supplier = supplier_response["Item"]

        # delete listing_id from tiktoker's list of listings
        tiktoker["listings"].remove(listing_id)
        if len(tiktoker["listings"]) == 0:
            tiktoker["listings"].add("")
        # delete supplier_id from tiktoker's list of suppliers
        tiktoker["suppliers"].remove(supplier_id)
        if len(tiktoker["suppliers"]) == 0:
            tiktoker["suppliers"].add("")
        # delete tiktoker_id from supplier's list of tiktokers
        supplier["tiktokers"].remove(tiktoker_id)
        if len(supplier["tiktokers"]) == 0:
            supplier["tiktokers"].add("")
        response = tiktokerTable.put_item(Item=tiktoker)
        response = supplierTable.put_item(Item=supplier)
        # delete listing from Listings
        response = listingsTable.delete_item(Key={"listing_id": listing_id})

        response = {
            "statusCode": 200,
            "body": json.dumps(
                {
                    "message": "Successfully deleted listing with listing_id: "
                    + listing_id
                }
            ),
        }
        return response

    except Exception as e:
        print(f"Error: {str(e)}")
        return {"statusCode": 500, "body": str(e)}
