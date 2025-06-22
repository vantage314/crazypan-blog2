import { JWTPayload } from '../types';
export declare class JWTUtil {
    private secret;
    private expiresIn;
    constructor(secret: string, expiresIn?: string);
    generateToken(payload: Omit<JWTPayload, 'iat' | 'exp'>): string;
    verifyToken(token: string): JWTPayload;
    extractTokenFromHeader(authHeader?: string): string | null;
    isTokenExpiringSoon(token: string): boolean;
}
export declare let jwtUtil: JWTUtil;
export declare function initJWT(secret: string, expiresIn?: string): void;
//# sourceMappingURL=jwt.d.ts.map