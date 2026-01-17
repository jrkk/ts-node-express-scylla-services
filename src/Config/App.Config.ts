import dotenv from 'dotenv';

dotenv.config();

interface AppConfig {
  environment: string;
  port: number;
  database: {
    contactPoints: string[];
    port: number;
    keyspace: string;
    datacenter: string;
    username?: string;
    password?: string;
  };
}

export const config: AppConfig = {
  environment: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '3000', 10),
  database: {
    contactPoints: process.env.DB_CONTACT_POINTS?.split(',') || ['localhost'],
    port: parseInt(process.env.DB_PORT || '9042', 10),
    keyspace: process.env.DB_KEYSPACE || 'express_db',
    datacenter: process.env.DB_DATACENTER || 'datacenter1',
    username: process.env.DB_USERNAME || undefined,
    password: process.env.DB_PASSWORD || undefined,
  },
};
