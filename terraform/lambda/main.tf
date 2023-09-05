# IAM Policies ====================================================================================
# Super Lambda Role with both dydb and s3 access
resource "aws_iam_role" "super_lambda_role" {
  name               = "super_lambda_role"
  assume_role_policy = var.assume_role_policy
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
    actions = ["dynamodb:PutItem", "dynamodb:GetItem", "dynamodb:Scan", "dynamodb:Query"]
    resources = [
      module.dynamodb_module.product_table_arn,
      module.dynamodb_module.suppliers_table_arn,
      module.dynamodb_module.tiktokers_table_arn,
      module.dynamodb_module.listings_table_arn,
      module.dynamodb_module.orders_table_arn,
      module.dynamodb_module.reviews_table_arn
    ]
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
    resources = [module.s3_module.images_bucket_arn]
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

output "super_lambda_role_arn" {
  value = aws_iam_role.super_lambda_role.name
}