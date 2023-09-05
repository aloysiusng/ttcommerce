terraform{
  required_providers{
    aws = {
      source = "hashicorp/aws"
      version = "~> 3.0"
    }
  }
  backend "s3" {
    bucket = ""
    key    = "terraform.tfstate"
    region = "ap-southeast-1"
  }
}