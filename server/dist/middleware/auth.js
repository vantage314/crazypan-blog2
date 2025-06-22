"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = authMiddleware;
exports.optionalAuthMiddleware = optionalAuthMiddleware;
exports.adminMiddleware = adminMiddleware;
const jwt_1 = require("../utils/jwt");
function authMiddleware(req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        const token = jwt_1.jwtUtil.extractTokenFromHeader(authHeader);
        if (!token) {
            res.status(401).json({
                success: false,
                error: '未提供认证 token'
            });
            return;
        }
        const decoded = jwt_1.jwtUtil.verifyToken(token);
        req.user = decoded;
        next();
    }
    catch (error) {
        res.status(403).json({
            success: false,
            error: '无效的认证 token'
        });
    }
}
function optionalAuthMiddleware(req, _res, next) {
    try {
        const authHeader = req.headers.authorization;
        const token = jwt_1.jwtUtil.extractTokenFromHeader(authHeader);
        if (token) {
            const decoded = jwt_1.jwtUtil.verifyToken(token);
            req.user = decoded;
        }
        next();
    }
    catch (error) {
        next();
    }
}
function adminMiddleware(req, res, next) {
    if (!req.user) {
        res.status(401).json({
            success: false,
            error: '需要认证'
        });
        return;
    }
    if (req.user.role !== 'admin') {
        res.status(403).json({
            success: false,
            error: '需要管理员权限'
        });
        return;
    }
    next();
}
//# sourceMappingURL=auth.js.map