import { Router } from "express";
import { contactSchema, ContactInput } from "../validation/schemas";
import { prisma } from "../lib/prisma";
import verifyToken from "../middleware/verifyToken";
import isAdmin from "../middleware/isAdmin";

const router = Router();

// POST /api/contact - Submit contact form
router.post("/", async (req, res) => {
  try {
    const validatedData: ContactInput = contactSchema.parse(req.body);

    const contact = await prisma.contact.create({
      data: validatedData,
    });

    return res.status(201).json({
      success: true,
      message: "Contact form submitted successfully",
      data: {
        id: contact.id,
        name: contact.name,
        email: contact.email,
        subject: contact.subject,
        createdAt: contact.createdAt,
      },
    });
  } catch (error: any) {
    console.error("Contact form error:", error);

    if (error.name === "ZodError") {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: error.errors,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to submit contact form",
      error: process.env.NODE_ENV === "development" ? error.message : "Internal server error",
    });
  }
});

// GET /api/contact - Get all contact submissions (admin only)
router.get("/", verifyToken, isAdmin, async (req, res) => {
  try {
    const contacts = await prisma.contact.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        subject: true,
        message: true,
        createdAt: true,
      },
    });

    return res.json({
      success: true,
      data: contacts,
      count: contacts.length,
    });
  } catch (error: any) {
    console.error("Get contacts error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch contacts",
      error: process.env.NODE_ENV === "development" ? error.message : "Internal server error",
    });
  }
});

export default router;