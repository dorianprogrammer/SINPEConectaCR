import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import proxy from 'express-http-proxy';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json({ limit: '2mb' }));

app.get('/health', (_req, res) => {
  res.status(200).json({
    ok: true,
    service: 'api-gateway',
    timestamp: new Date().toISOString(),
  });
});

// --- helpers ---
function mustGetEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing required env var: ${name}`);
  return v;
}

// --- proxy targets ---
const targets = {
  auth: mustGetEnv('AUTH_SERVICE_URL'),
  payments: mustGetEnv('PAYMENTS_SERVICE_URL'),
  crm: mustGetEnv('CRM_SERVICE_URL'),
  ia: mustGetEnv('IA_SERVICE_URL'),
};

// --- proxies ---
app.use(
  '/auth',
  proxy(targets.auth, {
    proxyReqPathResolver: (req) => req.url,
  }),
);
app.use(
  '/payments',
  proxy(targets.payments, {
    proxyReqPathResolver: (req) => `/payments${req.url}`,
  }),
);

app.use(
  '/crm',
  proxy(targets.crm, {
    proxyReqPathResolver: (req) => `/crm${req.url}`,
  }),
);

app.use(
  '/ia',
  proxy(targets.ia, {
    proxyReqPathResolver: (req) => `/ia${req.url}`,
  }),
);

// fallback
app.use((_req, res) => {
  res.status(404).json({ ok: false, message: 'Route not found' });
});

const port = Number(process.env.PORT || 3000);
app.listen(port, () => {
  console.log(`[api-gateway] running on http://localhost:${port}`);
});
