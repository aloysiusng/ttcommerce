variable "apigw_name" {
  description = "Name of the API Gateway"
  type        = string
  default     = "main_api_gw"
}

variable "images_bucket_name" {
  type    = string
  default = "images-bucket-13812931"
}

variable "lambda_bucket_name" {
  type    = string
  default = "lambda-bucket-13812931"
}
#  used for Lambda roles
variable "assume_role_policy" {
  description = "IAM assume role policy"
  type        = string
}