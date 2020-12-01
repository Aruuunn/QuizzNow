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
const class_transformer_1 = require("class-transformer");
const question_entity_1 = require("../question/question.entity");
const quizz_entity_1 = require("../quizz/entities/quizz.entity");
const quizz_attempts_entity_1 = require("../quizz/entities/quizz_attempts.entity");
const typeorm_1 = require("typeorm");
let UserEntity = class UserEntity extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], UserEntity.prototype, "userId", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], UserEntity.prototype, "userName", void 0);
__decorate([
    class_transformer_1.Exclude(),
    typeorm_1.Index(),
    typeorm_1.Column({ unique: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "userEmail", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "userPhotoURL", void 0);
__decorate([
    typeorm_1.OneToMany(type => quizz_entity_1.QuizzEntity, quiz => quiz.createdBy),
    __metadata("design:type", Array)
], UserEntity.prototype, "userCreatedQuizzes", void 0);
__decorate([
    class_transformer_1.Exclude(),
    typeorm_1.OneToMany(type => quizz_attempts_entity_1.QuizzAttemptEntity, quizAttempt => quizAttempt.user, { eager: true }),
    __metadata("design:type", Array)
], UserEntity.prototype, "userQuizAttempts", void 0);
__decorate([
    typeorm_1.OneToMany(type => question_entity_1.default, qa => qa.createdBy),
    __metadata("design:type", Array)
], UserEntity.prototype, "userCreatedQuestions", void 0);
UserEntity = __decorate([
    typeorm_1.Entity()
], UserEntity);
exports.default = UserEntity;
//# sourceMappingURL=user.entity.js.map