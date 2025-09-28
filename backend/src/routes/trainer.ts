import { Router } from 'express';
import { trainerBookingSchema, trainerSchema, TrainerBookingInput, TrainerInput } from '../validation/schemas';
import { prisma } from '../lib/prisma';

const router = Router();

// POST /api/trainers/book - Book a trainer session
router.post('/book', async (req, res) => {
  try {
    // Validate request body
    const validatedData: TrainerBookingInput = trainerBookingSchema.parse(req.body);

    // Convert sessionDate string to Date object
    const sessionDate = new Date(validatedData.sessionDate);

    // Save to database
    const trainerBooking = await prisma.trainerBooking.create({
      data: {
        trainerId: validatedData.trainerId,
        trainerName: validatedData.trainerName,
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        sessionDate: sessionDate,
        preferredTime: validatedData.preferredTime,
      },
    });

    res.status(201).json({
      success: true,
      message: 'Trainer session booked successfully',
      data: {
        id: trainerBooking.id,
        name: trainerBooking.name,
        email: trainerBooking.email,
        trainerName: trainerBooking.trainerName,
        sessionDate: trainerBooking.sessionDate,
        status: trainerBooking.status,
        createdAt: trainerBooking.createdAt,
      },
    });
  } catch (error: any) {
    console.error('Trainer booking error:', error);
    
    if (error.name === 'ZodError') {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: error.errors,
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to book trainer session',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
});

// GET /api/trainers - Get all trainers
router.get('/', async (req, res) => {
  try {
    const trainers = await prisma.trainer.findMany({
      where: {
        isActive: true,
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        specialty: true,
        experience: true,
        bio: true,
        imageUrl: true,
      },
      orderBy: {
        name: 'asc',
      },
    });

    res.json({
      success: true,
      data: trainers,
      count: trainers.length,
    });
  } catch (error: any) {
    console.error('Get trainers error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch trainers',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
});

// GET /api/trainers/:id - Get specific trainer
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const trainer = await prisma.trainer.findUnique({
      where: {
        id: id,
        isActive: true,
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        specialty: true,
        experience: true,
        bio: true,
        imageUrl: true,
      },
    });

    if (!trainer) {
      return res.status(404).json({
        success: false,
        message: 'Trainer not found',
      });
    }

    res.json({
      success: true,
      data: trainer,
    });
  } catch (error: any) {
    console.error('Get trainer error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch trainer',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
});

// GET /api/trainers/bookings - Get all trainer bookings (admin only)
router.get('/bookings', async (req, res) => {
  try {
    const bookings = await prisma.trainerBooking.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        trainerId: true,
        trainerName: true,
        name: true,
        email: true,
        phone: true,
        sessionDate: true,
        preferredTime: true,
        status: true,
        createdAt: true,
      },
    });

    res.json({
      success: true,
      data: bookings,
      count: bookings.length,
    });
  } catch (error: any) {
    console.error('Get trainer bookings error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch trainer bookings',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
});

// POST /api/trainers - Create new trainer (admin only)
router.post('/', async (req, res) => {
  try {
    // Validate request body
    const validatedData: TrainerInput = trainerSchema.parse(req.body);

    // Check if trainer with email already exists
    const existingTrainer = await prisma.trainer.findUnique({
      where: {
        email: validatedData.email,
      },
    });

    if (existingTrainer) {
      return res.status(409).json({
        success: false,
        message: 'Trainer with this email already exists',
      });
    }

    // Create trainer
    const trainer = await prisma.trainer.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        specialty: validatedData.specialty,
        experience: validatedData.experience,
        bio: validatedData.bio,
        imageUrl: validatedData.imageUrl,
      },
    });

    res.status(201).json({
      success: true,
      message: 'Trainer created successfully',
      data: {
        id: trainer.id,
        name: trainer.name,
        email: trainer.email,
        specialty: trainer.specialty,
        experience: trainer.experience,
        createdAt: trainer.createdAt,
      },
    });
  } catch (error: any) {
    console.error('Create trainer error:', error);
    
    if (error.name === 'ZodError') {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: error.errors,
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to create trainer',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
});

export default router;
