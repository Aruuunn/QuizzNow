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
exports.QuestionService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../user/user.entity");
const typeorm_2 = require("typeorm");
const question_entity_1 = require("./question.entity");
let QuestionService = class QuestionService {
    constructor(questionEntityRepository) {
        this.questionEntityRepository = questionEntityRepository;
        this.logger = new common_1.Logger('QuestionService');
        this.uniqueElements = (arr) => {
            const newArr = [];
            for (let i of arr) {
                if (newArr.indexOf(i) === -1) {
                    newArr.push(i);
                }
            }
            return newArr;
        };
        this.createNewQuestion = async (user, questionData) => {
            try {
                const newQuestion = new question_entity_1.default();
                const multipleChoices = this.uniqueElements(questionData.multipleChoices);
                if (multipleChoices.length < 2) {
                    throw new common_1.BadRequestException();
                }
                newQuestion.multipleChoices = multipleChoices;
                newQuestion.correctAnswer = questionData.correctAnswer;
                newQuestion.createdBy = user;
                newQuestion.questionTitle = questionData.questionTitle;
                await newQuestion.save();
                this.logger.log(`userID: ${user.userId} - Created a new Question ${newQuestion.questionId}`);
                return newQuestion;
            }
            catch (err) {
                this.logger.error(err);
            }
        };
        this.updateQuestion = async (user, questionData, questionId) => {
            const question = await this.questionEntityRepository.findOne({ questionId }, { cache: true, relations: ['createdBy'] });
            if (!question) {
                this.logger.log(`No question found with ID ${questionId}`);
                throw new common_1.BadRequestException();
            }
            if (user.userId !== question.createdBy.userId) {
                this.logger.log(`User with ID - ${user.userId} tried to modify question not made by him/her of ${question.createdBy.userId}`);
                throw new common_1.UnauthorizedException();
            }
            if (questionData.multipleChoices)
                question.multipleChoices = questionData.multipleChoices;
            if (questionData.correctAnswer)
                question.correctAnswer = questionData.correctAnswer;
            if (questionData.questionTitle)
                question.questionTitle = questionData.questionTitle;
            this.logger.log(`Updated Question ${question.questionId}`);
            await question.save();
            return question;
        };
        this.deleteQuestion = async (user, questionId) => {
            this.logger.log(`Deleting Question - ${questionId} created By user - ${user.userId}`);
            await this.questionEntityRepository.delete({
                questionId,
                createdBy: { userId: user.userId },
            });
        };
    }
    async findbyID(questionID) {
        const question = await this.questionEntityRepository.findOne(questionID);
        this.logger.log(`[findByID] ${question ? 'Found' : 'Did not find'} a question with ID ${questionID} `);
        return question;
    }
};
QuestionService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(question_entity_1.default)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], QuestionService);
exports.QuestionService = QuestionService;
exports.default = QuestionService;
//# sourceMappingURL=question.service.js.map