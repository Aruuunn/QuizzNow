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
exports.QuizzEntity = void 0;
const class_transformer_1 = require("class-transformer");
const question_entity_1 = require("../../question/question.entity");
const user_entity_1 = require("../../user/user.entity");
const typeorm_1 = require("typeorm");
const quizz_attempts_entity_1 = require("./quizz_attempts.entity");
let QuizzEntity = class QuizzEntity extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], QuizzEntity.prototype, "quizzId", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], QuizzEntity.prototype, "quizzTitle", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Date)
], QuizzEntity.prototype, "startDatetime", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Date)
], QuizzEntity.prototype, "endDatetime", void 0);
__decorate([
    class_transformer_1.Exclude(),
    typeorm_1.ManyToMany(type => question_entity_1.default, { eager: true }),
    typeorm_1.JoinTable(),
    __metadata("design:type", Array)
], QuizzEntity.prototype, "questions", void 0);
__decorate([
    typeorm_1.ManyToOne(type => user_entity_1.default, user => user.userCreatedQuizzes, { onDelete: 'CASCADE' }),
    __metadata("design:type", user_entity_1.default)
], QuizzEntity.prototype, "createdBy", void 0);
__decorate([
    class_transformer_1.Exclude(),
    typeorm_1.OneToMany(type => quizz_attempts_entity_1.default, quizAttempt => quizAttempt.quiz, { onDelete: 'CASCADE' }),
    __metadata("design:type", Array)
], QuizzEntity.prototype, "quizzAttemptsByUsers", void 0);
__decorate([
    class_transformer_1.Exclude(),
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], QuizzEntity.prototype, "createdAt", void 0);
__decorate([
    class_transformer_1.Exclude(),
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], QuizzEntity.prototype, "updatedAt", void 0);
QuizzEntity = __decorate([
    typeorm_1.Entity()
], QuizzEntity);
exports.QuizzEntity = QuizzEntity;
exports.default = QuizzEntity;
//# sourceMappingURL=quizz.entity.js.map