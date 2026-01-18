# JSON Schema Validation with AJV

This directory contains JSON schemas for request and response validation using AJV (Another JSON Schema Validator).

## Structure

```
src/schemas/
├── index.ts              # Main export file
├── types.ts              # TypeScript interfaces and types
├── validator.ts          # AJV validator utility class
├── user.schema.ts        # User-related schemas
├── health.schema.ts      # Health check schemas
├── common.schema.ts      # Common response schemas
└── README.md            # This file
```

## Usage

### Basic Validation in Routes

```typescript
import { validateCreateUser, validateGetUserByIdParams } from '../Middleware/Validator';

// Apply validation middleware to routes
router.post('/users', validateCreateUser(), createUser);
router.get('/users/:id', validateGetUserByIdParams(), getUserById);
```

### Manual Validation

```typescript
import { schemaValidator } from '../schemas/validator';

const result = schemaValidator.validateCreateUser({
  email: 'user@example.com',
  firstName: 'John',
  lastName: 'Doe',
});

if (!result.isValid) {
  console.log('Validation errors:', result.errors);
}
```

### Adding Custom Schemas

1. Define your schema:

```typescript
export const customSchema = {
  type: 'object',
  properties: {
    name: { type: 'string', minLength: 1 },
  },
  required: ['name'],
  additionalProperties: false,
} as const;
```

2. Add to validator:

```typescript
schemaValidator.addValidator('customSchema', customSchema);
```

3. Create convenience function in Validator.ts:

```typescript
export const validateCustom = () => validateBody('customSchema');
```

## Available Schemas

### User Schemas

- `createUserSchema` - Validates user creation requests
- `updateUserSchema` - Validates user update requests (partial)
- `getUserByIdParamsSchema` - Validates user ID parameters
- `paginationQuerySchema` - Validates pagination query parameters

### Common Schemas

- `errorResponseSchema` - Validates error response format
- `successResponseSchema` - Validates success response format

### Health Schemas

- `healthCheckResponseSchema` - Validates health check response format

## Validation Features

- **Email validation**: Uses built-in email format
- **Type coercion**: Disabled for strict validation
- **Additional properties**: Removed automatically
- **Default values**: Applied when specified
- **Pattern matching**: For names and IDs
- **Length constraints**: For strings and arrays
- **Enum validation**: For restricted values

## Error Handling

Validation errors are returned in a consistent format:

```json
{
  "success": false,
  "error": {
    "message": "Validation Error",
    "code": "VALIDATION_FAILED",
    "details": ["email: must be a valid email format", "firstName: must be at least 1 character"]
  }
}
```

## TypeScript Integration

All schemas have corresponding TypeScript interfaces in `types.ts` for type safety:

```typescript
interface CreateUserRequest {
  email: string;
  firstName: string;
  lastName: string;
}
```

## Best Practices

1. **Always validate at route level**: Use middleware for consistent validation
2. **Remove manual validation**: Let AJV handle all validation logic
3. **Use specific error codes**: Include meaningful error codes for client handling
4. **Type safety**: Leverage TypeScript interfaces with schemas
5. **Reusable schemas**: Create modular schemas for common patterns
6. **Test schemas**: Write tests to verify schema validation behavior

## Performance Notes

- Schemas are compiled once at startup for optimal performance
- Use singleton pattern for validator instance
- AJV uses JSON Schema Draft-07 by default
- Schema compilation is cached for repeated use
