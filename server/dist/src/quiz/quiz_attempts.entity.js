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
exports.QuizAttemptEntity = void 0;
const user_entity_1 = require("../user/user.entity");
const typeorm_1 = require("typeorm");
const quiz_entity_1 = require("./quiz.entity");
const question_attempt_entity_1 = require("./question_attempt.entity");
let QuizAttemptEntity = class QuizAttemptEntity extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], QuizAttemptEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.ManyToOne(type => quiz_entity_1.QuizEntity, quiz => quiz.attempts, { eager: true, onDelete: 'CASCADE' }),
    __metadata("design:type", quiz_entity_1.QuizEntity)
], QuizAttemptEntity.prototype, "quiz", void 0);
__decorate([
    typeorm_1.ManyToOne(type => user_entity_1.default, user => user.attempts),
    __metadata("design:type", user_entity_1.default)
], QuizAttemptEntity.prototype, "user", void 0);
__decorate([
    typeorm_1.OneToMany(type => question_attempt_entity_1.QuestionAttemptEntity, questionAttempt => questionAttempt.attempt, { onDelete: 'CASCADE' }),
    __metadata("design:type", Array)
], QuizAttemptEntity.prototype, "questionAttempts", void 0);
__decorate([
    typeorm_1.Column({ default: 0 }),
    __metadata("design:type", Number)
], QuizAttemptEntity.prototype, "totalScore", void 0);
__decorate([
    typeorm_1.Column({ default: false }),
    __metadata("design:type", Boolean)
], QuizAttemptEntity.prototype, "attemptFinished", void 0);
QuizAttemptEntity = __decorate([
    typeorm_1.Entity()
], QuizAttemptEntity);
exports.QuizAttemptEntity = QuizAttemptEntity;
//# sourceMappingURL=quiz_attempts.entity.js.map