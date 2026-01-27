import { UserRole } from '../models/user.model.js';

export type AuthUser = {
  userId: string;
  businessId: string;
  role: string;
};

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}

export interface JwtPayload {
  sub: string;
  businessId?: string | null;
  role: UserRole;
}
