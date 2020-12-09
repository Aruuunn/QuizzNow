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
exports.QuizController = void 0;
const common_1 = require("@nestjs/common");
const user_decorator_1 = require("../../common/user.decorator");
const user_entity_1 = require("../user/user.entity");
const jwt_gaurd_1 = require("../auth/jwt.gaurd");
const new_question_1 = require("../question/dto/new.question");
const new_quiz_1 = require("./dto/new.quiz");
const update_quizz_1 = require("./dto/update.quizz");
const quizz_service_1 = require("./quizz.service");
let QuizController = class QuizController {
    constructor(quizService) {
        this.quizService = quizService;
    }
    async newQuiz(data, user, res) {
        await this.quizService.createNewQuiz(user, data);
        return res.sendStatus(common_1.HttpStatus.CREATED);
    }
    async startQuizz(quizzId, user) {
        const attemptId = await this.quizService.attemptQuiz(user, quizzId);
        return { attemptId };
    }
    async fetchQuizzDetails(quizzId, user) {
        return await this.quizService.fetchQuizzDetails(user, quizzId);
    }
    async fetchQuizzResults(id, user) {
        return await this.quizService.fetchQuizzResults(user, id);
    }
    async newQuestion(questionData, quizId, user, res) {
        await this.quizService.addNewQuestion(user, questionData, quizId);
        return res.sendStatus(common_1.HttpStatus.CREATED);
    }
    async removeQuestion(questionID, quizId, user, res) {
        await this.quizService.removeQuestion(user, questionID, quizId);
        return res.sendStatus(common_1.HttpStatus.OK);
    }
    async removeAllQuestions(quizId, user, res) {
        await this.quizService.removeAllQuestions(user, quizId);
        return res.sendStatus(common_1.HttpStatus.OK);
    }
    async getQuizzData(user, quizzId) {
        try {
            const quizz = await this.quizService.getQuiz(quizzId, ["createdBy"]);
            if (quizz.createdBy.userId !== user.userId) {
                throw new common_1.BadRequestException();
            }
            delete quizz.createdBy;
            return quizz;
        }
        catch (e) {
            console.log(e);
            throw new common_1.NotFoundException();
        }
    }
    async updateQuizTime(quizzData, quizId, user, res) {
        await this.quizService.updateQuizz(user, quizzData, quizId);
        return res.sendStatus(common_1.HttpStatus.OK);
    }
    async getAttemptData(options, user, quizzId) {
        console.log(options);
        return await this.quizService.getQuizzAttemptData(quizzId, user, options);
    }
    async get(options, req) {
        return await this.quizService.getQuizzes(req.user, options);
    }
    async deleteQuiz(id, req, res) {
        await this.quizService.deleteQuiz(id, req.user.userId);
        return res.sendStatus(common_1.HttpStatus.OK);
    }
};
__decorate([
    common_1.Post('new'),
    common_1.UseGuards(jwt_gaurd_1.default),
    common_1.UsePipes(common_1.ValidationPipe),
    __param(0, common_1.Body()),
    __param(1, user_decorator_1.User()),
    __param(2, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [new_quiz_1.NewQuizDto,
        user_entity_1.default, Object]),
    __metadata("design:returntype", Promise)
], QuizController.prototype, "newQuiz", null);
__decorate([
    common_1.Get(':qid/start'),
    common_1.UseGuards(jwt_gaurd_1.default),
    __param(0, common_1.Param('qid')),
    __param(1, user_decorator_1.User()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_entity_1.default]),
    __metadata("design:returntype", Promise)
], QuizController.prototype, "startQuizz", null);
__decorate([
    common_1.Get(':id/details'),
    common_1.UsePipes(common_1.ClassSerializerInterceptor),
    common_1.UseGuards(jwt_gaurd_1.default),
    __param(0, common_1.Param('id')),
    __param(1, user_decorator_1.User()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_entity_1.default]),
    __metadata("design:returntype", Promise)
], QuizController.prototype, "fetchQuizzDetails", null);
__decorate([
    common_1.Get(':id/results'),
    common_1.UsePipes(common_1.ClassSerializerInterceptor),
    common_1.UseGuards(jwt_gaurd_1.default),
    __param(0, common_1.Param('id')), __param(1, user_decorator_1.User()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_entity_1.default]),
    __metadata("design:returntype", Promise)
], QuizController.prototype, "fetchQuizzResults", null);
__decorate([
    common_1.Post(':qid/question/new'),
    common_1.UseGuards(jwt_gaurd_1.default),
    common_1.UsePipes(common_1.ValidationPipe),
    __param(0, common_1.Body()),
    __param(1, common_1.Param('qid')),
    __param(2, user_decorator_1.User()),
    __param(3, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [new_question_1.default, String, user_entity_1.default, Object]),
    __metadata("design:returntype", Promise)
], QuizController.prototype, "newQuestion", null);
__decorate([
    common_1.Delete(':qid/question/:questionID'),
    common_1.UseGuards(jwt_gaurd_1.default),
    common_1.UsePipes(common_1.ValidationPipe),
    __param(0, common_1.Param('questionID')),
    __param(1, common_1.Param('qid')),
    __param(2, user_decorator_1.User()),
    __param(3, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, user_entity_1.default, Object]),
    __metadata("design:returntype", Promise)
], QuizController.prototype, "removeQuestion", null);
__decorate([
    common_1.Delete(':qid/all/questions'),
    common_1.UseGuards(jwt_gaurd_1.default),
    common_1.UsePipes(common_1.ValidationPipe),
    __param(0, common_1.Param('qid')),
    __param(1, user_decorator_1.User()),
    __param(2, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_entity_1.default, Object]),
    __metadata("design:returntype", Promise)
], QuizController.prototype, "removeAllQuestions", null);
__decorate([
    common_1.Get(':quizzId/data'),
    common_1.UseGuards(jwt_gaurd_1.default),
    __param(0, user_decorator_1.User()),
    __param(1, common_1.Param('quizzId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.default, String]),
    __metadata("design:returntype", Promise)
], QuizController.prototype, "getQuizzData", null);
__decorate([
    common_1.Patch(':qid'),
    common_1.UseGuards(jwt_gaurd_1.default),
    common_1.UsePipes(common_1.ValidationPipe),
    __param(0, common_1.Body()),
    __param(1, common_1.Param('qid')),
    __param(2, user_decorator_1.User()),
    __param(3, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_quizz_1.UpdateQuizDto, Object, user_entity_1.default, Object]),
    __metadata("design:returntype", Promise)
], QuizController.prototype, "updateQuizTime", null);
__decorate([
    common_1.Get(":qid/attempt-details"),
    common_1.UseGuards(jwt_gaurd_1.default),
    __param(0, common_1.Query()), __param(1, user_decorator_1.User()), __param(2, common_1.Param('qid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_entity_1.default, String]),
    __metadata("design:returntype", Promise)
], QuizController.prototype, "getAttemptData", null);
__decorate([
    common_1.Get(),
    common_1.UseGuards(jwt_gaurd_1.default),
    __param(0, common_1.Query()), __param(1, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], QuizController.prototype, "get", null);
__decorate([
    common_1.Delete(':id'),
    common_1.UseGuards(jwt_gaurd_1.default),
    __param(0, common_1.Param('id')), __param(1, common_1.Req()), __param(2, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], QuizController.prototype, "deleteQuiz", null);
QuizController = __decorate([
    common_1.Controller('quizz'),
    __metadata("design:paramtypes", [quizz_service_1.QuizzService])
], QuizController);
exports.QuizController = QuizController;
//# sourceMappingURL=quizz.controller.js.map