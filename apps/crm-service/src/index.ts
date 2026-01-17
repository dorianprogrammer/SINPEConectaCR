import express from 'express';

const app = express();
app.use(express.json({ limit: '2mb' }));

app.get('/health', (_req, res) => {
  res.status(200).json({
    ok: true,
    service: 'crm-service',
    timestamp: new Date().toISOString(),
  });
});

// placeholder
app.get('/', (_req, res) => {
  res.status(200).json({ ok: true, message: 'crm-service running' });
});

const port = Number(process.env.PORT || 3003);
app.listen(port, () => {
  console.log(`[crm-service] running on http://localhost:${port}`);
});