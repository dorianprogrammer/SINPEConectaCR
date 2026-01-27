import { executeSP } from '../db/sp.util.js';

export async function platformCreateBusiness(body: any) {
  const b = body.business;
  const u = body.ownerUser;

  const result = await executeSP('SP_CRM_PLATFORM_CREATE_BUSINESS', [
    b.name,
    b.phone,
    u.email,
    u.password,
    u.role ?? 'ADMIN',
    u.isActive ?? true,
    true,
  ]);
  return result.rows[0];
}

export async function platformListBusinesses() {
  const result = await executeSP('SP_CRM_PLATFORM_LIST_BUSINESSES', []);
  return result.rows;
}
