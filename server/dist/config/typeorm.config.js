"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeOrmConfig = void 0;
const env = require("./env");
exports.TypeOrmConfig = {
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
            port: parseInt(env.DB_CACHE_PORT),
            host: env.DB_CACHE_HOST,
        },
    },
    synchronize: true,
};
exports.default = exports.TypeOrmConfig;
//# sourceMappingURL=typeorm.config.js.map