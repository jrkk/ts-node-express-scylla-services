// User-related types
export interface CreateUserRequest {
  email: string;
  firstName: string;
  lastName: string;
}

export interface UpdateUserRequest {
  email?: string;
  firstName?: string;
  lastName?: string;
}

export interface GetUserByIdParams {
  id: string;
}

export interface PaginationQuery {
  page?: string;
  limit?: string;
  sortBy?: 'id' | 'email' | 'firstName' | 'lastName' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}

// Response types
export interface ErrorResponse {
  success: false;
  error: {
    message: string;
    code?: string;
    details?: string[] | object;
  };
}

export interface SuccessResponse<T = unknown> {
  success: true;
  data?: T;
  meta?: {
    pagination?: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}

// Health check types
export interface HealthCheckResponse {
  status: 'healthy' | 'unhealthy';
  timestamp: string;
  uptime: number;
  services?: {
    database?: {
      status: 'connected' | 'disconnected' | 'error';
      responseTime?: number;
    };
  };
}

// Schema validation types
export type SchemaType = 'body' | 'params' | 'query';

export interface ValidationResult {
  isValid: boolean;
  errors?: string[];
}
