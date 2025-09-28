import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { config } from "./config/env";

import authRoutes from "./routes/authRoutes";
import bookingRoutes from "./routes/booking";
import contactRoutes from "./routes/contact";
import trainerRoutes from "./routes/trainer";

const app = express();
const PORT = config.port;

// ---------- Security Middleware ----------
app.use(helmet());

// ---------- CORS Configuration ----------
app.use(
  cors({
    origin: config.frontendUrl,
    credentials: true,
  })
);

// ---------- Rate Limiting ----------
const limiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.maxRequests,
  message: "Too many requests from this IP, please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// ---------- Body Parsing Middleware ----------
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// ---------- Health Check ----------
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "✅ StayFit backend is running 🚀" });
});

app.get("/ping", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "StayFit API is running",
    timestamp: new Date().toISOString(),
    environment: config.nodeEnv,
  });
});

// ---------- API Routes ----------
app.use("/api/auth", authRoutes);       // Register / Login
app.use("/api/book", bookingRoutes);    // Book programs, get programs
app.use("/api/contact", contactRoutes); // Contact form
app.use("/api/trainers", trainerRoutes); // Trainers + trainer bookings

// ---------- 404 Handler ----------
app.use("*", (req, res) => {
  res.status(404).json({
    error: "Route not found",
    message: `Cannot ${req.method} ${req.originalUrl}`,
  });
});

// ---------- Global Error Handler ----------
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error("Error:", err);
  
  res.status(err.status || 500).json({
    error: "Internal server error",
    message: config.nodeEnv === "development" ? err.message : "Something went wrong",
    ...(config.nodeEnv === "development" && { stack: err.stack }),
  });
});

// ---------- Start Server ----------
app.listen(PORT, () => {
  console.log(`🚀 StayFit API server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/ping`);
  console.log(`🌍 Environment: ${config.nodeEnv}`);
  console.log(`🔗 Frontend URL: ${config.frontendUrl}`);
});

export default app;