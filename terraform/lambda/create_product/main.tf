resource "aws_lambda_function" "create_product" {
  filename         = "../backend/create_product/create_product.zip"
  function_name    = "create_product"
  role             = aws_iam_role.lambda_role.arn
  handler          = "test.lambda_handler"
  source_code_hash = filebase64sha256("../backend/create_product.zip")
  runtime          = "python3.8"
  timeout          = 900
}
