resource "aws_s3_bucket" "images_bucket" {
  bucket = var.images_bucket
  acl    = "private"
}
resource "aws_s3_bucket_acl" "images_bucket_acl" {
  bucket = var.images_bucket
  acl    = "private"
}
