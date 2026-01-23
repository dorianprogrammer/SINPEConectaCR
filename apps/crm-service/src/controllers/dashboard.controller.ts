import type { Request, Response } from 'express';
import * as svc from '../services/dashboard.service.js';

export async function summary(req: Request, res: Response) {
  const businessId = req.user!.businessId;
  const data = await svc.getDashboardSummary({ businessId });
  return res.status(200).json({ data });
}
