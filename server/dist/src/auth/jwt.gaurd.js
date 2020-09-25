"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtGaurd = void 0;
const passport_1 = require("@nestjs/passport");
class JwtGaurd extends passport_1.AuthGuard('jwt') {
}
exports.JwtGaurd = JwtGaurd;
exports.default = JwtGaurd;
//# sourceMappingURL=jwt.gaurd.js.map