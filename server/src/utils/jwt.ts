import jwt from 'jsonwebtoken';
import { JWTPayload } from '../types';

/**
 * JWT 工具类
 * 提供 token 的生成和验证功能
 */
export class JWTUtil {
  private secret: string;
  private expiresIn: string;

  constructor(secret: string, expiresIn: string = '7d') {
    this.secret = secret;
    this.expiresIn = expiresIn;
  }

  /**
   * 生成 JWT token
   * @param payload JWT 载荷
   */
  generateToken(payload: Omit<JWTPayload, 'iat' | 'exp'>): string {
    return jwt.sign(payload, this.secret, {
      expiresIn: this.expiresIn
    } as jwt.SignOptions);
  }

  /**
   * 验证 JWT token
   * @param token JWT token
   */
  verifyToken(token: string): JWTPayload {
    try {
      return jwt.verify(token, this.secret) as JWTPayload;
    } catch (error) {
      throw new Error('无效的 token');
    }
  }

  /**
   * 从 Authorization header 中提取 token
   * @param authHeader Authorization header
   */
  extractTokenFromHeader(authHeader?: string): string | null {
    if (!authHeader) return null;
    
    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      return null;
    }
    
    return parts[1] || null;
  }

  /**
   * 检查 token 是否即将过期（7天内）
   * @param token JWT token
   */
  isTokenExpiringSoon(token: string): boolean {
    try {
      const decoded = jwt.decode(token) as JWTPayload;
      if (!decoded || !decoded.exp) return true;
      
      const now = Math.floor(Date.now() / 1000);
      const sevenDaysInSeconds = 7 * 24 * 60 * 60;
      
      return (decoded.exp - now) < sevenDaysInSeconds;
    } catch {
      return true;
    }
  }
}

// 导出默认实例（需要在应用启动时初始化）
export let jwtUtil: JWTUtil;

/**
 * 初始化 JWT 工具
 * @param secret JWT 密钥
 * @param expiresIn 过期时间
 */
export function initJWT(secret: string, expiresIn?: string): void {
  jwtUtil = new JWTUtil(secret, expiresIn);
} 