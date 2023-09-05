resource "aws_lambda_function" "test" {
  filename         = "../../backend/test/test.zip"
  function_name    = "test"
  role             = aws_iam_role.lambda_role.arn
  handler          = "test.lambda_handler"
  source_code_hash = filebase64sha256("../../backend/test.zip")
  runtime          = "python3.8"
  timeout          = 900
}



