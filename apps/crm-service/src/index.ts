import express from 'express';

const app = express();
app.use(express.json({ limit: '2mb' }));

import contactsRoutes from './routes/contacts.routes.js';
import ordersRoutes from './routes/orders.routes.js';
import dashboardRoutes from './routes/dashboard.routes.js';

app.get('/health', (_req, res) => {
  res.status(200).json({
    ok: true,
    service: 'crm-service',
    timestamp: new Date().toISOString(),
  });
});

app.get('/', (_req, res) => {
  res.status(200).json({ ok: true, message: 'crm-service running' });
});

app.use(contactsRoutes);
app.use(ordersRoutes);
app.use(dashboardRoutes);

const port = Number(process.env.PORT || 3003);
app.listen(port, () => {
  console.log(`[crm-service] running on http://localhost:${port}`);
});
