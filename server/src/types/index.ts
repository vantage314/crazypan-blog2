import { Request } from 'express';

// 用户相关类型
export interface User {
  id: string;
  username: string;
  password: string; // 加密后的密码
  role: 'admin' | 'user';
  createdAt: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: Omit<User, 'password'>;
}

// 文章相关类型
export interface Post {
  slug: string;
  title: string;
  excerpt?: string;
  content: string;
  tags: string[];
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PostMeta {
  slug: string;
  title: string;
  excerpt?: string;
  tags: string[];
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

// 留言相关类型
export interface Comment {
  id: string;
  content: string;
  author: string;
  createdAt: string;
  approved: boolean;
}

// 统计数据相关类型
export interface Stats {
  [slug: string]: {
    views: number;
    likes: number;
  };
}

// JWT 载荷类型
export interface JWTPayload {
  userId: string;
  username: string;
  role: string;
  iat: number;
  exp: number;
}

// 请求扩展类型
export interface AuthenticatedRequest<P = any, ResBody = any, ReqBody = any> extends Request<P, ResBody, ReqBody> {
  user?: JWTPayload;
}

// API 响应类型
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
} 