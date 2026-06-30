import express from 'express';
import cors from 'cors';
import { prisma } from './lib/prisma.js';
import { env } from './config/env.js';
import { notFound } from './middlewares/notFound.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { routes } from './routes/index.js';

const app = express();

// Global middlewares
app.use(cors());
app.use(express.json());

// Health check: verifies the server and database connection are alive.
app.get('/api/health', async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: 'ok', db: 'connected' });
  } catch {
    res.status(500).json({ status: 'error', db: 'disconnected' });
  }
});

app.use('/api/v1', routes);

// 404 and error handling must come after all routes.
app.use(notFound);
app.use(errorHandler);

app.listen(env.port, () => {
  console.log(`Server running on http://localhost:${env.port}`);
});
