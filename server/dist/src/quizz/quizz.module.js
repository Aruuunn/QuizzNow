"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizzModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const question_module_1 = require("../question/question.module");
const user_module_1 = require("../user/user.module");
const question_attempt_entity_1 = require("./entities/question_attempt.entity");
const quizz_controller_1 = require("./quizz.controller");
const quizz_service_1 = require("./quizz.service");
const quizz_attempts_entity_1 = require("./entities/quizz_attempts.entity");
const quizz_entity_1 = require("./entities/quizz.entity");
let QuizzModule = class QuizzModule {
};
QuizzModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                quizz_entity_1.default,
                quizz_attempts_entity_1.QuizzAttemptEntity,
                question_attempt_entity_1.QuestionAttemptEntity,
            ]),
            user_module_1.UserModule,
            question_module_1.QuestionModule,
        ],
        controllers: [quizz_controller_1.QuizController],
        providers: [quizz_service_1.QuizzService],
        exports: [quizz_service_1.QuizzService],
    })
], QuizzModule);
exports.QuizzModule = QuizzModule;
//# sourceMappingURL=quizz.module.js.map