-- =============================================
-- Autor: Dorian Rodriguez
-- Fecha: 2026-01-24
-- Descripción: Procedimiento almacenado para login de usuarios
-- =============================================

CREATE OR REPLACE FUNCTION auth_proc.SP_AUTH_LOGIN(
  P_EMAIL       VARCHAR,
  P_PASSWORD    VARCHAR,
  P_IP          VARCHAR DEFAULT NULL,
  P_USER_AGENT  TEXT DEFAULT NULL
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
  V_USER_ID UUID;
  V_EMAIL VARCHAR;
  V_PASSWORD_HASH TEXT;
  V_ROLE VARCHAR;
  V_BUSINESS_ID UUID;
  V_IS_ACTIVE BOOLEAN;
BEGIN
  -- Get user (explicit columns to avoid ambiguity)
  SELECT
    U.id,
    U.email,
    U.password_hash,
    U.role,
    U.business_id,
    U.is_active
  INTO
    V_USER_ID,
    V_EMAIL,
    V_PASSWORD_HASH,
    V_ROLE,
    V_BUSINESS_ID,
    V_IS_ACTIVE
  FROM core.users U
  WHERE U.email = P_EMAIL
  LIMIT 1;

  -- If user not found or inactive
  IF V_USER_ID IS NULL OR V_IS_ACTIVE IS DISTINCT FROM TRUE THEN
    INSERT INTO audit.auth_audit_logs (action, ip_address, user_agent)
    VALUES ('LOGIN_FAILED', P_IP, P_USER_AGENT);
    RAISE EXCEPTION 'INVALID_CREDENTIALS';
  END IF;

  -- Validate password using pgcrypto crypt()
  IF NOT (V_PASSWORD_HASH = crypt(P_PASSWORD, V_PASSWORD_HASH)) THEN
    INSERT INTO audit.auth_audit_logs (
      user_id, business_id, action, ip_address, user_agent
    ) VALUES (
      V_USER_ID, V_BUSINESS_ID, 'LOGIN_FAILED', P_IP, P_USER_AGENT
    );
    RAISE EXCEPTION 'INVALID_CREDENTIALS';
  END IF;

  -- Audit success
  INSERT INTO audit.auth_audit_logs (
    user_id, business_id, action, ip_address, user_agent
  ) VALUES (
    V_USER_ID, V_BUSINESS_ID, 'LOGIN_SUCCESS', P_IP, P_USER_AGENT
  );

  RETURN QUERY
  SELECT V_USER_ID, V_EMAIL, V_ROLE, V_BUSINESS_ID;
END;
$$;
