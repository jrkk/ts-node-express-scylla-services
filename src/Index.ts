import express, { Application } from 'express';
import { config } from '@/Config/App.Config';
import { errorHandler } from '@/Middleware/ErrorHandler';
import { logger } from '@/Middleware/Logger';
import routes from '@/Routes/Index';
import { bootstrap } from '@/Bootstrap';

const app: Application = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

// Routes
app.use('/api', routes);

// Error handling middleware (should be last)
app.use(errorHandler);

const PORT = config.port || 3000;

/**
 * Start the server and run bootstrap after startup
 */
const startServer = (): void => {
  app.listen(PORT, async () => {
    try {
      console.log(`[INFO] Server is running on port ${PORT}`);
      console.log(`[INFO] Environment: ${config.environment}`);

      // Run bootstrap initialization after server starts
      await bootstrap();
    } catch (error) {
      console.error('[ERROR] Failed to bootstrap application:', error);
      process.exit(1);
    }
  });
};

// Start the server
startServer();

export default app;
