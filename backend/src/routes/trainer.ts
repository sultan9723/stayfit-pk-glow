import { Router } from "express";
import {
  trainerBookingSchema,
  trainerSchema,
  TrainerBookingInput,
  TrainerInput,
} from "../validation/schemas";
import { prisma } from "../lib/prisma";
import verifyToken from "../middleware/verifyToken";
import isAdmin from "../middleware/isAdmin";

const router = Router();

// POST /api/trainers/book - Book a trainer session
router.post("/book", async (req, res) => {
  try {
    const validatedData: TrainerBookingInput = trainerBookingSchema.parse(req.body);

    const sessionDate = new Date(validatedData.sessionDate);

    const trainerBooking = await prisma.trainerBooking.create({
      data: {
        trainerId: validatedData.trainerId,
        trainerName: validatedData.trainerName,
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        sessionDate,
        preferredTime: validatedData.preferredTime,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Trainer session booked successfully",
      data: trainerBooking,
    });
  } catch (error: any) {
    console.error("Trainer booking error:", error);

    if (error.name === "ZodError") {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: error.errors,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to book trainer session",
      error: process.env.NODE_ENV === "development" ? error.message : "Internal server error",
    });
  }
});

// GET /api/trainers/bookings - Get all trainer bookings (admin only)
router.get("/bookings", verifyToken, isAdmin, async (req, res) => {
  try {
    const bookings = await prisma.trainerBooking.findMany({
      orderBy: { createdAt: "desc" },
    });

    return res.json({
      success: true,
      data: bookings,
      count: bookings.length,
    });
  } catch (error: any) {
    console.error("Get trainer bookings error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch trainer bookings",
      error: process.env.NODE_ENV === "development" ? error.message : "Internal server error",
    });
  }
});

// GET /api/trainers - Get all trainers
router.get("/", async (req, res) => {
  try {
    const trainers = await prisma.trainer.findMany({
      where: { isActive: true },
      orderBy: { name: "asc" },
    });

    return res.json({
      success: true,
      data: trainers,
      count: trainers.length,
    });
  } catch (error: any) {
    console.error("Get trainers error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch trainers",
      error: process.env.NODE_ENV === "development" ? error.message : "Internal server error",
    });
  }
});

// GET /api/trainers/:id - Get specific trainer
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const trainer = await prisma.trainer.findUnique({
      where: { id },
    });

    if (!trainer || !trainer.isActive) {
      return res.status(404).json({
        success: false,
        message: "Trainer not found",
      });
    }

    return res.json({
      success: true,
      data: trainer,
    });
  } catch (error: any) {
    console.error("Get trainer error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch trainer",
      error: process.env.NODE_ENV === "development" ? error.message : "Internal server error",
    });
  }
});

// POST /api/trainers - Create new trainer (admin only)
router.post("/", verifyToken, async (req, res) => {
  try {
    const validatedData: TrainerInput = trainerSchema.parse(req.body);

    // ✅ FIX: use findFirst OR make email unique in schema
    const existingTrainer = await prisma.trainer.findFirst({
      where: { email: validatedData.email },
    });

    if (existingTrainer) {
      return res.status(409).json({
        success: false,
        message: "Trainer with this email already exists",
      });
    }

    const trainer = await prisma.trainer.create({
      data: validatedData,
    });

    return res.status(201).json({
      success: true,
      message: "Trainer created successfully",
      data: trainer,
    });
  } catch (error: any) {
    console.error("Create trainer error:", error);

    if (error.name === "ZodError") {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: error.errors,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to create trainer",
      error: process.env.NODE_ENV === "development" ? error.message : "Internal server error",
    });
  }
});

export default router;