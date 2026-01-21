import dotenv from 'dotenv';
dotenv.config();

import authRoutes from './routes/auth.routes.js';
import express from 'express';

const app = express();
app.use(express.json({ limit: '2mb' }));
app.set('trust proxy', true);

app.get('/health', (_req, res) => {
  res.status(200).json({
    ok: true,
    service: 'auth-service',
    timestamp: new Date().toISOString(),
  });
});

app.use(authRoutes);

app.get('/', (_req, res) => {
  res.status(200).json({ ok: true, message: 'auth-service running' });
});

const port = Number(process.env.PORT || 3001);
app.listen(port, () => {
  console.log(`[auth-service] running on http://localhost:${port}`);
});
