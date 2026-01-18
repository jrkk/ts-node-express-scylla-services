import { describe, it } from 'mocha';
import { expect } from 'chai';
import { schemaValidator } from '../src/Schemas/validator';

describe('Schema Validation', () => {
  describe('User Schema Validation', () => {
    describe('createUser validation', () => {
      it('should validate a valid user creation request', () => {
        const validUser = {
          email: 'test@example.com',
          firstName: 'John',
          lastName: 'Doe',
        };

        const result = schemaValidator.validateCreateUser(validUser);
        expect(result.isValid).to.be.true;
        expect(result.errors).to.be.undefined;
      });

      it('should reject invalid email format', () => {
        const invalidUser = {
          email: 'invalid-email',
          firstName: 'John',
          lastName: 'Doe',
        };

        const result = schemaValidator.validateCreateUser(invalidUser);
        expect(result.isValid).to.be.false;
        expect(result.errors).to.be.an('array');
        expect(result.errors?.[0]).to.contain('email');
      });

      it('should reject missing required fields', () => {
        const incompleteUser = {
          email: 'test@example.com',
          firstName: 'John',
        };

        const result = schemaValidator.validateCreateUser(incompleteUser);
        expect(result.isValid).to.be.false;
        expect(result.errors).to.be.an('array');
      });

      it('should reject additional properties', () => {
        const userWithExtra = {
          email: 'test@example.com',
          firstName: 'John',
          lastName: 'Doe',
          extraField: 'should be removed',
        };

        const result = schemaValidator.validateCreateUser(userWithExtra);
        // AJV removes additional properties by default
        expect(result.isValid).to.be.true;
        expect(userWithExtra).to.not.have.property('extraField');
      });

      it('should reject invalid name patterns', () => {
        const invalidUser = {
          email: 'test@example.com',
          firstName: '123Invalid',
          lastName: 'Doe',
        };

        const result = schemaValidator.validateCreateUser(invalidUser);
        expect(result.isValid).to.be.false;
        expect(result.errors).to.be.an('array');
        expect(result.errors?.[0]).to.contain('firstName');
      });
    });

    describe('getUserByIdParams validation', () => {
      it('should validate valid UUID parameter', () => {
        const validParams = {
          id: '550e8400-e29b-41d4-a716-446655440000',
        };

        const result = schemaValidator.validateGetUserByIdParams(validParams);
        expect(result.isValid).to.be.true;
      });

      it('should reject invalid UUID format', () => {
        const invalidParams = {
          id: '123',
        };

        const result = schemaValidator.validateGetUserByIdParams(invalidParams);
        expect(result.isValid).to.be.false;
        expect(result.errors).to.be.an('array');
      });

      it('should reject non-UUID string', () => {
        const invalidParams = {
          id: 'not-a-uuid',
        };

        const result = schemaValidator.validateGetUserByIdParams(invalidParams);
        expect(result.isValid).to.be.false;
      });
    });

    describe('updateUser validation', () => {
      it('should validate partial user update', () => {
        const validUpdate = {
          firstName: 'UpdatedName',
        };

        const result = schemaValidator.validateUpdateUser(validUpdate);
        expect(result.isValid).to.be.true;
      });

      it('should validate complete user update', () => {
        const validUpdate = {
          email: 'updated@example.com',
          firstName: 'Updated',
          lastName: 'Name',
        };

        const result = schemaValidator.validateUpdateUser(validUpdate);
        expect(result.isValid).to.be.true;
      });

      it('should reject empty update object', () => {
        const emptyUpdate = {};

        const result = schemaValidator.validateUpdateUser(emptyUpdate);
        expect(result.isValid).to.be.false;
      });
    });

    describe('pagination query validation', () => {
      it('should validate pagination query with defaults', () => {
        const validQuery = {};

        const result = schemaValidator.validatePaginationQuery(validQuery);
        expect(result.isValid).to.be.true;
      });

      it('should validate complete pagination query', () => {
        const validQuery = {
          page: '2',
          limit: '20',
          sortBy: 'email',
          sortOrder: 'desc',
        };

        const result = schemaValidator.validatePaginationQuery(validQuery);
        expect(result.isValid).to.be.true;
      });

      it('should reject invalid sort field', () => {
        const invalidQuery = {
          sortBy: 'invalidField',
        };

        const result = schemaValidator.validatePaginationQuery(invalidQuery);
        expect(result.isValid).to.be.false;
      });
    });
  });

  describe('Error Handling', () => {
    it('should throw error for unknown schema', () => {
      expect(() => {
        schemaValidator.validate('unknownSchema', {});
      }).to.throw("Schema validator 'unknownSchema' not found");
    });
  });
});
