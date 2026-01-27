import { Request, Response } from 'express';
import {
  platformCreateBusiness,
  platformListBusinesses,
} from '../services/platformBusinesses.service.js';

export async function listPlatformBusinesses(req: Request, res: Response) {
  const items = await platformListBusinesses();
  return res.json({ ok: true, data: items });
}

export async function createPlatformBusiness(req: Request, res: Response) {
  const created = await platformCreateBusiness(req.body);
  return res.status(201).json({ ok: true, data: created });
}
