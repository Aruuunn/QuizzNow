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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const axios_1 = require("axios");
const user_entity_1 = require("../user/user.entity");
const user_service_1 = require("../user/user.service");
const env_1 = require("../../config/env");
let AuthService = class AuthService {
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.verifyJwt = (token) => {
            return this.jwtService.verify(token, {
                ignoreExpiration: false,
                secret: env_1.JWT_SECRET,
            });
        };
        this.authenticateUser = async (id_token) => {
            try {
                const { data } = await axios_1.default.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${id_token.trim()}`);
                if (!data || !data.email || !data.name) {
                    throw new common_1.BadRequestException();
                }
                const user = await this.userService.findByEmail(data.email);
                if (user) {
                    const payload = { email: user.userEmail };
                    return { user, accessToken: this.jwtService.sign(payload) };
                }
                else {
                    const newUser = new user_entity_1.default();
                    newUser.userEmail = data.email;
                    newUser.userName = data.name;
                    newUser.userPhotoURL = data.picture || '';
                    newUser.save();
                    const payload = { email: newUser.userEmail };
                    return { user: newUser, accessToken: this.jwtService.sign(payload) };
                }
            }
            catch (e) {
                throw new common_1.BadRequestException();
            }
        };
    }
};
AuthService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map