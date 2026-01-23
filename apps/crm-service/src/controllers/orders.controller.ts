import type { Request, Response } from 'express';
import { getPagination } from '../utils/pagination.js';
import * as svc from '../services/orders.service.js';

export async function list(req: Request, res: Response) {
  const businessId = req.user!.businessId;
  const { limit, offset, search } = getPagination(req.query);
  const status = (req.query.status ?? '').toString().trim();

  const data = await svc.listOrders({
    businessId,
    status: status || undefined,
    search,
    limit,
    offset,
  });

  return res.status(200).json({ data });
}

export async function create(req: Request, res: Response) {
  const businessId = req.user!.businessId;
  const { contactId, orderCode, totalCrc, status, dueDate, note } = req.body ?? {};

  if (!contactId) return res.status(400).json({ message: 'CONTACT_ID_REQUIRED' });
  if (!orderCode) return res.status(400).json({ message: 'ORDER_CODE_REQUIRED' });
  if (totalCrc === undefined || totalCrc === null)
    return res.status(400).json({ message: 'TOTAL_CRC_REQUIRED' });

  try {
    const data = await svc.createOrder({
      businessId,
      contactId,
      orderCode,
      totalCrc: Number(totalCrc),
      status,
      dueDate,
      note,
    });
    return res.status(201).json({ data });
  } catch (e: any) {
    if (e?.code === '23505') return res.status(409).json({ message: 'ORDER_ALREADY_EXISTS' });
    if (e?.message?.includes('CONTACT_NOT_FOUND'))
      return res.status(404).json({ message: 'CONTACT_NOT_FOUND' });
    throw e;
  }
}

export async function update(req: Request, res: Response) {
  const businessId = req.user!.businessId;
  const id = req.params.id;
  const { totalCrc, dueDate, note } = req.body ?? {};

  const data = await svc.updateOrder({
    businessId,
    id,
    totalCrc: totalCrc !== undefined ? Number(totalCrc) : undefined,
    dueDate: dueDate ?? undefined,
    note: note ?? undefined,
  });

  if (!data) return res.status(404).json({ message: 'NOT_FOUND' });
  return res.status(200).json({ data });
}

export async function updateStatus(req: Request, res: Response) {
  const businessId = req.user!.businessId;
  const id = req.params.id;
  const { status } = req.body ?? {};

  if (!status) return res.status(400).json({ message: 'STATUS_REQUIRED' });

  try {
    const data = await svc.updateOrderStatus({ businessId, id, status });
    if (!data) return res.status(404).json({ message: 'NOT_FOUND' });
    return res.status(200).json({ data });
  } catch (e: any) {
    if (e?.message?.includes('INVALID_STATUS'))
      return res.status(400).json({ message: 'INVALID_STATUS' });
    throw e;
  }
}

export async function remove(req: Request, res: Response) {
  const businessId = req.user!.businessId;
  const id = req.params.id;

  const ok = await svc.deleteOrder({ businessId, id });
  if (!ok) return res.status(404).json({ message: 'NOT_FOUND' });
  return res.status(204).send();
}
