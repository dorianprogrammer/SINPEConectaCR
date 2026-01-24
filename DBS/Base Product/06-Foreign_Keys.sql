-- =============================================
-- Autor: Dorian Rodriguez
-- Fecha: 2026-01-24
-- Descripción: Definición de llaves foráneas entre tablas
-- =============================================

-- FK: users -> businesses
ALTER TABLE core.users
  ADD CONSTRAINT fk_users_business
    FOREIGN KEY (business_id)
    REFERENCES core.businesses(id)
    ON DELETE RESTRICT;

-- FK: contacts -> businesses (lógica de negocio)
ALTER TABLE crm.contacts
  ADD CONSTRAINT fk_contacts_business
    FOREIGN KEY (business_id)
    REFERENCES core.businesses(id)
    ON DELETE RESTRICT;

-- FK: orders -> contacts
ALTER TABLE crm.orders
  ADD CONSTRAINT fk_orders_contact
    FOREIGN KEY (contact_id)
    REFERENCES crm.contacts(id)
    ON DELETE RESTRICT;

-- FK: orders -> businesses (lógica de negocio)
ALTER TABLE crm.orders
  ADD CONSTRAINT fk_orders_business
    FOREIGN KEY (business_id)
    REFERENCES core.businesses(id)
    ON DELETE RESTRICT;

-- FK: order_items -> orders
ALTER TABLE crm.order_items
  ADD CONSTRAINT fk_order_items_order
    FOREIGN KEY (order_id)
    REFERENCES crm.orders(id)
    ON DELETE CASCADE;
