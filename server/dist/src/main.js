"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const session = require("express-session");
const passport = require("passport");
const dotenv = require("dotenv");
const redisConnect = require("connect-redis");
const redis = require("redis");
let RedisStore = redisConnect(session);
let redisClient = redis.createClient({
    host: process.env.REDIS_SESSION_STORE_HOST,
    port: parseInt(process.env.REDIS_SESSION_STORE_PORT),
    connect_timeout: 1000,
});
async function bootstrap() {
    dotenv.config();
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        store: new RedisStore({ client: redisClient }),
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.setGlobalPrefix('/api');
    await app.listen(5000);
}
bootstrap();
//# sourceMappingURL=main.js.map