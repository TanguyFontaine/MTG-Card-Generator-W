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

  // Handle payload too large error with a clear message
  if (err.type === 'entity.too.large') {
    return res.status(413).json({
      error: 'Request body is too large. The maximum allowed size is 1 MB.'
    });
  }
  
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
  
  const isDevelopment = process.env.NODE_ENV !== 'production';
  if (isDevelopment && req.body && Object.keys(req.body).length > 0) {
    console.log('Request body:', req.body);
  }
  
  next();
};