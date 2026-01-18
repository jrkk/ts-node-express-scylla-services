export const healthCheckResponseSchema = {
  type: 'object',
  properties: {
    status: {
      type: 'string',
      enum: ['healthy', 'unhealthy'],
    },
    timestamp: {
      type: 'string',
      format: 'date-time',
    },
    uptime: {
      type: 'number',
      minimum: 0,
    },
    services: {
      type: 'object',
      properties: {
        database: {
          type: 'object',
          properties: {
            status: {
              type: 'string',
              enum: ['connected', 'disconnected', 'error'],
            },
            responseTime: {
              type: 'number',
              minimum: 0,
            },
          },
          required: ['status'],
          additionalProperties: false,
        },
      },
      additionalProperties: false,
    },
  },
  required: ['status', 'timestamp', 'uptime'],
  additionalProperties: false,
} as const;
