-- =============================================
-- Autor: Dorian Rodriguez
-- Fecha: 2026-01-24
-- Descripción: Procedimiento almacenado para crear un nuevo contacto
-- =============================================

CREATE OR REPLACE FUNCTION crm_proc.SP_CRM_CONTACT_CREATE(
  P_BUSINESS_ID UUID,
  P_PHONE VARCHAR,
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
  INSERT INTO crm.contacts (business_id, phone, name, email, notes)
  VALUES (P_BUSINESS_ID, P_PHONE, P_NAME, P_EMAIL, P_NOTES)
  RETURNING
    crm.contacts.id,
    crm.contacts.business_id,
    crm.contacts.phone,
    crm.contacts.name,
    crm.contacts.email,
    crm.contacts.notes,
    crm.contacts.created_at,
    crm.contacts.updated_at;
END;
$$;
