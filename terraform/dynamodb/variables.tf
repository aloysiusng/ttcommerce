# ==============Products====================================
variable "product_table_name" {
  description = "Name of the Products table"
  default     = "Products"
}
variable "product_attributes" {
  description = "Attributes for the Products table"
  type        = map(any)
  default = {
    product_id    = "S"
    product_name   = "S"
    supplier_price = "N"
    description   = "S"
    quantity      = "N"
    supplier_iD    = "S"
    image_url      = "S"
  }
}
# ==============Suppliers====================================
variable "suppliers_table_name" {
  description = "Name of the Suppliers table"
  default     = "Suppliers"
}
variable "supplier_attributes" {
  description = "Attributes for the Suppliers table"
  type        = map(any)
  default = {
    supplier_id = "S"
    tiktokers   = "M"
    products    = "M"
  }
}
# ==============Tiktokers====================================
variable "tiktokers_table_name" {
  description = "Name of the Tiktokers table"
  default     = "Tiktokers"
}
variable "tiktokers_attributes" {
  description = "Attributes for the Tiktokers table"
  type        = map(any)
  default = {
    id        = "S"
    suppliers = "M"
    listings  = "M"
  }
}
# ==============Listings====================================
variable "listings_table_name" {
  description = "Name of the Listings table"
  default     = "Listings"
}

variable "listings_attributes" {
  description = "Attributes for the Listings table"
  type        = map(any)
  default = {
    listing_id   = "S"
    tiktoker_id   = "S"
    product_id    = "S"
    listing_price = "N"
    reviews      = "M"
  }
}

# ==============Orders====================================
variable "orders_table_name" {
  description = "Name of the Orders table"
  default     = "Orders"
}

variable "orders_attributes" {
  description = "Attributes for the Orders table"
  type        = map(any)
  default = {
    order_id  = "S"
    product_id = "S"
    quantity  = "N"
  }
}

# ==============Reviews====================================
variable "reviews_table_name" {
  description = "Name of the Reviews table"
  default     = "Reviews"
}

variable "reviews_attributes" {
  description = "Attributes for the Reviews table"
  type        = map(any)
  default = {
    review_id     = "S"
    listing_id     = "S"
    review_id = "S"
    rating        = "N"
    image_url      = "S"
  }
}
