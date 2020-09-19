"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_controller_1 = require("./auth/auth.controller");
const user_service_1 = require("./user/user.service");
const auth_module_1 = require("./auth/auth.module");
const typeorm_1 = require("@nestjs/typeorm");
const user_module_1 = require("./user/user.module");
const qa_service_1 = require("./qa/qa.service");
const qa_module_1 = require("./qa/qa.module");
const quiz_module_1 = require("./quiz/quiz.module");
const env = require("../config/env");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: env.POSTGRES_HOST,
                port: parseInt(env.POSTGRES_PORT),
                username: env.POSTGRES_USER,
                password: env.POSTGRES_PASSWORD,
                database: env.POSTGRES_DATABASE,
                entities: ['dist/**/*.entity{.js,.ts}'],
                synchronize: true,
            }), auth_module_1.AuthModule, user_module_1.UserModule, qa_module_1.QaModule, quiz_module_1.QuizModule],
        controllers: [app_controller_1.AppController, auth_controller_1.AuthController],
        providers: [app_service_1.AppService, user_service_1.UserService, qa_service_1.QaService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map