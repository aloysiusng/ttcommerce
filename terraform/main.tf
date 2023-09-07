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
    actions = ["dynamodb:PutItem", "dynamodb:GetItem", "dynamodb:DeleteItem", "dynamodb:Scan", "dynamodb:Query"]
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
    actions   = ["s3:*", "s3-object-lambda:*"]
    resources = ["*"]
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

# cloudwatch access
data "aws_iam_policy_document" "cloudwatch_policy" {
  statement {
    actions   = ["logs:CreateLogGroup", "logs:CreateLogStream", "logs:PutLogEvents"]
    resources = ["*"]
  }
}
resource "aws_iam_policy" "cloudwatch_access" {
  name        = "cloudwatch-access-policy"
  description = "Policy for cloudwatch access"
  policy      = data.aws_iam_policy_document.cloudwatch_policy.json
}

resource "aws_iam_policy_attachment" "cloudwatch_attachment" {
  name       = "cloudwatch-attachment"
  roles      = [aws_iam_role.super_lambda_role.name]
  policy_arn = aws_iam_policy.cloudwatch_access.arn
}

# lambda access
data "aws_iam_policy_document" "lambda_policy" {
  statement {
    actions   = ["lambda:InvokeFunction"]
    resources = ["*"]
  }
}
resource "aws_iam_policy" "lambda_access" {
  name        = "lambda-access-policy"
  description = "Policy for lambda access"
  policy      = data.aws_iam_policy_document.lambda_policy.json
}

resource "aws_iam_policy_attachment" "lambda_attachment" {
  name       = "lambda-attachment"
  roles      = [aws_iam_role.super_lambda_role.name]
  policy_arn = aws_iam_policy.lambda_access.arn
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

  name        = "api"
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
  filename         = "../backend/getTest.zip"
  role             = aws_iam_role.super_lambda_role.arn
  handler          = "getTest.getTest.lambda_handler"
  #                   function name
  source_code_hash = filebase64sha256("../backend/getTest.zip")

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

# ========================= POST /create_product ========================================
resource "aws_lambda_function" "create_product" {
  function_name    = "create_product"
  filename         = "../backend/create_product.zip"
  role             = aws_iam_role.super_lambda_role.arn
  handler          = "create_product.create_product.lambda_handler"
  #                   function name
  source_code_hash = filebase64sha256("../backend/create_product.zip")

  runtime = "python3.8"
  timeout = 900
}
resource "aws_cloudwatch_log_group" "create_product" {
  name              = "/aws/lambda/${aws_lambda_function.create_product.function_name}"
  retention_in_days = 30
}
resource "aws_apigatewayv2_integration" "create_product_integration" {
  api_id             = aws_apigatewayv2_api.lambda.id
  integration_uri    = aws_lambda_function.create_product.invoke_arn
  integration_type   = "AWS_PROXY"
  integration_method = "POST"
}
resource "aws_apigatewayv2_route" "create_product_route" {
  api_id    = aws_apigatewayv2_api.lambda.id
  route_key = "POST /create_product"
  target    = "integrations/${aws_apigatewayv2_integration.create_product_integration.id}"
}
resource "aws_lambda_permission" "create_product_permission" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.create_product.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.lambda.execution_arn}/*/*"
}
# ========================= GET /get_product ========================================
resource "aws_lambda_function" "get_product" {
  function_name    = "get_product"
  filename         = "../backend/get_product.zip"
  role             = aws_iam_role.super_lambda_role.arn
  handler          = "get_product.get_product.lambda_handler"
  #                   function name
  source_code_hash = filebase64sha256("../backend/get_product.zip")

  runtime = "python3.8"
  timeout = 900
}
resource "aws_cloudwatch_log_group" "get_product" {
  name              = "/aws/lambda/${aws_lambda_function.get_product.function_name}"
  retention_in_days = 30
}
resource "aws_apigatewayv2_integration" "get_product_integration" {
  api_id             = aws_apigatewayv2_api.lambda.id
  integration_uri    = aws_lambda_function.get_product.invoke_arn
  integration_type   = "AWS_PROXY"
  integration_method = "POST"
}
resource "aws_apigatewayv2_route" "get_product_route" {
  api_id    = aws_apigatewayv2_api.lambda.id
  route_key = "GET /get_product"
  target    = "integrations/${aws_apigatewayv2_integration.get_product_integration.id}"
}
resource "aws_lambda_permission" "get_product_permission" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.get_product.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.lambda.execution_arn}/*/*"
}

