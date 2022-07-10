import { registerAs } from '@nestjs/config';
import * as Joi from '@hapi/joi';

export const databaseConfig = registerAs('database', () => ({
  mongoUrl: process.env.MONGO_DATABASE_URL,
  postgresUrl: process.env.POSTGRES_DATABASE_URL,
}));
export const databaseSchema = {
  MONGO_DATABASE_URL: Joi.string().required(),
  POSTGRES_DATABASE_URL: Joi.string().required(),
};
