import 'dotenv/config';
import express from 'express';
import { corsMiddleware, errorHandler, requestLogger } from './middleware/commonMiddleware.js';
import cardReadRoutes from './routes/cardReadRoutes.js';
import cardWriteRoutes from './routes/cardWriteRoutes.js';
import dbConnectionPool from './connection/database_connection.js';

const app = express();
const port = process.env.PORT || 3001;

// Middleware setup
app.use(corsMiddleware);
app.use(express.json({ limit: '1mb' }));
app.use(requestLogger);

// Routes
app.use('/', cardReadRoutes);
app.use('/', cardWriteRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    service: 'card-generator-api' 
  });
});

// Error handling middleware (must be last)
app.use(errorHandler);

// Start the server
const server = app.listen(port, () => {
  console.log(`🚀 Card Generator API server listening at http://localhost:${port}`);
  console.log(`📊 Health check available at http://localhost:${port}/health`);
});

// Graceful shutdown: close the server and database pool on termination signals
function shutdownServer(signal) {
  console.log(`\n${signal} received. Shutting down.`);
  server.close(() => {
    console.log('HTTP server closed.');
    dbConnectionPool.end(() => {
      console.log('Database connection pool closed.');
      process.exit(0);
    });
  });
}

// Catch termination signals for graceful shutdown
process.on('SIGTERM', () => shutdownServer('SIGTERM'));
process.on('SIGINT', () => shutdownServer('SIGINT'));

export default app;