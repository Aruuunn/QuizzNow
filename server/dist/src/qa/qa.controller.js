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
exports.QaController = void 0;
const common_1 = require("@nestjs/common");
const jwt_gaurd_1 = require("../auth/jwt.gaurd");
const new_qa_1 = require("./dto/new.qa");
const update_qa_1 = require("./dto/update.qa");
const qa_service_1 = require("./qa.service");
let QaController = class QaController {
    constructor(qaService) {
        this.qaService = qaService;
    }
    async newQa(qaData, req) {
        return await this.qaService.createQuestion(req.user, qaData);
    }
    async updateQa(qaData, id, req) {
        return await this.qaService.updateQuestion(req.user, qaData, id);
    }
    async deleteQa(id, req, res) {
        await this.qaService.deleteQuestion(req.user, id);
        return res.status(common_1.HttpStatus.OK).send();
    }
};
__decorate([
    common_1.Post('new'),
    common_1.UseGuards(jwt_gaurd_1.default),
    common_1.UsePipes(common_1.ValidationPipe),
    __param(0, common_1.Body()), __param(1, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [new_qa_1.default, Object]),
    __metadata("design:returntype", Promise)
], QaController.prototype, "newQa", null);
__decorate([
    common_1.Patch(':id'),
    common_1.UseGuards(jwt_gaurd_1.default),
    common_1.UsePipes(common_1.ValidationPipe),
    __param(0, common_1.Body()),
    __param(1, common_1.Param('id')),
    __param(2, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_qa_1.default, String, Object]),
    __metadata("design:returntype", Promise)
], QaController.prototype, "updateQa", null);
__decorate([
    common_1.Delete(':id'),
    common_1.UseGuards(jwt_gaurd_1.default),
    common_1.UsePipes(common_1.ValidationPipe),
    __param(0, common_1.Param('id')), __param(1, common_1.Req()), __param(2, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], QaController.prototype, "deleteQa", null);
QaController = __decorate([
    common_1.Controller('qa'),
    __metadata("design:paramtypes", [qa_service_1.QaService])
], QaController);
exports.QaController = QaController;
//# sourceMappingURL=qa.controller.js.map