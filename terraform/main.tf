resource "aws_lambda_function" "lambda_function" {
  filename         = "../backend/test.zip"
  function_name    = "test"
  role             = aws_iam_role.lambda_role.arn
  handler          = "test.lambda_handler"
  source_code_hash = filebase64sha256("../backend/test.zip")
  runtime          = "python3.8"
  timeout          = 900
}


resource "aws_iam_role" "lambda_role" {
  name = "lambda-role"
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