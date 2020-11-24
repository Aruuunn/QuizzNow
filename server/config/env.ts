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
  //-------------------------
  JWT_SECRET,// FROM .env
} = process.env;
