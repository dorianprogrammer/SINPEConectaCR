-- =============================================
-- Autor: Dorian Rodriguez
-- Fecha: 2026-01-24
-- Descripción: Creación de la base de datos SINPEConectaCR
-- =============================================

-- Crear base de datos (ejecutar como superusuario)
-- CREATE DATABASE sinpeconectacr
--   WITH OWNER = postgres
--        ENCODING = 'UTF8'
--        LC_COLLATE = 'en_US.UTF-8'
--        LC_CTYPE = 'en_US.UTF-8'
--        TEMPLATE = template0;

-- Conectarse a la base de datos recién creada y habilitar extensiones necesarias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
