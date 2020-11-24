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
const user_entity_1 = require("../user/user.entity");
const typeorm_1 = require("typeorm");
let QuestionEntity = class QuestionEntity extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], QuestionEntity.prototype, "questionId", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], QuestionEntity.prototype, "questionTitle", void 0);
__decorate([
    typeorm_1.Column(),
    class_transformer_1.Exclude(),
    __metadata("design:type", String)
], QuestionEntity.prototype, "correctAnswer", void 0);
__decorate([
    class_transformer_1.Transform(options => options.map((o) => String.fromCharCode.apply(null, new Uint16Array(o)) ||
        String.fromCharCode.apply(null, new Uint16Array(o.data)))),
    typeorm_1.Column('bytea', { array: true }),
    __metadata("design:type", Array)
], QuestionEntity.prototype, "multipleChoices", void 0);
__decorate([
    class_transformer_1.Exclude(),
    typeorm_1.ManyToOne(type => user_entity_1.default, user => user.userCreatedQuestions),
    __metadata("design:type", user_entity_1.default)
], QuestionEntity.prototype, "createdBy", void 0);
QuestionEntity = __decorate([
    typeorm_1.Entity()
], QuestionEntity);
exports.default = QuestionEntity;
//# sourceMappingURL=question.entity.js.map