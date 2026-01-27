import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { platformListBusinesses, type PlatformBusinessRow } from '../services/platform.service';

export default function PlatformBusinesses() {
  const [rows, setRows] = useState<PlatformBusinessRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    platformListBusinesses()
      .then(setRows)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold">Businesses</h1>
          <p className="mt-2 text-sm text-white/60">Manage businesses here.</p>
        </div>

        <Link
          to="/platform/create"
          className="rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-neutral-900 hover:bg-white/90"
        >
          Create Business
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/20">
        <div className="grid grid-cols-[1.2fr_0.9fr_0.6fr_0.7fr] gap-4 border-b border-white/10 px-5 py-3 text-xs font-semibold uppercase tracking-wide text-white/60">
          <div>Business</div>
          <div>Phone</div>
          <div>Status</div>
          <div className="text-right">Actions</div>
        </div>

        {loading && (
          <div className="px-5 py-10 text-center text-sm text-white/60">Loading businesses...</div>
        )}

        {!loading && rows.length === 0 && (
          <div className="px-5 py-10 text-center">
            <div className="text-sm font-semibold text-white">No businesses yet</div>
          </div>
        )}

        {!loading &&
          rows.map((row) => (
            <div
              key={row.business_id}
              className="grid grid-cols-[1.2fr_0.9fr_0.6fr_0.7fr] gap-4 px-5 py-4 text-sm border-b border-white/10"
            >
              <div>
                <div className="font-semibold">{row.business_name}</div>
                <div className="text-white/60 text-xs">{row.user_email}</div>
              </div>

              <div className="text-white/80">{row.business_phone}</div>

              <div>
                {row.business_active ? (
                  <span className="inline-flex rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-1 text-xs font-semibold text-emerald-200">
                    ACTIVE
                  </span>
                ) : (
                  <span className="inline-flex rounded-full border border-red-400/30 bg-red-400/10 px-2.5 py-1 text-xs font-semibold text-red-200">
                    INACTIVE
                  </span>
                )}
              </div>

              <div className="flex justify-end gap-2">
                <button className="rounded-lg border border-white/10 bg-black/30 px-3 py-1.5 text-xs text-white/80 hover:bg-white/5">
                  Edit
                </button>
                <button className="rounded-lg border border-white/10 bg-black/30 px-3 py-1.5 text-xs text-white/80 hover:bg-white/5">
                  Disable
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
