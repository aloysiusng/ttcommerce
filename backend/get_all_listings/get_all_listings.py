import json

import boto3

client = boto3.client("dynamodb")


def lambda_handler(event, context):
    try:
        response = client.scan(TableName="Listings", Select="ALL_ATTRIBUTES", Limit=10)
        data = response["Items"]
        counter = 0
        while counter < len(data):
            temp = {}
            for key, value in data[counter].items():
                for _, v in value.items():
                    temp[key] = v
            data[counter] = temp
            counter += 1

        return {
            "statusCode": 200,
            "body": json.dumps({"products": json.dumps(data)}),
        }

    except Exception as e:
        print(f"Error: {str(e)}")
        return {"statusCode": 500, "body": str(e)}
