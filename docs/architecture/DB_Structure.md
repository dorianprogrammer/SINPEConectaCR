# Database Structure (DBS) · SINPEConectaCR

![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14%2B-336791?style=for-the-badge&logo=postgresql&logoColor=white)
![Schemas](https://img.shields.io/badge/Schemas-Domain_Driven-8e44ad?style=for-the-badge)
![Stored Procedures](https://img.shields.io/badge/Stored_Procedures-Qualified_Names-27ae60?style=for-the-badge)
![Multi-tenant](https://img.shields.io/badge/Multi--Tenant-Core-3498db?style=for-the-badge)

> Arquitectura de base de datos orientada a dominios y procedimientos, con llamadas calificadas por schema.  
> Fecha: 2026-01-24

## Author

- 💻 David Artavia Arias  
  Full Stack Developer · Arquitectura de Datos & Sistemas · Costa Rica  
  ![DB Architecture](https://img.shields.io/badge/DB_Architecture-e74c3c?style=flat-square)
  ![Backend Services](https://img.shields.io/badge/Backend_Services-2ecc71?style=flat-square)
  ![Frontend Dev](https://img.shields.io/badge/Frontend_Dev-f39c12?style=flat-square)

---

## Overview

La arquitectura DBS organiza la base de datos de SINPEConectaCR con:
- Separación por **schemas de dominio** (entidades centrales, CRM, auditoría, etc.)
- **Schemas de procedimientos** por dominio (auth_proc, crm_proc)
- **Archivos SQL pequeños** y focalizados (tablas, SPs, índices, datos iniciales)
- Invocación desde la aplicación con **nombres calificados por schema** (sin search_path, sin wrappers en public)

Esto favorece escalabilidad, seguridad y claridad para equipos que trabajan en distintos módulos del sistema.

---

## Schemas

Dominios:
- core — businesses, users
- crm — contacts, orders, order_items
- payments — ingestión/normalización SINPE (futuro)
- ia — OCR/LLM y extracción de comprobantes (futuro)
- audit — auditoría y logs
- util — auxiliares y tablas de soporte
- repo — vistas y reportería (históricos, ETLs, logs)
- secu — opcional; datos sensibles con controles reforzados

Procedimientos:
- auth_proc — stored procedures de autenticación
- crm_proc — stored procedures del CRM

> Decisión clave: las llamadas se hacen siempre con **nombres calificados por schema** (ej. `auth_proc.SP_AUTH_LOGIN`).  
> No se depende de `search_path`. No se usan wrappers en `public`.

---

## Folder Layout (DBS)

Todos los SQL se organizan bajo la carpeta “DBS” (Database Structure), con nombres y jerarquía en inglés:

```
DBS/
└── Base Product/
    ├── 01-Create_DB.sql
    ├── 02-Schemas.sql
    ├── 03-Tables/
    │   ├── CORE_BUSINESSES.sql
    │   ├── CORE_USERS.sql
    │   ├── AUDIT_AUTH_AUDIT_LOGS.sql
    │   ├── CRM_CONTACTS.sql
    │   ├── CRM_ORDERS.sql
    │   └── CRM_ORDER_ITEMS.sql
    ├── 04-Procedures/
    │   ├── AUTH_SP_AUTH_REGISTER.sql
    │   ├── AUTH_SP_AUTH_LOGIN.sql
    │   ├── CRM_SP_CRM_DASHBOARD_SUMMARY.sql
    │   ├── CRM_SP_CRM_ORDER_LIST.sql
    │   ├── CRM_SP_CRM_ORDER_CREATE.sql
    │   ├── CRM_SP_CRM_ORDER_UPDATE.sql
    │   ├── CRM_SP_CRM_ORDER_UPDATE_STATUS.sql
    │   ├── CRM_SP_CRM_ORDER_DELETE.sql
    │   ├── CRM_SP_CRM_CONTACT_LIST.sql
    │   ├── CRM_SP_CRM_CONTACT_CREATE.sql
    │   ├── CRM_SP_CRM_CONTACT_UPDATE.sql
    │   └── CRM_SP_CRM_CONTACT_DELETE.sql
    ├── 05-Primary_Keys.sql
    ├── 06-Foreign_Keys.sql
    ├── 07-Indexes/
    │   ├── CORE_IDX_USERS_EMAIL.sql
    │   ├── CORE_IDX_USERS_BUSINESS_ID.sql
    │   ├── AUDIT_IDX_AUTH_LOGS.sql
    │   ├── CRM_IDX_CONTACTS.sql
    │   └── CRM_IDX_ORDERS.sql
    ├── 08-Initial_Loads.sql
```

---

## Provisioning Order

Para preparar una base limpia:

1. 02-Schemas.sql  
2. 03-Tables/*  
3. 04-Procedures/*  
4. 07-Indexes/*  
5. 08-Initial_Loads.sql

Nota: 01-Create_DB.sql es informativo; la creación de la base suele ejecutarse fuera del pipeline de migraciones.

---

## Schema Creation (example)

```sql
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Domain schemas
CREATE SCHEMA IF NOT EXISTS core;
CREATE SCHEMA IF NOT EXISTS crm;
CREATE SCHEMA IF NOT EXISTS payments;
CREATE SCHEMA IF NOT EXISTS ia;
CREATE SCHEMA IF NOT EXISTS audit;
CREATE SCHEMA IF NOT EXISTS util;
CREATE SCHEMA IF NOT EXISTS repo;

-- Procedure schemas
CREATE SCHEMA IF NOT EXISTS auth_proc;
CREATE SCHEMA IF NOT EXISTS crm_proc;

-- Optional sensitive schema
CREATE SCHEMA IF NOT EXISTS secu;
```

---

## Tables (examples)

```sql
-- core.businesses
CREATE TABLE IF NOT EXISTS core.businesses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(150) NOT NULL,
  phone VARCHAR(30) NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);
```

```sql
-- core.users
CREATE TABLE IF NOT EXISTS core.users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(150) NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role VARCHAR(20) NOT NULL CHECK (role IN ('ADMIN', 'PYME')),
  business_id UUID NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  CONSTRAINT fk_users_business
    FOREIGN KEY (business_id)
    REFERENCES core.businesses(id)
    ON DELETE RESTRICT
);
```

```sql
-- audit.auth_audit_logs
CREATE TABLE IF NOT EXISTS audit.auth_audit_logs (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID,
  business_id UUID,
  action VARCHAR(50) NOT NULL,
  ip_address VARCHAR(45),
  user_agent TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);
```

---

## Stored Procedures (examples)

Todos los SPs incluyen encabezado:

```
-- =============================================
-- Autor: Dorian Rodriguez
-- Fecha: 2026-01-24
-- Descripción: <breve descripción del SP>
-- =============================================
```

Autenticación:
```sql
-- auth_proc.SP_AUTH_REGISTER
-- Descripción: Registra negocio y usuario, audita y retorna USER_ID, EMAIL, ROLE, BUSINESS_ID
CREATE OR REPLACE FUNCTION auth_proc.SP_AUTH_REGISTER(
  P_BUSINESS_NAME   VARCHAR,
  P_BUSINESS_PHONE  VARCHAR,
  P_EMAIL           VARCHAR,
  P_PASSWORD        VARCHAR,
  P_IP              VARCHAR DEFAULT NULL,
  P_USER_AGENT      TEXT DEFAULT NULL
)
RETURNS TABLE (USER_ID UUID, EMAIL VARCHAR, ROLE VARCHAR, BUSINESS_ID UUID)
LANGUAGE plpgsql
AS $$ ... $$;
```

```sql
-- auth_proc.SP_AUTH_LOGIN
-- Descripción: Valida credenciales, audita éxito/fallo y retorna USER_ID, EMAIL, ROLE, BUSINESS_ID
CREATE OR REPLACE FUNCTION auth_proc.SP_AUTH_LOGIN(
  P_EMAIL       VARCHAR,
  P_PASSWORD    VARCHAR,
  P_IP          VARCHAR DEFAULT NULL,
  P_USER_AGENT  TEXT DEFAULT NULL
)
RETURNS TABLE (USER_ID UUID, EMAIL VARCHAR, ROLE VARCHAR, BUSINESS_ID UUID)
LANGUAGE plpgsql
AS $$ ... $$;
```

CRM:
```sql
-- crm_proc.SP_CRM_ORDER_CREATE
-- Descripción: Crea una orden validando que el contacto pertenezca al negocio
CREATE OR REPLACE FUNCTION crm_proc.SP_CRM_ORDER_CREATE(
  P_BUSINESS_ID UUID,
  P_CONTACT_ID UUID,
  P_ORDER_CODE VARCHAR,
  P_TOTAL_CRC INT,
  P_STATUS VARCHAR DEFAULT 'PENDING',
  P_DUE_DATE DATE DEFAULT NULL,
  P_NOTE TEXT DEFAULT NULL
)
RETURNS TABLE (
  ID UUID, BUSINESS_ID UUID, CONTACT_ID UUID, ORDER_CODE VARCHAR,
  TOTAL_CRC INT, STATUS VARCHAR, DUE_DATE DATE, NOTE TEXT,
  CREATED_AT TIMESTAMPTZ, UPDATED_AT TIMESTAMPTZ
)
LANGUAGE plpgsql
AS $$ ... $$;
```

---

## Indexes (examples)

```sql
-- core.users
CREATE INDEX IF NOT EXISTS idx_users_email ON core.users(email);
CREATE INDEX IF NOT EXISTS idx_users_business_id ON core.users(business_id);
```

```sql
-- audit.auth_audit_logs
CREATE INDEX IF NOT EXISTS idx_audit_business_id ON audit.auth_audit_logs(business_id);
CREATE INDEX IF NOT EXISTS idx_audit_user_id ON audit.auth_audit_logs(user_id);
```

```sql
-- crm.*
CREATE INDEX IF NOT EXISTS idx_contacts_business ON crm.contacts(business_id);
CREATE INDEX IF NOT EXISTS idx_orders_business_status ON crm.orders(business_id, status);
CREATE INDEX IF NOT EXISTS idx_orders_contact ON crm.orders(contact_id);
```

---

## Initial Loads (example)

```sql
INSERT INTO core.businesses (id, name, phone, is_active, created_at)
VALUES ('11111111-1111-1111-1111-111111111111', 'Panadería San José', '+50688887777', TRUE, NOW())
ON CONFLICT (id) DO NOTHING;

INSERT INTO core.users (id, email, password_hash, role, business_id, is_active, created_at)
VALUES (
  '22222222-2222-2222-2222-222222222222',
  'admin@panaderia.com',
  '$2b$10$eImiTXuWVxfM37uY4JANjQexamplehashxxxxxxxxxxxxxxxxxxxxx',
  'PYME',
  '11111111-1111-1111-1111-111111111111',
  TRUE,
  NOW()
)
ON CONFLICT (email) DO NOTHING;

-- Contactos y órdenes de ejemplo bajo crm.*
-- Entrada de auditoría de ejemplo bajo audit.auth_audit_logs
```

---

## Application Integration

- Invocar SPs con nombres calificados por schema:
  - Autenticación: `auth_proc.SP_AUTH_REGISTER`, `auth_proc.SP_AUTH_LOGIN`
  - CRM: `crm_proc.SP_CRM_*`
- Evitar `search_path` y evitar wrappers en `public`.
- Mantener separación por responsabilidad: `core` (entidades), `crm` (dominio), `audit` (trazabilidad), `auth_proc/crm_proc` (procedimientos).

---

## Best Practices

- Nombres en inglés y `snake_case` para columnas.
- Constraints cerca de definiciones de tablas para legibilidad.
- Índices explícitos para consultas frecuentes.
- En producción, considera roles por microservicio (mínimo privilegio).

---

## Summary

La arquitectura DBS estandariza la separación por dominios y procedimientos, mejora mantenibilidad, claridad y seguridad.  
Todas las llamadas se realizan con nombres calificados por schema, alineando la práctica con la lógica de negocio de SINPEConectaCR.
