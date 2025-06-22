"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const jwt_1 = require("./utils/jwt");
const storage_1 = require("./utils/storage");
const auth_1 = __importDefault(require("./routes/auth"));
const posts_1 = __importDefault(require("./routes/posts"));
const comments_1 = __importDefault(require("./routes/comments"));
const stats_1 = __importDefault(require("./routes/stats"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env['PORT'] || 3001;
const jwtSecret = process.env['JWT_SECRET'] || 'your-super-secret-jwt-key-change-this-in-production';
const jwtExpiresIn = process.env['JWT_EXPIRES_IN'] || '7d';
(0, jwt_1.initJWT)(jwtSecret, jwtExpiresIn);
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)('combined'));
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ extended: true }));
const corsOrigin = process.env['CORS_ORIGIN'] || 'http://localhost:3000';
app.use((0, cors_1.default)({
    origin: corsOrigin,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.get('/health', (_req, res) => {
    res.json({
        success: true,
        message: '服务器运行正常',
        timestamp: new Date().toISOString(),
        version: '1.0.0'
    });
});
app.use('/api/auth', auth_1.default);
app.use('/api/posts', posts_1.default);
app.use('/api/comments', comments_1.default);
app.use('/api/stats', stats_1.default);
app.use('*', (_req, res) => {
    res.status(404).json({
        success: false,
        error: '接口不存在'
    });
});
app.use((err, _req, res, _next) => {
    console.error('服务器错误:', err);
    res.status(500).json({
        success: false,
        error: '服务器内部错误'
    });
});
async function initializeData() {
    try {
        const users = await storage_1.storage.readJson('users.json', []);
        if (users.length === 0) {
            const bcrypt = require('bcrypt');
            const defaultPassword = await bcrypt.hash('admin123', 10);
            const defaultUser = {
                id: '1',
                username: 'admin',
                password: defaultPassword,
                role: 'admin',
                createdAt: new Date().toISOString()
            };
            await storage_1.storage.writeJson('users.json', [defaultUser]);
            console.log('✅ 默认管理员用户已创建: admin / admin123');
        }
        await storage_1.storage.readJson('posts.json', []);
        await storage_1.storage.readJson('comments.json', []);
        await storage_1.storage.readJson('stats.json', {});
        console.log('✅ 数据文件初始化完成');
    }
    catch (error) {
        console.error('❌ 数据文件初始化失败:', error);
    }
}
async function startServer() {
    try {
        await initializeData();
        app.listen(PORT, () => {
            console.log(`🚀 服务器启动成功`);
            console.log(`📍 服务地址: http://localhost:${PORT}`);
            console.log(`🔗 API 文档: http://localhost:${PORT}/health`);
            console.log(`🌍 环境: ${process.env['NODE_ENV'] || 'development'}`);
            console.log(`🔐 JWT 密钥: ${jwtSecret.substring(0, 10)}...`);
            console.log(`📁 数据目录: ${process.env['DATA_DIR'] || './data'}`);
        });
    }
    catch (error) {
        console.error('❌ 服务器启动失败:', error);
        process.exit(1);
    }
}
process.on('SIGINT', () => {
    console.log('\n🛑 正在关闭服务器...');
    process.exit(0);
});
process.on('SIGTERM', () => {
    console.log('\n🛑 正在关闭服务器...');
    process.exit(0);
});
startServer();
//# sourceMappingURL=index.js.map