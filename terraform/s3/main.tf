resource "aws_s3_bucket" "images_bucket" {
  bucket = "images_bucket"
  acl    = "private"
}