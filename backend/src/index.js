// ============================================
// 🌸 BLOOMMIND — Backend Server
// Express API for emotion analysis
// ============================================

import express from 'express';
import cors from 'cors';
import { handleAnalyze } from './controllers/AnalyzeController.js';

const app = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ────────────────────────────────
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

app.use(express.json({ limit: '10kb' }));

// ── Request Logging ──────────────────────────
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.path}`);
  next();
});

// ── Routes ───────────────────────────────────

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'BloomMind API',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});

// Analyze endpoint
app.post('/api/analyze', handleAnalyze);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: '🌸 Welcome to BloomMind API',
    description: 'Where emotions bloom into flowers',
    endpoints: {
      health: 'GET /api/health',
      analyze: 'POST /api/analyze',
    },
  });
});

// ── 404 Handler ──────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found',
  });
});

// ── Error Handler ────────────────────────────
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
  });
});

// ── Start Server ─────────────────────────────
app.listen(PORT, () => {
  console.log(`
  🌸 ═══════════════════════════════════════════
     BloomMind API is running!
     
     🌐 http://localhost:${PORT}
     📋 Health: http://localhost:${PORT}/api/health
     🔍 Analyze: POST http://localhost:${PORT}/api/analyze
     
     Where emotions bloom into flowers 🌷
  ═══════════════════════════════════════════ 🌸
  `);
});

export default app;