"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const session = require("express-session");
const passport = require("passport");
const dotenv = require("dotenv");
async function bootstrap() {
    dotenv.config();
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(session({
        secret: process.env.SESSION_SECRET,
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.setGlobalPrefix('/api');
    await app.listen(5000);
}
bootstrap();
//# sourceMappingURL=main.js.map