"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const user_module_1 = require("../user/user.module");
const user_service_1 = require("../user/user.service");
const env_1 = require("../../config/env");
const Jwt_strategy_1 = require("./Jwt.strategy");
const auth_service_1 = require("./auth.service");
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    common_1.Module({
        imports: [passport_1.PassportModule.register({
                defaultStrategy: 'jwt',
                session: false,
            }), user_module_1.UserModule, jwt_1.JwtModule.register({
                secret: env_1.JWT_SECRET,
                signOptions: {
                    expiresIn: env_1.JWT_EXPIRES_IN,
                }
            })],
        providers: [user_service_1.UserService, Jwt_strategy_1.JwtStrategy, auth_service_1.AuthService],
        exports: [Jwt_strategy_1.JwtStrategy, auth_service_1.AuthService]
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map