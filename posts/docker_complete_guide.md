---
title: 'Docker Complete Guide: Containerization Mastery'
subtitle: 'Master Docker with containers, images, Docker Compose, and best practices'
readTime: '20-24 minutes'
date: '2024-04-10'
language: 'docker'
meta_description: 'Complete Docker guide covering containers, images, Dockerfile, Docker Compose, networking, volumes, and production best practices.'
SEO_Keywords_List: 'Docker, Docker tutorial, containers, Dockerfile, Docker Compose, containerization, microservices, DevOps'
---

# Docker Complete Guide: Containerization Mastery

Docker revolutionized application deployment by packaging applications and their dependencies into portable containers. This guide covers everything you need to master Docker containerization.

## Why Docker?

- 📦 **Portability** - Run anywhere: dev, test, production
- 🚀 **Fast Deployment** - Start containers in seconds
- 🔄 **Consistency** - Same environment everywhere
- 💡 **Isolation** - Applications don't interfere with each other
- 📈 **Scalability** - Easy horizontal scaling

## Installation

```bash
# macOS
brew install --cask docker

# Ubuntu
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io

# Verify installation
docker --version
docker run hello-world
```

## Docker Basics

### Running Containers

```bash
# Run a container
docker run nginx

# Run in detached mode
docker run -d nginx

# Run with port mapping
docker run -d -p 8080:80 nginx

# Run with name
docker run -d --name my-nginx -p 8080:80 nginx

# Run with environment variables
docker run -d -e MYSQL_ROOT_PASSWORD=secret mysql

# Run interactively
docker run -it ubuntu bash

# Run with volume mount
docker run -d -v /host/path:/container/path nginx
```

### Container Management

```bash
# List running containers
docker ps

# List all containers
docker ps -a

# Stop container
docker stop container_id

# Start container
docker start container_id

# Restart container
docker restart container_id

# Remove container
docker rm container_id

# Remove all stopped containers
docker container prune

# View container logs
docker logs container_id

# Follow logs
docker logs -f container_id

# Execute command in running container
docker exec -it container_id bash

# Inspect container
docker inspect container_id

# View container stats
docker stats
```

## Dockerfile

### Basic Dockerfile

```dockerfile
# Use official Node.js runtime as base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application code
COPY . .

# Expose port
EXPOSE 3000

# Set environment variable
ENV NODE_ENV=production

# Define command to run app
CMD ["node", "server.js"]
```

### Multi-Stage Build

```dockerfile
# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

# Copy built assets from builder stage
COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/server.js"]
```

### Dockerfile Best Practices

```dockerfile
# Use specific version tags
FROM node:18.17.0-alpine

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Optimize layer caching
COPY package*.json ./
RUN npm ci --only=production

# Copy application code last
COPY --chown=nodejs:nodejs . .

# Switch to non-root user
USER nodejs

# Use ENTRYPOINT for executable containers
ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["node", "server.js"]

# Add health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node healthcheck.js
```

## Building and Managing Images

```bash
# Build image
docker build -t myapp:1.0 .

# Build with build args
docker build --build-arg NODE_ENV=production -t myapp:1.0 .

# Build without cache
docker build --no-cache -t myapp:1.0 .

# List images
docker images

# Remove image
docker rmi image_id

# Remove unused images
docker image prune

# Tag image
docker tag myapp:1.0 myusername/myapp:1.0

# Push to Docker Hub
docker push myusername/myapp:1.0

# Pull image
docker pull nginx:latest

# Save image to tar file
docker save -o myapp.tar myapp:1.0

# Load image from tar file
docker load -i myapp.tar
```

## Docker Compose

### Basic docker-compose.yml

```yaml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://postgres:password@db:5432/myapp
    depends_on:
      - db
    volumes:
      - ./src:/app/src
    networks:
      - app-network

  db:
    image: postgres:15-alpine
    environment:
      - POSTGRES_PASSWORD=password
      - POSTGRES_DB=myapp
    volumes:
      - postgres-data:/var/lib/postgresql/data
    networks:
      - app-network

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    networks:
      - app-network

volumes:
  postgres-data:

networks:
  app-network:
    driver: bridge
```

### Full Stack Application

```yaml
version: '3.8'

services:
  # Frontend
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - REACT_APP_API_URL=http://localhost:4000
    depends_on:
      - backend
    networks:
      - app-network

  # Backend API
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "4000:4000"
    environment:
      - DATABASE_URL=postgresql://postgres:password@postgres:5432/myapp
      - REDIS_URL=redis://redis:6379
      - JWT_SECRET=your-secret-key
    depends_on:
      - postgres
      - redis
    volumes:
      - ./backend/src:/app/src
    networks:
      - app-network

  # PostgreSQL Database
  postgres:
    image: postgres:15-alpine
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
      - POSTGRES_DB=myapp
    volumes:
      - postgres-data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    networks:
      - app-network

  # Redis Cache
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    networks:
      - app-network

  # Nginx Reverse Proxy
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
    depends_on:
      - frontend
      - backend
    networks:
      - app-network

volumes:
  postgres-data:

networks:
  app-network:
    driver: bridge
```

