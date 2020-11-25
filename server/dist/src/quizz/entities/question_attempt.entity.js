"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionAttemptEntity = void 0;
const typeorm_1 = require("typeorm");
const quizz_attempts_entity_1 = require("./quizz_attempts.entity");
let QuestionAttemptEntity = class QuestionAttemptEntity extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], QuestionAttemptEntity.prototype, "questionAttemptId", void 0);
__decorate([
    typeorm_1.Column('uuid'),
    __metadata("design:type", String)
], QuestionAttemptEntity.prototype, "questionId", void 0);
__decorate([
    typeorm_1.ManyToOne(type => quizz_attempts_entity_1.default, quizAttempt => quizAttempt.questionAttempts, { onDelete: 'CASCADE' }),
    __metadata("design:type", quizz_attempts_entity_1.default)
], QuestionAttemptEntity.prototype, "quizAttempt", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], QuestionAttemptEntity.prototype, "optionChoosed", void 0);
QuestionAttemptEntity = __decorate([
    typeorm_1.Entity()
], QuestionAttemptEntity);
exports.QuestionAttemptEntity = QuestionAttemptEntity;
exports.default = QuestionAttemptEntity;
//# sourceMappingURL=question_attempt.entity.js.map