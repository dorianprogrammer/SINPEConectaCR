-- =============================================
-- Autor: Dorian Rodriguez
-- Fecha: 2026-01-24
-- Descripción: Tabla de usuarios en el esquema core
-- =============================================

CREATE TABLE IF NOT EXISTS core.users (
  id UUID PRIMARY KEY,
  email VARCHAR(150) NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role VARCHAR(20) NOT NULL CHECK (role IN ('ADMIN', 'PYME')),
  business_id UUID NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);
