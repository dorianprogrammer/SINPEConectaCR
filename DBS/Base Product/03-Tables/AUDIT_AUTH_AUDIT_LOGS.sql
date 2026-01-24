-- =============================================
-- Autor: Dorian Rodriguez
-- Fecha: 2026-01-24
-- Descripción: Tabla de logs de auditoría de autenticación en el esquema audit
-- =============================================

CREATE TABLE IF NOT EXISTS audit.auth_audit_logs (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID,
  business_id UUID,
  action VARCHAR(50) NOT NULL,
  ip_address VARCHAR(45),
  user_agent TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);
