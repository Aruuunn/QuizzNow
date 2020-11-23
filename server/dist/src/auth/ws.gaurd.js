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
exports.WsGuard = void 0;
const common_1 = require("@nestjs/common");
const ws_event_types_1 = require("../../common/ws.event.types");
const user_service_1 = require("../user/user.service");
const auth_service_1 = require("./auth.service");
let WsGuard = class WsGuard {
    constructor(userService, authService) {
        this.userService = userService;
        this.authService = authService;
    }
    async canActivate(context) {
        var _a, _b, _c, _d, _e;
        const bearerToken = (_c = (_b = (_a = context.args[0]) === null || _a === void 0 ? void 0 : _a.handshake) === null || _b === void 0 ? void 0 : _b.query) === null || _c === void 0 ? void 0 : _c.token;
        try {
            const decoded = this.authService.verifyJwt(bearerToken);
            const user = await this.userService.findByEmail(decoded.email);
            let data = context.switchToWs().getData();
            if (typeof data === 'object') {
                data.user = user;
            }
            return true;
        }
        catch (ex) {
            console.log(ex);
            (_e = (_d = context.args[0]) === null || _d === void 0 ? void 0 : _d.server) === null || _e === void 0 ? void 0 : _e.emit(ws_event_types_1.UNAUTHORIZED);
            return false;
        }
    }
};
WsGuard = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        auth_service_1.AuthService])
], WsGuard);
exports.WsGuard = WsGuard;
//# sourceMappingURL=ws.gaurd.js.map