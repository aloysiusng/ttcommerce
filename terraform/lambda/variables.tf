#  used for Lambda roles
variable "assume_role_policy" {
  description = "IAM assume role policy"
  type        = string
  default = jsonencode({
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