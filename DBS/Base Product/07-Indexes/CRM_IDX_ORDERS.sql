-- =============================================
-- Autor: Dorian Rodriguez
-- Fecha: 2026-01-24
-- Descripción: Índices para búsquedas en la tabla de órdenes
-- =============================================

CREATE INDEX IF NOT EXISTS idx_orders_business_status ON crm.orders(business_id, status);
CREATE INDEX IF NOT EXISTS idx_orders_contact ON crm.orders(contact_id);
