import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as env from './env';

export const TypeOrmConfig:TypeOrmModuleOptions = {
  type: 'postgres',
  host: env.POSTGRES_HOST,
  port: parseInt(env.POSTGRES_PORT),
  username: env.POSTGRES_USER,
  password: env.POSTGRES_PASSWORD,
  database: env.POSTGRES_DATABASE,
  entities: ['dist/**/*.entity{.js,.ts}'],
  cache: {
    type: 'redis',
    duration: 60000,
    options: {
      port: 6379,
      host: 'cache',
    },
  },
  synchronize: true,
}

export default TypeOrmConfig;