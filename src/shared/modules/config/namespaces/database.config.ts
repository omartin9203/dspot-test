import { registerAs } from '@nestjs/config';
import * as Joi from '@hapi/joi';

export const databaseConfig = registerAs('database', () => ({
  connectString: process.env.DATABASE_CONNECT_STRING,
}));
export const databaseSchema = {
  DATABASE_CONNECT_STRING: Joi
    .string()
    .required(),
};
