import { Router } from 'express';
import { bookingSchema, BookingInput } from '../validation/schemas';
import { prisma } from '../lib/prisma';

const router = Router();

// POST /api/book - Submit program booking
router.post('/', async (req, res) => {
  try {
    // Validate request body
    const validatedData: BookingInput = bookingSchema.parse(req.body);

    // Save to database
    const booking = await prisma.booking.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        programId: validatedData.programId,
        programName: validatedData.programName,
        goal: validatedData.goal,
        preferredDate: validatedData.preferredDate,
        preferredTime: validatedData.preferredTime,
        alternativeTime: validatedData.alternativeTime,
      },
    });

    return res.status(201).json({
      success: true,
      message: 'Program booking submitted successfully',
      data: {
        id: booking.id,
        name: booking.name,
        email: booking.email,
        programName: booking.programName,
        status: booking.status,
        createdAt: booking.createdAt,
      },
    });
  } catch (error: any) {
    console.error('Booking error:', error);
    
    if (error.name === 'ZodError') {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: error.errors,
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Failed to submit booking',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
});

// GET /api/book - Get all bookings (admin only)
router.get('/', async (req, res) => {
  try {
    const bookings = await prisma.booking.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        programId: true,
        programName: true,
        preferredTime: true,
        status: true,
        createdAt: true,
      },
    });

    return res.json({
      success: true,
      data: bookings,
      count: bookings.length,
    });
  } catch (error: any) {
    console.error('Get bookings error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch bookings',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
});

// GET /api/book/programs - Get available programs
router.get('/programs', async (req, res) => {
  try {
    const programs = await prisma.program.findMany({
      where: {
        isActive: true,
      },
      select: {
        id: true,
        name: true,
        description: true,
        duration: true,
        price: true,
      },
      orderBy: {
        name: 'asc',
      },
    });

    return res.json({
      success: true,
      data: programs,
      count: programs.length,
    });
  } catch (error: any) {
    console.error('Get programs error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch programs',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
});

export default router;