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
exports.QaService = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("../user/user.entity");
const typeorm_1 = require("typeorm");
const qa_entity_1 = require("./qa.entity");
const qa_repository_1 = require("./qa.repository");
let QaService = class QaService {
    constructor(connection) {
        this.logger = new common_1.Logger('QaService');
        this.createQuestion = async (user, questionData) => {
            try {
                const newQuestion = new qa_entity_1.default();
                newQuestion.options = questionData.options;
                newQuestion.correctAnswer = questionData.correctAnswer;
                newQuestion.createdBy = user;
                newQuestion.question = questionData.question;
                await newQuestion.save();
                this.logger.log(`userID: ${user.id} - Created a new Question ${newQuestion.id}`);
                return newQuestion;
            }
            catch (err) {
                this.logger.error(err);
            }
        };
        this.updateQuestion = async (user, questionData, questionID) => {
            const question = await this.qaRepo.findOne({ id: questionID }, { cache: true, relations: ['createdBy'] });
            if (!question) {
                this.logger.log(`No question found with ID ${questionID}`);
                throw new common_1.BadRequestException();
            }
            if (user.id !== question.createdBy.id) {
                this.logger.log(`User with ID - ${user.id} tried to modify question not made by him/her of ${question.createdBy.id}`);
                throw new common_1.UnauthorizedException();
            }
            if (questionData.options)
                question.options = questionData.options;
            if (questionData.correctAnswer)
                question.correctAnswer = questionData.correctAnswer;
            if (questionData.question)
                question.question = questionData.question;
            this.logger.log(`Updated Question ${question.id}`);
            await question.save();
            return question;
        };
        this.deleteQuestion = async (user, questionID) => {
            this.logger.log(`Deleting Question - ${questionID} created By user - ${user.id}`);
            await this.qaRepo.delete({ id: questionID, createdBy: { id: user.id } });
        };
        this.qaRepo = connection.getCustomRepository(qa_repository_1.default);
    }
    async findbyID(questionID) {
        const question = await this.qaRepo.findOne(questionID);
        this.logger.log(`[findByID] ${question ? 'Found' : 'Did not find'} a question with ID ${questionID} `);
        return question;
    }
};
QaService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [typeorm_1.Connection])
], QaService);
exports.QaService = QaService;
//# sourceMappingURL=qa.service.js.map