module "api_gateway_module" {
  source     = "./apigw"
  apigw_name = "example" # Provide a value for the apigw_name variable
}

module "dynamodb_tables" {
  source = "./dynamodb"

  product_table_name   = var.product_table_name
  product_attributes   = var.product_attributes
  suppliers_table_name = var.suppliers_table_name
  supplier_attributes  = var.supplier_attributes
  tiktokers_table_name = var.tiktokers_table_name
  tiktokers_attributes = var.tiktokers_attributes
  listings_table_name  = var.listings_table_name
  listings_attributes  = var.listings_attributes
  orders_table_name    = var.orders_table_name
  orders_attributes    = var.orders_attributes
  reviews_table_name   = var.reviews_table_name
  reviews_attributes   = var.reviews_attributes
}

module "images_bucket" {
  source = "./s3"
}

module "lambda_module" {
  source             = "./lambda"
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

module "test" {
  source = "./lambda/test"
}

# 1. Create a resource for the API Gateway
# resource "aws_api_gateway_resource" "test" {
#   rest_api_id = module.api_gateway_module.api_id
#   parent_id   = module.api_gateway_module.root_resource_id
#   path_part   = "test"
# }
# # 2. Create a method for the API Gateway
# resource "aws_api_gateway_method" "test_get" {
#   rest_api_id = module.api_gateway_module.api_id
#   resource_id = aws_api_gateway_resource.test.id
#   http_method = "GET"
# }
# # 3. Create an integration for the API Gateway
# resource "aws_api_gateway_integration" "test_get_integration" {
#   rest_api_id             = module.api_gateway_module.api_id
#   resource_id             = aws_api_gateway_resource.test.id
#   http_method             = aws_api_gateway_method.test_get.http_method
#   integration_http_method = "GET"
#   type                    = "AWS_PROXY"
#   uri                     = module.test.lambda_arn
# }

# example for test_post
# resource "aws_api_gateway_method" "test_post" {
#   rest_api_id = module.api_gateway_module.api_id
#   resource_id = aws_api_gateway_resource.test.id
#   http_method = "POST"
# }

# resource "aws_api_gateway_integration" "test_post_integration" {
#   rest_api_id             = module.api_gateway_module.api_id
#   resource_id             = aws_api_gateway_resource.test.id
#   http_method             = aws_api_gateway_method.test_post.http_method
#   integration_http_method = "POST"
#   type                    = "AWS_PROXY"
#   uri                     = module.test.lambda_arn
# }
