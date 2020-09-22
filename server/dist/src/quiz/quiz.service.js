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
exports.QuizService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const new_qa_1 = require("../qa/dto/new.qa");
const qa_entity_1 = require("../qa/qa.entity");
const qa_service_1 = require("../qa/qa.service");
const user_entity_1 = require("../user/user.entity");
const quiz_entity_1 = require("./quiz.entity");
const quiz_repository_1 = require("./quiz.repository");
let QuizService = class QuizService {
    constructor(qaService, quizRepo) {
        this.qaService = qaService;
        this.quizRepo = quizRepo;
        this.createNewQuiz = async (user, quizData) => {
            const newQuiz = new quiz_entity_1.QuizEntity();
            newQuiz.startDatetime = new Date(quizData.startDatetime);
            newQuiz.endDatetime = new Date(quizData.endDatetime);
            newQuiz.author = user;
            const questions = [];
            if (quizData.questions.length !== 0)
                for (let i of quizData.questions) {
                    questions.push(await this.qaService.createQuestion(user, i));
                }
            newQuiz.questions = questions;
            console.log("saving ...");
            await newQuiz.save();
        };
        this.addNewQuestion = async (user, question, quizId) => {
            const newQuestion = await this.qaService.createQuestion(user, question);
            const quiz = await this.quizRepo.findOne({ id: quizId });
            if (quiz.author.id !== user.id) {
                throw new common_1.UnauthorizedException();
            }
            if (!quiz) {
                throw new common_1.BadRequestException('Invalid Quiz ID');
            }
            if (!quiz.questions) {
                quiz.questions = [];
            }
            quiz.questions.push(newQuestion);
            await quiz.save();
        };
        this.addOldQuestion = async (user, questionId, quizId) => {
            const question = await this.qaService.findbyID(questionId);
            const quiz = await this.quizRepo.findOne({ id: quizId });
            if (!question || !quiz) {
                throw new common_1.BadRequestException('No Question/Quiz Found with the given ID');
            }
            if (!quiz.questions) {
                quiz.questions = [];
            }
            if (quiz.author.id !== user.id) {
                throw new common_1.UnauthorizedException();
            }
            quiz.questions.push(question);
            await quiz.save();
        };
        this.removeQuestion = async (user, questionId, quizId) => {
            const quiz = await this.quizRepo.findOne({ id: quizId });
            if (!quiz) {
                throw new common_1.BadRequestException('No Quiz Found with the given ID');
            }
            if (!quiz.questions) {
                quiz.questions = [];
            }
            if (quiz.author.id !== user.id) {
                throw new common_1.UnauthorizedException();
            }
            quiz.questions = quiz.questions.filter(q => q.id !== questionId);
            await quiz.save();
        };
    }
};
QuizService = __decorate([
    common_1.Injectable(),
    __param(1, typeorm_1.InjectRepository(quiz_repository_1.default)),
    __metadata("design:paramtypes", [qa_service_1.QaService,
        quiz_repository_1.default])
], QuizService);
exports.QuizService = QuizService;
//# sourceMappingURL=quiz.service.js.map