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
const ws_gaurd_1 = require("./auth/ws.gaurd");
let QuizAttemptGateway = class QuizAttemptGateway {
    constructor() {
        this.logger = new common_1.Logger('AppGateway');
    }
    handleMessage(client, payload) {
        this.logger.log('Received a Message from Client');
        this.server.emit('msgToClient', payload);
    }
    afterInit(server) {
        this.logger.log('Init');
    }
    handleDisconnect(client) {
        this.logger.log(`Client disconnected: ${client.id}`);
    }
    handleConnection(client, ...args) {
        this.logger.log(`Client connected: ${client.id}`);
    }
};
__decorate([
    websockets_1.WebSocketServer(),
    __metadata("design:type", Object)
], QuizAttemptGateway.prototype, "server", void 0);
__decorate([
    common_1.UseGuards(ws_gaurd_1.WsGuard),
    websockets_1.SubscribeMessage('msgToServer'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], QuizAttemptGateway.prototype, "handleMessage", null);
QuizAttemptGateway = __decorate([
    websockets_1.WebSocketGateway(undefined, { transports: ['websocket', 'polling'] })
], QuizAttemptGateway);
exports.QuizAttemptGateway = QuizAttemptGateway;
//# sourceMappingURL=quiz-attempt.gateway.js.map