import type { Request, Response, NextFunction } from 'express';

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const userId = req.header('X-USER-ID');
  const businessId = req.header('X-BUSINESS-ID');
  const role = req.header('X-ROLE');

  if (!userId || !businessId || !role) {
    return res.status(401).json({ message: 'UNAUTHORIZED' });
  }

  req.user = { userId, businessId, role };
  next();
}