# ========================= PUT /update_product ========================================
resource "aws_lambda_function" "update_product" {
  function_name    = "update_product"
  filename         = "../backend/update_product.zip"
  role             = aws_iam_role.super_lambda_role.arn
  handler          = "update_product.update_product.lambda_handler"
  #                   function name
  source_code_hash = filebase64sha256("../backend/update_product.zip")

  runtime = "python3.8"
  timeout = 900
}
resource "aws_cloudwatch_log_group" "update_product" {
  name              = "/aws/lambda/${aws_lambda_function.update_product.function_name}"
  retention_in_days = 30
}
resource "aws_apigatewayv2_integration" "update_product_integration" {
  api_id             = aws_apigatewayv2_api.lambda.id
  integration_uri    = aws_lambda_function.update_product.invoke_arn
  integration_type   = "AWS_PROXY"
  integration_method = "POST"
}
resource "aws_apigatewayv2_route" "update_product_route" {
  api_id    = aws_apigatewayv2_api.lambda.id
  route_key = "PUT /update_product"
  target    = "integrations/${aws_apigatewayv2_integration.update_product_integration.id}"
}
resource "aws_lambda_permission" "update_product_permission" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.update_product.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.lambda.execution_arn}/*/*"
}

# ========================= DELETE /delete_product ========================================
resource "aws_lambda_function" "delete_product" {
  function_name    = "delete_product"
  filename         = "../backend/delete_product.zip"
  role             = aws_iam_role.super_lambda_role.arn
  handler          = "delete_product.delete_product.lambda_handler"
  #                   function name
  source_code_hash = filebase64sha256("../backend/delete_product.zip")

  runtime = "python3.8"
  timeout = 900
}
resource "aws_cloudwatch_log_group" "delete_product" {
  name              = "/aws/lambda/${aws_lambda_function.delete_product.function_name}"
  retention_in_days = 30
}
resource "aws_apigatewayv2_integration" "delete_product_integration" {
  api_id             = aws_apigatewayv2_api.lambda.id
  integration_uri    = aws_lambda_function.delete_product.invoke_arn
  integration_type   = "AWS_PROXY"
  integration_method = "POST"
}
resource "aws_apigatewayv2_route" "delete_product_route" {
  api_id    = aws_apigatewayv2_api.lambda.id
  route_key = "DELETE /delete_product"
  target    = "integrations/${aws_apigatewayv2_integration.delete_product_integration.id}"
}
resource "aws_lambda_permission" "delete_product_permission" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.delete_product.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.lambda.execution_arn}/*/*"
}

# ========================= POST /create_review ========================================
resource "aws_lambda_function" "create_review" {
  function_name    = "create_review"
  filename         = "../backend/create_review.zip"
  role             = aws_iam_role.super_lambda_role.arn
  handler          = "create_review.create_review.lambda_handler"
  #                   function name
  source_code_hash = filebase64sha256("../backend/create_review.zip")

  runtime = "python3.8"
  timeout = 900
}
resource "aws_cloudwatch_log_group" "create_review" {
  name              = "/aws/lambda/${aws_lambda_function.create_review.function_name}"
  retention_in_days = 30
}
resource "aws_apigatewayv2_integration" "create_review_integration" {
  api_id             = aws_apigatewayv2_api.lambda.id
  integration_uri    = aws_lambda_function.create_review.invoke_arn
  integration_type   = "AWS_PROXY"
  integration_method = "POST"
}
resource "aws_apigatewayv2_route" "create_review_route" {
  api_id    = aws_apigatewayv2_api.lambda.id
  route_key = "POST /create_review"
  target    = "integrations/${aws_apigatewayv2_integration.create_review_integration.id}"
}
resource "aws_lambda_permission" "create_review_permission" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.create_review.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.lambda.execution_arn}/*/*"
}

# ========================= PUT /update_review ========================================
resource "aws_lambda_function" "update_review" {
  function_name    = "update_review"
  filename         = "../backend/update_review.zip"
  role             = aws_iam_role.super_lambda_role.arn
  handler          = "update_review.update_review.lambda_handler"
  #                   function name
  source_code_hash = filebase64sha256("../backend/update_review.zip")

  runtime = "python3.8"
  timeout = 900
}
resource "aws_cloudwatch_log_group" "update_review" {
  name              = "/aws/lambda/${aws_lambda_function.update_review.function_name}"
  retention_in_days = 30
}
resource "aws_apigatewayv2_integration" "update_review_integration" {
  api_id             = aws_apigatewayv2_api.lambda.id
  integration_uri    = aws_lambda_function.update_review.invoke_arn
  integration_type   = "AWS_PROXY"
  integration_method = "POST"
}
resource "aws_apigatewayv2_route" "update_review_route" {
  api_id    = aws_apigatewayv2_api.lambda.id
  route_key = "PUT /update_review"
  target    = "integrations/${aws_apigatewayv2_integration.update_review_integration.id}"
}
resource "aws_lambda_permission" "update_review_permission" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.update_review.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.lambda.execution_arn}/*/*"
}

