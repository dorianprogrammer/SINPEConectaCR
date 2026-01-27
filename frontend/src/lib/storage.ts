const KEY = 'sinpe_session';

export const sessionStorage = {
  get: (): { token: string; user: any } | null => {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  },
  set: (session: { token: string; user: any }) => {
    localStorage.setItem(KEY, JSON.stringify(session));
  },
  clear: () => {
    localStorage.removeItem(KEY);
  },
};
