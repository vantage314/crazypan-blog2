"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bcrypt_1 = __importDefault(require("bcrypt"));
const storage_1 = require("../utils/storage");
const jwt_1 = require("../utils/jwt");
const router = (0, express_1.Router)();
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({
                success: false,
                error: '用户名和密码不能为空'
            });
        }
        const users = await storage_1.storage.readJson('users.json', []);
        const user = users.find(u => u.username === username);
        if (!user) {
            return res.status(401).json({
                success: false,
                error: '用户名或密码错误'
            });
        }
        const isValidPassword = await bcrypt_1.default.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({
                success: false,
                error: '用户名或密码错误'
            });
        }
        const token = jwt_1.jwtUtil.generateToken({
            userId: user.id,
            username: user.username,
            role: user.role
        });
        const response = {
            token,
            user: {
                id: user.id,
                username: user.username,
                role: user.role,
                createdAt: user.createdAt
            }
        };
        return res.json({
            success: true,
            data: response,
            message: '登录成功'
        });
    }
    catch (error) {
        console.error('登录错误:', error);
        return res.status(500).json({
            success: false,
            error: '服务器内部错误'
        });
    }
});
router.get('/verify', async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        const token = jwt_1.jwtUtil.extractTokenFromHeader(authHeader);
        if (!token) {
            return res.status(401).json({
                success: false,
                error: '未提供 token'
            });
        }
        const decoded = jwt_1.jwtUtil.verifyToken(token);
        return res.json({
            success: true,
            data: {
                userId: decoded.userId,
                username: decoded.username,
                role: decoded.role
            },
            message: 'token 有效'
        });
    }
    catch (error) {
        return res.status(401).json({
            success: false,
            error: '无效的 token'
        });
    }
});
exports.default = router;
//# sourceMappingURL=auth.js.map