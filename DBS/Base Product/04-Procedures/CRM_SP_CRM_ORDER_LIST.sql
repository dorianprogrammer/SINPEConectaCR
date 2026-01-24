-- =============================================
-- Autor: Dorian Rodriguez
-- Fecha: 2026-01-24
-- Descripción: Procedimiento almacenado para listar órdenes con filtros
-- =============================================

CREATE OR REPLACE FUNCTION crm_proc.SP_CRM_ORDER_LIST(
  P_BUSINESS_ID UUID,
  P_STATUS VARCHAR DEFAULT NULL,
  P_SEARCH TEXT DEFAULT NULL,
  P_LIMIT INT DEFAULT 20,
  P_OFFSET INT DEFAULT 0
)
RETURNS TABLE (
  ID UUID,
  BUSINESS_ID UUID,
  CONTACT_ID UUID,
  ORDER_CODE VARCHAR,
  TOTAL_CRC INT,
  STATUS VARCHAR,
  DUE_DATE DATE,
  NOTE TEXT,
  CREATED_AT TIMESTAMPTZ,
  UPDATED_AT TIMESTAMPTZ
)
LANGUAGE SQL
AS $$
  SELECT
    O.id,
    O.business_id,
    O.contact_id,
    O.order_code,
    O.total_crc,
    O.status,
    O.due_date,
    O.note,
    O.created_at,
    O.updated_at
  FROM crm.orders O
  WHERE O.business_id = P_BUSINESS_ID
    AND (P_STATUS IS NULL OR P_STATUS = '' OR O.status = P_STATUS)
    AND (
      P_SEARCH IS NULL OR P_SEARCH = '' OR
      O.order_code ILIKE ('%' || P_SEARCH || '%')
    )
  ORDER BY O.updated_at DESC
  LIMIT P_LIMIT OFFSET P_OFFSET;
$$;
