import 'dotenv/config';

import * as joi from 'joi';

interface EnvVars {
  NODE_ENV: string;
  DB_DIALECT: string;
  DB_PASSWORD: string;
  DB_NAME: string;
  DB_HOST: string;
  DB_PORT: number;
  DB_USERNAME: string;
  PORT: number;
  JWT_SECRET: string;
  JWT_EXPIRES_IN: string;
  ALLOWED_ORIGINS: string[];
  URL: string;
}

const envsSchema = joi.object({
  NODE_ENV: joi.string().valid('development', 'production', 'test').default('development'),
  DB_DIALECT: joi.string().valid('mysql', 'postgres', 'sqlite', 'mariadb').default('mysql'),
  DB_PASSWORD: joi.string().required(),
  DB_NAME: joi.string().required(),
  DB_HOST: joi.string().required(),
  DB_PORT: joi.number().integer().min(1).max(65535).default(3306),
  DB_USERNAME: joi.string().required(),
  PORT: joi.number().integer().min(1).max(65535).default(3100),
  JWT_SECRET: joi.string().required(),
  JWT_EXPIRES_IN: joi.string().default('30d'),
  ALLOWED_ORIGINS: joi.array().items(joi.string()).required(),
  URL: joi.string().uri().required(),
})
.unknown(true);

const { error, value } = envsSchema.validate({ 
  ...process.env,
  ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS?.split(',')
});


if ( error ) {
  throw new Error(`Config validation error: ${ error.message }`);
}

const envVars:EnvVars = value;


export const envs = {
  nodeEnv: envVars.NODE_ENV,
  db: {
    dialect: envVars.DB_DIALECT,
    host: envVars.DB_HOST,
    port: envVars.DB_PORT,
    username: envVars.DB_USERNAME,
    password: envVars.DB_PASSWORD,
    name: envVars.DB_NAME,
  },
  port: envVars.PORT,
  jwt: {
    secret: envVars.JWT_SECRET,
    expiresIn: envVars.JWT_EXPIRES_IN,
  },
  allowedOrigins: envVars.ALLOWED_ORIGINS,
  url: envVars.URL,
}