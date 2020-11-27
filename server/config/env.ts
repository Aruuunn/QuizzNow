import {config} from 'dotenv';

config();

export const {
  /**
   * PROVIDED BY DOCKER-COMPOSE
   */
  POSTGRES_USER,
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_PASSWORD,
  POSTGRES_DATABASE,
  DB_CACHE_HOST,
  DB_CACHE_PORT,
  NODE_ENV,// should be one of {"dev","test","prod"}
  //-------------------------
  JWT_SECRET,// FROM .env
} = process.env;
