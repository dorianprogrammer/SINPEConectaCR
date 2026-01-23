import { pool } from '../db/db.util.js';

export type Contact = {
  id: string;
  businessId: string;
  phone: string;
  name: string | null;
  email: string | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
};

const normalizePhone = (phone: string) => phone.replace(/[^\d+]/g, '').trim();

const mapRow = (r: any): Contact => ({
  id: r.id,
  businessId: r.business_id,
  phone: r.phone,
  name: r.name,
  email: r.email,
  notes: r.notes,
  createdAt: r.created_at,
  updatedAt: r.updated_at,
});

export async function listContacts(params: {
  businessId: string;
  search: string;
  limit: number;
  offset: number;
}) {
  const { businessId, search, limit, offset } = params;

  const q = `SELECT * FROM SP_CRM_CONTACT_LIST($1, $2, $3, $4)`;
  const resp = await pool.query(q, [businessId, search ?? null, limit, offset]);

  return resp.rows.map(mapRow);
}

export async function createContact(input: {
  businessId: string;
  phone: string;
  name?: string;
  email?: string;
  notes?: string;
}) {
  const phone = normalizePhone(input.phone);

  const q = `SELECT * FROM SP_CRM_CONTACT_CREATE($1, $2, $3, $4, $5)`;
  const resp = await pool.query(q, [
    input.businessId,
    phone,
    input.name ?? null,
    input.email ?? null,
    input.notes ?? null,
  ]);

  return mapRow(resp.rows[0]);
}

export async function updateContact(params: {
  businessId: string;
  id: string;
  phone?: string;
  name?: string | null;
  email?: string | null;
  notes?: string | null;
}) {
  const q = `SELECT * FROM SP_CRM_CONTACT_UPDATE($1, $2, $3, $4, $5, $6)`;
  const resp = await pool.query(q, [
    params.businessId,
    params.id,
    params.phone !== undefined ? normalizePhone(params.phone) : null,
    params.name ?? null,
    params.email ?? null,
    params.notes ?? null,
  ]);

  if (!resp.rows.length) return null;
  return mapRow(resp.rows[0]);
}

export async function deleteContact(params: { businessId: string; id: string }) {
  const q = `SELECT * FROM SP_CRM_CONTACT_DELETE($1, $2)`;
  const resp = await pool.query(q, [params.businessId, params.id]);
  return Boolean(resp.rows[0]?.deleted);
}
