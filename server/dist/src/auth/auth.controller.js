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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user/user.service");
const google_gaurd_1 = require("./strategy/google.gaurd");
let AuthController = class AuthController {
    constructor() { }
    login(res) {
        return res.status(common_1.HttpStatus.OK).send();
    }
    redirect(res) {
        console.log('logged in....');
        return res.status(common_1.HttpStatus.OK).send();
    }
};
__decorate([
    common_1.Get('google'),
    common_1.UseGuards(google_gaurd_1.GoogleGaurd),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "login", null);
__decorate([
    common_1.Get('google/redirect'),
    common_1.UseGuards(google_gaurd_1.GoogleGaurd),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "redirect", null);
AuthController = __decorate([
    common_1.Controller('auth'),
    __metadata("design:paramtypes", [])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map