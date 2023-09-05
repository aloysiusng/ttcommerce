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
