output "api_id" {
  description = "ID of the created API Gateway"
  value       = aws_api_gateway_rest_api.main_api_gw.id
}