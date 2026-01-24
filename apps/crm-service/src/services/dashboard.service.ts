import { pool } from '../db/db.util.js';

export type DashboardSummary = {
  contactsTotal: number;
  orders: {
    pending: number;
    paid: number;
    inReview: number;
  };
  pendingTotalCrc: number;
};

export async function getDashboardSummary(params: {
  businessId: string;
}): Promise<DashboardSummary> {
  const q = `SELECT * FROM crm_proc.SP_CRM_DASHBOARD_SUMMARY($1)`;
  const resp = await pool.query(q, [params.businessId]);

  const r = resp.rows[0] ?? {
    contacts_total: 0,
    orders_pending: 0,
    orders_paid: 0,
    orders_in_review: 0,
    pending_total_crc: 0,
  };

  return {
    contactsTotal: Number(r.contacts_total),
    orders: {
      pending: Number(r.orders_pending),
      paid: Number(r.orders_paid),
      inReview: Number(r.orders_in_review),
    },
    pendingTotalCrc: Number(r.pending_total_crc),
  };
}
