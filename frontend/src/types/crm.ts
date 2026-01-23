export type DashboardSummary = {
  contactsTotal: number;
  orders: { pending: number; paid: number; inReview: number };
  pendingTotalCrc: number;
};

export type Contact = {
  id: string;
  businessId: string;
  phone: string;
  name: string | null;
  email: string | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
};

export type OrderStatus = 'PENDING' | 'PAID' | 'IN_REVIEW';

export type Order = {
  id: string;
  businessId: string;
  contactId: string;
  orderCode: string;
  totalCrc: number;
  status: OrderStatus;
  dueDate: string | null;
  note: string | null;
  createdAt: string;
  updatedAt: string;
};
