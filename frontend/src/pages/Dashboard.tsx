import { useEffect, useState } from 'react';
import { api } from '../lib/api';
import type { DashboardSummary } from '../types/crm';

function Card({ title, value, sub }: { title: string; value: string | number; sub?: string }) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950/40 p-4">
      <div className="text-xs text-zinc-400">{title}</div>
      <div className="mt-2 text-3xl font-semibold">{value}</div>
      {sub && <div className="mt-1 text-xs text-zinc-500">{sub}</div>}
    </div>
  );
}

export default function Dashboard() {
  const [data, setData] = useState<DashboardSummary | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    api
      .get<{ data: DashboardSummary }>('/crm/dashboard/summary')
      .then((r) => {
        if (mounted) setData(r.data);
      })
      .catch((e) => {
        if (mounted) setError(e.message ?? 'ERROR');
      });
    return () => {
      mounted = false;
    };
  }, []);

  if (error) {
    return (
      <div className="rounded-xl border border-red-900/50 bg-red-950/40 px-3 py-2 text-sm text-red-200">
        {error}
      </div>
    );
  }

  if (!data) return <div className="text-sm text-zinc-400">Loading...</div>;

  return (
    <div>
      <div className="mb-4 flex items-end justify-between">
        <div>
          <h2 className="text-xl font-semibold">Dashboard</h2>
          <div className="text-sm text-zinc-400">Quick overview</div>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-4">
        <Card title="CONTACTS" value={data.contactsTotal} />
        <Card title="ORDERS PENDING" value={data.orders.pending} />
        <Card title="ORDERS PAID" value={data.orders.paid} />
        <Card title="IN REVIEW" value={data.orders.inReview} />
      </div>

      <div className="mt-3 grid gap-3 md:grid-cols-2">
        <Card
          title="PENDING TOTAL (CRC)"
          value={data.pendingTotalCrc.toLocaleString('es-CR')}
          sub="SUM OF ALL PENDING ORDERS"
        />
        <div className="rounded-2xl border border-zinc-800 bg-zinc-950/40 p-4">
          <div className="text-xs text-zinc-400">NEXT</div>
          <div className="mt-2 text-sm text-zinc-300">Add Payments + Inbox (Milestone 3)</div>
        </div>
      </div>
    </div>
  );
}
