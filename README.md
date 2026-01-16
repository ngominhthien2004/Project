# MEVN Stack Project

Dự án full-stack sử dụng MongoDB, Express, Vue 3, và Node.js.

## Cấu trúc dự án

```
├── server/          # Backend API (Express + MongoDB)
├── client/          # Frontend (Vue 3 + Vite)
├── docker-compose.yml
└── package.json
```

## Yêu cầu

- Node.js >= 18
- Docker & Docker Compose
- npm

## Cài đặt

1. **Cài đặt dependencies cho tất cả:**
   ```bash
   npm run install:all
   ```

2. **Khởi động MongoDB bằng Docker:**
   ```bash
   npm run docker:up
   ```

3. **Tạo file .env trong thư mục server:**
   ```bash
   cd server
   cp .env.example .env
   ```

## Chạy ứng dụng

### Development Mode

Chạy cả server và client cùng lúc:
```bash
npm run dev
```

Hoặc chạy riêng lẻ:
- Server: `npm run server:dev` (http://localhost:3000)
- Client: `npm run client:dev` (http://localhost:5173)

### Kiểm tra kết nối

- Server health check: http://localhost:3000/api/health
- Client: http://localhost:5173

## Scripts

- `npm run dev` - Chạy cả server và client
- `npm run docker:up` - Khởi động MongoDB container
- `npm run docker:down` - Dừng MongoDB container
- `npm run install:all` - Cài đặt dependencies cho tất cả

## Công nghệ sử dụng

### Backend
- Express.js
- MongoDB + Mongoose
- CORS, dotenv

### Frontend
- Vue 3
- Vite
- Vue Router
- Pinia
- Axios

### Dev Tools
- ESLint
- Prettier
- Nodemon
- Concurrently
