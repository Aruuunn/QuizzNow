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
exports.QuizzService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const nestjs_typeorm_paginate_1 = require("nestjs-typeorm-paginate");
const question_service_1 = require("../question/question.service");
const typeorm_2 = require("typeorm");
const question_attempt_entity_1 = require("./entities/question_attempt.entity");
const quizz_entity_1 = require("./entities/quizz.entity");
const quizz_attempts_entity_1 = require("./entities/quizz_attempts.entity");
const websockets_1 = require("@nestjs/websockets");
let QuizzService = class QuizzService {
    constructor(questionService, quizRepo, quizAttemptRepo, questionAttemptRepo) {
        this.questionService = questionService;
        this.quizRepo = quizRepo;
        this.quizAttemptRepo = quizAttemptRepo;
        this.questionAttemptRepo = questionAttemptRepo;
        this.logger = new common_1.Logger('QuizzService');
        this.getQuiz = async (id, relations = []) => {
            return await this.quizRepo.findOneOrFail(id, { relations });
        };
        this.createNewQuiz = async (user, quizData) => {
            const newQuiz = new quizz_entity_1.QuizzEntity();
            newQuiz.startDatetime = new Date(quizData.startDatetime);
            newQuiz.endDatetime = new Date(quizData.endDatetime);
            newQuiz.createdBy = user;
            newQuiz.quizzTitle = quizData.quizzTitle;
            const questions = [];
            if (quizData.questions.length !== 0)
                for (let i of quizData.questions) {
                    questions.push(await this.questionService.createNewQuestion(user, i));
                }
            newQuiz.questions = questions;
            await newQuiz.save();
            return newQuiz;
        };
        this.addNewQuestion = async (user, question, quizzId) => {
            const newQuestion = await this.questionService.createNewQuestion(user, question);
            const quiz = await this.quizRepo.findOne({ quizzId }, { relations: ['createdBy'] });
            if (quiz.createdBy.userId !== user.userId) {
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
        this.addOldQuestion = async (user, questionId, quizzId) => {
            const question = await this.questionService.findbyID(questionId);
            const quiz = await this.quizRepo.findOne({ quizzId }, { relations: ['createdBy'] });
            if (!question || !quiz) {
                throw new common_1.BadRequestException('No Question/Quiz Found with the given ID');
            }
            if (!quiz.questions) {
                quiz.questions = [];
            }
            if (quiz.createdBy.userId !== user.userId) {
                throw new common_1.UnauthorizedException();
            }
            quiz.questions.push(question);
            await quiz.save();
            return quiz;
        };
        this.removeQuestion = async (user, questionId, quizzId) => {
            const quiz = await this.quizRepo.findOne({ quizzId }, { relations: ['createdBy'] });
            if (!quiz) {
                throw new common_1.BadRequestException('No Quiz Found with the given ID');
            }
            if (!quiz.questions) {
                quiz.questions = [];
            }
            if (quiz.createdBy.userId !== user.userId) {
                throw new common_1.UnauthorizedException();
            }
            quiz.questions = quiz.questions.filter(q => q.questionId !== questionId);
            await quiz.save();
            return quiz;
        };
        this.removeAllQuestions = async (user, quizzId) => {
            const quiz = await this.quizRepo.findOne({ quizzId }, { relations: ['createdBy'] });
            if (!quiz) {
                throw new common_1.BadRequestException('No Quiz Found with the given ID');
            }
            if (quiz.createdBy.userId !== user.userId) {
                throw new common_1.UnauthorizedException();
            }
            quiz.questions = [];
            await quiz.save();
            return quiz;
        };
        this.updateQuiz = async (user, quizzId, startDatetime, endDatetime, quizzTitle) => {
            const quiz = await this.quizRepo.findOne({ quizzId }, { relations: ['createdBy'] });
            if (!quiz) {
                throw new common_1.BadRequestException('No Quiz Found with the given ID');
            }
            if (quizzTitle) {
                quiz.quizzTitle = quizzTitle;
            }
            if (quiz.createdBy.userId !== user.userId) {
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
        this.deleteQuiz = async (quizzId, userId) => {
            const quiz = await this.quizRepo.findOne(quizzId, {
                relations: ['createdBy'],
            });
            if (!quiz) {
                throw new common_1.BadRequestException();
            }
            console.debug(quiz.createdBy.userId, userId);
            if (quiz.createdBy.userId === userId) {
                await this.quizRepo.delete(quizzId);
            }
            else {
                throw new common_1.UnauthorizedException();
            }
        };
        this.finishQuizAttempt = async (attemptId, user) => {
            const quizAttempt = await this.quizAttemptRepo.findOne(attemptId, {
                relations: ['user'],
            });
            if (user.userId !== quizAttempt.user.userId) {
                throw new websockets_1.WsException('Forbidden');
            }
            if (!quizAttempt) {
                throw new websockets_1.WsException('No Quiz Attempt Found');
            }
            quizAttempt.attemptFinished = true;
            quizAttempt.save();
        };
    }
    canAttemptQuiz(quiz, user, checkForPreviousAttempts = true) {
        const result = quiz &&
            quiz.startDatetime.getTime() < Date.now() &&
            quiz.endDatetime.getTime() > Date.now() &&
            (!checkForPreviousAttempts ||
                user.userQuizAttempts.reduce((t, c) => {
                    if (quiz.quizzId === c.quizz.quizzId) {
                        return !c.attemptFinished;
                    }
                    else {
                        return t;
                    }
                }, true));
        this.logger.debug(result, 'canAttemptQuiz');
        return result;
    }
    async fetchQuizzDetails(user, quizzId) {
        let quizz;
        try {
            quizz = await this.getQuiz(quizzId, ['createdBy']);
        }
        catch (_a) {
            throw new common_1.NotFoundException('Quizz Not Found');
        }
        const data = Object.assign(Object.assign({}, quizz), { canAttemptQuizz: this.canAttemptQuiz(quizz, user), totalNumberOfQuestions: quizz.questions.length, isQuizzAttemptFinished: user.userQuizAttempts.reduce((t, c) => {
                if (c.quizz.quizzId === quizzId) {
                    return c.attemptFinished || quizz.endDatetime.getTime() < Date.now()
                        ? true
                        : false;
                }
                else {
                    return t;
                }
            }, false) });
        return data;
    }
    async fetchQuizzResults(user, quizzId) {
        var _a;
        try {
            const quizzAttempt = user.userQuizAttempts.reduce((t, c) => {
                if (c.quizz.quizzId === quizzId) {
                    return c;
                }
                else
                    return t;
            }, undefined);
            if (!quizzAttempt) {
                throw new common_1.BadRequestException('Quizz Not Found');
            }
            if (quizzAttempt.quizz.endDatetime.getTime() < Date.now()) {
                throw new common_1.BadRequestException('Quizz has not ended Yet. You can only see the results after the Quizz has ended');
            }
            const questions = (_a = quizzAttempt === null || quizzAttempt === void 0 ? void 0 : quizzAttempt.quizz) === null || _a === void 0 ? void 0 : _a.questions;
            const cacheQuestion = {};
            for (let i = 0; i < (questions === null || questions === void 0 ? void 0 : questions.length); i++) {
                cacheQuestion[questions[i].questionId] = i;
            }
            return quizzAttempt === null || quizzAttempt === void 0 ? void 0 : quizzAttempt.questionAttempts.map((o, index) => {
                return {
                    optionChoosed: o === null || o === void 0 ? void 0 : o.optionChoosed,
                    question: questions[cacheQuestion[o === null || o === void 0 ? void 0 : o.questionId]],
                };
            });
        }
        catch (e) {
            this.logger.error(e);
            throw new common_1.InternalServerErrorException();
        }
    }
    async fetchQuestionForQuizAttempt(attemptId, questionNumber, user) {
        const quizAttempt = await this.quizAttemptRepo.findOne(attemptId, {
            relations: ['user'],
        });
        this.logger.debug(quizAttempt, 'fetchQuestionForQuizAttempt');
        if (this.canAttemptQuiz(quizAttempt.quizz, user, false) &&
            !quizAttempt.attemptFinished &&
            quizAttempt.user.userId === user.userId &&
            questionNumber >= 0 &&
            questionNumber < quizAttempt.quizz.questions.length) {
            const question = quizAttempt.quizz.questions[questionNumber];
            const selectedOption = quizAttempt.questionAttempts.reduce((t, c) => {
                if (question && c.questionId === question.questionId) {
                    return c.optionChoosed;
                }
                else {
                    return t;
                }
            }, undefined);
            this.logger.debug(question, `Question returned by fetchQuestionForQuizAttempt for Question Number - ${questionNumber}`);
            return { question, selectedOption };
        }
        else {
            throw new common_1.BadRequestException();
        }
    }
    async attemptQuiz(user, quizId) {
        const quiz = await this.quizRepo.findOne(quizId, {
            relations: ['quizzAttemptsByUsers'],
        });
        const quizAttempt = user.userQuizAttempts.reduce((t, c) => {
            if (c.quizz.quizzId === quiz.quizzId) {
                return c;
            }
            else {
                return t;
            }
        }, undefined);
        if (!this.canAttemptQuiz(quiz, user)) {
            throw new common_1.BadRequestException();
        }
        if (quizAttempt) {
            return quizAttempt.quizzAttemptId;
        }
        const newQuizAttempt = new quizz_attempts_entity_1.default();
        newQuizAttempt.user = user;
        newQuizAttempt.quizz = quiz;
        newQuizAttempt.questionAttempts = [];
        await newQuizAttempt.save();
        this.logger.debug(newQuizAttempt, '[new attemptQuiz]');
        return newQuizAttempt.quizzAttemptId;
    }
    async attemptQuestion(user, questionId, choosedOption, attemptId) {
        try {
            let isNew = false;
            const quizAttempt = await this.quizAttemptRepo.findOne(attemptId, {
                relations: [],
            });
            const question = await this.questionService.findbyID(questionId);
            if (!question ||
                !quizAttempt ||
                !this.canAttemptQuiz(quizAttempt.quizz, user, false)) {
                this.logger.error('Cannot Attempt Question');
                throw new common_1.BadRequestException();
            }
            let questionAttempt = await this.questionAttemptRepo.findOne({
                questionId,
                quizAttempt: { quizzAttemptId: quizAttempt.quizzAttemptId },
            }, { relations: ['quizAttempt'] });
            this.logger.debug({ question, quizAttempt, questionAttempt }, 'attemptQuestion()');
            if (!questionAttempt) {
                isNew = true;
                questionAttempt = new question_attempt_entity_1.QuestionAttemptEntity();
                this.logger.debug(question, 'Question');
                questionAttempt.questionId = question.questionId;
                questionAttempt.quizAttempt = quizAttempt;
            }
            else {
                quizAttempt.totalScore -=
                    questionAttempt.optionChoosed === question.correctAnswer ? 1 : 0;
            }
            questionAttempt.optionChoosed = choosedOption;
            if (isNew) {
                quizAttempt.questionAttempts.push(questionAttempt);
            }
            quizAttempt.totalScore +=
                questionAttempt.optionChoosed === question.correctAnswer ? 1 : 0;
            questionAttempt.save();
            quizAttempt.save();
        }
        catch (e) {
            console.log(e);
        }
    }
    async getQuizzes(user, options) {
        const q = this.quizRepo.createQueryBuilder('q');
        q.where('q.createdBy= :userId', { userId: user.userId });
        q.orderBy('q.updatedAt', 'DESC');
        return await nestjs_typeorm_paginate_1.paginate(q, options);
    }
};
QuizzService = __decorate([
    common_1.Injectable(),
    __param(1, typeorm_1.InjectRepository(quizz_entity_1.QuizzEntity)),
    __param(2, typeorm_1.InjectRepository(quizz_attempts_entity_1.default)),
    __param(3, typeorm_1.InjectRepository(question_attempt_entity_1.QuestionAttemptEntity)),
    __metadata("design:paramtypes", [question_service_1.QuestionService,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], QuizzService);
exports.QuizzService = QuizzService;
//# sourceMappingURL=quizz.service.js.map