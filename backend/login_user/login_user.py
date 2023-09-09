import json
import boto3

users_table = boto3.resource("dynamodb").Table("Users")

def lambda_handler(event, context):
    try:
        body = json.loads(event["body"])
        email = body.get("email")
        password = body.get("password")
        response = users_table.get_item(Key={"email": email})
        if "Item" not in response:
            return {
                "statusCode": 400,
                "body": json.dumps({"message": "User does not exist"}),
            }
        user = response["Item"]
        if user["password"] != password:
            return {
                "statusCode": 400,
                "body": json.dumps({"message": "Incorrect password"}),
            }
        else:
            return {
                "statusCode": 200,
                "body": json.dumps(
                    {"message": "Login successful", "userId": user["userId"]}
                ),
            }
    except Exception as e:
        print(f"Error: {str(e)}")
        return {"statusCode": 500, "body": json.dumps(str(e))}
