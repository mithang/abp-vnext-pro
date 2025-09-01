#!/bin/bash

echo "🚀 Starting ABP vNext Pro services..."

# Start Docker services
echo "📦 Starting MySQL, Redis, and RabbitMQ..."
docker-compose up -d

# Wait for services to be ready
echo "⏳ Waiting for services to start..."
sleep 10

# Check if services are running
echo "🔍 Checking service status..."
docker-compose ps

echo "✅ Services started successfully!"
echo ""
echo "📋 Service Information:"
echo "  MySQL:    localhost:3306 (root/f616b8803ac7a9a0)"
echo "  Redis:    localhost:6379 (password: 1q2w3E*)"
echo "  RabbitMQ: localhost:5672 (admin/1q2w3E*)"
echo "  RabbitMQ Management: http://localhost:15672"
echo ""
echo "🔧 Next steps:"
echo "  1. Run database migrations: cd aspnet-core && dotnet run --project services/src/Lion.AbpPro.DbMigrator"
echo "  2. Start backend API: cd aspnet-core && dotnet run --project services/host/Lion.AbpPro.HttpApi.Host"
echo "  3. Start frontend: cd vben28 && pnpm install && pnpm dev"
