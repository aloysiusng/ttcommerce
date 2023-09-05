resource "aws_dynamodb_table" "products" {
  name         = "Products"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "product_id"
  attribute {
    name = "product_id"
    type = "S"
  }
  attribute {
    name = "productname"
    type = "S"
  }
  attribute {
    name = "supplier_price"
    type = "N"
  }
  attribute {
    name = "description"
    type = "S"
  }
  attribute {
    name = "quantity"
    type = "N"
  }
  attribute {
    name = "supplier_id"
    type = "S"
  }
  attribute {
    name = "imageurl"
    type = "S"
  }
}

resource "aws_dynamodb_table" "suppliers" {
  name         = "Suppliers"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "supplier_id"
  attribute {
    name = "supplier_id"
    type = "S"
  }
  attribute {
    name = "tiktokers"
    type = "M"
  }
  attribute {
    name = "products"
    type = "M"
  }
}

resource "aws_dynamodb_table" "tiktokers" {
  name         = "Tiktokers"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "tiktoker_id"
  attribute {
    name = "tiktoker_id"
    type = "S"
  }
  attribute {
    name = "suppliers"
    type = "M"
  }
  attribute {
    name = "listings"
    type = "M"
}

resource "aws_dynamodb_table" "listings" {
  name         = "Listings"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "listing_id"
  attribute {
    name = "listing_id"
    type = "S"
  }
  attribute {
    name = "tiktoker_id"
    type = "S"
  }
  attribute {
    name = "product_id"
    type = "S"
  }
  attribute {
    name = "listing_price"
    type = "N"
  }
  attribute {
    name = "reviews"
    type = "M"
  }
}

resource "aws_dynamodb_table" "orders" {
  name         = "Orders"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "order_id"
  attribute {
    name = "order_id"
    type = "S"
  }
  attribute {
    name = "product_id"
    type = "S"
  }
  attribute {
    name = "quantity"
    type = "N"
  }

}
resource "aws_dynamodb_table" "reviews" {
  name         = "Reviews"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "review_id"

  attribute {
    name = "review_id"
    type = "S"
  }
  attribute {
    name = "listing_id"
    type = "S"
  }
  attribute {
    name = "review_content"
    type = "S"
  }
  attribute {
    name = "rating"
    type = "N"
  }
  attribute {
    name = "imageurl"
    type = "S"
  }


}