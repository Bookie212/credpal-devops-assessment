variable "aws_region" {
  description = "AWS region to deploy resources"
  type        = string
  default     = "us-east-1"
}

variable "app_name" {
  description = "Application name used for tagging resources"
  type        = string
  default     = "credpal-app"
}

variable "instance_type" {
  description = "EC2 instance type"
  type        = string
  default     = "t2.micro"
}

variable "domain_name" {
  description = "Domain name for SSL certificate"
  type        = string
}

variable "docker_image" {
  description = "Docker image to pull and run on EC2"
  type        = string
}