# ========================= POST /create_order ========================================
resource "aws_lambda_function" "create_order" {
  function_name    = "create_order"
  filename         = "../backend/create_order.zip"
  role             = aws_iam_role.super_lambda_role.arn
  handler          = "create_order.create_order.lambda_handler"
  #                   function name
  source_code_hash = filebase64sha256("../backend/create_order.zip")

  runtime = "python3.8"
  timeout = 900
}
resource "aws_cloudwatch_log_group" "create_order" {
  name              = "/aws/lambda/${aws_lambda_function.create_order.function_name}"
  retention_in_days = 30
}
resource "aws_apigatewayv2_integration" "create_order_integration" {
  api_id             = aws_apigatewayv2_api.lambda.id
  integration_uri    = aws_lambda_function.create_order.invoke_arn
  integration_type   = "AWS_PROXY"
  integration_method = "POST"
}
resource "aws_apigatewayv2_route" "create_order_route" {
  api_id    = aws_apigatewayv2_api.lambda.id
  route_key = "POST /create_order"
  target    = "integrations/${aws_apigatewayv2_integration.create_order_integration.id}"
}
resource "aws_lambda_permission" "create_order_permission" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.create_order.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.lambda.execution_arn}/*/*"
}

# ========================= DELETE /delete_order ========================================
resource "aws_lambda_function" "delete_order" {
  function_name    = "delete_order"
  filename         = "../backend/delete_order.zip"
  role             = aws_iam_role.super_lambda_role.arn
  handler          = "delete_order.delete_order.lambda_handler"
  #                   function name
  source_code_hash = filebase64sha256("../backend/delete_order.zip")

  runtime = "python3.8"
  timeout = 900
}
resource "aws_cloudwatch_log_group" "delete_order" {
  name              = "/aws/lambda/${aws_lambda_function.delete_order.function_name}"
  retention_in_days = 30
}
resource "aws_apigatewayv2_integration" "delete_order_integration" {
  api_id             = aws_apigatewayv2_api.lambda.id
  integration_uri    = aws_lambda_function.delete_order.invoke_arn
  integration_type   = "AWS_PROXY"
  integration_method = "POST"
}
resource "aws_apigatewayv2_route" "delete_order_route" {
  api_id    = aws_apigatewayv2_api.lambda.id
  route_key = "DELETE /delete_order"
  target    = "integrations/${aws_apigatewayv2_integration.delete_order_integration.id}"
}
resource "aws_lambda_permission" "delete_order_permission" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.delete_order.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.lambda.execution_arn}/*/*"
}

