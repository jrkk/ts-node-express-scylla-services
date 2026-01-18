import { Request, Response } from 'express';
import { HealthService } from '@/Services/HealthService';

const healthService = new HealthService();

/**
 * GET /api/health
 * Health check endpoint
 */
export const checkHealth = async (_req: Request, res: Response): Promise<void> => {
  try {
    const healthStatus = await healthService.checkHealth();
    res.status(200).json({
      success: true,
      data: healthStatus,
    });
  } catch {
    res.status(500).json({
      success: false,
      error: {
        message: 'Health check failed',
      },
    });
  }
};

export const HealthController = {
  checkHealth,
};
