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
const nestjs_typeorm_paginate_1 = require("nestjs-typeorm-paginate");
const new_qa_1 = require("../qa/dto/new.qa");
const qa_entity_1 = require("../qa/qa.entity");
const qa_service_1 = require("../qa/qa.service");
const user_entity_1 = require("../user/user.entity");
const typeorm_2 = require("typeorm");
const question_attempt_entity_1 = require("./question_attempt.entity");
const quiz_entity_1 = require("./quiz.entity");
const quiz_repository_1 = require("./quiz.repository");
const quiz_attempts_entity_1 = require("./quiz_attempts.entity");
let QuizService = class QuizService {
    constructor(qaService, quizRepo, quizAttemptRepo) {
        this.qaService = qaService;
        this.quizRepo = quizRepo;
        this.quizAttemptRepo = quizAttemptRepo;
        this.getQuiz = async (id) => {
            return await this.quizRepo.findOneOrFail(id, { cache: true });
        };
        this.createNewQuiz = async (user, quizData) => {
            const newQuiz = new quiz_entity_1.QuizEntity();
            newQuiz.startDatetime = new Date(quizData.startDatetime);
            newQuiz.endDatetime = new Date(quizData.endDatetime);
            newQuiz.author = user;
            newQuiz.title = quizData.title;
            const questions = [];
            if (quizData.questions.length !== 0)
                for (let i of quizData.questions) {
                    questions.push(await this.qaService.createQuestion(user, i));
                }
            newQuiz.questions = questions;
            await newQuiz.save();
            return newQuiz;
        };
        this.addNewQuestion = async (user, question, quizId) => {
            const newQuestion = await this.qaService.createQuestion(user, question);
            const quiz = await this.quizRepo.findOne({ id: quizId }, { cache: true });
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
            return quiz;
        };
        this.addOldQuestion = async (user, questionId, quizId) => {
            const question = await this.qaService.findbyID(questionId);
            const quiz = await this.quizRepo.findOne({ id: quizId }, { cache: true });
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
            return quiz;
        };
        this.removeQuestion = async (user, questionId, quizId) => {
            const quiz = await this.quizRepo.findOne({ id: quizId }, { cache: true });
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
            return quiz;
        };
        this.removeAllQuestions = async (user, quizId) => {
            const quiz = await this.quizRepo.findOne({ id: quizId }, { cache: true });
            if (!quiz) {
                throw new common_1.BadRequestException('No Quiz Found with the given ID');
            }
            if (quiz.author.id !== user.id) {
                throw new common_1.UnauthorizedException();
            }
            quiz.questions = [];
            await quiz.save();
            return quiz;
        };
        this.updateQuiz = async (user, quizId, startDatetime, endDatetime, title) => {
            const quiz = await this.quizRepo.findOne({ id: quizId });
            if (!quiz) {
                throw new common_1.BadRequestException('No Quiz Found with the given ID');
            }
            if (title) {
                quiz.title = title;
            }
            if (quiz.author.id !== user.id) {
                throw new common_1.UnauthorizedException();
            }
            if (!startDatetime && !endDatetime) {
                throw new common_1.BadRequestException();
            }
            if (startDatetime)
                quiz.startDatetime = new Date(startDatetime);
            if (endDatetime)
                quiz.endDatetime = new Date(endDatetime);
            await quiz.save();
            return quiz;
        };
        this.deleteQuiz = async (id, userId) => {
            const quiz = await this.quizRepo.findOne(id);
            if (!quiz) {
                throw new common_1.BadRequestException();
            }
            if (quiz.author.id === userId) {
                await this.quizRepo.delete(id);
            }
            else {
                throw new common_1.UnauthorizedException();
            }
        };
    }
    canAttemptQuiz(quiz, user) {
        return (quiz &&
            quiz.startDatetime.getTime() < Date.now() &&
            quiz.endDatetime.getTime() > Date.now() &&
            quiz.attempts.reduce((t, c) => {
                if (c.user.id === user.id) {
                    return false;
                }
                else {
                    return t;
                }
            }, true));
    }
    async attemptQuiz(user, quizId) {
        const quiz = await this.quizRepo.findOne(quizId, { cache: true });
        if (!this.canAttemptQuiz(quiz, user)) {
            throw new common_1.BadRequestException();
        }
        const newQuizAttempt = new quiz_attempts_entity_1.QuizAttemptEntity();
        newQuizAttempt.user = user;
        newQuizAttempt.quiz = quiz;
        newQuizAttempt.questionAttempts = [];
        await newQuizAttempt.save();
        return newQuizAttempt.id;
    }
    async attemptQuestion(user, questionId, choosedOption, attemptId) {
        let isNew = false;
        const quizAttempt = await this.quizAttemptRepo.findOne(attemptId, {
            cache: true,
            lock: { mode: 'pessimistic_write' },
        });
        const question = await this.qaService.findbyID(questionId);
        if (!question ||
            !quizAttempt ||
            !this.canAttemptQuiz(quizAttempt.quiz, user)) {
            throw new common_1.BadRequestException();
        }
        let questionAttempt = quizAttempt.questionAttempts.reduce((t, c) => {
            if (c.id === questionId) {
                return c;
            }
            else {
                return t;
            }
        }, undefined);
        if (!questionAttempt) {
            isNew = true;
            questionAttempt = new question_attempt_entity_1.QuestionAttemptEntity();
            questionAttempt.question = question;
            questionAttempt.attempt = quizAttempt;
        }
        else {
            quizAttempt.totalScore -=
                questionAttempt.optionChoosed === question.correctAnswer ? 1 : 0;
        }
        questionAttempt.optionChoosed = choosedOption;
        questionAttempt.save();
        if (isNew) {
            quizAttempt.questionAttempts.push(questionAttempt);
            quizAttempt.totalScore +=
                questionAttempt.optionChoosed === question.correctAnswer ? 1 : 0;
        }
        quizAttempt.save();
    }
    async getQuizzes(user, options) {
        const q = this.quizRepo.createQueryBuilder('q');
        q.where('q.author= :userId', { userId: user.id });
        q.orderBy('q.updatedAt', 'DESC');
        return await nestjs_typeorm_paginate_1.paginate(q, options);
    }
};
QuizService = __decorate([
    common_1.Injectable(),
    __param(1, typeorm_1.InjectRepository(quiz_repository_1.default)),
    __param(2, typeorm_1.InjectRepository(quiz_attempts_entity_1.QuizAttemptEntity)),
    __metadata("design:paramtypes", [qa_service_1.QaService,
        quiz_repository_1.default,
        typeorm_2.Repository])
], QuizService);
exports.QuizService = QuizService;
//# sourceMappingURL=quiz.service.js.map