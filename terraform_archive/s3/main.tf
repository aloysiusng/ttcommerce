# images bucket
resource "aws_s3_bucket" "images_bucket" {
  bucket = var.images_bucket_name
}
resource "aws_s3_bucket_acl" "images_bucket_acl" {
  bucket = var.images_bucket_name
  acl    = "private"
}

resource "aws_s3_bucket_public_access_block" "images_bucket_public_access_block" {
  bucket = var.images_bucket_name
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}
output "images_bucket_arn" {
  value = aws_s3_bucket.images_bucket.arn
}

# lambda bucket
resource "aws_s3_bucket" "lambda_bucket" {
  bucket = var.lambda_bucket_name
}

resource "aws_s3_bucket_acl" "lambda_bucket_acl" {
  bucket = var.lambda_bucket_name
  acl    = "private"
}

resource "aws_s3_bucket_public_access_block" "lambda_bucket_public_access_block" {
  bucket = var.lambda_bucket_name
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}
output "lambda_bucket_id" {
  value = aws_s3_bucket.lambda_bucket.id
}