# Personal Task Manager - Full Stack Application

## How to Run

### 1. Start MySQL
**Note**: we need to open `Docker Desktop` app first before running docker compose
First, open this project folder and run
```bash
docker-compose up -d
```

### 2. Start Backend

```bash
cd TaskApi
dotnet restore
dotnet ef database update   # First run only
dotnet run
```

### 3. Start Frontend
```bash
cd task-client
yarn install   # or npm install
yarn dev # or npm run dev
```