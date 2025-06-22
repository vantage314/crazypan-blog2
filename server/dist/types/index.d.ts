import { Request } from 'express';
export interface User {
    id: string;
    username: string;
    password: string;
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
export interface Comment {
    id: string;
    content: string;
    author: string;
    createdAt: string;
    approved: boolean;
}
export interface Stats {
    [slug: string]: {
        views: number;
        likes: number;
    };
}
export interface JWTPayload {
    userId: string;
    username: string;
    role: string;
    iat: number;
    exp: number;
}
export interface AuthenticatedRequest<P = any, ResBody = any, ReqBody = any> extends Request<P, ResBody, ReqBody> {
    user?: JWTPayload;
}
export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    message?: string;
    error?: string;
}
//# sourceMappingURL=index.d.ts.map