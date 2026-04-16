import "dotenv/config";
import express, { Express, Request, Response } from "express";
import http from "http";

import { corsMiddleware, errorHandler, requestLogger } from "./middleware/common_middleware.js";
import cardReadRoutes from "./routes/card_read_routes.js";
import cardWriteRoutes from "./routes/card_write_routes.js";
import userRoutes from "./routes/user_routes.js";
import dbConnectionPool from "./connection/database_connection.js";

const DEFAULT_PORT = 3001;
const JSON_SIZE_LIMIT = "1mb";

const app: Express = express();
const port: string | number = process.env.PORT || DEFAULT_PORT;

// Middleware
app.use(corsMiddleware);
app.use(express.json({ limit: JSON_SIZE_LIMIT }));
app.use(requestLogger);

// Routes
app.use("/", cardReadRoutes);
app.use("/", cardWriteRoutes);
app.use("/", userRoutes);

// Health check endpoint
app.get("/health", (_req: Request, res: Response) =>
{
   res.json({
      status: "ok",
      timestamp: new Date().toISOString(),
      service: "card-generator-api",
   });
});

// Error handling middleware (must be last)
app.use(errorHandler);

// Start the server
const server: http.Server = app.listen(port, () =>
{
   console.log(`🚀 Card Generator API server listening at http://localhost:${port}`);
   console.log(`📊 Health check available at http://localhost:${port}/health`);
});

// Graceful shutdown: close the server and database pool on termination signals
function shutdownServer(signal: string): void
{
   console.log(`\n${signal} received. Shutting down.`);
   server.close(() =>
   {
      console.log("HTTP server closed.");
      dbConnectionPool.end(() =>
      {
         console.log("Database connection pool closed.");
         process.exit(0);
      });
   });
}

// Catch termination signals for graceful shutdown
process.on("SIGTERM", () => shutdownServer("SIGTERM"));
process.on("SIGINT", () => shutdownServer("SIGINT"));

export default app;
