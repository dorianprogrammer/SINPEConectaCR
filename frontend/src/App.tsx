import { useEffect, useMemo, useState } from 'react';
import './App.css';

type HealthOk = {
  ok: true;
  service: string;
  timestamp: string;
};

type HealthFail = {
  ok: false;
  message: string;
};

type HealthResponse = HealthOk | HealthFail;

type Status = {
  path: string;
  label: string;
  loading: boolean;
  status: 'ok' | 'fail' | 'idle';
  data?: HealthResponse;
  error?: string;
};

const API_URL = '';

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url, { headers: { 'Content-Type': 'application/json' } });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`${res.status} ${res.statusText}${text ? ` - ${text}` : ''}`);
  }
  return (await res.json()) as T;
}

export default function App() {
  const endpoints = useMemo(
    () => [
      { label: 'API Gateway', path: '/health' },
      { label: 'Auth Service', path: '/auth/health' },
      { label: 'Payments Service', path: '/payments/health' },
      { label: 'CRM Service', path: '/crm/health' },
      { label: 'IA Service', path: '/ia/health' },
    ],
    [],
  );

  const [items, setItems] = useState<Status[]>(
    endpoints.map((e) => ({
      label: e.label,
      path: e.path,
      loading: false,
      status: 'idle',
    })),
  );

  const runChecks = async () => {
    setItems((prev) =>
      prev.map((x) => ({ ...x, loading: true, status: 'idle', data: undefined, error: undefined })),
    );

    await Promise.all(
      endpoints.map(async (e, idx) => {
        try {
          const data = await fetchJson<HealthResponse>(`${API_URL}${e.path}`);
          setItems((prev) =>
            prev.map((x, i) => (i === idx ? { ...x, loading: false, status: 'ok', data } : x)),
          );
        } catch (err: any) {
          setItems((prev) =>
            prev.map((x, i) =>
              i === idx
                ? { ...x, loading: false, status: 'fail', error: err?.message || 'Unknown error' }
                : x,
            ),
          );
        }
      }),
    );
  };

  useEffect(() => {
    runChecks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ maxWidth: 900, margin: '40px auto', padding: 16, fontFamily: 'system-ui' }}>
      <h1 style={{ marginBottom: 6 }}>SINPEConectaCR — Frontend</h1>
      <p style={{ marginTop: 0, opacity: 0.8 }}>
        API URL: <code>{API_URL}</code>
      </p>

      <div style={{ display: 'flex', gap: 10, margin: '16px 0' }}>
        <button onClick={runChecks} style={{ padding: '10px 14px', cursor: 'pointer' }}>
          Re-check health
        </button>
      </div>

      <div style={{ display: 'grid', gap: 12 }}>
        {items.map((it) => (
          <div
            key={it.path}
            style={{
              border: '1px solid #e5e5e5',
              borderRadius: 12,
              padding: 14,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 14,
            }}
          >
            <div>
              <div style={{ fontWeight: 700 }}>{it.label}</div>
              <div style={{ opacity: 0.7 }}>
                <code>{it.path}</code>
              </div>

              {it.status === 'ok' && it.data && (
                <pre
                  style={{
                    marginTop: 10,
                    background: '#f7f7f7',
                    padding: 10,
                    borderRadius: 10,
                    overflowX: 'auto',
                    maxWidth: 760,
                  }}
                >
                  {JSON.stringify(it.data, null, 2)}
                </pre>
              )}

              {it.status === 'fail' && (
                <div style={{ marginTop: 8, color: '#b00020' }}>{it.error}</div>
              )}
            </div>

            <div style={{ minWidth: 120, textAlign: 'right' }}>
              {it.loading ? (
                <span>Checking…</span>
              ) : it.status === 'ok' ? (
                <span style={{ fontWeight: 700 }}>✅ OK</span>
              ) : it.status === 'fail' ? (
                <span style={{ fontWeight: 700 }}>❌ FAIL</span>
              ) : (
                <span style={{ opacity: 0.6 }}>—</span>
              )}
            </div>
          </div>
        ))}
      </div>

      <p style={{ marginTop: 18, opacity: 0.7 }}>
        If a service is down, you’ll see FAIL. Gateway health should always work.
      </p>
    </div>
  );
}
