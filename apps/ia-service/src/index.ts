import express from 'express';

const app = express();
app.use(express.json({ limit: '10mb' }));

app.get('/health', (_req, res) => {
  res.status(200).json({
    ok: true,
    service: 'ia-service',
    timestamp: new Date().toISOString(),
  });
});

// placeholder
app.get('/', (_req, res) => {
  res.status(200).json({ ok: true, message: 'ia-service running' });
});

const port = Number(process.env.PORT || 3004);
app.listen(port, () => {
  console.log(`[ia-service] running on http://localhost:${port}`);
});