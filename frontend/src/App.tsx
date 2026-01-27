import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/auth.context';
import { ProtectedRoute, SuperRoute, BusinessRoute } from './components/ProtectedRoute';
import { AppLayout } from './components/AppLayout';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Contacts from './pages/Contacts';
import Orders from './pages/Orders';

// SUPER pages (create these files)
import PlatformBusinesses from './pages/PlatformBusinesses';
import PlatformCreateBusiness from './pages/PlatformCreateBusiness';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            {/* Default entry */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />

            {/* BUSINESS (ADMIN/PYME) */}
            <Route
              path="/dashboard"
              element={
                <BusinessRoute>
                  <Dashboard />
                </BusinessRoute>
              }
            />
            <Route
              path="/contacts"
              element={
                <BusinessRoute>
                  <Contacts />
                </BusinessRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <BusinessRoute>
                  <Orders />
                </BusinessRoute>
              }
            />

            {/* SUPER */}
            <Route
              path="/platform"
              element={
                <SuperRoute>
                  <PlatformBusinesses />
                </SuperRoute>
              }
            />
            <Route
              path="/platform/create"
              element={
                <SuperRoute>
                  <PlatformCreateBusiness />
                </SuperRoute>
              }
            />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