# ========================= POST /create_listing ========================================
resource "aws_lambda_function" "create_listing" {
  function_name    = "create_listing"
  filename         = "../backend/create_listing.zip"
  role             = aws_iam_role.super_lambda_role.arn
  handler          = "create_listing.create_listing.lambda_handler"
  #                   function name
  source_code_hash = filebase64sha256("../backend/create_listing.zip")

  runtime = "python3.8"
  timeout = 900
}
resource "aws_cloudwatch_log_group" "create_listing" {
  name              = "/aws/lambda/${aws_lambda_function.create_listing.function_name}"
  retention_in_days = 30
}
resource "aws_apigatewayv2_integration" "create_listing_integration" {
  api_id             = aws_apigatewayv2_api.lambda.id
  integration_uri    = aws_lambda_function.create_listing.invoke_arn
  integration_type   = "AWS_PROXY"
  integration_method = "POST"
}
resource "aws_apigatewayv2_route" "create_listing_route" {
  api_id    = aws_apigatewayv2_api.lambda.id
  route_key = "POST /create_listing"
  target    = "integrations/${aws_apigatewayv2_integration.create_listing_integration.id}"
}
resource "aws_lambda_permission" "create_listing_permission" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.create_listing.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.lambda.execution_arn}/*/*"
}
# ========================= DELETE /delete_listing ========================================
resource "aws_lambda_function" "delete_listing" {
  function_name    = "delete_listing"
  filename         = "../backend/delete_listing.zip"
  role             = aws_iam_role.super_lambda_role.arn
  handler          = "delete_listing.delete_listing.lambda_handler"
  #                   function name
  source_code_hash = filebase64sha256("../backend/delete_listing.zip")

  runtime = "python3.8"
  timeout = 900
}
resource "aws_cloudwatch_log_group" "delete_listing" {
  name              = "/aws/lambda/${aws_lambda_function.delete_listing.function_name}"
  retention_in_days = 30
}
resource "aws_apigatewayv2_integration" "delete_listing_integration" {
  api_id             = aws_apigatewayv2_api.lambda.id
  integration_uri    = aws_lambda_function.delete_listing.invoke_arn
  integration_type   = "AWS_PROXY"
  integration_method = "POST"
}
resource "aws_apigatewayv2_route" "delete_listing_route" {
  api_id    = aws_apigatewayv2_api.lambda.id
  route_key = "DELETE /delete_listing"
  target    = "integrations/${aws_apigatewayv2_integration.delete_listing_integration.id}"
}
resource "aws_lambda_permission" "delete_listing_permission" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.delete_listing.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.lambda.execution_arn}/*/*"
}

# ========================= DELETE /delete_review ========================================
resource "aws_lambda_function" "delete_review" {
  function_name    = "delete_review"
  filename         = "../backend/delete_review.zip"
  role             = aws_iam_role.super_lambda_role.arn
  handler          = "delete_review.delete_review.lambda_handler"
  #                   function name
  source_code_hash = filebase64sha256("../backend/delete_review.zip")

  runtime = "python3.8"
  timeout = 900
}
resource "aws_cloudwatch_log_group" "delete_review" {
  name              = "/aws/lambda/${aws_lambda_function.delete_review.function_name}"
  retention_in_days = 30
}
resource "aws_apigatewayv2_integration" "delete_review_integration" {
  api_id             = aws_apigatewayv2_api.lambda.id
  integration_uri    = aws_lambda_function.delete_review.invoke_arn
  integration_type   = "AWS_PROXY"
  integration_method = "POST"
}
resource "aws_apigatewayv2_route" "delete_review_route" {
  api_id    = aws_apigatewayv2_api.lambda.id
  route_key = "DELETE /delete_review"
  target    = "integrations/${aws_apigatewayv2_integration.delete_review_integration.id}"
}
resource "aws_lambda_permission" "delete_review_permission" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.delete_review.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.lambda.execution_arn}/*/*"
}

# ========================= GET /get_reviews_for_listing ========================================
resource "aws_lambda_function" "get_reviews_for_listing" {
  function_name    = "get_reviews_for_listing"
  filename         = "../backend/get_reviews_for_listing.zip"
  role             = aws_iam_role.super_lambda_role.arn
  handler          = "get_reviews_for_listing.get_reviews_for_listing.lambda_handler"
  #                   function name
  source_code_hash = filebase64sha256("../backend/get_reviews_for_listing.zip")

  runtime = "python3.8"
  timeout = 900
}
resource "aws_cloudwatch_log_group" "get_reviews_for_listing" {
  name              = "/aws/lambda/${aws_lambda_function.get_reviews_for_listing.function_name}"
  retention_in_days = 30
}
resource "aws_apigatewayv2_integration" "get_reviews_for_listing_integration" {
  api_id             = aws_apigatewayv2_api.lambda.id
  integration_uri    = aws_lambda_function.get_reviews_for_listing.invoke_arn
  integration_type   = "AWS_PROXY"
  integration_method = "POST"
}
resource "aws_apigatewayv2_route" "get_reviews_for_listing_route" {
  api_id    = aws_apigatewayv2_api.lambda.id
  route_key = "GET /get_reviews_for_listing"
  target    = "integrations/${aws_apigatewayv2_integration.get_reviews_for_listing_integration.id}"
}
resource "aws_lambda_permission" "get_reviews_for_listing_permission" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.get_reviews_for_listing.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.lambda.execution_arn}/*/*"
}

