import { Router } from 'express';
import { trainerBookingSchema, trainerSchema, TrainerBookingInput, TrainerInput } from '../validation/schemas';
import { prisma } from '../lib/prisma';

const router = Router();

// POST /api/trainers/book - Book a trainer session
router.post('/book', async (req, res) => {
  try {
    const validatedData: TrainerBookingInput = trainerBookingSchema.parse(req.body);
    const sessionDate = new Date(validatedData.sessionDate);

    // upsert user by email
    const user = await prisma.user.upsert({
      where: { email: validatedData.email },
      update: { name: validatedData.name },
      create: { name: validatedData.name, email: validatedData.email, password: 'N/A' },
    });

    // Resolve trainerId either from provided id or by name
    let trainerId: number | null = null;
    if (validatedData.trainerId != null) {
      trainerId = validatedData.trainerId;
    } else if (validatedData.trainerName) {
      const t = await prisma.trainer.findFirst({ where: { name: validatedData.trainerName } });
      if (t) trainerId = t.id;
    }

    const booking = await prisma.booking.create({
      data: {
        userId: user.id,
        trainerId: trainerId ?? undefined,
        preferredDate: sessionDate,
        preferredTime: validatedData.preferredTime ?? 'Any',
        alternativeTime: undefined,
      },
    });

    return res.status(201).json({
      success: true,
      message: 'Trainer session booked successfully',
      data: {
        id: booking.id,
        userId: booking.userId,
        trainerId: booking.trainerId,
        sessionDate: booking.preferredDate,
        status: booking.status,
        createdAt: booking.createdAt,
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

    return res.status(500).json({
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
      select: {
        id: true,
        name: true,
        specialization: true,
        bio: true,
        rating: true,
        createdAt: true,
      },
      orderBy: { name: 'asc' },
    });

    return res.json({
      success: true,
      data: trainers,
      count: trainers.length,
    });
  } catch (error: any) {
    console.error('Get trainers error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch trainers',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
});

// GET /api/trainers/:id - Get specific trainer
router.get('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);

    const trainer = await prisma.trainer.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        specialization: true,
        bio: true,
        rating: true,
        createdAt: true,
      },
    });

    if (!trainer) {
      return res.status(404).json({
        success: false,
        message: 'Trainer not found',
      });
    }

    return res.json({
      success: true,
      data: trainer,
    });
  } catch (error: any) {
    console.error('Get trainer error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch trainer',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
});

// GET /api/trainers/bookings - Get all trainer bookings (admin only)
router.get('/bookings', async (req, res) => {
  try {
    const bookings = await prisma.booking.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        trainerId: true,
        preferredDate: true,
        preferredTime: true,
        status: true,
        createdAt: true,
        trainer: { select: { name: true } },
        user: { select: { name: true, email: true, phone: true } },
      },
    });

    return res.json({
      success: true,
      data: bookings,
      count: bookings.length,
    });
  } catch (error: any) {
    console.error('Get trainer bookings error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch trainer bookings',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
});

// POST /api/trainers - Create new trainer (admin only)
router.post('/', async (req, res) => {
  try {
    const validatedData: TrainerInput = trainerSchema.parse(req.body);

    const existingTrainer = await prisma.trainer.findFirst({
      where: { name: validatedData.name, specialization: validatedData.specialization },
    });

    if (existingTrainer) {
      return res.status(409).json({
        success: false,
        message: 'Trainer with this name and specialization already exists',
      });
    }

    const trainer = await prisma.trainer.create({
      data: {
        name: validatedData.name,
        specialization: validatedData.specialization,
        bio: validatedData.bio,
      },
    });

    return res.status(201).json({
      success: true,
      message: 'Trainer created successfully',
      data: {
        id: trainer.id,
        name: trainer.name,
        specialization: trainer.specialization,
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

    return res.status(500).json({
      success: false,
      message: 'Failed to create trainer',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
});

export default router;