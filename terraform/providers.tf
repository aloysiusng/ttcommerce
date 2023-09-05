terraform{
  required_providers{
    aws = {
      source = "hashicorp/aws"
      version = "~> 3.0"
    }
  }
  #  injected from github actions
  backend "s3" {
    bucket = ""
    key    = ""
    region = ""
  }
}