# ========================= GET /get_listing ========================================
resource "aws_lambda_function" "get_listing" {
  function_name    = "get_listing"
  filename         = "../backend/get_listing.zip"
  role             = aws_iam_role.super_lambda_role.arn
  handler          = "get_listing.get_listing.lambda_handler"
  #                   function name
  source_code_hash = filebase64sha256("../backend/get_listing.zip")

  runtime = "python3.8"
  timeout = 900
}
resource "aws_cloudwatch_log_group" "get_listing" {
  name              = "/aws/lambda/${aws_lambda_function.get_listing.function_name}"
  retention_in_days = 30
}
resource "aws_apigatewayv2_integration" "get_listing_integration" {
  api_id             = aws_apigatewayv2_api.lambda.id
  integration_uri    = aws_lambda_function.get_listing.invoke_arn
  integration_type   = "AWS_PROXY"
  integration_method = "POST"
}
resource "aws_apigatewayv2_route" "get_listing_route" {
  api_id    = aws_apigatewayv2_api.lambda.id
  route_key = "GET /get_listing"
  target    = "integrations/${aws_apigatewayv2_integration.get_listing_integration.id}"
}
resource "aws_lambda_permission" "get_listing_permission" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.get_listing.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.lambda.execution_arn}/*/*"
}

# ========================= PUT /update_listing ========================================
resource "aws_lambda_function" "update_listing" {
  function_name    = "update_listing"
  filename         = "../backend/update_listing.zip"
  role             = aws_iam_role.super_lambda_role.arn
  handler          = "update_listing.update_listing.lambda_handler"
  #                   function name
  source_code_hash = filebase64sha256("../backend/update_listing.zip")

  runtime = "python3.8"
  timeout = 900
}
resource "aws_cloudwatch_log_group" "update_listing" {
  name              = "/aws/lambda/${aws_lambda_function.update_listing.function_name}"
  retention_in_days = 30
}
resource "aws_apigatewayv2_integration" "update_listing_integration" {
  api_id             = aws_apigatewayv2_api.lambda.id
  integration_uri    = aws_lambda_function.update_listing.invoke_arn
  integration_type   = "AWS_PROXY"
  integration_method = "POST"
}
resource "aws_apigatewayv2_route" "update_listing_route" {
  api_id    = aws_apigatewayv2_api.lambda.id
  route_key = "PUT /update_listing"
  target    = "integrations/${aws_apigatewayv2_integration.update_listing_integration.id}"
}
resource "aws_lambda_permission" "update_listing_permission" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.update_listing.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.lambda.execution_arn}/*/*"
}


# ========================= GET /get_orders_of_supplier ========================================
resource "aws_lambda_function" "get_orders_of_supplier" {
  function_name    = "get_orders_of_supplier"
  filename         = "../backend/get_orders_of_supplier.zip"
  role             = aws_iam_role.super_lambda_role.arn
  handler          = "get_orders_of_supplier.get_orders_of_supplier.lambda_handler"
  #                   function name
  source_code_hash = filebase64sha256("../backend/get_orders_of_supplier.zip")

  runtime = "python3.8"
  timeout = 900
}
resource "aws_cloudwatch_log_group" "get_orders_of_supplier" {
  name              = "/aws/lambda/${aws_lambda_function.get_orders_of_supplier.function_name}"
  retention_in_days = 30
}
resource "aws_apigatewayv2_integration" "get_orders_of_supplier_integration" {
  api_id             = aws_apigatewayv2_api.lambda.id
  integration_uri    = aws_lambda_function.get_orders_of_supplier.invoke_arn
  integration_type   = "AWS_PROXY"
  integration_method = "POST"
}
resource "aws_apigatewayv2_route" "get_orders_of_supplier_route" {
  api_id    = aws_apigatewayv2_api.lambda.id
  route_key = "GET /get_orders_of_supplier"
  target    = "integrations/${aws_apigatewayv2_integration.get_orders_of_supplier_integration.id}"
}
resource "aws_lambda_permission" "get_orders_of_supplier_permission" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.get_orders_of_supplier.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.lambda.execution_arn}/*/*"
}

# ========================= GET /get_affiliates_under_supplier ========================================
resource "aws_lambda_function" "get_affiliates_under_supplier" {
  function_name    = "get_affiliates_under_supplier"
  filename         = "../backend/get_affiliates_under_supplier.zip"
  role             = aws_iam_role.super_lambda_role.arn
  handler          = "get_affiliates_under_supplier.get_affiliates_under_supplier.lambda_handler"
  #                   function name
  source_code_hash = filebase64sha256("../backend/get_affiliates_under_supplier.zip")

  runtime = "python3.8"
  timeout = 900
}
resource "aws_cloudwatch_log_group" "get_affiliates_under_supplier" {
  name              = "/aws/lambda/${aws_lambda_function.get_affiliates_under_supplier.function_name}"
  retention_in_days = 30
}
resource "aws_apigatewayv2_integration" "get_affiliates_under_supplier_integration" {
  api_id             = aws_apigatewayv2_api.lambda.id
  integration_uri    = aws_lambda_function.get_affiliates_under_supplier.invoke_arn
  integration_type   = "AWS_PROXY"
  integration_method = "POST"
}
resource "aws_apigatewayv2_route" "get_affiliates_under_supplier_route" {
  api_id    = aws_apigatewayv2_api.lambda.id
  route_key = "GET /get_affiliates_under_supplier"
  target    = "integrations/${aws_apigatewayv2_integration.get_affiliates_under_supplier_integration.id}"
}
resource "aws_lambda_permission" "get_affiliates_under_supplier_permission" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.get_affiliates_under_supplier.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.lambda.execution_arn}/*/*"
}

