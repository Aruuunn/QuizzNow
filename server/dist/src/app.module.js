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
const auth_controller_1 = require("./auth/auth.controller");
const auth_module_1 = require("./auth/auth.module");
const typeorm_1 = require("@nestjs/typeorm");
const user_module_1 = require("./user/user.module");
const question_module_1 = require("./question/question.module");
const quizz_module_1 = require("./quizz/quizz.module");
const quizz_attempt_gateway_1 = require("./quizz/quizz-attempt.gateway");
const typeorm_config_1 = require("../config/typeorm.config");
const question_controller_1 = require("./question/question.controller");
const quizz_controller_1 = require("./quizz/quizz.controller");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forRoot(typeorm_config_1.default),
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            question_module_1.QuestionModule,
            quizz_module_1.QuizzModule,
        ],
        controllers: [auth_controller_1.AuthController, question_controller_1.QuestionController, quizz_controller_1.QuizController],
        providers: [quizz_attempt_gateway_1.QuizAttemptGateway],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map