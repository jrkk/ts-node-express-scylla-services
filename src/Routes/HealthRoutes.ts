import { Router } from 'express';
import { checkHealth } from '@/Controller/HealthController';

const router = Router();

/**
 * GET /api/health
 * Health check endpoint
 */
router.get('/', checkHealth);

export default router;
