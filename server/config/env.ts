import {config} from 'dotenv';

config();

export const {
  POSTGRES_USER,
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_PASSWORD,
  POSTGRES_DATABASE,
  JWT_SECRET,
  JWT_EXPIRES_IN
} = process.env;
