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
exports.QuizEntity = void 0;
const class_transformer_1 = require("class-transformer");
const qa_entity_1 = require("../qa/qa.entity");
const user_entity_1 = require("../user/user.entity");
const typeorm_1 = require("typeorm");
const quiz_attempts_entity_1 = require("./quiz_attempts.entity");
let QuizEntity = class QuizEntity extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], QuizEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Date)
], QuizEntity.prototype, "startDatetime", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], QuizEntity.prototype, "title", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Date)
], QuizEntity.prototype, "endDatetime", void 0);
__decorate([
    typeorm_1.ManyToMany(type => qa_entity_1.default, { eager: true }),
    typeorm_1.JoinTable(),
    __metadata("design:type", Array)
], QuizEntity.prototype, "questions", void 0);
__decorate([
    typeorm_1.ManyToOne(type => user_entity_1.default, user => user.quizzes, { eager: true }),
    __metadata("design:type", user_entity_1.default)
], QuizEntity.prototype, "author", void 0);
__decorate([
    typeorm_1.OneToMany(type => quiz_attempts_entity_1.QuizAttemptEntity, quizAttempt => quizAttempt.quiz),
    __metadata("design:type", Array)
], QuizEntity.prototype, "attempts", void 0);
__decorate([
    class_transformer_1.Exclude(),
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], QuizEntity.prototype, "createdAt", void 0);
__decorate([
    class_transformer_1.Exclude(),
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], QuizEntity.prototype, "updatedAt", void 0);
QuizEntity = __decorate([
    typeorm_1.Entity()
], QuizEntity);
exports.QuizEntity = QuizEntity;
//# sourceMappingURL=quiz.entity.js.map