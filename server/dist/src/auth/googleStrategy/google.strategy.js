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
exports.GoogleStrategy = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const passport_google_oauth20_1 = require("passport-google-oauth20");
const dotenv_1 = require("dotenv");
const user_entity_1 = require("../../user/user.entity");
const domain_1 = require("../../../config/domain");
const user_service_1 = require("../../user/user.service");
dotenv_1.config();
let GoogleStrategy = class GoogleStrategy extends passport_1.PassportStrategy(passport_google_oauth20_1.Strategy, 'google') {
    constructor(userService) {
        super({
            clientID: process.env.GOOGLE_CLIENTID,
            clientSecret: process.env.GOOGLE_OAUTH_SECRET,
            callbackURL: `${domain_1.default}/auth/google/redirect`,
            scope: ['email', 'profile'],
        });
        this.userService = userService;
        this.validate = async (accessToken, refreshToken, profile, done) => {
            const { name, emails, photos } = profile;
            if (!emails || !emails[0]) {
                done('Email should not be empty');
                return;
            }
            const user = await this.userService.findByEmail(emails[0].value);
            if (!user) {
                const newUser = new user_entity_1.default();
                newUser.email = emails[0].value;
                newUser.name = name.givenName + ' ' + name.familyName;
                if (photos && photos.length !== 0)
                    newUser.photoURL = photos[0].value || '';
                newUser.save();
                console.log(newUser);
                done(null, newUser);
                return;
            }
            else {
                if (photos && photos.length !== 0 && user.photoURL !== photos[0].value) {
                    user.photoURL = photos[0].value;
                    await user.save();
                }
            }
            done(null, user);
        };
    }
};
GoogleStrategy = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [user_service_1.UserService])
], GoogleStrategy);
exports.GoogleStrategy = GoogleStrategy;
//# sourceMappingURL=google.strategy.js.map