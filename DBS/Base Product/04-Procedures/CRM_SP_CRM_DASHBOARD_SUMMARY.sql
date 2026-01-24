-- =============================================
-- Autor: Dorian Rodriguez
-- Fecha: 2026-01-24
-- Descripción: Procedimiento almacenado para obtener resumen del dashboard CRM
-- =============================================

CREATE OR REPLACE FUNCTION crm_proc.SP_CRM_DASHBOARD_SUMMARY(
  P_BUSINESS_ID UUID
)
RETURNS TABLE (
  CONTACTS_TOTAL BIGINT,
  ORDERS_PENDING BIGINT,
  ORDERS_PAID BIGINT,
  ORDERS_IN_REVIEW BIGINT,
  PENDING_TOTAL_CRC BIGINT
)
LANGUAGE SQL
AS $$
  SELECT
    (SELECT COUNT(1) FROM crm.contacts C WHERE C.business_id = P_BUSINESS_ID) AS CONTACTS_TOTAL,

    (SELECT COUNT(1) FROM crm.orders O WHERE O.business_id = P_BUSINESS_ID AND O.status = 'PENDING') AS ORDERS_PENDING,
    (SELECT COUNT(1) FROM crm.orders O WHERE O.business_id = P_BUSINESS_ID AND O.status = 'PAID') AS ORDERS_PAID,
    (SELECT COUNT(1) FROM crm.orders O WHERE O.business_id = P_BUSINESS_ID AND O.status = 'IN_REVIEW') AS ORDERS_IN_REVIEW,

    (SELECT COALESCE(SUM(O.total_crc), 0) FROM crm.orders O WHERE O.business_id = P_BUSINESS_ID AND O.status = 'PENDING') AS PENDING_TOTAL_CRC;
$$;
