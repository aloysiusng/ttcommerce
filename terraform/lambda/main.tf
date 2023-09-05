# IAM Policies ====================================================================================
# Super Lambda Role with both dydb and s3 access
resource "aws_iam_role" "super_lambda_role" {
  name = "super_lambda_role"
  assume_role_policy =  var.assume_role_policy
}
# for more fine grained poicies ========================================
# resource "aws_iam_role" "s3_lambda_role" {
#   name = "s3_lambda_role"
#   assume_role_policy = var.assume_role_policy
# }
# resource "aws_iam_role" "dydb_lambda_role" {
#   name = "dydb_lambda_role"
#   assume_role_policy = var.assume_role_policy
# }

# ALL DynamoDB access
data "aws_iam_policy_document" "dynamodb_policy" {
  statement {
    actions   = ["dynamodb:PutItem", "dynamodb:GetItem", "dynamodb:Scan", "dynamodb:Query"]
    resources = [aws_dynamodb_table.product_table.arn, aws_dynamodb_table.suppliers_table.arn, aws_dynamodb_table.tiktokers_table.arn, aws_dynamodb_table.listings_table.arn, aws_dynamodb_table.orders_table.arn, aws_dynamodb_table.reviews_table]
  }
}

resource "aws_iam_policy" "dynamodb_access" {
  name        = "dynamodb-access-policy"
  description = "Policy for DynamoDB access"
  policy      = data.aws_iam_policy_document.dynamodb_policy.json
}

resource "aws_iam_policy_attachment" "dynamodb_attachment" {
  name       = "dynamodb-attachment"
  roles      = [aws_iam_role.super_lambda_role.name]
  policy_arn = aws_iam_policy.dynamodb_access.arn
}

# S3 access
data "aws_iam_policy_document" "s3_policy" {
  statement {
    actions   = ["s3:PutObject", "s3:GetObject"]
    resources = [aws_s3_bucket.images_bucket.arn]
  }
}

resource "aws_iam_policy" "s3_access" {
  name        = "s3-access-policy"
  description = "Policy for S3 access"
  policy      = data.aws_iam_policy_document.s3_policy.json
}

resource "aws_iam_policy_attachment" "s3_attachment" {
  name       = "s3-attachment"
  roles      = [aws_iam_role.super_lambda_role.name]
  policy_arn = aws_iam_policy.s3_access.arn
}

