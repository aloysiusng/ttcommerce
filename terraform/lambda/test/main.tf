data "archive_file" "test" {
  type        = "zip"
  source_dir  = "../../backend/test"
  output_path = "../../backend/test/test.zip"
}

resource "aws_s3_object" "lambda_test" {
  bucket = aws_s3_bucket.lambda_bucket.id
  key    = "test/test.zip"
  source = data.archive_file.test.output_path
  etag   = filemd5(data.archive_file.test.output_path)

}

resource "aws_lambda_function" "lambda_test" {
  function_name    = "test"

  s3_bucket        = aws_s3_bucket.lambda_bucket.id
  s3_key           = aws_s3_object.test.id

  role             = aws_iam_role.super_lambda_role.arn
  handler          = "test.lambda_handler"
  source_code_hash = data.archive_file.lambda_test.output_base64sha256
  runtime          = "python3.8"
  timeout          = 900
}

resource "aws_cloudwatch_log_group" "test" {
  name = "/aws/lambda/${aws_lambda_function.test.function_name}"
  retention_in_days = 30
}

