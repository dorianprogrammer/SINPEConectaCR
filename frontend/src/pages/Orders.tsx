import { useEffect, useMemo, useState } from 'react';
import { api } from '../lib/api';
import type { Order, OrderStatus } from '../types/crm';

const statusStyles: Record<OrderStatus, string> = {
  PENDING: 'border-yellow-900/50 bg-yellow-950/30 text-yellow-200',
  PAID: 'border-emerald-900/50 bg-emerald-950/30 text-emerald-200',
  IN_REVIEW: 'border-blue-900/50 bg-blue-950/30 text-blue-200',
};

function StatusPill({ status }: { status: OrderStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
}

export default function Orders() {
  const [items, setItems] = useState<Order[]>([]);
  const [status, setStatus] = useState<OrderStatus | ''>('');
  const [search, setSearch] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const filtered = useMemo(() => items, [items]);

  const load = async () => {
    setError(null);
    setLoading(true);
    try {
      const qs = new URLSearchParams();
      if (status) qs.set('status', status);
      if (search.trim()) qs.set('search', search.trim());
      const resp = await api.get<{ data: Order[] }>(`/crm/orders?${qs.toString()}`);
      setItems(resp.data);
    } catch (e: any) {
      setError(e.message ?? 'ERROR');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  const create = async () => {
    const contactId = prompt('CONTACT ID (UUID)')?.trim();
    if (!contactId) return;
    const orderCode = prompt('ORDER CODE (ORD-YYYYMMDD-0001)')?.trim();
    if (!orderCode) return;
    const totalCrc = Number(prompt('TOTAL CRC') ?? '0');

    setError(null);
    try {
      await api.post<{ data: Order }>('/crm/orders', {
        contactId,
        orderCode,
        totalCrc,
        status: 'PENDING',
      });
      await load();
    } catch (e: any) {
      setError(e.message ?? 'ERROR');
    }
  };

  const setPaid = async (id: string) => {
    setError(null);
    try {
      await api.put<{ data: Order }>(`/crm/orders/${id}/status`, { status: 'PAID' });
      await load();
    } catch (e: any) {
      setError(e.message ?? 'ERROR');
    }
  };

  return (
    <div>
      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-xl font-semibold">Orders</h2>
          <div className="text-sm text-zinc-400">Orders / invoices status tracking</div>
        </div>

        <div className="flex flex-wrap gap-2">
          <select
            className="rounded-xl border border-zinc-800 bg-zinc-950/60 px-3 py-2 text-sm outline-none focus:border-zinc-600"
            value={status}
            onChange={(e) => setStatus(e.target.value as any)}
          >
            <option value="">ALL</option>
            <option value="PENDING">PENDING</option>
            <option value="PAID">PAID</option>
            <option value="IN_REVIEW">IN_REVIEW</option>
          </select>

          <input
            className="w-64 rounded-xl border border-zinc-800 bg-zinc-950/60 px-3 py-2 text-sm outline-none focus:border-zinc-600"
            placeholder="Search by order code..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button
            onClick={() => void load()}
            className="rounded-xl border border-zinc-800 bg-zinc-950/60 px-3 py-2 text-sm hover:bg-zinc-900 disabled:opacity-60"
            disabled={loading}
          >
            {loading ? '...' : 'Filter'}
          </button>

          <button
            onClick={() => void create()}
            className="rounded-xl bg-zinc-100 px-3 py-2 text-sm font-semibold text-zinc-900 hover:bg-white"
          >
            New
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-3 rounded-xl border border-red-900/50 bg-red-950/40 px-3 py-2 text-sm text-red-200">
          {error}
        </div>
      )}

      <div className="rounded-2xl border border-zinc-800 bg-zinc-950/40">
        <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-3">
          <div className="text-sm font-semibold">List</div>
          <div className="text-xs text-zinc-400">{filtered.length} TOTAL</div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-xs text-zinc-400">
              <tr className="border-b border-zinc-800">
                <th className="px-4 py-3">CODE</th>
                <th className="px-4 py-3">STATUS</th>
                <th className="px-4 py-3">TOTAL</th>
                <th className="px-4 py-3">CONTACT</th>
                <th className="px-4 py-3 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((o) => (
                <tr key={o.id} className="border-b border-zinc-900/60">
                  <td className="px-4 py-3 font-mono text-xs text-zinc-200">{o.orderCode}</td>
                  <td className="px-4 py-3">
                    <StatusPill status={o.status} />
                  </td>
                  <td className="px-4 py-3">{o.totalCrc.toLocaleString('es-CR')}</td>
                  <td className="px-4 py-3 font-mono text-xs text-zinc-400">{o.contactId}</td>
                  <td className="px-4 py-3 text-right">
                    {o.status !== 'PAID' && (
                      <button
                        onClick={() => void setPaid(o.id)}
                        className="rounded-xl border border-zinc-800 bg-zinc-950/60 px-3 py-1.5 text-xs font-semibold hover:bg-zinc-900"
                      >
                        Mark Paid
                      </button>
                    )}
                  </td>
                </tr>
              ))}

              {!filtered.length && (
                <tr>
                  <td colSpan={5} className="px-4 py-10 text-center text-sm text-zinc-500">
                    No orders
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
