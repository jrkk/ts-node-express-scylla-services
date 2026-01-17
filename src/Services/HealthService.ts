export interface HealthStatus {
  status: string;
  timestamp: string;
  uptime: number;
  environment: string;
}

export class HealthService {
  async checkHealth(): Promise<HealthStatus> {
    return {
      status: 'OK',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
    };
  }
}
