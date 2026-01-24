-- =============================================
-- Autor: Dorian Rodriguez
-- Fecha: 2026-01-24
-- Descripción: Procedimiento almacenado para listar contactos con búsqueda
-- =============================================

CREATE OR REPLACE FUNCTION crm_proc.SP_CRM_CONTACT_LIST(
  P_BUSINESS_ID UUID,
  P_SEARCH TEXT DEFAULT NULL,
  P_LIMIT INT DEFAULT 20,
  P_OFFSET INT DEFAULT 0
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
LANGUAGE SQL
AS $$
  SELECT
    C.id,
    C.business_id,
    C.phone,
    C.name,
    C.email,
    C.notes,
    C.created_at,
    C.updated_at
  FROM crm.contacts C
  WHERE C.business_id = P_BUSINESS_ID
    AND (
      P_SEARCH IS NULL OR P_SEARCH = '' OR
      C.phone ILIKE ('%' || P_SEARCH || '%') OR
      C.name ILIKE ('%' || P_SEARCH || '%') OR
      C.email ILIKE ('%' || P_SEARCH || '%')
    )
  ORDER BY C.updated_at DESC
  LIMIT P_LIMIT OFFSET P_OFFSET;
$$;
