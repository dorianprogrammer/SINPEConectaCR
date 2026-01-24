-- =============================================
-- Autor: Dorian Rodriguez
-- Fecha: 2026-01-24
-- Descripción: Índice para búsquedas por business_id en la tabla de usuarios
-- =============================================

CREATE INDEX IF NOT EXISTS idx_users_business_id ON core.users(business_id);
