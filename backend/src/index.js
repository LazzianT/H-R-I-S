import path from 'node:path';
import fs from 'node:fs';
import express from 'express';
import cors from 'cors';
import { config } from './config/index.js';
import { getPool } from './db/pool.js';
import { requireAuth } from './middleware/auth.js';
import { notFound, errorHandler } from './middleware/error.js';
import { router } from './routes.js';

const app = express();

app.use(cors({ origin: config.corsOrigin, credentials: true }));
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true }));

const uploadDir = path.resolve(config.uploadDir);
fs.mkdirSync(uploadDir, { recursive: true });
app.use('/uploads', express.static(uploadDir));

app.get('/health', (_req, res) => res.json({ ok: true }));

// Auth publik (login), sisanya wajib token.
app.use('/api', router());

app.use(notFound);
app.use(errorHandler);

async function start() {
  try {
    await getPool();
    console.log(`[db] connected to ${config.db.server}/${config.db.database}`);
  } catch (e) {
    console.error('[db] connection failed:', e.message);
  }
  app.listen(config.port, () => console.log(`[backend] listening on :${config.port}`));
}

start();

export { app, requireAuth };
