import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

interface Config {
  port: number;
  nodeEnv: string;
  mongoUri: string;
  jwtSecret: string;
  jwtExpiresIn: string;
  corsOrigin: string;
}

export const config: Config = {
  port: parseInt(process.env.PORT || '3000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/shared-payment-system',
  jwtSecret: process.env.JWT_SECRET || 'your-super-secret-key-change-in-production',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1d',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173'
};

// Validate required environment variables
const requiredEnvs: Array<keyof Config> = ['mongoUri', 'jwtSecret'];

requiredEnvs.forEach(env => {
  if (!process.env[env.toUpperCase()]) {
    console.warn(`Warning: ${env.toUpperCase()} environment variable is not set. Using default value.`);
  }
});

export default config;