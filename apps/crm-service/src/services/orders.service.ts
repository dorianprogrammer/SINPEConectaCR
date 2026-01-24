import { pool } from '../db/db.util.js';

export type OrderStatus = 'PENDING' | 'PAID' | 'IN_REVIEW';

export type Order = {
  id: string;
  businessId: string;
  contactId: string;
  orderCode: string;
  totalCrc: number;
  status: OrderStatus;
  dueDate: string | null;
  note: string | null;
  createdAt: string;
  updatedAt: string;
};

const mapRow = (r: any): Order => ({
  id: r.id,
  businessId: r.business_id,
  contactId: r.contact_id,
  orderCode: r.order_code,
  totalCrc: Number(r.total_crc),
  status: r.status,
  dueDate: r.due_date,
  note: r.note,
  createdAt: r.created_at,
  updatedAt: r.updated_at,
});

export async function listOrders(params: {
  businessId: string;
  status?: string;
  search?: string;
  limit: number;
  offset: number;
}) {
  const q = `SELECT * FROM crm_proc.SP_CRM_ORDER_LIST($1, $2, $3, $4, $5)`;
  const resp = await pool.query(q, [
    params.businessId,
    params.status ?? null,
    params.search ?? null,
    params.limit,
    params.offset,
  ]);
  return resp.rows.map(mapRow);
}

export async function createOrder(input: {
  businessId: string;
  contactId: string;
  orderCode: string;
  totalCrc: number;
  status?: OrderStatus;
  dueDate?: string;
  note?: string;
}) {
  const q = `SELECT * FROM crm_proc.SP_CRM_ORDER_CREATE($1, $2, $3, $4, $5, $6, $7)`;
  const resp = await pool.query(q, [
    input.businessId,
    input.contactId,
    input.orderCode,
    input.totalCrc,
    input.status ?? 'PENDING',
    input.dueDate ?? null,
    input.note ?? null,
  ]);
  return mapRow(resp.rows[0]);
}

export async function updateOrder(params: {
  businessId: string;
  id: string;
  totalCrc?: number;
  dueDate?: string | null;
  note?: string | null;
}) {
  const q = `SELECT * FROM crm_proc.SP_CRM_ORDER_UPDATE($1, $2, $3, $4, $5)`;
  const resp = await pool.query(q, [
    params.businessId,
    params.id,
    params.totalCrc ?? null,
    params.dueDate ?? null,
    params.note ?? null,
  ]);
  if (!resp.rows.length) return null;
  return mapRow(resp.rows[0]);
}

export async function updateOrderStatus(params: {
  businessId: string;
  id: string;
  status: OrderStatus;
}) {
  const q = `SELECT * FROM crm_proc.SP_CRM_ORDER_UPDATE_STATUS($1, $2, $3)`;
  const resp = await pool.query(q, [params.businessId, params.id, params.status]);
  if (!resp.rows.length) return null;
  return mapRow(resp.rows[0]);
}

export async function deleteOrder(params: { businessId: string; id: string }) {
  const q = `SELECT * FROM crm_proc.SP_CRM_ORDER_DELETE($1, $2)`;
  const resp = await pool.query(q, [params.businessId, params.id]);
  return Boolean(resp.rows[0]?.deleted);
}
