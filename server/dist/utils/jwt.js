"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtUtil = exports.JWTUtil = void 0;
exports.initJWT = initJWT;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class JWTUtil {
    constructor(secret, expiresIn = '7d') {
        this.secret = secret;
        this.expiresIn = expiresIn;
    }
    generateToken(payload) {
        return jsonwebtoken_1.default.sign(payload, this.secret, {
            expiresIn: this.expiresIn
        });
    }
    verifyToken(token) {
        try {
            return jsonwebtoken_1.default.verify(token, this.secret);
        }
        catch (error) {
            throw new Error('无效的 token');
        }
    }
    extractTokenFromHeader(authHeader) {
        if (!authHeader)
            return null;
        const parts = authHeader.split(' ');
        if (parts.length !== 2 || parts[0] !== 'Bearer') {
            return null;
        }
        return parts[1] || null;
    }
    isTokenExpiringSoon(token) {
        try {
            const decoded = jsonwebtoken_1.default.decode(token);
            if (!decoded || !decoded.exp)
                return true;
            const now = Math.floor(Date.now() / 1000);
            const sevenDaysInSeconds = 7 * 24 * 60 * 60;
            return (decoded.exp - now) < sevenDaysInSeconds;
        }
        catch {
            return true;
        }
    }
}
exports.JWTUtil = JWTUtil;
function initJWT(secret, expiresIn) {
    exports.jwtUtil = new JWTUtil(secret, expiresIn);
}
//# sourceMappingURL=jwt.js.map