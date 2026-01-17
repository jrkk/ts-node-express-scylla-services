import { connectDatabase } from '@/Config/Database.Config';

/**
 * Bootstrap function to initialize the application
 * Handles database connections, migrations, and other startup tasks
 */
export const bootstrap = async (): Promise<void> => {
  try {
    console.log('[INFO] Starting application bootstrap...');

    // Initialize database connection
    await connectDatabase();
    console.log('[INFO] Database connection established successfully');

    // Add any additional initialization logic here
    // Examples:
    // - Run database migrations
    // - Initialize cache connections
    // - Set up external service connections
    // - Load configuration data
    // - Initialize background jobs

    console.log('[INFO] Application bootstrap completed successfully');
  } catch (error) {
    console.error('[ERROR] Failed to bootstrap application:', error);
    throw error;
  }
};
