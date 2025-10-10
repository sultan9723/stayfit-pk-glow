import express from "express";
import cors from "cors";
import contactRoutes from "./routes/contact";
import bookingRoutes from "./routes/booking";
import trainerRoutes from "./routes/trainer";
import newsletterRoutes from "./routes/newsletter";
import { prisma } from "./lib/prisma";

const app = express();
const PORT = process.env.PORT || 3001;

// 🌍 Detect environment
const isProduction = process.env.NODE_ENV === "production";

// ✅ Standardized CORS configuration
const corsOptions: cors.CorsOptions = {
  origin: isProduction
    ? ["https://stayfit.pk", "https://www.stayfit.pk"]
    : ["http://localhost:5173"],
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

// ✅ Common middlewares
app.use(express.json({ limit: "1mb" }));

// Simple logger (for debugging form submissions)
app.use((req, _res, next) => {
  console.log(`➡ ${req.method} ${req.url}`);
  next();
});

// ✅ Routes
app.use("/api/book", bookingRoutes);
app.use("/book", bookingRoutes); // backward compatibility
app.use("/api/contact", contactRoutes);
app.use("/api/trainers", trainerRoutes);
app.use("/api/newsletter", newsletterRoutes);

// ✅ Health check endpoint
app.get("/", (_req, res) => {
  res.status(200).send("✅ StayFit backend is running");
});

// ✅ Start server with Prisma connection
app.listen(PORT, async () => {
  try {
    await prisma.$connect();
    console.log("✅ Connected to PostgreSQL via Prisma");
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`🌐 Environment: ${isProduction ? "Production" : "Development"}`);
  } catch (err) {
    console.error("❌ Database connection failed:", err);
    process.exit(1);
  }
});

// ✅ Graceful shutdown
process.on("SIGINT", async () => {
  console.log("🛑 Shutting down gracefully (SIGINT)...");
  await prisma.$disconnect();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  console.log("🛑 Shutting down gracefully (SIGTERM)...");
  await prisma.$disconnect();
  process.exit(0);
});