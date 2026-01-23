import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth.context';

const navItem = (active: boolean) =>
  `block rounded-lg px-3 py-2 text-sm font-medium transition ${
    active ? 'bg-zinc-900 text-white' : 'text-zinc-300 hover:bg-zinc-900/60 hover:text-white'
  }`;

export function AppLayout() {
  const nav = useNavigate();
  const { pathname } = useLocation();
  const { logout } = useAuth();

  const onLogout = () => {
    logout();
    nav('/login');
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="mx-auto max-w-6xl px-4 py-6">
        <div className="grid gap-6 md:grid-cols-[240px_1fr]">
          <aside className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-4">
            <div className="mb-4">
              <div className="text-lg font-semibold">SINPEConectaCR</div>
              <div className="text-xs text-zinc-400">CRM Base</div>
            </div>

            <nav className="grid gap-1">
              <Link className={navItem(pathname.startsWith('/dashboard'))} to="/dashboard">
                Dashboard
              </Link>
              <Link className={navItem(pathname.startsWith('/contacts'))} to="/contacts">
                Contacts
              </Link>
              <Link className={navItem(pathname.startsWith('/orders'))} to="/orders">
                Orders
              </Link>
            </nav>

            <button
              onClick={onLogout}
              className="mt-6 w-full rounded-xl bg-zinc-100 px-3 py-2 text-sm font-semibold text-zinc-900 hover:bg-white"
            >
              Logout
            </button>
          </aside>

          <main className="rounded-2xl border border-zinc-800 bg-zinc-900/20 p-4 md:p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
