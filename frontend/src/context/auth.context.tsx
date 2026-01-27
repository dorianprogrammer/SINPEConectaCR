import React, { createContext, useContext, useMemo, useState } from 'react';
import { api } from '../lib/api';
import { sessionStorage } from '../lib/storage';

type Role = 'SUPER' | 'ADMIN' | 'PYME';

type User = {
  id: string;
  email: string;
  role: Role;
  businessId: string | null;
};

type AuthState = {
  token: string | null;
  user: User | null;
};

type LoginResponse = {
  token: string;
  user: User;
};

type AuthCtx = {
  token: string | null;
  user: User | null;
  isAuthed: boolean;
  isSuper: boolean;
  login: (email: string, password: string) => Promise<User>;
  logout: () => void;
};

const Ctx = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>(() => {
    const session = sessionStorage.get();
    return session ?? { token: null, user: null };
  });

  const login = async (email: string, password: string) => {
    const resp = await api.post<LoginResponse>('/auth/login', { email, password });

    const session = {
      token: resp.token,
      user: resp.user,
    };

    sessionStorage.set(session);
    setState(session);
    return resp.user;
  };

  const logout = () => {
    sessionStorage.clear();
    setState({ token: null, user: null });
  };

  const value = useMemo<AuthCtx>(
    () => ({
      token: state.token,
      user: state.user,
      isAuthed: Boolean(state.token),
      isSuper: state.user?.role === 'SUPER',
      login,
      logout,
    }),
    [state],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAuth(): AuthCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useAuth must be used within <AuthProvider>');
  return ctx;
}
