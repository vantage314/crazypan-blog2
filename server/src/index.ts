import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { initJWT } from './utils/jwt';
import { storage } from './utils/storage';

// 路由导入
import authRoutes from './routes/auth';
import postsRoutes from './routes/posts';
import commentsRoutes from './routes/comments';
import statsRoutes from './routes/stats';

// 加载环境变量
dotenv.config();

const app = express();
const PORT = process.env['PORT'] || 3002;

// 初始化 JWT
const jwtSecret = process.env['JWT_SECRET'] || 'your-super-secret-jwt-key-change-this-in-production';
const jwtExpiresIn = process.env['JWT_EXPIRES_IN'] || '7d';
initJWT(jwtSecret, jwtExpiresIn);

// 中间件配置
app.use(helmet()); // 安全头
app.use(morgan('combined')); // 日志
app.use(express.json({ limit: '10mb' })); // JSON 解析
app.use(express.urlencoded({ extended: true })); // URL 编码解析

// CORS 配置
const corsOrigin = process.env['CORS_ORIGIN'] || 'http://localhost:3000';
app.use(cors({
  origin: corsOrigin,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// 健康检查
app.get('/health', (_req, res) => {
  res.json({
    success: true,
    message: '服务器运行正常',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// API 路由
app.use('/api/auth', authRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/comments', commentsRoutes);
app.use('/api/stats', statsRoutes);

// 404 处理
app.use('*', (_req, res) => {
  res.status(404).json({
    success: false,
    error: '接口不存在'
  });
});

// 错误处理中间件
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('服务器错误:', err);
  res.status(500).json({
    success: false,
    error: '服务器内部错误'
  });
});

// 初始化数据文件
async function initializeData() {
  try {
    // 创建默认管理员用户
    const users = await storage.readJson('users.json', []);
    if (users.length === 0) {
      const bcrypt = require('bcrypt');
      const defaultPassword = await bcrypt.hash('admin123', 10);
      const defaultUser = {
        id: '1',
        username: 'admin',
        password: defaultPassword,
        role: 'admin' as const,
        createdAt: new Date().toISOString()
      };
      await storage.writeJson('users.json', [defaultUser]);
      console.log('✅ 默认管理员用户已创建: admin / admin123');
    }

    // 初始化其他数据文件
    await storage.readJson('posts.json', []);
    await storage.readJson('comments.json', []);
    await storage.readJson('stats.json', {});

    console.log('✅ 数据文件初始化完成');
  } catch (error) {
    console.error('❌ 数据文件初始化失败:', error);
  }
}

// 启动服务器
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
  } catch (error) {
    console.error('❌ 服务器启动失败:', error);
    process.exit(1);
  }
}

// 优雅关闭
process.on('SIGINT', () => {
  console.log('\n🛑 正在关闭服务器...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 正在关闭服务器...');
  process.exit(0);
});

// 启动服务器
startServer(); 