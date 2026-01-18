import { Router } from 'express';
import { getAllUsers, getUserById, createUser } from '@/Controller/UserController';
import {
  validateCreateUser,
  validateGetUserByIdParams,
  validatePaginationQuery,
} from '../Middleware/Validator';

const router = Router();

/**
 * GET /api/users
 * Get all users with optional pagination
 */
router.get('/', validatePaginationQuery(), getAllUsers);

/**
 * GET /api/users/:id
 * Get user by ID
 */
router.get('/:id', validateGetUserByIdParams(), getUserById);

/**
 * POST /api/users
 * Create a new user
 */
router.post('/', validateCreateUser(), createUser);

export default router;
