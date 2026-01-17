export const createUserSchema = {
  type: 'object',
  properties: {
    email: {
      type: 'string',
      format: 'email',
      maxLength: 255,
    },
    firstName: {
      type: 'string',
      minLength: 1,
      maxLength: 100,
      pattern: '^[a-zA-Z\\s\\-]+$',
    },
    lastName: {
      type: 'string',
      minLength: 1,
      maxLength: 100,
      pattern: '^[a-zA-Z\\s\\-]+$',
    },
  },
  required: ['email', 'firstName', 'lastName'],
  additionalProperties: false,
} as const;

export const updateUserSchema = {
  type: 'object',
  properties: {
    email: {
      type: 'string',
      format: 'email',
      maxLength: 255,
    },
    firstName: {
      type: 'string',
      minLength: 1,
      maxLength: 100,
      pattern: '^[a-zA-Z\\s\\-]+$',
    },
    lastName: {
      type: 'string',
      minLength: 1,
      maxLength: 100,
      pattern: '^[a-zA-Z\\s\\-]+$',
    },
  },
  additionalProperties: false,
  minProperties: 1,
} as const;

export const getUserByIdParamsSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      pattern: '^[1-9]\\d*$',
    },
  },
  required: ['id'],
  additionalProperties: false,
} as const;

export const paginationQuerySchema = {
  type: 'object',
  properties: {
    page: {
      type: 'string',
      pattern: '^[1-9]\\d*$',
      default: '1',
    },
    limit: {
      type: 'string',
      pattern: '^[1-9]\\d*$',
      default: '10',
    },
    sortBy: {
      type: 'string',
      enum: ['id', 'email', 'firstName', 'lastName', 'createdAt'],
      default: 'id',
    },
    sortOrder: {
      type: 'string',
      enum: ['asc', 'desc'],
      default: 'asc',
    },
  },
  additionalProperties: false,
} as const;
