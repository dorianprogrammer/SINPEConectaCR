import type { Request, Response } from 'express';
import { getPagination } from '../utils/pagination.js';
import * as svc from '../services/contacts.service.js';

export async function list(req: Request, res: Response) {
  const businessId = req.user!.businessId;
  const { limit, offset, search } = getPagination(req.query);

  const data = await svc.listContacts({ businessId, limit, offset, search });
  return res.status(200).json({ data });
}

export async function create(req: Request, res: Response) {
  const businessId = req.user!.businessId;
  const { phone, name, email, notes } = req.body ?? {};

  if (!phone) return res.status(400).json({ message: 'PHONE_REQUIRED' });

  try {
    const data = await svc.createContact({ businessId, phone, name, email, notes });
    return res.status(201).json({ data });
  } catch (e: any) {
    if (e?.code === '23505') return res.status(409).json({ message: 'CONTACT_ALREADY_EXISTS' });
    throw e;
  }
}

export async function update(req: Request, res: Response) {
  const businessId = req.user!.businessId;
  const id = req.params.id;
  const { phone, name, email, notes } = req.body ?? {};

  const data = await svc.updateContact({ businessId, id, phone, name, email, notes });
  if (!data) return res.status(404).json({ message: 'NOT_FOUND' });
  return res.status(200).json({ data });
}

export async function remove(req: Request, res: Response) {
  const businessId = req.user!.businessId;
  const id = req.params.id;

  try {
    const ok = await svc.deleteContact({ businessId, id });
    if (!ok) return res.status(404).json({ message: 'NOT_FOUND' });
    return res.status(204).send();
  } catch (e: any) {
    if (e?.message?.includes('CONTACT_HAS_ORDERS')) {
      return res.status(409).json({ message: 'CONTACT_HAS_ORDERS' });
    }
    throw e;
  }
}
