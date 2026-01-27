// services/platform.service.ts
import { api } from '../lib/api.js';

export type PlatformBusinessRow = {
  business_id: string;
  business_name: string;
  business_phone: string;
  business_active: boolean;
  business_created_at: string;

  user_id: string;
  user_email: string;
  user_role: string;
  user_active: boolean;
  user_created_at: string;
};

export async function platformListBusinesses() {
  const res = await api.get<{ ok: boolean; data: PlatformBusinessRow[] }>(
    '/crm/platform/businesses',
  );

  return res.data;
}
