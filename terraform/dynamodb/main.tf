resource "aws_dynamodb_table" "products" {
  name         = var.product_table_name
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "product_id"
  attribute = [
    for key, type in var.product_attributes :
    {
      name = key
      type = type
    }
  ]
}

resource "aws_dynamodb_table" "suppliers" {
  name         = var.suppliers_table_name
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "supplier_id"
  attribute = [
    for key, type in var.supplier_attributes :
    {
      name = key
      type = type
    }
  ]
}

resource "aws_dynamodb_table" "tiktokers" {
  name         = var.tiktokers_table_name
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "tiktoker_id"
  attribute = [
    for key, type in var.tiktokers_attributes :
    {
      name = key
      type = type
    }
  ]
}

resource "aws_dynamodb_table" "listings" {
  name         = var.listings_table_name
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "listing_id"
  attribute = [
    for key, type in var.listings_attributes :
    {
      name = key
      type = type
    }
  ]
}

resource "aws_dynamodb_table" "orders" {
  name         = var.orders_table_name
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "order_id"
  attribute = [
    for key, type in var.orders_attributes :
    {
      name = key
      type = type
    }
  ]
}

resource "aws_dynamodb_table" "reviews" {
  name         = var.reviews_table_name
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "review_id"

  attribute = [
    for key, type in var.reviews_attributes :
    {
      name = key
      type = type
    }
  ]
}