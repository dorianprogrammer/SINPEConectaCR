import { useEffect, useMemo, useState } from 'react';
import { api } from '../lib/api';
import type { Contact } from '../types/crm';

function cls(...s: Array<string | false | undefined>) {
  return s.filter(Boolean).join(' ');
}

function Badge({ text }: { text: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-zinc-800 bg-zinc-950/50 px-2 py-0.5 text-xs text-zinc-300">
      {text}
    </span>
  );
}

export default function Contacts() {
  const [items, setItems] = useState<Contact[]>([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const filtered = useMemo(() => items, [items]);

  const load = async () => {
    setError(null);
    setLoading(true);
    try {
      const qs = new URLSearchParams();
      if (search.trim()) qs.set('search', search.trim());
      const resp = await api.get<{ data: Contact[] }>(`/crm/contacts?${qs.toString()}`);
      setItems(resp.data);
    } catch (e: any) {
      setError(e.message ?? 'ERROR');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, []); // initial

  const create = async () => {
    const phone = prompt('PHONE (+506...)')?.trim();
    if (!phone) return;
    const name = prompt('NAME')?.trim() ?? null;
    const email = prompt('EMAIL (OPTIONAL)')?.trim() ?? null;

    setError(null);
    try {
      await api.post<{ data: Contact }>('/crm/contacts', { phone, name, email });
      await load();
    } catch (e: any) {
      setError(e.message ?? 'ERROR');
    }
  };

  const remove = async (id: string) => {
    if (!confirm('DELETE CONTACT?')) return;
    setError(null);
    try {
      await api.del<void>(`/crm/contacts/${id}`);
      await load();
    } catch (e: any) {
      setError(e.message ?? 'ERROR');
    }
  };

  return (
    <div>
      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-xl font-semibold">Contacts</h2>
          <div className="text-sm text-zinc-400">Manage clients by phone</div>
        </div>

        <div className="flex gap-2">
          <div className="relative">
            <input
              className="w-64 rounded-xl border border-zinc-800 bg-zinc-950/60 px-3 py-2 text-sm outline-none focus:border-zinc-600"
              placeholder="Search phone/name/email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <button
            onClick={() => void load()}
            className="rounded-xl border border-zinc-800 bg-zinc-950/60 px-3 py-2 text-sm hover:bg-zinc-900"
            disabled={loading}
          >
            {loading ? '...' : 'Search'}
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
          <Badge text={`${filtered.length} TOTAL`} />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-xs text-zinc-400">
              <tr className="border-b border-zinc-800">
                <th className="px-4 py-3">PHONE</th>
                <th className="px-4 py-3">NAME</th>
                <th className="px-4 py-3">EMAIL</th>
                <th className="px-4 py-3 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id} className="border-b border-zinc-900/60">
                  <td className="px-4 py-3 font-mono text-xs text-zinc-200">{c.phone}</td>
                  <td className="px-4 py-3">{c.name ?? '-'}</td>
                  <td className="px-4 py-3 text-zinc-300">{c.email ?? '-'}</td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => void remove(c.id)}
                      className={cls(
                        'rounded-xl px-3 py-1.5 text-xs font-semibold',
                        'border border-zinc-800 bg-zinc-950/60 hover:bg-zinc-900',
                      )}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {!filtered.length && (
                <tr>
                  <td colSpan={4} className="px-4 py-10 text-center text-sm text-zinc-500">
                    No contacts
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
