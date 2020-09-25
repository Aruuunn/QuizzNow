"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_EXPIRES_IN = exports.JWT_SECRET = exports.POSTGRES_DATABASE = exports.POSTGRES_PASSWORD = exports.POSTGRES_PORT = exports.POSTGRES_HOST = exports.POSTGRES_USER = void 0;
const dotenv_1 = require("dotenv");
dotenv_1.config();
_a = process.env, exports.POSTGRES_USER = _a.POSTGRES_USER, exports.POSTGRES_HOST = _a.POSTGRES_HOST, exports.POSTGRES_PORT = _a.POSTGRES_PORT, exports.POSTGRES_PASSWORD = _a.POSTGRES_PASSWORD, exports.POSTGRES_DATABASE = _a.POSTGRES_DATABASE, exports.JWT_SECRET = _a.JWT_SECRET, exports.JWT_EXPIRES_IN = _a.JWT_EXPIRES_IN;
//# sourceMappingURL=env.js.map