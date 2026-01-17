# Docker Setup and Usage Guide

This document provides comprehensive instructions for running the Express TypeScript Node Services application using Docker and Docker Compose.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- [Docker](https://docs.docker.com/get-docker/) (version 20.10 or later)
- [Docker Compose](https://docs.docker.com/compose/install/) (usually included with Docker Desktop)

Verify your installation:

```bash
docker --version
docker-compose --version
```

## 🐳 Docker Files Overview

The project includes several Docker-related files:

| File                 | Purpose                                                  |
| -------------------- | -------------------------------------------------------- |
| `Dockerfile`         | Defines how to build the application container           |
| `docker-compose.yml` | Orchestrates the application and ScyllaDB database     |
| `.dockerignore`      | Specifies files to exclude from the Docker build context |

## 🚀 Quick Start

### Option 1: Using Docker Compose (Recommended)

This is the easiest way to run the complete application stack with database:

```bash
# Build and run the application with database
docker-compose up --build

# Or run in detached mode (background)
docker-compose up -d --build
```

The application will be available at `http://localhost:3000`

### Option 2: Using Docker Only

If you prefer to use Docker without Docker Compose:

```bash
# Build the image
docker build -t express-ts-app .

# Run the container (without database)
docker run -p 3000:3000 express-ts-app
```

## 🔧 Detailed Usage

### Building the Application

Build the Docker image:

```bash
docker-compose build
```

Force rebuild (ignore cache):

```bash
docker-compose build --no-cache
```

### Running the Application

Start the services:

```bash
docker-compose up
```

Start in detached mode:

```bash
docker-compose up -d
```

Start specific services:

```bash
docker-compose up scylla  # Only database
docker-compose up app       # Only application (requires running database)
```

### Stopping the Application

Stop running services:

```bash
docker-compose down
```

Stop and remove volumes (⚠️ This will delete database data):

```bash
docker-compose down -v
```

Stop and remove images:

```bash
docker-compose down --rmi all
```

### Viewing Logs

View logs from all services:

```bash
docker-compose logs
```

Follow logs in real-time:

```bash
docker-compose logs -f
```

View logs from specific service:

```bash
docker-compose logs app      # Application logs
docker-compose logs scylla # Database logs
```

### Managing Containers

List running containers:

```bash
docker-compose ps
```

Execute commands in running container:

```bash
docker-compose exec app sh                    # Open shell in app container
docker-compose exec app npm test             # Run tests in container
docker-compose exec scylla cqlsh             # Connect to database
```

## 🌍 Environment Configuration

The Docker setup uses environment variables defined in `docker-compose.yml`:

### Application Environment Variables

| Variable             | Default Value  | Description                 |
| -------------------- | -------------- | --------------------------- |
| `NODE_ENV`           | `production`   | Node.js environment         |
| `PORT`               | `3000`         | Application port            |
| `DB_CONTACT_POINTS`  | `scylla`       | Database contact points     |
| `DB_PORT`            | `9042`         | Database port               |
| `DB_KEYSPACE`        | `express_db`   | Database keyspace           |
| `DB_DATACENTER`      | `datacenter1`  | Database datacenter         |
| `DB_USERNAME`        | (empty)        | Database username (optional)|
| `DB_PASSWORD`        | (empty)        | Database password (optional)|

### Database Environment Variables

ScyllaDB uses command-line arguments for configuration. See `docker-compose.yml` for the configured options.

### Custom Environment Variables

To override default values, you can:

1. **Modify `docker-compose.yml`** (not recommended for production)
2. **Use environment variables file**:
   ```bash
   # Create .env file in project root
   echo "DB_PASSWORD=mysecretpassword" > .env
   ```
3. **Set environment variables before running**:
   ```bash
   DB_PASSWORD=mysecretpassword docker-compose up
   ```

## 🔍 Health Monitoring

The application container includes built-in health checks that use a lightweight HTTP request to verify the application is running properly.

### Health Check Configuration

The Dockerfile includes an automated health check:

```dockerfile
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1
```

This configuration:

- **Interval**: Runs every 30 seconds
- **Timeout**: Fails if check takes longer than 3 seconds
- **Start Period**: Waits 5 seconds before first check
- **Retries**: Allows 3 consecutive failures before marking unhealthy

### Check Container Health

```bash
docker-compose ps  # Shows health status
docker inspect <container_name> | grep -A 10 Health  # Detailed health info
```

### Health Check Endpoint

The application exposes a health check endpoint:

```bash
curl http://localhost:3000/health
```

### Health Check Benefits

- **Efficient**: Uses lightweight `wget` command instead of spawning Node.js processes
- **Fast**: No Node.js startup overhead for each check
- **Resource-friendly**: Minimal CPU and memory usage
- **Reliable**: Validates actual HTTP response from your application

## 📊 Database Management

### Accessing the Database

Connect to ScyllaDB database:

```bash
docker-compose exec scylla cqlsh
```

View keyspaces:

```bash
docker-compose exec scylla cqlsh -e "DESCRIBE KEYSPACES"
```

### Database Persistence

Database data is persisted using Docker volumes:

```bash
# View volumes
docker volume ls

# Inspect the scylla volume
docker volume inspect express-ts-node-services_scylla_data
```

### Database Backup and Restore

Create a backup using CQL shell:

```bash
# Backup schema
docker-compose exec scylla cqlsh -e "DESCRIBE KEYSPACE express_db" > schema_backup.cql

# Export data using COPY command
docker-compose exec scylla cqlsh -e "COPY express_db.users TO '/tmp/users.csv' WITH HEADER=true"
docker cp scylla_container_name:/tmp/users.csv ./users_backup.csv
```

Restore from backup:

```bash
# Restore schema
docker-compose exec -T scylla cqlsh < schema_backup.cql

# Import data
docker cp ./users_backup.csv scylla_container_name:/tmp/users.csv
docker-compose exec scylla cqlsh -e "COPY express_db.users FROM '/tmp/users.csv' WITH HEADER=true"
```

## 🐛 Troubleshooting

### Common Issues

1. **Port already in use**:

   ```bash
   # Change port in docker-compose.yml or stop conflicting service
   docker-compose down
   sudo lsof -i :3000  # Find process using port 3000
   ```

2. **Database connection issues**:

   ```bash
   # Check if scylla container is running
   docker-compose ps

   # Check scylla logs
   docker-compose logs scylla
   
   # Verify ScyllaDB is ready
   docker-compose exec scylla nodetool status
   ```

3. **Build failures**:

   ```bash
   # Clean build without cache
   docker-compose build --no-cache

   # Remove unused images
   docker image prune
   ```

4. **Permission issues**:
   ```bash
   # Fix file permissions (Linux/macOS)
   sudo chown -R $USER:$USER .
   ```

### Debugging

Access application container shell:

```bash
docker-compose exec app sh
```

View container processes:

```bash
docker-compose exec app ps aux
```

Check container resource usage:

```bash
docker stats
```

## 🔄 Development Workflow

### Development with Docker

For development with hot-reload:

1. **Create a development docker-compose override**:

   ```yaml
   # docker-compose.dev.yml
   version: '3.8'
   services:
     app:
       command: npm run dev
       volumes:
         - ./src:/usr/src/app/src
         - ./package.json:/usr/src/app/package.json
       environment:
         - NODE_ENV=development
   ```

2. **Run with development configuration**:
   ```bash
   docker-compose -f docker-compose.yml -f docker-compose.dev.yml up
   ```

### Testing in Docker

Run tests inside the container:

```bash
docker-compose exec app npm test
```

Run tests with coverage:

```bash
docker-compose exec app npm run test:coverage
```

## 🚢 Production Deployment

### Environment-specific Configurations

For production deployment, consider:

1. **Use production environment variables**
2. **Set up proper secrets management**
3. **Configure logging and monitoring**
4. **Use Docker swarm or Kubernetes for orchestration**

### Docker Security Best Practices

- Use non-root user (already implemented)
- Scan images for vulnerabilities
- Keep base images updated
- Use multi-stage builds for smaller images
- Set resource limits

### Example Production Compose

```yaml
version: '3.8'
services:
  app:
    image: your-registry/express-ts-app:latest
    deploy:
      replicas: 3
      resources:
        limits:
          memory: 512M
        reservations:
          memory: 256M
    environment:
      - NODE_ENV=production
    secrets:
      - db_password
    networks:
      - app-network

secrets:
  db_password:
    external: true

networks:
  app-network:
    external: true
```

## 📚 Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Node.js Docker Best Practices](https://github.com/nodejs/docker-node/blob/main/docs/BestPractices.md)
- [ScyllaDB Docker Hub](https://hub.docker.com/r/scylladb/scylla)
- [ScyllaDB Documentation](https://docs.scylladb.com/)

## 🆘 Getting Help

If you encounter issues:

1. Check the [troubleshooting section](#-troubleshooting)
2. Review Docker and application logs
3. Consult the main [README.md](../README.md)
4. Open an issue in the project repository

---

_For more information about the project structure and development setup, see the main [README.md](../README.md) file._
