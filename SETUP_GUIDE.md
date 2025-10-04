# ABP vNext Pro - Hướng dẫn Setup

## 🎯 Tổng quan dự án

Dự án ABP vNext Pro bao gồm:
- **Backend**: .NET 9.0 với ABP Framework
- **Frontend**: Vue.js 3 + Vben Admin UI
- **Database**: MySQL 8.0
- **Cache**: Redis 7
- **Message Queue**: RabbitMQ (tùy chọn)

## 🚀 Các bước đã hoàn thành

### ✅ 1. Cài đặt Docker Services
```bash
# Khởi động MySQL, Redis, RabbitMQ
docker-compose up -d

# Kiểm tra trạng thái services
docker-compose ps
```

### ✅ 2. Cấu hình Backend
- Đã cập nhật NuGet.Config để khắc phục package source mapping
- Đã cấu hình connection strings cho MySQL và Redis
- Đã restore .NET packages thành công

### ✅ 3. Cài đặt Frontend
```bash
cd vben28
pnpm install  # Đã hoàn thành
```

### ✅ 4. Chạy Frontend Development Server
```bash
cd vben28
pnpm dev
```
**Frontend đang chạy tại: http://localhost:4200**

## 🔧 Services đang hoạt động

| Service | URL | Credentials |
|---------|-----|-------------|
| **Frontend** | http://localhost:4200 | - |
| **MySQL** | localhost:3306 | root / f616b8803ac7a9a0 |
| **Redis** | localhost:6379 | password: 1q2w3E* |
| **RabbitMQ** | localhost:5672 | admin / 1q2w3E* |
| **RabbitMQ Management** | http://localhost:15672 | admin / 1q2w3E* |

## ⚠️ Vấn đề cần khắc phục

### Backend API (đang gặp lỗi database migration)
Backend API hiện tại gặp lỗi do chưa có database tables. Cần thực hiện migration:

```bash
cd aspnet-core
dotnet run --project services/src/Lion.AbpPro.DbMigrator
```

**Lỗi hiện tại**: Connection string configuration issue trong DbMigrator

## 🛠️ Các lệnh hữu ích

### Quản lý Docker Services
```bash
# Khởi động services
docker-compose up -d

# Dừng services
docker-compose down

# Xem logs
docker logs abp-pro-mysql
docker logs abp-pro-redis
docker logs abp-pro-rabbitmq

# Kết nối MySQL
docker exec -it abp-pro-mysql mysql -u root -pf616b8803ac7a9a0
```

### Backend Development
```bash
cd aspnet-core

# Restore packages
dotnet restore

# Chạy migrations (cần khắc phục)
dotnet run --project services/src/Lion.AbpPro.DbMigrator

# Chạy API server (sau khi migration thành công)
dotnet run --project services/host/Lion.AbpPro.HttpApi.Host
```

### Frontend Development
```bash
cd vben28

# Cài đặt dependencies
pnpm install

# Chạy development server
pnpm dev

# Build production
pnpm build
```

## 📁 Cấu trúc dự án

```
abp-vnext-pro/
├── aspnet-core/           # Backend .NET
│   ├── services/          # Core services
│   ├── modules/           # ABP modules
│   ├── frameworks/        # Framework extensions
│   └── gateways/          # API Gateway
├── vben28/               # Frontend Vue.js
├── docker-compose.yml    # Docker services
└── start-services.sh     # Script khởi động
```

## 🎯 Trạng thái hiện tại

- ✅ **Docker Services**: Đang chạy
- ✅ **Frontend**: Đang chạy tại http://localhost:4200
- ⚠️ **Backend API**: Cần khắc phục database migration
- ⚠️ **Database**: Cần tạo tables thông qua migration

## 🔄 Bước tiếp theo

1. **Khắc phục database migration issue**
2. **Chạy backend API server**
3. **Test kết nối frontend-backend**
4. **Cấu hình authentication nếu cần**

## 📞 Hỗ trợ

Nếu gặp vấn đề, hãy kiểm tra:
1. Docker services có đang chạy không: `docker-compose ps`
2. Logs của các services: `docker logs <container-name>`
3. Port conflicts: Đảm bảo ports 3306, 6379, 5672, 4200, 44315 không bị chiếm dụng
