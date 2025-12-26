import { Request, Response, NextFunction } from 'express';
import { schemaValidator } from '@/Schemas/validator';
import { SchemaType } from '@/Schemas/types';

export const validateRequest = (schemaName: string, target: SchemaType = 'body') => {
  return (req: Request, res: Response, next: NextFunction): void => {
    let dataToValidate: unknown;

    switch (target) {
      case 'body':
        dataToValidate = req.body;
        break;
      case 'params':
        dataToValidate = req.params;
        break;
      case 'query':
        dataToValidate = req.query;
        break;
      default:
        dataToValidate = req.body;
    }

    try {
      const validationResult = schemaValidator.validate(schemaName, dataToValidate);

      if (!validationResult.isValid) {
        res.status(400).json({
          success: false,
          error: {
            message: 'Validation Error',
            code: 'VALIDATION_FAILED',
            details: validationResult.errors,
          },
        });
        return;
      }

      // Update the request object with validated (and potentially coerced) data
      switch (target) {
        case 'body':
          req.body = dataToValidate;
          break;
        case 'params':
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (req as any).params = dataToValidate;
          break;
        case 'query':
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (req as any).query = dataToValidate;
          break;
      }

      next();
    } catch {
      res.status(500).json({
        success: false,
        error: {
          message: 'Internal validation error',
          code: 'VALIDATION_ERROR',
        },
      });
    }
  };
};

// Convenience functions for specific validation types
export const validateBody = (schemaName: string) => validateRequest(schemaName, 'body');
export const validateParams = (schemaName: string) => validateRequest(schemaName, 'params');
export const validateQuery = (schemaName: string) => validateRequest(schemaName, 'query');

// Specific validators for common use cases
export const validateCreateUser = () => validateBody('createUser');
export const validateUpdateUser = () => validateBody('updateUser');
export const validateGetUserByIdParams = () => validateParams('getUserByIdParams');
export const validatePaginationQuery = () => validateQuery('paginationQuery');
