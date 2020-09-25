"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const env = require("./env");
exports.default = {
    type: 'postgres',
    host: env.POSTGRES_HOST,
    port: parseInt(env.POSTGRES_PORT),
    username: env.POSTGRES_USER,
    password: env.POSTGRES_PASSWORD,
    database: env.POSTGRES_DATABASE,
    entities: ['dist/**/*.entity{.js,.ts}'],
    synchronize: true,
};
//# sourceMappingURL=typeorm.js.map