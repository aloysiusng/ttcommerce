# API gateway creation
resource "aws_api_gateway_rest_api" "main_api_gw" {
  name        = var.apigw_name
  description = "Main API Gateway"
}

output "api_gateway_url" {
  value = aws_api_gateway_rest_api.main_api_gw.id
}

# Routes
resource "aws_api_gateway_resource" "lambda_resource" {
  rest_api_id = aws_api_gateway_rest_api.main_api_gw.id
  parent_id   = aws_api_gateway_rest_api.main_api_gw.root_resource_id
  path_part   = "lambda"
}

resource "aws_api_gateway_method" "lambda_method" {
  rest_api_id   = aws_api_gateway_rest_api.example_api.id
  resource_id   = aws_api_gateway_resource.lambda_resource.id
  http_method   = "POST"  # Adjust this to match your desired HTTP method
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "lambda_integration" {
  rest_api_id             = aws_api_gateway_rest_api.example_api.id
  resource_id             = aws_api_gateway_resource.lambda_resource.id
  http_method             = aws_api_gateway_method.lambda_method.http_method
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.example_lambda.invoke_arn
}
