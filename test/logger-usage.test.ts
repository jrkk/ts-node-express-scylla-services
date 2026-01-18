import { createFileLogger, FileLogger } from '../src/Plugins/Logger.Plugin';

// Example 1: Using the factory function to create a file logger
console.log('=== Testing File Logger ===');

// Create a logger for application logs
const appLogger = createFileLogger('app.log');
appLogger.info('Application started successfully');
appLogger.warn('This is a warning message');
appLogger.error('This is an error message', { errorCode: 500, stack: 'Error stack trace' });
appLogger.debug('Debug information', { userId: 123, action: 'login' });

// Create a logger with directory structure
const errorLogger = createFileLogger('errors/2025/december.log');
errorLogger.error('Critical system error', {
  timestamp: new Date().toISOString(),
  service: 'user-service',
  error: 'Database connection timeout',
});

// Example 2: Using the FileLogger class directly
const customLogger = new FileLogger('custom/my-service.log');
customLogger.info('Custom logger initialized');
customLogger.info('Processing user request', { requestId: 'req-123', userId: 456 });

// Example 3: Using the default console logger
console.log('\n=== Testing Console Logger ===');
console.info('Console logger info message');
console.error('Console logger error message');
console.warn('Console logger warning message');
console.debug('Console logger debug message');

// Cleanup - close file streams
setTimeout(() => {
  appLogger.close();
  errorLogger.close();
  customLogger.close();
  console.log('\n=== File loggers closed ===');
  console.log('Check the ./logs directory for generated log files');
}, 1000);
