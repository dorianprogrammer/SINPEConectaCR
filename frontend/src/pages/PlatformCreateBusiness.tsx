import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../lib/api';

type Role = 'ADMIN' | 'PYME';

type FormState = {
  businessName: string;
  businessPhone: string;
  businessEmail: string;
  businessNotes: string;

  ownerEmail: string;
  ownerPassword: string;
  ownerRole: Role;
  ownerIsActive: boolean;
};

export default function PlatformCreateBusiness() {
  const nav = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState<FormState>({
    businessName: '',
    businessPhone: '',
    businessEmail: '',
    businessNotes: '',
    ownerEmail: '',
    ownerPassword: '',
    ownerRole: 'ADMIN',
    ownerIsActive: true,
  });

  const canSubmit = useMemo(() => {
    if (!form.businessName.trim()) return false;
    if (!form.businessPhone.trim()) return false;
    if (!form.ownerEmail.trim()) return false;
    if (!form.ownerPassword.trim() || form.ownerPassword.length < 8) return false;
    return true;
  }, [form]);

  const onChange =
    (k: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const value =
        e.target instanceof HTMLInputElement && e.target.type === 'checkbox'
          ? (e.target as HTMLInputElement).checked
          : e.target.value;

      setForm((prev) => ({ ...prev, [k]: value as any }));
    };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!canSubmit) {
      setError('Fill required fields (password min 8 chars).');
      return;
    }

    try {
      setLoading(true);

      // Backend suggestion:
      // POST /platform/businesses
      // creates business + owner user
      const payload = {
        business: {
          name: form.businessName.trim(),
          phone: form.businessPhone.trim(),
          email: form.businessEmail.trim() || null,
          notes: form.businessNotes.trim() || null,
        },
        ownerUser: {
          email: form.ownerEmail.trim(),
          password: form.ownerPassword, // backend hashes -> password_hash
          role: form.ownerRole,
          isActive: form.ownerIsActive,
        },
      };

      await api.post('/platform/businesses', payload);

      nav('/platform', { replace: true });
    } catch (err: any) {
      const msg = err?.response?.data?.message || err?.message || 'Error creating business';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold">Create Business</h1>
        <p className="mt-2 text-sm text-white/60">Create a business + owner user (login).</p>
      </div>

      {error && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {error}
        </div>
      )}

      <form onSubmit={submit} className="space-y-6">
        {/* Business card */}
        <section className="rounded-2xl border border-white/10 bg-black/20 p-6">
          <div className="mb-4 text-sm font-semibold text-white/90">Business info</div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs text-white/60">Name *</label>
              <input
                value={form.businessName}
                onChange={onChange('businessName')}
                className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-2.5 text-sm text-white outline-none focus:border-white/20"
                placeholder="Gym Los Ángeles"
              />
            </div>

            <div>
              <label className="text-xs text-white/60">Phone *</label>
              <input
                value={form.businessPhone}
                onChange={onChange('businessPhone')}
                className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-2.5 text-sm text-white outline-none focus:border-white/20"
                placeholder="+506 8888-8888"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="text-xs text-white/60">Email</label>
              <input
                value={form.businessEmail}
                onChange={onChange('businessEmail')}
                className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-2.5 text-sm text-white outline-none focus:border-white/20"
                placeholder="info@business.com"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="text-xs text-white/60">Notes</label>
              <textarea
                value={form.businessNotes}
                onChange={onChange('businessNotes')}
                rows={4}
                className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-black/30 px-4 py-2.5 text-sm text-white outline-none focus:border-white/20"
                placeholder="Optional notes..."
              />
            </div>
          </div>
        </section>

        {/* Owner user card */}
        <section className="rounded-2xl border border-white/10 bg-black/20 p-6">
          <div className="mb-4 text-sm font-semibold text-white/90">Owner user (login)</div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="text-xs text-white/60">Owner email *</label>
              <input
                value={form.ownerEmail}
                onChange={onChange('ownerEmail')}
                className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-2.5 text-sm text-white outline-none focus:border-white/20"
                placeholder="owner@business.com"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="text-xs text-white/60">
                Password * <span className="text-white/40">(min 8)</span>
              </label>
              <input
                type="password"
                value={form.ownerPassword}
                onChange={onChange('ownerPassword')}
                className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-2.5 text-sm text-white outline-none focus:border-white/20"
                placeholder="********"
              />
            </div>

            <div>
              <label className="text-xs text-white/60">Role</label>
              <select
                value={form.ownerRole}
                onChange={onChange('ownerRole')}
                className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-2.5 text-sm text-white outline-none focus:border-white/20"
              >
                <option value="ADMIN">ADMIN</option>
                <option value="PYME">PYME</option>
              </select>
            </div>

            <div className="flex items-end">
              <label className="flex items-center gap-2 text-sm text-white/80">
                <input
                  type="checkbox"
                  checked={form.ownerIsActive}
                  onChange={onChange('ownerIsActive')}
                  className="h-4 w-4 accent-white"
                />
                Active
              </label>
            </div>
          </div>
        </section>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => nav('/platform')}
            className="rounded-xl border border-white/10 bg-black/30 px-4 py-2.5 text-sm text-white/80 hover:bg-white/5 hover:text-white"
            disabled={loading}
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading || !canSubmit}
            className="rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-neutral-900 hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Creating...' : 'Create Business'}
          </button>
        </div>
      </form>
    </div>
  );
}
