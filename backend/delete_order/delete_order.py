import json

import boto3

dynamodb = boto3.resource("dynamodb")
orderTable = dynamodb.Table("Orders")
productTable = dynamodb.Table("Products")
supplierTable = dynamodb.Table("Suppliers")
tiktokerTable = dynamodb.Table("Tiktokers")


def lambda_handler(event, context):
    # Extract the key of the record to delete from the event data
    body = json.loads(event["body"])
    key = body.get("order_id")

    try:
        response = orderTable.get_item(Key={"order_id": key})
        if "Item" not in response:
            return {
                "statusCode": 400,
                "body": json.dumps({"message": "Order does not exist"}),
            }
        orderQuantity = response["Item"]["quantity"]
        buyer_id = response["Item"]["buyer_id"]
        seller_id = response["Item"]["seller_id"]
        product = response["Item"]["product"]
        product_id = product.get("product_id")
        supplier_id = product.get("supplier_id")
        response = productTable.get_item(Key={"product_id": product_id})
        if "Item" not in response:
            return {
                "statusCode": 400,
                "body": json.dumps({"message": "Product does not exist"}),
            }
        product = response["Item"]
        product["quantity"] = str(int(orderQuantity) + int(product["quantity"]))

        # delete order from Orders table
        response = orderTable.delete_item(Key={"order_id": key})
        print(response)

        # update product quantity after deleting order
        response = productTable.put_item(Item=product)
        print(response)

        # update tiktoker orders
        response = tiktokerTable.get_item(Key={"tiktoker_id": buyer_id})
        if "Item" not in response:
            return {
                "statusCode": 400,
                "body": json.dumps({"message": "Tiktoker does not exist"}),
            }
        tiktoker = response["Item"]
        tiktoker["orders"].remove(key)
        if len(tiktoker["orders"]) == 0:
            tiktoker["orders"].add("")
        response = tiktokerTable.put_item(Item=tiktoker)
        print(response)

        # update supplier orders
        response = supplierTable.get_item(Key={"supplier_id": supplier_id})
        if "Item" not in response:
            return {
                "statusCode": 400,
                "body": json.dumps({"message": "Supplier does not exist"}),
            }
        supplier = response["Item"]
        supplier["orders"].remove(key)
        if len(supplier["orders"]) == 0:
            supplier["orders"].add("")

        tiktokers_sales = supplier["tiktokers_sales"]
        if tiktokers_sales.get(seller_id) != None:
            tiktokers_sales.update({seller_id: tiktokers_sales.get(seller_id) - 1})

        supplier["tiktokers_sales"] = tiktokers_sales

        response = supplierTable.put_item(Item=supplier)

        return {"statusCode": 200, "body": "Record deleted successfully"}
    except Exception as e:
        return {"statusCode": 500, "body": str(e)}
