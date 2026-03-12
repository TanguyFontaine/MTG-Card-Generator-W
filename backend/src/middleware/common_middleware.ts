import cors from "cors";
import { Request, Response, NextFunction } from "express";

interface HttpError extends Error
{
   status?: number; // ? => Optional attribute
   type?: string; // ? => Optional attribute
}

const FRONTEND_ORIGIN = "http://localhost:3000";
const DEFAULT_ERROR_STATUS = 500;

// Cross-Origin Resource Sharing (CORS) middleware configuration
// Used to allow the React frontend (running on localhost:3000) to make requests to this Express backend (running on localhost:3001).
// By pass Same-Origin Policy in browsers
export const corsMiddleware = cors({
   origin: FRONTEND_ORIGIN, // Allow requests from React frontend
   credentials: true,
});

// Express identifies error handlers by their 4-parameter signature (err, req, res, next).
// Even if `next` is unused, it must be present for Express to route errors here.
export const errorHandler = (err: HttpError, req: Request, res: Response, _next: NextFunction): void =>
{
   console.error("Unhandled error:", err);

   // Handle payload too large error with a clear message
   if (err.type === "entity.too.large")
   {
      res.status(413).json({
         error: "Request body is too large. The maximum allowed size is 1 MB.",
      });
      return;
   }

   // Don't leak error details in production
   const isDevelopment: boolean = process.env.NODE_ENV !== "production";

   res.status(err.status || DEFAULT_ERROR_STATUS).json({
      error: isDevelopment ? err.message : "Internal server error",
      ...(isDevelopment && { stack: err.stack }),
   });
};

// Request logging middleware
export const requestLogger = (req: Request, _res: Response, next: NextFunction): void =>
{
   const timestamp: string = new Date().toISOString();
   console.log(`[${timestamp}] ${req.method} ${req.url}`);

   const isDevelopment: boolean = process.env.NODE_ENV !== "production";
   if (isDevelopment && req.body && Object.keys(req.body).length > 0)
   {
      console.log("Request body:", req.body);
   }

   next();
};
