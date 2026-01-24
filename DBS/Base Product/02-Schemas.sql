-- =============================================
-- Autor: Dorian Rodriguez
-- Fecha: 2026-01-24
-- Descripción: Creación de esquemas para organización lógica de objetos de base de datos
-- =============================================

-- Esquemas de dominio
CREATE SCHEMA IF NOT EXISTS core;
CREATE SCHEMA IF NOT EXISTS crm;
CREATE SCHEMA IF NOT EXISTS payments;
CREATE SCHEMA IF NOT EXISTS ia;
CREATE SCHEMA IF NOT EXISTS audit;
CREATE SCHEMA IF NOT EXISTS util;
CREATE SCHEMA IF NOT EXISTS repo;
CREATE SCHEMA IF NOT EXISTS secu;

-- Esquemas de procedimientos almacenados
CREATE SCHEMA IF NOT EXISTS auth_proc;
CREATE SCHEMA IF NOT EXISTS crm_proc;
