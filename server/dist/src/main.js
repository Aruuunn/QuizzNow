"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const passport = require("passport");
const dotenv = require("dotenv");
async function bootstrap() {
    dotenv.config();
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(passport.initialize());
    app.setGlobalPrefix('/api');
    app.enableCors();
    await app.listen(5000);
}
bootstrap();
//# sourceMappingURL=main.js.map