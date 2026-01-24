-- =============================================
-- Autor: Dorian Rodriguez
-- Fecha: 2026-01-24
-- Descripción: Procedimiento almacenado para eliminar una orden
-- =============================================

CREATE OR REPLACE FUNCTION crm_proc.SP_CRM_ORDER_DELETE(
  P_BUSINESS_ID UUID,
  P_ID UUID
)
RETURNS TABLE (
  DELETED BOOLEAN
)
LANGUAGE PLPGSQL
AS $$
BEGIN
  DELETE FROM crm.orders
   WHERE business_id = P_BUSINESS_ID
     AND id = P_ID;

  RETURN QUERY
  SELECT FOUND AS DELETED;
END;
$$;
