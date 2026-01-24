-- =============================================
-- Autor: Dorian Rodriguez
-- Fecha: 2026-01-24
-- Descripción: Procedimiento almacenado para actualizar el estado de una orden
-- =============================================

CREATE OR REPLACE FUNCTION crm_proc.SP_CRM_ORDER_UPDATE_STATUS(
  P_BUSINESS_ID UUID,
  P_ID UUID,
  P_STATUS VARCHAR
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
LANGUAGE PLPGSQL
AS $$
BEGIN
  IF P_STATUS NOT IN ('PENDING', 'PAID', 'IN_REVIEW') THEN
    RAISE EXCEPTION 'INVALID_STATUS';
  END IF;

  RETURN QUERY
  UPDATE crm.orders O
     SET status     = P_STATUS,
         updated_at = NOW()
   WHERE O.business_id = P_BUSINESS_ID
     AND O.id = P_ID
  RETURNING
    O.id, O.business_id, O.contact_id, O.order_code, O.total_crc, O.status,
    O.due_date, O.note, O.created_at, O.updated_at;
END;
$$;
