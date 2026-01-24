-- =============================================
-- Autor: Dorian Rodriguez
-- Fecha: 2026-01-24
-- Descripción: Tabla de contactos en el esquema CRM
-- =============================================

CREATE TABLE IF NOT EXISTS crm.contacts (
  id UUID PRIMARY KEY DEFAULT GEN_RANDOM_UUID(),
  business_id UUID NOT NULL,
  phone VARCHAR(32) NOT NULL,
  name VARCHAR(120),
  email VARCHAR(160),
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (business_id, phone)
);
