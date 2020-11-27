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
exports.QuizAttemptGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const common_1 = require("@nestjs/common");
const ws_gaurd_1 = require("../auth/ws.gaurd");
const ws_event_types_1 = require("../../common/ws.event.types");
const quizz_service_1 = require("./quizz.service");
const class_transformer_1 = require("class-transformer");
let QuizAttemptGateway = class QuizAttemptGateway {
    constructor(quizService) {
        this.quizService = quizService;
        this.logger = new common_1.Logger('AppGateway');
    }
    afterInit() {
        this.logger.log('Init');
    }
    handleDisconnect(client) {
        this.logger.log(`Client disconnected: ${client.id} ${client.conn.remoteAddress}`);
    }
    handleConnection(client, ...args) {
        this.logger.log(`Client connected: ${client.id} ${client.conn.remoteAddress}`);
    }
    async finishQuiz(server, data) {
        try {
            const { payload: { attemptId }, user, } = data;
            await this.quizService.finishQuizAttempt(attemptId, user);
        }
        catch (e) {
            console.log(e);
            server.emit(ws_event_types_1.ERROR);
        }
    }
    async fetchQuizDetails(server, data) {
        const { user, payload: { quizzId }, } = data;
        try {
            let quiz;
            try {
                quiz = await this.quizService.getQuiz(quizzId, ['createdBy']);
            }
            catch (e) {
                return server.emit(ws_event_types_1.NOT_FOUND);
            }
            server.emit(ws_event_types_1.RECEIVED_QUIZ_DETAILS, {
                payload: Object.assign(Object.assign({}, class_transformer_1.classToPlain(quiz)), { canAttemptQuizz: this.quizService.canAttemptQuiz(quiz, data.user), totalNumberOfQuestions: quiz.questions.length, isQuizzAttemptFinished: user.userAttemptedQuizzes.reduce((t, c) => {
                        if (c.quizz.quizzId === quizzId) {
                            return c.attemptFinished ||
                                quiz.endDatetime.getTime() < Date.now()
                                ? true
                                : false;
                        }
                        else {
                            return t;
                        }
                    }, false) }),
            });
        }
        catch (e) {
            console.log(e);
            server.emit(ws_event_types_1.ERROR);
        }
    }
    async startQuiz(server, data) {
        try {
            const attemptId = await this.quizService.attemptQuiz(data.user, data.payload.quizId);
            server.emit(ws_event_types_1.FETCH_ATTEMPT_ID, { payload: { attemptId } });
        }
        catch (_) {
            console.log(_);
            server.emit(ws_event_types_1.ERROR);
        }
    }
    async fetchQuestion(server, data) {
        try {
            const { payload: { attemptId, questionNumber }, user, } = data;
            const { question, selectedOption, } = await this.quizService.fetchQuestionForQuizAttempt(attemptId, questionNumber, user);
            server.emit(ws_event_types_1.RECEIVED_QUESTION, {
                payload: { question: class_transformer_1.classToPlain(question), selectedOption },
            });
        }
        catch (e) {
            console.log(e);
            server.emit(ws_event_types_1.ERROR);
        }
    }
    async attemptQuestion(server, data) {
        try {
            const { payload: { selectedOption, questionId, attemptId }, user, } = data;
            await this.quizService.attemptQuestion(user, questionId, selectedOption, attemptId);
        }
        catch (e) {
            this.logger.error(e);
            server.emit(ws_event_types_1.ERROR);
        }
    }
};
__decorate([
    websockets_1.WebSocketServer(),
    __metadata("design:type", Object)
], QuizAttemptGateway.prototype, "server", void 0);
__decorate([
    websockets_1.SubscribeMessage(ws_event_types_1.FINISH),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], QuizAttemptGateway.prototype, "finishQuiz", null);
__decorate([
    websockets_1.SubscribeMessage(ws_event_types_1.FETCH_QUIZ_DETAILS),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], QuizAttemptGateway.prototype, "fetchQuizDetails", null);
__decorate([
    websockets_1.SubscribeMessage(ws_event_types_1.START),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], QuizAttemptGateway.prototype, "startQuiz", null);
__decorate([
    websockets_1.SubscribeMessage(ws_event_types_1.FETCH_QUESTION),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], QuizAttemptGateway.prototype, "fetchQuestion", null);
__decorate([
    websockets_1.SubscribeMessage(ws_event_types_1.ATTEMPT_QUESTION),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], QuizAttemptGateway.prototype, "attemptQuestion", null);
QuizAttemptGateway = __decorate([
    common_1.UseGuards(ws_gaurd_1.WsGuard),
    websockets_1.WebSocketGateway(undefined, { transports: ['websocket', 'polling'] }),
    __metadata("design:paramtypes", [quizz_service_1.QuizzService])
], QuizAttemptGateway);
exports.QuizAttemptGateway = QuizAttemptGateway;
//# sourceMappingURL=quizz-attempt.gateway.js.map