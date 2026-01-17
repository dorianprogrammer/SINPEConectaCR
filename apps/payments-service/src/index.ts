import express from 'express';

const app = express();
app.use(express.json({ limit: '5mb' }));

app.get('/health', (_req, res) => {
  res.status(200).json({
    ok: true,
    service: 'payments-service',
    timestamp: new Date().toISOString(),
  });
});

// placeholder root
app.get('/', (_req, res) => {
  res.status(200).json({ ok: true, message: 'payments-service running' });
});

const port = Number(process.env.PORT || 3002);
app.listen(port, () => {
  console.log(`[payments-service] running on http://localhost:${port}`);
});