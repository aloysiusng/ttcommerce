## ======================================= S3 ==========================================================
# images bucket
resource "aws_s3_bucket" "images_bucket" {
  bucket = var.images_bucket_name
}

resource "aws_s3_bucket_public_access_block" "images_bucket_public_access_block" {
  bucket                  = var.images_bucket_name
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}
# lambda bucket
resource "aws_s3_bucket" "lambda_bucket" {
  bucket = var.lambda_bucket_name
}

resource "aws_s3_bucket_public_access_block" "lambda_bucket_public_access_block" {
  bucket                  = var.lambda_bucket_name
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# ======================================= DynamoDB ==========================================================
resource "aws_dynamodb_table" "products" {
  name         = "Products"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "product_id"
  attribute {
    name = "product_id"
    type = "S"
  }
}

resource "aws_dynamodb_table" "suppliers" {
  name         = "Suppliers"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "supplier_id"
  attribute {
    name = "supplier_id"
    type = "S"
  }
}

resource "aws_dynamodb_table" "tiktokers" {
  name         = "Tiktokers"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "tiktoker_id"
  attribute {
    name = "tiktoker_id"
    type = "S"
  }
}

resource "aws_dynamodb_table" "listings" {
  name         = "Listings"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "listing_id"
  attribute {
    name = "listing_id"
    type = "S"
  }
}

resource "aws_dynamodb_table" "orders" {
  name         = "Orders"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "order_id"
  attribute {
    name = "order_id"
    type = "S"
  }
}
resource "aws_dynamodb_table" "reviews" {
  name         = "Reviews"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "review_id"

  attribute {
    name = "review_id"
    type = "S"
  }
}
# ======================================= IAM ==========================================================
resource "aws_iam_role" "super_lambda_role" {
  name = "super_lambda_role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [{
      Action = "sts:AssumeRole",
      Effect = "Allow",
      Principal = {
        Service = "lambda.amazonaws.com"
      }
    }]
  })

}
# ALL DynamoDB access
data "aws_iam_policy_document" "dynamodb_policy" {
  statement {
    actions = ["dynamodb:PutItem", "dynamodb:GetItem", "dynamodb:Scan", "dynamodb:Query"]
    resources = [
      aws_dynamodb_table.products.arn,
      aws_dynamodb_table.suppliers.arn,
      aws_dynamodb_table.tiktokers.arn,
      aws_dynamodb_table.listings.arn,
      aws_dynamodb_table.orders.arn,
      aws_dynamodb_table.reviews.arn
    ]
  }
}

resource "aws_iam_policy" "dynamodb_access" {
  name        = "dynamodb-access-policy"
  description = "Policy for DynamoDB access"
  policy      = data.aws_iam_policy_document.dynamodb_policy.json
}

resource "aws_iam_policy_attachment" "dynamodb_attachment" {
  name       = "dynamodb-attachment"
  roles      = [aws_iam_role.super_lambda_role.name]
  policy_arn = aws_iam_policy.dynamodb_access.arn
}

# S3 access
data "aws_iam_policy_document" "s3_policy" {
  statement {
    actions   = ["s3:PutObject", "s3:GetObject"]
    resources = [aws_s3_bucket.images_bucket.arn]
  }
}

resource "aws_iam_policy" "s3_access" {
  name        = "s3-access-policy"
  description = "Policy for S3 access"
  policy      = data.aws_iam_policy_document.s3_policy.json
}

resource "aws_iam_policy_attachment" "s3_attachment" {
  name       = "s3-attachment"
  roles      = [aws_iam_role.super_lambda_role.name]
  policy_arn = aws_iam_policy.s3_access.arn
}

# ======================================= APIGW ==========================================================
# API Gateway general
resource "aws_apigatewayv2_api" "lambda" {
  name          = "serverless_lambda_gw"
  protocol_type = "HTTP"
}
resource "aws_cloudwatch_log_group" "api_gw" {
  name = "/aws/api_gw/${aws_apigatewayv2_api.lambda.name}"

  retention_in_days = 30
}
resource "aws_apigatewayv2_stage" "lambda" {
  api_id = aws_apigatewayv2_api.lambda.id

  name        = "serverless_lambda_stage"
  auto_deploy = true
  access_log_settings {
    destination_arn = aws_cloudwatch_log_group.api_gw.arn
    format = jsonencode({
      requestId               = "$context.requestId"
      sourceIp                = "$context.identity.sourceIp"
      requestTime             = "$context.requestTime"
      protocol                = "$context.protocol"
      httpMethod              = "$context.httpMethod"
      resourcePath            = "$context.resourcePath"
      routeKey                = "$context.routeKey"
      status                  = "$context.status"
      responseLength          = "$context.responseLength"
      integrationErrorMessage = "$context.integrationErrorMessage"
      }
    )
  }
}
#======================================== API Gateway routes========================================
# ========================= GET /getTest ========================================
resource "aws_lambda_function" "getTest" {
  function_name    = "getTest"
  filename         = "../backend/test.zip"
  role             = aws_iam_role.super_lambda_role.arn
  handler          = "getTest.test.lambda_handler"
  source_code_hash = filebase64sha256("../backend/test.zip")

  runtime = "python3.8"
  timeout = 900
}
resource "aws_cloudwatch_log_group" "test" {
  name              = "/aws/lambda/${aws_lambda_function.getTest.function_name}"
  retention_in_days = 30
}
resource "aws_apigatewayv2_integration" "getTest_integration" {
  api_id             = aws_apigatewayv2_api.lambda.id
  integration_uri    = aws_lambda_function.getTest.invoke_arn
  integration_type   = "AWS_PROXY"
  integration_method = "POST"
}
resource "aws_apigatewayv2_route" "getTest_route" {
  api_id    = aws_apigatewayv2_api.lambda.id
  route_key = "GET /getTest"
  target    = "integrations/${aws_apigatewayv2_integration.getTest_integration.id}"
}
resource "aws_lambda_permission" "getTest_permission" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.getTest.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.lambda.execution_arn}/*/*"
}