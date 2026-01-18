# PM2 Process Management

This project is configured to use PM2 for process management in production and development environments.

## Overview

PM2 is a production process manager for Node.js applications with a built-in load balancer. It allows you to keep applications alive forever, reload them without downtime, and facilitate common system admin tasks.

## Configuration

The PM2 configuration is defined in [`ecosystem.config.js`](ecosystem.config.js) which includes:

- **Cluster Mode**: Runs multiple instances using all available CPU cores
- **Auto-restart**: Automatically restarts the application if it crashes
- **Memory Monitoring**: Restarts if memory usage exceeds 1GB
- **Log Management**: Centralized logging with rotation
- **Environment-specific Settings**: Different configurations for development, staging, and production

## Available Scripts

### Basic Commands

```bash
# Start the application with PM2 (builds first)
npm run pm2:start

# Start in development mode
npm run pm2:start:dev

# Stop the application
npm run pm2:stop

# Restart the application
npm run pm2:restart

# Reload the application (zero-downtime restart)
npm run pm2:reload

# Delete the application from PM2
npm run pm2:delete
```

### Monitoring Commands

```bash
# View logs
npm run pm2:logs

# Real-time monitoring dashboard
npm run pm2:monit

# List all PM2 processes
npm run pm2:list

# Save current PM2 process list
npm run pm2:save

# Restore previously saved PM2 processes
npm run pm2:resurrect
```

## Environment Variables

The application supports different environments:

- **development**: Local development with file watching enabled
- **production**: Optimized for production with clustering
- **staging**: Similar to production but for staging environment

## Log Files

PM2 logs are stored in:

- **Combined logs**: `logs/pm2/combined.log`
- **Output logs**: `logs/pm2/out.log`
- **Error logs**: `logs/pm2/error.log`

## Production Deployment

For production deployment:

1. Build the application:

   ```bash
   npm run build
   ```

2. Start with PM2:

   ```bash
   npm run pm2:start
   ```

3. Save the process list (to auto-restart after server reboot):

   ```bash
   npm run pm2:save
   ```

4. Set up PM2 to start on system boot:
   ```bash
   pm2 startup
   pm2 save
   ```

## Cluster Mode

The application runs in cluster mode by default, which:

- Utilizes all available CPU cores
- Provides automatic load balancing
- Offers zero-downtime restarts
- Increases application availability

## Health Monitoring

PM2 provides built-in health monitoring:

- Automatic restarts on crashes
- Memory usage monitoring
- CPU usage tracking
- Custom health check endpoints (if configured)

## Advanced Usage

### Manual PM2 Commands

```bash
# Start with specific environment
pm2 start ecosystem.config.js --env production

# Scale to specific number of instances
pm2 scale express-ts-node-services 4

# Restart specific process
pm2 restart express-ts-node-services

# Stop specific process
pm2 stop express-ts-node-services

# Delete specific process
pm2 delete express-ts-node-services
```

### Web Dashboard

PM2 Plus provides a web dashboard for monitoring:

```bash
pm2 plus
```

## Troubleshooting

### Common Issues

1. **Port already in use**: Check if another instance is running with `pm2 list`
2. **Memory leaks**: Monitor with `pm2 monit` and check logs
3. **Failed to start**: Check error logs in `logs/pm2/error.log`

### Useful Commands

```bash
# View detailed process information
pm2 show express-ts-node-services

# Flush logs
pm2 flush

# Reload logs
pm2 reloadLogs
```

## Best Practices

1. **Always build before production deployment**
2. **Use `pm2 save` after starting processes in production**
3. **Monitor logs regularly using `pm2 logs`**
4. **Use `pm2 reload` for zero-downtime deployments**
5. **Set up log rotation to prevent disk space issues**
6. **Use different environments for development, staging, and production**

## Integration with CI/CD

Example deployment script for production:

```bash
#!/bin/bash
npm ci
npm run build
npm run pm2:stop || true
npm run pm2:start
npm run pm2:save
```
