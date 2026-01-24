-- =============================================
-- Autor: Dorian Rodriguez
-- Fecha: 2026-01-24
-- Descripción: Tabla de items de órdenes en el esquema CRM
-- =============================================

CREATE TABLE IF NOT EXISTS crm.order_items (
  id UUID PRIMARY KEY DEFAULT GEN_RANDOM_UUID(),
  order_id UUID NOT NULL,
  name VARCHAR(140) NOT NULL,
  qty INTEGER NOT NULL CHECK (qty > 0),
  unit_price_crc INTEGER NOT NULL CHECK (unit_price_crc >= 0)
);
