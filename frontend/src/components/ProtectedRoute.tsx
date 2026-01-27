import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/auth.context';
import type { JSX } from 'react';

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthed } = useAuth();
  return isAuthed ? children : <Navigate to="/login" />;
};

export const SuperRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (user.role !== 'SUPER') return <Navigate to="/app" />;
  return children;
};

export const BusinessRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (user.role === 'SUPER') return <Navigate to="/platform" />;
  return children;
};