# ========================= GET /get_products_by_supplier ========================================
resource "aws_lambda_function" "get_products_by_supplier" {
  function_name    = "get_products_by_supplier"
  filename         = "../backend/get_products_by_supplier.zip"
  role             = aws_iam_role.super_lambda_role.arn
  handler          = "get_products_by_supplier.get_products_by_supplier.lambda_handler"
  #                   function name
  source_code_hash = filebase64sha256("../backend/get_products_by_supplier.zip")

  runtime = "python3.8"
  timeout = 900
}
resource "aws_cloudwatch_log_group" "get_products_by_supplier" {
  name              = "/aws/lambda/${aws_lambda_function.get_products_by_supplier.function_name}"
  retention_in_days = 30
}
resource "aws_apigatewayv2_integration" "get_products_by_supplier_integration" {
  api_id             = aws_apigatewayv2_api.lambda.id
  integration_uri    = aws_lambda_function.get_products_by_supplier.invoke_arn
  integration_type   = "AWS_PROXY"
  integration_method = "POST"
}
resource "aws_apigatewayv2_route" "get_products_by_supplier_route" {
  api_id    = aws_apigatewayv2_api.lambda.id
  route_key = "GET /get_products_by_supplier"
  target    = "integrations/${aws_apigatewayv2_integration.get_products_by_supplier_integration.id}"
}
resource "aws_lambda_permission" "get_products_by_supplier_permission" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.get_products_by_supplier.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.lambda.execution_arn}/*/*"
}

# ========================= GET /get_all_tiktokers ========================================
resource "aws_lambda_function" "get_all_tiktokers" {
  function_name    = "get_all_tiktokers"
  filename         = "../backend/get_all_tiktokers.zip"
  role             = aws_iam_role.super_lambda_role.arn
  handler          = "get_all_tiktokers.get_all_tiktokers.lambda_handler"
  #                   function name
  source_code_hash = filebase64sha256("../backend/get_all_tiktokers.zip")

  runtime = "python3.8"
  timeout = 900
}
resource "aws_cloudwatch_log_group" "get_all_tiktokers" {
  name              = "/aws/lambda/${aws_lambda_function.get_all_tiktokers.function_name}"
  retention_in_days = 30
}
resource "aws_apigatewayv2_integration" "get_all_tiktokers_integration" {
  api_id             = aws_apigatewayv2_api.lambda.id
  integration_uri    = aws_lambda_function.get_all_tiktokers.invoke_arn
  integration_type   = "AWS_PROXY"
  integration_method = "POST"
}
resource "aws_apigatewayv2_route" "get_all_tiktokers_route" {
  api_id    = aws_apigatewayv2_api.lambda.id
  route_key = "GET /get_all_tiktokers"
  target    = "integrations/${aws_apigatewayv2_integration.get_all_tiktokers_integration.id}"
}
resource "aws_lambda_permission" "get_all_tiktokers_permission" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.get_all_tiktokers.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.lambda.execution_arn}/*/*"
}