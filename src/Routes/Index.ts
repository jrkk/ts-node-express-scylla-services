import { Router } from 'express';
import healthRoutes from '@/Routes/HealthRoutes';
import userRoutes from '@/Routes/UserRoutes';

const router = Router();

// Mount route modules
router.use('/health', healthRoutes);
router.use('/users', userRoutes);

export default router;
