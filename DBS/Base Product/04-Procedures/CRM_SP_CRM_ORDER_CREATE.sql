-- =============================================
-- Autor: Dorian Rodriguez
-- Fecha: 2026-01-24
-- Descripción: Procedimiento almacenado para crear una nueva orden
-- =============================================

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
  -- CONTACT MUST BELONG TO SAME BUSINESS
  IF NOT EXISTS (
    SELECT 1 FROM crm.contacts C
     WHERE C.id = P_CONTACT_ID
       AND C.business_id = P_BUSINESS_ID
  ) THEN
    RAISE EXCEPTION 'CONTACT_NOT_FOUND';
  END IF;

  RETURN QUERY
  INSERT INTO crm.orders (business_id, contact_id, order_code, total_crc, status, due_date, note)
  VALUES (P_BUSINESS_ID, P_CONTACT_ID, P_ORDER_CODE, P_TOTAL_CRC, P_STATUS, P_DUE_DATE, P_NOTE)
  RETURNING
    crm.orders.id,
    crm.orders.business_id,
    crm.orders.contact_id,
    crm.orders.order_code,
    crm.orders.total_crc,
    crm.orders.status,
    crm.orders.due_date,
    crm.orders.note,
    crm.orders.created_at,
    crm.orders.updated_at;
END;
$$;
