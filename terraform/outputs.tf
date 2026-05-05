output "s3_bucket_name" {
  value = aws_s3_bucket.app_bucket.id
}

output "ecr_repository_url" {
  value = aws_ecr_repository.app_repo.repository_url
}

output "ecs_cluster_name" {
  value = aws_ecs_cluster.app_cluster.name
}

output "ecs_service_name" {
  value = aws_ecs_service.app_service.name
}

output "alb_url" {
  description = "Public URL of the Application Load Balancer"
  value       = "http://${aws_lb.app_alb.dns_name}"
}
