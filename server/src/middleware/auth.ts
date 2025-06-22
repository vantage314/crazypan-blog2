import { Response, NextFunction } from 'express';
import { jwtUtil } from '../utils/jwt';
import { AuthenticatedRequest, ApiResponse } from '../types';

/**
 * JWT 认证中间件
 * 验证请求头中的 Authorization token
 */
export function authMiddleware(
  req: AuthenticatedRequest,
  res: Response<ApiResponse>,
  next: NextFunction
): void {
  try {
    const authHeader = req.headers.authorization;
    const token = jwtUtil.extractTokenFromHeader(authHeader);
    
    if (!token) {
      res.status(401).json({
        success: false,
        error: '未提供认证 token'
      });
      return;
    }

    // 验证 token
    const decoded = jwtUtil.verifyToken(token);
    req.user = decoded;
    
    next();
  } catch (error) {
    res.status(403).json({
      success: false,
      error: '无效的认证 token'
    });
  }
}

/**
 * 可选认证中间件
 * 如果提供了 token 就验证，没有提供就跳过
 */
export function optionalAuthMiddleware(
  req: AuthenticatedRequest,
  _res: Response,
  next: NextFunction
): void {
  try {
    const authHeader = req.headers.authorization;
    const token = jwtUtil.extractTokenFromHeader(authHeader);
    
    if (token) {
      const decoded = jwtUtil.verifyToken(token);
      req.user = decoded;
    }
    
    next();
  } catch (error) {
    // 验证失败时继续执行，但不设置用户信息
    next();
  }
}

/**
 * 管理员权限中间件
 * 验证用户是否具有管理员权限
 */
export function adminMiddleware(
  req: AuthenticatedRequest,
  res: Response<ApiResponse>,
  next: NextFunction
): void {
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