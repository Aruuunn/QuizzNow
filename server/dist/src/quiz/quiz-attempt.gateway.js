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
const quiz_service_1 = require("./quiz.service");
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
        this.logger.log(`Client disconnected: ${client.id}`);
    }
    handleConnection(client, ...args) {
        this.logger.log(`Client connected: ${client.id}`);
    }
    async fetchQuizDetails(server, data) {
        try {
            const quiz = await this.quizService.getQuiz(data.payload);
            if (Date.now() < new Date(quiz.startDatetime).getTime() || Date.now() > new Date(quiz.endDatetime).getTime()) {
                delete quiz.questions;
            }
            server.emit(ws_event_types_1.RECEIVED_QUIZ_DETAILS, class_transformer_1.classToPlain(quiz));
        }
        catch (e) {
            server.emit(ws_event_types_1.RECEIVED_QUIZ_DETAILS, null);
        }
    }
};
__decorate([
    websockets_1.WebSocketServer(),
    __metadata("design:type", Object)
], QuizAttemptGateway.prototype, "server", void 0);
__decorate([
    websockets_1.SubscribeMessage(ws_event_types_1.FETCH_QUIZ_DETAILS),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], QuizAttemptGateway.prototype, "fetchQuizDetails", null);
QuizAttemptGateway = __decorate([
    common_1.UseGuards(ws_gaurd_1.WsGuard),
    websockets_1.WebSocketGateway(undefined, { transports: ['websocket', 'polling'] }),
    __metadata("design:paramtypes", [quiz_service_1.QuizService])
], QuizAttemptGateway);
exports.QuizAttemptGateway = QuizAttemptGateway;
//# sourceMappingURL=quiz-attempt.gateway.js.map