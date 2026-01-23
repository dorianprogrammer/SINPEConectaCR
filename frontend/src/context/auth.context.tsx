import React, { createContext, useContext, useMemo, useState } from 'react';
import { tokenStorage } from '../lib/storage';
import { api } from '../lib/api';

type AuthState = {
  token: string | null;
};

type LoginResponse = {
  token: string;
  // optionally: user, businessId, role, etc
};

type AuthCtx = {
  token: string | null;
  isAuthed: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const Ctx = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>(() => ({ token: tokenStorage.get() }));

  const login = async (email: string, password: string) => {
    const resp = await api.post<LoginResponse>('/auth/login', { email, password });
    tokenStorage.set(resp.token);
    setState({ token: resp.token });
  };

  const logout = () => {
    tokenStorage.clear();
    setState({ token: null });
  };

  const value = useMemo<AuthCtx>(
    () => ({
      token: state.token,
      isAuthed: Boolean(state.token),
      login,
      logout,
    }),
    [state.token],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useAuth = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('AuthProvider missing');
  return ctx;
};
