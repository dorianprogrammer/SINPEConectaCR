-- =============================================
-- Autor: Dorian Rodriguez
-- Fecha: 2026-01-24
-- Descripción: Carga inicial de datos de prueba para el sistema
-- =============================================

-- Insertar negocio de prueba
INSERT INTO core.businesses (
  id,
  name,
  phone,
  is_active,
  created_at
) VALUES (
  '11111111-1111-1111-1111-111111111111',
  'Panadería San José',
  '+50688887777',
  TRUE,
  NOW()
) ON CONFLICT (id) DO NOTHING;

-- Insertar usuario de prueba
-- Nota: Este password_hash es un ejemplo y debe ser reemplazado con un hash real
INSERT INTO core.users (
  id,
  email,
  password_hash,
  role,
  business_id,
  is_active,
  created_at
) VALUES (
  '22222222-2222-2222-2222-222222222222',
  'admin@panaderia.com',
  '$2b$10$eImiTXuWVxfM37uY4JANjQexamplehashxxxxxxxxxxxxxxxxxxxxx',
  'PYME',
  '11111111-1111-1111-1111-111111111111',
  TRUE,
  NOW()
) ON CONFLICT (id) DO NOTHING;

-- Insertar log de auditoría de prueba
INSERT INTO audit.auth_audit_logs (
  user_id,
  business_id,
  action,
  ip_address,
  user_agent,
  created_at
) VALUES (
  '22222222-2222-2222-2222-222222222222',
  '11111111-1111-1111-1111-111111111111',
  'LOGIN_SUCCESS',
  '127.0.0.1',
  'Postman',
  NOW()
);

-- Insertar contactos de prueba
INSERT INTO crm.contacts (id, business_id, phone, name, email, notes)
VALUES
  ('11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111', '+50688881111', 'Juan Perez', 'juan@test.com', 'Cliente frecuente'),
  ('22222222-2222-2222-2222-222222222222', '11111111-1111-1111-1111-111111111111', '+50688882222', 'Maria Lopez', 'maria@test.com', NULL),
  ('33333333-3333-3333-3333-333333333333', '11111111-1111-1111-1111-111111111111', '+50688883333', 'Carlos Mora', NULL, 'Compra grande')
ON CONFLICT (business_id, phone) DO NOTHING;

-- Insertar órdenes de prueba
INSERT INTO crm.orders (id, business_id, contact_id, order_code, total_crc, status, due_date, note)
VALUES
  ('aaaa1111-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111',
   '11111111-1111-1111-1111-111111111111', 'ORD-20260122-0001', 12500, 'PENDING', '2026-01-25', 'Pendiente de pago'),

  ('aaaa1111-0000-0000-0000-000000000002', '11111111-1111-1111-1111-111111111111',
   '22222222-2222-2222-2222-222222222222', 'ORD-20260122-0002', 22000, 'PAID', NULL, 'Pagado por SINPE'),

  ('aaaa1111-0000-0000-0000-000000000003', '11111111-1111-1111-1111-111111111111',
   '33333333-3333-3333-3333-333333333333', 'ORD-20260122-0003', 18000, 'IN_REVIEW', NULL, 'Referencia dudosa')
ON CONFLICT (business_id, order_code) DO NOTHING;
