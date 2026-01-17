# Docker Usage Guide

This document provides instructions for running the Express TypeScript application using Docker.

## Prerequisites

- Docker installed on your machine
- Docker Compose (usually included with Docker Desktop)

## Files Overview

- `Dockerfile`: Defines how to build the application container
- `docker-compose.yml`: Orchestrates the application and MySQL database
- `.dockerignore`: Specifies files to exclude from the Docker build context
- `healthcheck.js`: Health check script for container monitoring

## Quick Start

### Option 1: Using Docker Compose (Recommended)

1. **Build and run the application with database:**

   ```bash
   docker-compose up --build
   ```

2. **Run in detached mode:**

   ```bash
   docker-compose up -d --build
   ```

3. **Stop the application:**

   ```bash
   docker-compose down
   ```

4. **Stop and remove volumes:**
   ```bash
   docker-compose down -v
   ```

### Option 2: Using Docker Only

1. **Build the image:**

   ```bash
   docker build -t express-ts-app .
   ```

2. **Run the container:**
   ```bash
   docker run -p 3000:3000 express-ts-app
   ```

## Environment Variables

The application supports the following environment variables:

| Variable      | Description       | Default       |
| ------------- | ----------------- | ------------- |
| `NODE_ENV`    | Environment mode  | `development` |
| `PORT`        | Application port  | `3000`        |
| `DB_HOST`     | Database host     | `localhost`   |
| `DB_PORT`     | Database port     | `3306`        |
| `DB_NAME`     | Database name     | `express_db`  |
| `DB_USERNAME` | Database username | `root`        |
| `DB_PASSWORD` | Database password | `password`    |

## Development

For development with hot reload, you can override the Docker Compose configuration:

1. Create a `docker-compose.override.yml` file:

   ```yaml
   version: '3.8'
   services:
     app:
       build:
         target: development
       volumes:
         - ./src:/usr/src/app/src
         - ./package.json:/usr/src/app/package.json
       environment:
         - NODE_ENV=development
       command: npm run dev
   ```

2. Run with development configuration:
   ```bash
   docker-compose up --build
   ```

## Accessing the Application

- Application: http://localhost:3000
- Health Check: http://localhost:3000/api/health
- Database: localhost:3306 (when using docker-compose)

## Useful Commands

- **View logs:**

  ```bash
  docker-compose logs app
  ```

- **Execute commands in running container:**

  ```bash
  docker-compose exec app /bin/sh
  ```

- **Rebuild without cache:**
  ```bash
  docker-compose build --no-cache
  ```

## Troubleshooting

1. **Port already in use:**
   - Change the port mapping in docker-compose.yml
   - Or stop the conflicting service

2. **Database connection issues:**
   - Ensure MySQL container is running
   - Check environment variables
   - Verify network connectivity

3. **Build failures:**
   - Clear Docker cache: `docker system prune`
   - Rebuild without cache: `docker-compose build --no-cache`
