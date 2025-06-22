import { Response, NextFunction } from 'express';
import { AuthenticatedRequest, ApiResponse } from '../types';
export declare function authMiddleware(req: AuthenticatedRequest, res: Response<ApiResponse>, next: NextFunction): void;
export declare function optionalAuthMiddleware(req: AuthenticatedRequest, _res: Response, next: NextFunction): void;
export declare function adminMiddleware(req: AuthenticatedRequest, res: Response<ApiResponse>, next: NextFunction): void;
//# sourceMappingURL=auth.d.ts.map