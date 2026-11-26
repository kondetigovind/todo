import type { HealthResponse } from '@todo/contracts';
import express from 'express';
import { parseServerConfig } from './config.js';
import { loadLocalEnv } from './load-env.js';

loadLocalEnv(new URL('../../../.env', import.meta.url));
const { mode, port } = parseServerConfig(process.env);
const app = express();

app.disable('x-powered-by');
app.get('/api/health', (_request, response) => {
  const health: HealthResponse = { status: 'ok' };
  response.set('Cache-Control', 'no-store').json(health);
});

const host = mode === 'production' ? '0.0.0.0' : '127.0.0.1';
app.listen(port, host, () => {
  console.log(`API listening on ${host}:${port}`);
});
