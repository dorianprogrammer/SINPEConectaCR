import { Pool } from 'pg'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

interface AuditEvent {
  userId?: string
  businessId?: string
  action: string
  ip?: string
  userAgent?: string
}

export const logAudit = async (event: AuditEvent): Promise<void> => {
  const {
    userId = null,
    businessId = null,
    action,
    ip = null,
    userAgent = null,
  } = event

  await pool.query(
    `
    INSERT INTO auth_audit_logs (
      user_id,
      business_id,
      action,
      ip_address,
      user_agent,
      created_at
    ) VALUES ($1, $2, $3, $4, $5, NOW())
    `,
    [userId, businessId, action, ip, userAgent]
  )
}