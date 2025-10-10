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

// ✅ Allowed origins for both local + deployed environments
const allowedOrigins = [
  "https://stayfit.pk",
  "https://www.stayfit.pk",
  "https://api.stayfit.pk",               // API subdomain
  "https://stayfit-pk-glow.onrender.com", // Render deployment URL
  "http://localhost:5173",                // Local dev
];

// ✅ Enhanced CORS configuration
const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn(`🚫 Blocked CORS request from: ${origin}`);
      callback(new Error(`Not allowed by CORS: ${origin}`));
    }
  },
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 204,
};

// ✅ Apply CORS globally
app.use(cors(corsOptions));

// ✅ Handle preflight requests for all routes
app.options("*", cors(corsOptions));

// ✅ Common middlewares
app.use(express.json({ limit: "1mb" }));

// 🪵 Simple logger (for debugging form submissions)
app.use((req, _res, next) => {
  console.log(`➡ ${req.method} ${req.url}`);
  next();
});

// ✅ API Routes
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

// ✅ Graceful shutdown handlers
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