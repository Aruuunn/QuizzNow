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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QaService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../user/user.entity");
const qa_entity_1 = require("./qa.entity");
const qa_repository_1 = require("./qa.repository");
let QaService = class QaService {
    constructor(qaRepo) {
        this.qaRepo = qaRepo;
        this.createQuestion = async (user, questionData) => {
            try {
                const newQuestion = new qa_entity_1.default();
                newQuestion.options = questionData.options;
                newQuestion.correctAnswer = questionData.correctAnswer;
                newQuestion.author = user;
                newQuestion.question = questionData.question;
                await newQuestion.save();
                console.log(newQuestion);
                return newQuestion;
            }
            catch (err) {
                console.log('Problem in creating Question');
                console.log(err);
            }
        };
        this.updateQuestion = async (user, questionData, questionID) => {
            const question = await this.qaRepo.findOne({ id: questionID }, { cache: true });
            if (!question) {
                throw new common_1.BadRequestException();
            }
            if (user.id !== question.author.id) {
                throw new common_1.UnauthorizedException();
            }
            if (questionData.options)
                question.options = questionData.options;
            if (questionData.correctAnswer)
                question.correctAnswer = questionData.correctAnswer;
            if (questionData.question)
                question.question = questionData.question;
            await question.save();
            return question;
        };
        this.deleteQuestion = async (user, questionID) => {
            await this.qaRepo.delete({ id: questionID, author: { id: user.id } });
        };
        this.findbyID = async (questionID) => {
            return this.qaRepo.findOne({ id: questionID }, { cache: true });
        };
    }
};
QaService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(qa_repository_1.default)),
    __metadata("design:paramtypes", [qa_repository_1.default])
], QaService);
exports.QaService = QaService;
//# sourceMappingURL=qa.service.js.map