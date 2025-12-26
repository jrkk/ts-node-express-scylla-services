import dotenv from 'dotenv';

dotenv.config();

interface AppConfig {
  environment: string;
  port: number;
  database: {
    host: string;
    port: number;
    name: string;
    username: string;
    password: string;
    dialect: string;
  };
}

export const config: AppConfig = {
  environment: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '3000', 10),
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306', 10),
    name: process.env.DB_NAME || 'express_db',
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || 'password',
    dialect: 'mysql',
  },
};
