-- =============================================
-- Autor: Dorian Rodriguez
-- Fecha: 2026-01-24
-- Descripción: Índices para búsquedas en logs de auditoría
-- =============================================

CREATE INDEX IF NOT EXISTS idx_audit_business_id ON audit.auth_audit_logs(business_id);
CREATE INDEX IF NOT EXISTS idx_audit_user_id ON audit.auth_audit_logs(user_id);
