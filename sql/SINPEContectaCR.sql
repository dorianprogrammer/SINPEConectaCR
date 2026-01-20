CREATE OR REPLACE FUNCTION SP_AUTH_REGISTER(
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
  IF EXISTS (SELECT 1 FROM USERS U WHERE U.EMAIL = P_EMAIL) THEN
    RAISE EXCEPTION 'USER_ALREADY_EXISTS';
  END IF;

  -- Hash password
  V_PASSWORD_HASH := crypt(P_PASSWORD, gen_salt('bf'));

  -- Insert business
  INSERT INTO BUSINESSES (ID, NAME, PHONE)
  VALUES (V_BUSINESS_ID, P_BUSINESS_NAME, P_BUSINESS_PHONE);

  -- Insert user
  INSERT INTO USERS (ID, EMAIL, PASSWORD_HASH, ROLE, BUSINESS_ID)
  VALUES (V_USER_ID, P_EMAIL, V_PASSWORD_HASH, V_ROLE, V_BUSINESS_ID);

  -- Audit
  INSERT INTO AUTH_AUDIT_LOGS (USER_ID, BUSINESS_ID, ACTION, IP_ADDRESS, USER_AGENT)
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

CREATE OR REPLACE FUNCTION SP_AUTH_LOGIN(
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
    U.ID,
    U.EMAIL,
    U.PASSWORD_HASH,
    U.ROLE,
    U.BUSINESS_ID,
    U.IS_ACTIVE
  INTO
    V_USER_ID,
    V_EMAIL,
    V_PASSWORD_HASH,
    V_ROLE,
    V_BUSINESS_ID,
    V_IS_ACTIVE
  FROM USERS U
  WHERE U.EMAIL = P_EMAIL
  LIMIT 1;

  -- If user not found or inactive
  IF V_USER_ID IS NULL OR V_IS_ACTIVE IS DISTINCT FROM TRUE THEN
    INSERT INTO AUTH_AUDIT_LOGS (ACTION, IP_ADDRESS, USER_AGENT)
    VALUES ('LOGIN_FAILED', P_IP, P_USER_AGENT);
    RAISE EXCEPTION 'INVALID_CREDENTIALS';
  END IF;

  -- Validate password using pgcrypto crypt()
  IF NOT (V_PASSWORD_HASH = crypt(P_PASSWORD, V_PASSWORD_HASH)) THEN
    INSERT INTO AUTH_AUDIT_LOGS (
      USER_ID, BUSINESS_ID, ACTION, IP_ADDRESS, USER_AGENT
    ) VALUES (
      V_USER_ID, V_BUSINESS_ID, 'LOGIN_FAILED', P_IP, P_USER_AGENT
    );
    RAISE EXCEPTION 'INVALID_CREDENTIALS';
  END IF;

  -- Audit success
  INSERT INTO AUTH_AUDIT_LOGS (
    USER_ID, BUSINESS_ID, ACTION, IP_ADDRESS, USER_AGENT
  ) VALUES (
    V_USER_ID, V_BUSINESS_ID, 'LOGIN_SUCCESS', P_IP, P_USER_AGENT
  );

  RETURN QUERY
  SELECT V_USER_ID, V_EMAIL, V_ROLE, V_BUSINESS_ID;
END;
$$;

-- CREATE TABLE businesses (
--   id UUID PRIMARY KEY,
--   name VARCHAR(150) NOT NULL,
--   phone VARCHAR(30) NOT NULL,
--   is_active BOOLEAN NOT NULL DEFAULT TRUE,
--   created_at TIMESTAMP NOT NULL DEFAULT NOW()
-- );

-- CREATE TABLE users (
--   id UUID PRIMARY KEY,
--   email VARCHAR(150) NOT NULL UNIQUE,
--   password_hash TEXT NOT NULL,
--   role VARCHAR(20) NOT NULL CHECK (role IN ('ADMIN', 'PYME')),
--   business_id UUID NOT NULL,
--   is_active BOOLEAN NOT NULL DEFAULT TRUE,
--   created_at TIMESTAMP NOT NULL DEFAULT NOW(),

--   CONSTRAINT fk_users_business
--     FOREIGN KEY (business_id)
--     REFERENCES businesses(id)
--     ON DELETE RESTRICT
-- );

-- CREATE INDEX idx_users_business_id ON users(business_id);
-- CREATE INDEX idx_users_email ON users(email);

-- CREATE TABLE auth_audit_logs (
--   id BIGSERIAL PRIMARY KEY,
--   user_id UUID,
--   business_id UUID,
--   action VARCHAR(50) NOT NULL,
--   ip_address VARCHAR(45),
--   user_agent TEXT,
--   created_at TIMESTAMP NOT NULL DEFAULT NOW()
-- );

-- CREATE INDEX idx_audit_business_id ON auth_audit_logs(business_id);
-- CREATE INDEX idx_audit_user_id ON auth_audit_logs(user_id);

-- INSERT INTO businesses (
--   id,
--   name,
--   phone,
--   is_active,
--   created_at
-- ) VALUES (
--   '11111111-1111-1111-1111-111111111111',
--   'Panadería San José',
--   '+50688887777',
--   TRUE,
--   NOW()
-- );

-- INSERT INTO users (
--   id,
--   email,
--   password_hash,
--   role,
--   business_id,
--   is_active,
--   created_at
-- ) VALUES (
--   '22222222-2222-2222-2222-222222222222',
--   'admin@panaderia.com',
--   '$2b$10$eImiTXuWVxfM37uY4JANjQexamplehashxxxxxxxxxxxxxxxxxxxxx',
--   'PYME',
--   '11111111-1111-1111-1111-111111111111',
--   TRUE,
--   NOW()
-- );

-- INSERT INTO auth_audit_logs (
--   user_id,
--   business_id,
--   action,
--   ip_address,
--   user_agent,
--   created_at
-- ) VALUES (
--   '22222222-2222-2222-2222-222222222222',
--   '11111111-1111-1111-1111-111111111111',
--   'LOGIN_SUCCESS',
--   '127.0.0.1',
--   'Postman',
--   NOW()
-- );
