import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth.context';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    setError(null);
    setLoading(true);
    try {
      const loggedUser = await login(email, password);
      if (loggedUser.role === 'SUPER') navigate('/platform');
      else navigate('/app');
    } catch (err: any) {
      setError(err.message ?? 'LOGIN_FAILED');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="mx-auto flex min-h-screen max-w-md items-center px-4">
        <div className="w-full rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6 shadow">
          <div className="mb-6">
            <div className="text-2xl font-semibold">SINPEConectaCR</div>
            <div className="text-sm text-zinc-400">Sign in to dashboard</div>
          </div>

          <div className="grid gap-3">
            <div className="grid gap-1">
              <label className="text-xs text-zinc-400">Email</label>
              <input
                className="w-full rounded-xl border border-zinc-800 bg-zinc-950/60 px-3 py-2 text-sm outline-none focus:border-zinc-600"
                placeholder="you@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="grid gap-1">
              <label className="text-xs text-zinc-400">Password</label>
              <input
                className="w-full rounded-xl border border-zinc-800 bg-zinc-950/60 px-3 py-2 text-sm outline-none focus:border-zinc-600"
                placeholder="••••••••"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && (
              <div className="rounded-xl border border-red-900/50 bg-red-950/40 px-3 py-2 text-sm text-red-200">
                {error}
              </div>
            )}

            <button
              disabled={loading}
              onClick={onSubmit}
              className="mt-2 w-full rounded-xl bg-zinc-100 px-3 py-2 text-sm font-semibold text-zinc-900 hover:bg-white disabled:opacity-60"
            >
              {loading ? '...' : 'Login'}
            </button>
          </div>

          <div className="mt-6 text-xs text-zinc-500">
            Tip: Use your gateway auth endpoint <span className="font-mono">/auth/login</span>
          </div>
        </div>
      </div>
    </div>
  );
}
