-- =============================================
-- Autor: Dorian Rodriguez
-- Fecha: 2026-01-24
-- Descripción: Procedimiento almacenado para registro de usuarios y negocios
-- =============================================

CREATE OR REPLACE FUNCTION auth_proc.SP_AUTH_REGISTER(
  P_BUSINESS_NAME   VARCHAR,
  P_BUSINESS_PHONE  VARCHAR,
  P_EMAIL           VARCHAR,
  P_PASSWORD        VARCHAR,
  P_IP              VARCHAR DEFAULT NULL,
  P_USER_AGENT      TEXT DEFAULT NULL
)
RETURNS TABLE (
  USER_ID UUID,
  EMAIL VARCHAR,
  ROLE VARCHAR,
  BUSINESS_ID UUID
)
LANGUAGE plpgsql
AS $$
DECLARE
  V_BUSINESS_ID UUID := gen_random_uuid();
  V_USER_ID UUID := gen_random_uuid();
  V_PASSWORD_HASH TEXT;
  V_ROLE VARCHAR := 'PYME';
BEGIN
  -- Unique email check (avoid ambiguity)
  IF EXISTS (SELECT 1 FROM core.users U WHERE U.email = P_EMAIL) THEN
    RAISE EXCEPTION 'USER_ALREADY_EXISTS';
  END IF;

  -- Hash password
  V_PASSWORD_HASH := crypt(P_PASSWORD, gen_salt('bf'));

  -- Insert business
  INSERT INTO core.businesses (id, name, phone)
  VALUES (V_BUSINESS_ID, P_BUSINESS_NAME, P_BUSINESS_PHONE);

  -- Insert user
  INSERT INTO core.users (id, email, password_hash, role, business_id)
  VALUES (V_USER_ID, P_EMAIL, V_PASSWORD_HASH, V_ROLE, V_BUSINESS_ID);

  -- Audit
  INSERT INTO audit.auth_audit_logs (user_id, business_id, action, ip_address, user_agent)
  VALUES (V_USER_ID, V_BUSINESS_ID, 'REGISTER_SUCCESS', P_IP, P_USER_AGENT);

  -- Return EXACTLY (USER_ID, EMAIL, ROLE, BUSINESS_ID)
  RETURN QUERY
  SELECT
    V_USER_ID::UUID,
    P_EMAIL::VARCHAR,
    V_ROLE::VARCHAR,
    V_BUSINESS_ID::UUID;

END;
$$;
