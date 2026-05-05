terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  # Remote backend: stores state in S3 so resources aren't recreated on every run
  # ACTION REQUIRED: Create this bucket ONCE manually in AWS Console before first run
  backend "s3" {
    bucket = "shopsmart-terraform-state"   # ← change to your state bucket name
    key    = "devops/terraform.tfstate"
    region = "us-east-1"                  # ← change to your AWS region
  }
}

provider "aws" {
  region = var.aws_region
}

# ---------------------------------------------------------
# S3 Bucket Configuration (Phase 2 Rubrics)
# ---------------------------------------------------------

resource "random_id" "bucket_id" {
  byte_length = 4
}

resource "aws_s3_bucket" "app_bucket" {
  # 1. Unique bucket name
  bucket = "${var.project_name}-assets-${random_id.bucket_id.hex}"
}

# 2. Versioning enabled
resource "aws_s3_bucket_versioning" "app_bucket_versioning" {
  bucket = aws_s3_bucket.app_bucket.id
  versioning_configuration {
    status = "Enabled"
  }
}

# 3. Encryption enabled
resource "aws_s3_bucket_server_side_encryption_configuration" "app_bucket_encryption" {
  bucket = aws_s3_bucket.app_bucket.id
  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

# 4. Public access blocked
resource "aws_s3_bucket_public_access_block" "app_bucket_public_access_block" {
  bucket                  = aws_s3_bucket.app_bucket.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# ---------------------------------------------------------
# ECR Repository (Phase 3 Rubrics)
# ---------------------------------------------------------
resource "aws_ecr_repository" "app_repo" {
  name                 = "${var.project_name}-backend"
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }
}

# ---------------------------------------------------------
# VPC and Networking for ECS
# ---------------------------------------------------------
# Using the default VPC for simplicity
data "aws_vpc" "default" {
  default = true
}

data "aws_subnets" "default" {
  filter {
    name   = "vpc-id"
    values = [data.aws_vpc.default.id]
  }
}

# Security Group for the ALB — allows HTTP from the internet
resource "aws_security_group" "alb_sg" {
  name        = "${var.project_name}-alb-sg"
  description = "Allow HTTP inbound to ALB"
  vpc_id      = data.aws_vpc.default.id

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# Security Group for ECS tasks — only accepts traffic from the ALB
resource "aws_security_group" "ecs_sg" {
  name        = "${var.project_name}-ecs-sg"
  description = "Allow port 5001 inbound from ALB only"
  vpc_id      = data.aws_vpc.default.id

  ingress {
    from_port       = var.app_port
    to_port         = var.app_port
    protocol        = "tcp"
    security_groups = [aws_security_group.alb_sg.id]  # only ALB can reach containers
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# ---------------------------------------------------------
# Application Load Balancer (ALB)
# ---------------------------------------------------------

resource "aws_lb" "app_alb" {
  name               = "${var.project_name}-alb"
  internal           = false          # internet-facing
  load_balancer_type = "application"
  security_groups    = [aws_security_group.alb_sg.id]
  subnets            = data.aws_subnets.default.ids
}

# Target Group — where ALB forwards traffic to (ECS containers)
resource "aws_lb_target_group" "app_tg" {
  name        = "${var.project_name}-tg"
  port        = var.app_port
  protocol    = "HTTP"
  vpc_id      = data.aws_vpc.default.id
  target_type = "ip"   # required for Fargate awsvpc networking

  health_check {
    path                = "/api/health"   # your existing health check endpoint
    interval            = 30
    timeout             = 5
    healthy_threshold   = 2
    unhealthy_threshold = 3
    matcher             = "200"
  }
}

# Listener — ALB listens on port 80 and forwards to target group
resource "aws_lb_listener" "app_listener" {
  load_balancer_arn = aws_lb.app_alb.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.app_tg.arn
  }
}

# ---------------------------------------------------------
# ECS Cluster, Task Definition, and Service
# ---------------------------------------------------------

resource "aws_ecs_cluster" "app_cluster" {
  name = "${var.project_name}-cluster"
}

# Use the existing LabRole provided by AWS Academy/Vocareum
data "aws_iam_role" "lab_role" {
  name = "LabRole"
}

resource "aws_ecs_task_definition" "app_task" {
  family                   = "${var.project_name}-backend-task"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = "256"
  memory                   = "512"
  execution_role_arn       = data.aws_iam_role.lab_role.arn
  task_role_arn            = data.aws_iam_role.lab_role.arn

  container_definitions = jsonencode([
    {
      name      = "${var.project_name}-backend-container"
      # Dummy image for initial provisioning, will be replaced by GitHub Actions deployment.
      image     = "nginx:alpine" 
      essential = true
      portMappings = [
        {
          containerPort = var.app_port
          hostPort      = var.app_port
        }
      ]
      logConfiguration = {
        logDriver = "awslogs"
        options = {
          "awslogs-group"         = "/ecs/${var.project_name}-backend"
          "awslogs-region"        = var.aws_region
          "awslogs-stream-prefix" = "ecs"
        }
      }
    }
  ])
}

resource "aws_cloudwatch_log_group" "ecs_log_group" {
  name              = "/ecs/${var.project_name}-backend"
  retention_in_days = 7
}

resource "aws_ecs_service" "app_service" {
  name            = "${var.project_name}-service"
  cluster         = aws_ecs_cluster.app_cluster.id
  task_definition = aws_ecs_task_definition.app_task.arn
  desired_count   = 1
  launch_type     = "FARGATE"

  network_configuration {
    subnets          = data.aws_subnets.default.ids
    security_groups  = [aws_security_group.ecs_sg.id]
    assign_public_ip = true
  }

  # Wire the ALB target group to this ECS service
  load_balancer {
    target_group_arn = aws_lb_target_group.app_tg.arn
    container_name   = "${var.project_name}-backend-container"
    container_port   = var.app_port
  }

  # Wait for ALB listener to be ready before creating the service
  depends_on = [aws_lb_listener.app_listener]

  lifecycle {
    ignore_changes = [task_definition]
  }
}
