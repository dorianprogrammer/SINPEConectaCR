-- =============================================
-- Autor: Dorian Rodriguez
-- Fecha: 2026-01-24
-- Descripción: Procedimiento almacenado para actualizar un contacto
-- =============================================

CREATE OR REPLACE FUNCTION crm_proc.SP_CRM_CONTACT_UPDATE(
  P_BUSINESS_ID UUID,
  P_ID UUID,
  P_PHONE VARCHAR DEFAULT NULL,
  P_NAME VARCHAR DEFAULT NULL,
  P_EMAIL VARCHAR DEFAULT NULL,
  P_NOTES TEXT DEFAULT NULL
)
RETURNS TABLE (
  ID UUID,
  BUSINESS_ID UUID,
  PHONE VARCHAR,
  NAME VARCHAR,
  EMAIL VARCHAR,
  NOTES TEXT,
  CREATED_AT TIMESTAMPTZ,
  UPDATED_AT TIMESTAMPTZ
)
LANGUAGE PLPGSQL
AS $$
BEGIN
  RETURN QUERY
  UPDATE crm.contacts C
     SET phone      = COALESCE(P_PHONE, C.phone),
         name       = COALESCE(P_NAME, C.name),
         email      = COALESCE(P_EMAIL, C.email),
         notes      = COALESCE(P_NOTES, C.notes),
         updated_at = NOW()
   WHERE C.business_id = P_BUSINESS_ID
     AND C.id = P_ID
  RETURNING
    C.id, C.business_id, C.phone, C.name, C.email, C.notes, C.created_at, C.updated_at;
END;
$$;
