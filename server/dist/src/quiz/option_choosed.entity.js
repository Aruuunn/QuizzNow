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
exports.QuestionAttempt = void 0;
const qa_entity_1 = require("../qa/qa.entity");
const typeorm_1 = require("typeorm");
let QuestionAttempt = class QuestionAttempt {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], QuestionAttempt.prototype, "id", void 0);
__decorate([
    typeorm_1.ManyToMany(type => qa_entity_1.default),
    typeorm_1.JoinTable(),
    __metadata("design:type", qa_entity_1.default)
], QuestionAttempt.prototype, "question", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], QuestionAttempt.prototype, "optionChoosed", void 0);
QuestionAttempt = __decorate([
    typeorm_1.Entity()
], QuestionAttempt);
exports.QuestionAttempt = QuestionAttempt;
//# sourceMappingURL=option_choosed.entity.js.map