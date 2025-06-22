import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { storage } from '../utils/storage';
import { jwtUtil } from '../utils/jwt';
import { User, LoginRequest, LoginResponse, ApiResponse } from '../types';

const router: Router = Router();

/**
 * 用户登录
 * POST /api/auth/login
 */
router.post('/login', async (req: Request<{}, {}, LoginRequest>, res: Response<ApiResponse<LoginResponse>>) => {
  try {
    const { username, password } = req.body;

    // 验证输入
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        error: '用户名和密码不能为空'
      });
    }

    // 读取用户数据
    const users: User[] = await storage.readJson('users.json', []);
    const user = users.find(u => u.username === username);

    if (!user) {
      return res.status(401).json({
        success: false,
        error: '用户名或密码错误'
      });
    }

    // 验证密码
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        error: '用户名或密码错误'
      });
    }

    // 生成 JWT token
    const token = jwtUtil.generateToken({
      userId: user.id,
      username: user.username,
      role: user.role
    });

    // 返回登录响应
    const response: LoginResponse = {
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

  } catch (error) {
    console.error('登录错误:', error);
    return res.status(500).json({
      success: false,
      error: '服务器内部错误'
    });
  }
});

/**
 * 验证 token
 * GET /api/auth/verify
 */
router.get('/verify', async (req: Request, res: Response<ApiResponse>) => {
  try {
    const authHeader = req.headers.authorization;
    const token = jwtUtil.extractTokenFromHeader(authHeader);

    if (!token) {
      return res.status(401).json({
        success: false,
        error: '未提供 token'
      });
    }

    const decoded = jwtUtil.verifyToken(token);
    
    return res.json({
      success: true,
      data: {
        userId: decoded.userId,
        username: decoded.username,
        role: decoded.role
      },
      message: 'token 有效'
    });

  } catch (error) {
    return res.status(401).json({
      success: false,
      error: '无效的 token'
    });
  }
});

export default router; 