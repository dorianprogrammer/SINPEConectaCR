-- =============================================
-- Autor: Dorian Rodriguez
-- Fecha: 2026-01-24
-- Descripción: Tabla de órdenes/facturas en el esquema CRM
-- =============================================

CREATE TABLE IF NOT EXISTS crm.orders (
  id UUID PRIMARY KEY DEFAULT GEN_RANDOM_UUID(),
  business_id UUID NOT NULL,
  contact_id UUID NOT NULL,
  order_code VARCHAR(40) NOT NULL,
  total_crc INTEGER NOT NULL CHECK (total_crc >= 0),
  status VARCHAR(20) NOT NULL
    CHECK (status IN ('PENDING', 'PAID', 'IN_REVIEW')),
  due_date DATE,
  note TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (business_id, order_code)
);
