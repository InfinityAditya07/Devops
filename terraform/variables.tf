variable "aws_region" {
  description = "AWS region to deploy to"
  type        = string
  default     = "us-east-1"
}

variable "project_name" {
  description = "Name of the project"
  type        = string
  default     = "shopsmart"
}

variable "app_port" {
  description = "Port the container exposes"
  type        = number
  default     = 5001
}
