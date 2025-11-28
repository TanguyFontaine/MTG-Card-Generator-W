import express from 'express';
import { corsMiddleware, errorHandler, requestLogger } from './middleware/commonMiddleware.js';
import cardReadRoutes from './routes/cardReadRoutes.js';
import cardWriteRoutes from './routes/cardWriteRoutes.js';

const app = express();
const port = process.env.PORT || 3001;

// Middleware setup
app.use(corsMiddleware);
app.use(express.json());
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
app.listen(port, () => {
  console.log(`🚀 Card Generator API server listening at http://localhost:${port}`);
  console.log(`📊 Health check available at http://localhost:${port}/health`);
});

export default app;