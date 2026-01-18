import Ajv, { ValidateFunction } from 'ajv';
import addFormats from 'ajv-formats';
import {
  createUserSchema,
  updateUserSchema,
  getUserByIdParamsSchema,
  paginationQuerySchema,
  errorResponseSchema,
  successResponseSchema,
  healthCheckResponseSchema,
} from './index';
import { ValidationResult } from '@/Schemas/types';

class SchemaValidator {
  private ajv: Ajv;
  private validators: Map<string, ValidateFunction> = new Map();

  constructor() {
    this.ajv = new Ajv({
      allErrors: true,
      removeAdditional: true,
      useDefaults: true,
      coerceTypes: false,
    });

    // Add format validation for email, date-time, etc.
    addFormats(this.ajv);

    this.initializeValidators();
  }

  private initializeValidators(): void {
    // User schemas
    this.validators.set('createUser', this.ajv.compile(createUserSchema));
    this.validators.set('updateUser', this.ajv.compile(updateUserSchema));
    this.validators.set('getUserByIdParams', this.ajv.compile(getUserByIdParamsSchema));
    this.validators.set('paginationQuery', this.ajv.compile(paginationQuerySchema));

    // Response schemas
    this.validators.set('errorResponse', this.ajv.compile(errorResponseSchema));
    this.validators.set('successResponse', this.ajv.compile(successResponseSchema));
    this.validators.set('healthCheckResponse', this.ajv.compile(healthCheckResponseSchema));
  }

  public validate(schemaName: string, data: unknown): ValidationResult {
    const validator = this.validators.get(schemaName);

    if (!validator) {
      throw new Error(`Schema validator '${schemaName}' not found`);
    }

    const isValid = validator(data);

    if (!isValid) {
      const errors = validator.errors?.map((error) => {
        const field = error.instancePath ? error.instancePath.slice(1) : error.schemaPath;
        return `${field || 'root'}: ${error.message}`;
      }) || ['Unknown validation error'];

      return {
        isValid: false,
        errors,
      };
    }

    return {
      isValid: true,
    };
  }

  public validateCreateUser(data: unknown): ValidationResult {
    return this.validate('createUser', data);
  }

  public validateUpdateUser(data: unknown): ValidationResult {
    return this.validate('updateUser', data);
  }

  public validateGetUserByIdParams(data: unknown): ValidationResult {
    return this.validate('getUserByIdParams', data);
  }

  public validatePaginationQuery(data: unknown): ValidationResult {
    return this.validate('paginationQuery', data);
  }

  public validateErrorResponse(data: unknown): ValidationResult {
    return this.validate('errorResponse', data);
  }

  public validateSuccessResponse(data: unknown): ValidationResult {
    return this.validate('successResponse', data);
  }

  public validateHealthCheckResponse(data: unknown): ValidationResult {
    return this.validate('healthCheckResponse', data);
  }

  // Generic method to get a validator for custom use
  public getValidator(schemaName: string): ValidateFunction | undefined {
    return this.validators.get(schemaName);
  }

  // Method to add new validators dynamically
  public addValidator(name: string, schema: object): void {
    this.validators.set(name, this.ajv.compile(schema));
  }
}

// Export singleton instance
export const schemaValidator = new SchemaValidator();
export { SchemaValidator };
