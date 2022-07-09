import { registerAs } from '@nestjs/config';
import * as Joi from '@hapi/joi';

export const appConfig = registerAs('app', () => ({
  cors: process.env.ENABLE_CORS,
  port: process.env.PORT,
  nodeEnv: process.env.NODE_ENV,
  logLevel: process.env.LOG_LEVEL,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiration: process.env.JWT_EXPIRATION,
}));

export const appSchema = {
  ENABLE_CORS: Joi.boolean().default(false),
  PORT: Joi.number().default(4000),
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test', 'provision')
    .default('development'),
  LOG_LEVEL: Joi.string().valid('log', 'error', 'warn', 'debug', 'verbose').default('log'),
  JWT_SECRET: Joi.string().default('jwt_secret'),
  JWT_EXPIRATION: Joi.string().default('730h'),
};
