"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const qa_module_1 = require("../qa/qa.module");
const qa_service_1 = require("../qa/qa.service");
const user_module_1 = require("../user/user.module");
const question_attempt_entity_1 = require("./question_attempt.entity");
const quiz_controller_1 = require("./quiz.controller");
const quiz_repository_1 = require("./quiz.repository");
const quiz_service_1 = require("./quiz.service");
const quiz_attempts_entity_1 = require("./quiz_attempts.entity");
let QuizModule = class QuizModule {
};
QuizModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                quiz_repository_1.default,
                quiz_attempts_entity_1.QuizAttemptEntity,
                question_attempt_entity_1.QuestionAttemptEntity,
            ]),
            user_module_1.UserModule,
            qa_module_1.QaModule,
        ],
        controllers: [quiz_controller_1.QuizController],
        providers: [quiz_service_1.QuizService, qa_service_1.QaService],
        exports: [quiz_service_1.QuizService],
    })
], QuizModule);
exports.QuizModule = QuizModule;
//# sourceMappingURL=quiz.module.js.map