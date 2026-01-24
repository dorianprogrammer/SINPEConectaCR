-- =============================================
-- Autor: Dorian Rodriguez
-- Fecha: 2026-01-24
-- Descripción: Índice para búsquedas por email en la tabla de usuarios
-- =============================================

CREATE INDEX IF NOT EXISTS idx_users_email ON core.users(email);
