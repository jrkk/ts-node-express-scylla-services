import * as fs from 'fs';
import * as path from 'path';
import { Console } from 'console';

/**
 * Logger Plugin
 * This plugin can be extended to integrate with external logging services
 * like Winston, Morgan, or cloud logging services
 */

type LogMetadata = string | number | boolean | object | Error | null | undefined;

export interface LoggerPlugin {
  info(message: string, meta?: LogMetadata): void;
  error(message: string, meta?: LogMetadata): void;
  warn(message: string, meta?: LogMetadata): void;
  debug(message: string, meta?: LogMetadata): void;
}

class FileLogger implements LoggerPlugin {
  private console: Console;
  private logStream: fs.WriteStream;

  constructor(filePath: string) {
    const fullPath = this.ensureLogFile(filePath);
    this.logStream = fs.createWriteStream(fullPath, { flags: 'a' });
    this.console = new Console(this.logStream);
  }

  private ensureLogFile(filePath: string): string {
    const logsDir = path.resolve('./logs');
    const fullPath = path.join(logsDir, filePath);
    const directory = path.dirname(fullPath);

    // Check if the directory exists, if not create it
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true });
    }

    // Check if the file exists, if not create it
    if (!fs.existsSync(fullPath)) {
      fs.writeFileSync(fullPath, '');
    }

    return fullPath;
  }

  info(message: string, meta?: LogMetadata): void {
    const timestamp = new Date().toISOString();
    this.console.log(`[${timestamp}] [INFO] ${message}`, meta || '');
  }

  error(message: string, meta?: LogMetadata): void {
    const timestamp = new Date().toISOString();
    this.console.error(`[${timestamp}] [ERROR] ${message}`, meta || '');
  }

  warn(message: string, meta?: LogMetadata): void {
    const timestamp = new Date().toISOString();
    this.console.warn(`[${timestamp}] [WARN] ${message}`, meta || '');
  }

  debug(message: string, meta?: LogMetadata): void {
    const timestamp = new Date().toISOString();
    this.console.log(`[${timestamp}] [DEBUG] ${message}`, meta || '');
  }

  close(): void {
    if (this.logStream) {
      this.logStream.end();
    }
  }
}

/**
 * Create a file-based logger that writes to the specified file path
 * @param filePath - The file path relative to the ./logs directory
 * @returns FileLogger instance
 */
export function createFileLogger(filePath: string): FileLogger {
  return new FileLogger(filePath);
}

/**
 * Export the FileLogger class for direct usage
 */
export { FileLogger };

// Default console-based logger plugin for quick use in tests and development
// Note: Default console-based `loggerPlugin` removed. Use `FileLogger` or
// the global `console` directly for simple logging in tests/dev.
