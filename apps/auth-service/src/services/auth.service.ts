import { RegisterDTO, LoginDTO, JwtPayload } from '../types/auth.types.js';
import { signToken } from '../utils/jwt.util.js';
import { executeSP } from '../db/sp.util.js';

export const register = async (
  data: RegisterDTO,
  context?: { ip?: string; userAgent?: string },
) => {
  const result = await executeSP('auth_proc.SP_AUTH_REGISTER', [
    data.businessName,
    data.businessPhone,
    data.email,
    data.password,
    context?.ip,
    context?.userAgent,
  ]);

  const user = result.rows[0];

  const payload: JwtPayload = {
    sub: user.user_id,
    businessId: user.business_id ?? null,
    role: user.role,
  };

  return {
    token: signToken(payload),
    user: {
      id: user.user_id,
      email: user.email,
      role: user.role,
      businessId: user.business_id,
    },
  };
};

export const login = async (data: LoginDTO, context?: { ip?: string; userAgent?: string }) => {
  const result = await executeSP('auth_proc.SP_AUTH_LOGIN', [
    data.email,
    data.password,
    context?.ip,
    context?.userAgent,
  ]);

  if (result.rowCount === 0) {
    throw new Error('Invalid credentials');
  }

  const user = result.rows[0];

  const payload: JwtPayload = {
    sub: user.user_id,
    businessId: user.business_id ?? null,
    role: user.role,
  };

  return {
    token: signToken(payload),
    user: {
      id: user.user_id,
      email: user.email,
      role: user.role,
      businessId: user.business_id,
    },
  };
};
