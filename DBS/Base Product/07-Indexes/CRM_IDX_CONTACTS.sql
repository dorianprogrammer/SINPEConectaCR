-- =============================================
-- Autor: Dorian Rodriguez
-- Fecha: 2026-01-24
-- Descripción: Índice para búsquedas en la tabla de contactos
-- =============================================

CREATE INDEX IF NOT EXISTS idx_contacts_business ON crm.contacts(business_id);
