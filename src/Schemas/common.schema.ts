export const errorResponseSchema = {
  type: 'object',
  properties: {
    success: {
      type: 'boolean',
      const: false,
    },
    error: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
        },
        code: {
          type: 'string',
        },
        details: {
          oneOf: [
            {
              type: 'array',
              items: {
                type: 'string',
              },
            },
            {
              type: 'object',
            },
          ],
        },
      },
      required: ['message'],
      additionalProperties: false,
    },
  },
  required: ['success', 'error'],
  additionalProperties: false,
} as const;

export const successResponseSchema = {
  type: 'object',
  properties: {
    success: {
      type: 'boolean',
      const: true,
    },
    data: {
      type: 'object',
    },
    meta: {
      type: 'object',
      properties: {
        pagination: {
          type: 'object',
          properties: {
            page: {
              type: 'number',
              minimum: 1,
            },
            limit: {
              type: 'number',
              minimum: 1,
            },
            total: {
              type: 'number',
              minimum: 0,
            },
            totalPages: {
              type: 'number',
              minimum: 0,
            },
          },
          required: ['page', 'limit', 'total', 'totalPages'],
          additionalProperties: false,
        },
      },
      additionalProperties: false,
    },
  },
  required: ['success'],
  additionalProperties: false,
} as const;