### Docker Compose Commands

```bash
# Start services
docker-compose up

# Start in detached mode
docker-compose up -d

# Build and start
docker-compose up --build

# Stop services
docker-compose down

# Stop and remove volumes
docker-compose down -v

# View logs
docker-compose logs

# Follow logs for specific service
docker-compose logs -f web

# List running services
docker-compose ps

# Execute command in service
docker-compose exec web bash

# Scale service
docker-compose up -d --scale web=3

# Restart service
docker-compose restart web
```

## Docker Networking

### Network Types

```bash
# Create bridge network
docker network create my-network

# Create network with subnet
docker network create --subnet=172.18.0.0/16 my-network

# List networks
docker network ls

# Inspect network
docker network inspect my-network

# Connect container to network
docker network connect my-network container_id

# Disconnect container from network
docker network disconnect my-network container_id

# Remove network
docker network rm my-network
```

### Container Communication

```yaml
# docker-compose.yml
version: '3.8'

services:
  app:
    image: myapp
    networks:
      - frontend
      - backend

  db:
    image: postgres
    networks:
      - backend

  nginx:
    image: nginx
    networks:
      - frontend

networks:
  frontend:
  backend:
```

## Docker Volumes

### Volume Management

```bash
# Create volume
docker volume create my-volume

# List volumes
docker volume ls

# Inspect volume
docker volume inspect my-volume

# Remove volume
docker volume rm my-volume

# Remove unused volumes
docker volume prune

# Run container with volume
docker run -d -v my-volume:/data nginx
```

### Volume Types

```yaml
version: '3.8'

services:
  app:
    image: myapp
    volumes:
      # Named volume
      - app-data:/app/data

      # Bind mount
      - ./src:/app/src

      # tmpfs mount (in-memory)
      - type: tmpfs
        target: /app/temp

volumes:
  app-data:
```

## Real-World Examples

### Node.js Application

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy app
COPY . .

# Create non-root user
RUN addgroup -g 1001 nodejs && \
    adduser -S nodejs -u 1001 && \
    chown -R nodejs:nodejs /app

USER nodejs

EXPOSE 3000

CMD ["node", "server.js"]
```

```yaml
# docker-compose.yml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - PORT=3000
    restart: unless-stopped
```

### Python Flask Application

```dockerfile
# Dockerfile
FROM python:3.11-slim

WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy app
COPY . .

# Create non-root user
RUN useradd -m -u 1000 appuser && \
    chown -R appuser:appuser /app

USER appuser

EXPOSE 5000

CMD ["gunicorn", "--bind", "0.0.0.0:5000", "app:app"]
```

### .NET Application

```dockerfile
# Dockerfile
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src

COPY ["MyApp.csproj", "./"]
RUN dotnet restore

COPY . .
RUN dotnet publish -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:7.0
WORKDIR /app
COPY --from=build /app/publish .

EXPOSE 80

ENTRYPOINT ["dotnet", "MyApp.dll"]
```

## Docker Security Best Practices

### 1. Use Official Images

```dockerfile
# Good
FROM node:18-alpine

# Bad
FROM random-user/node
```

### 2. Scan for Vulnerabilities

```bash
# Scan image
docker scan myapp:latest

# Use Trivy
trivy image myapp:latest
```

### 3. Use .dockerignore

```.dockerignore
node_modules
npm-debug.log
.git
.env
.DS_Store
*.md
.vscode
```

### 4. Run as Non-Root User

```dockerfile
FROM node:18-alpine

RUN addgroup -g 1001 nodejs && \
    adduser -S nodejs -u 1001

USER nodejs
```

### 5. Limit Resources

```yaml
version: '3.8'

services:
  app:
    image: myapp
    deploy:
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
        reservations:
          cpus: '0.25'
          memory: 256M
```

## Performance Optimization

### 1. Minimize Layers

```dockerfile
# Bad - Multiple layers
RUN apt-get update
RUN apt-get install -y package1
RUN apt-get install -y package2

# Good - Single layer
RUN apt-get update && \
    apt-get install -y package1 package2 && \
    rm -rf /var/lib/apt/lists/*
```

### 2. Use Build Cache

```dockerfile
# Copy dependency files first
COPY package*.json ./
RUN npm ci

# Copy source code last
COPY . .
```

### 3. Multi-Stage Builds

```dockerfile
FROM node:18 AS builder
WORKDIR /app
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
```

## Debugging

```bash
# View container logs
docker logs container_id

# Execute shell in container
docker exec -it container_id sh

# Copy files from container
docker cp container_id:/app/logs ./logs

# View container processes
docker top container_id

# Monitor container stats
docker stats container_id
```

## Conclusion

Docker simplifies application deployment and ensures consistency across environments. Master these concepts to build, ship, and run applications efficiently.

## Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Hub](https://hub.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
