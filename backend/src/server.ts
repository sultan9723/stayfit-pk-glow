import express from "express";
import cors from "cors";
import contactRoutes from "./routes/contact";
import bookingRoutes from "./routes/booking";
import trainerRoutes from "./routes/trainer";
import newsletterRoutes from "./routes/newsletter";
import { prisma } from "./lib/prisma";


const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
// Primary booking endpoint expected by frontend
app.use("/api/book", bookingRoutes);
// Backward-compatible alias without /api prefix
app.use("/book", bookingRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/trainers", trainerRoutes);
app.use("/api/newsletter", newsletterRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("✅ StayFit backend is running");
});
// Start server
app.listen(PORT, async () => {
  try {
    await prisma.$connect();
    console.log("✅ Connected to PostgreSQL via Prisma");
    console.log(`🚀 Server running on port ${PORT}`);
  } catch (err) {
    console.error("❌ Database connection failed:", err);
    process.exit(1);
  }
});

// Graceful shutdown
process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await prisma.$disconnect();
  process.exit(0);
}); 