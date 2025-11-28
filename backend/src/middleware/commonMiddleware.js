import cors from 'cors';

/**
 * CORS middleware configuration
 */
export const corsMiddleware = cors({
  origin: 'http://localhost:3000', // Allow requests from React frontend
  credentials: true
});

/**
 * Error handling middleware
 */
export const errorHandler = (err, req, res, next) => {
  console.error('Unhandled error:', err);
  
  // Don't leak error details in production
  const isDevelopment = process.env.NODE_ENV !== 'production';
  
  res.status(err.status || 500).json({
    error: isDevelopment ? err.message : 'Internal server error',
    ...(isDevelopment && { stack: err.stack })
  });
};

/**
 * Request logging middleware
 */
export const requestLogger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  
  if (req.body && Object.keys(req.body).length > 0) {
    console.log('Request body:', req.body);
  }
  
  next();
};