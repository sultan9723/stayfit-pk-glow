import { Router } from 'express';
import { prisma } from '../lib/prisma';

const router = Router();

// POST /api/book - Handle program, trainer, and pricing submissions
router.post('/', async (req, res) => {
  try {
    const body = req.body || {};
    const type: string = (body.type || '').toString();

    const name: string = (body.name || '').toString().trim();
    const email: string = (body.email || '').toString().trim();
    const phone: string = (body.phone || '').toString().trim();

    if (!name || !email) {
      return res.status(400).json({ success: false, message: 'Name and email are required' });
    }

    // upsert user by email
    const user = await prisma.user.upsert({
      where: { email },
      update: { name, phone },
      create: { name, email, password: 'N/A', phone },
    });

    // Common fields
    let preferredDate: Date = new Date();
    let preferredTime: string = 'Any';
    let alternativeTime: string | null = null;
    let trainerId: number | null = null;
    let programId: number | null = null;
    let pricingPlanId: number | null = null;

    if (body.preferredDate) {
      // Accept YYYY-MM-DD or ISO
      const dStr = body.preferredDate.toString();
      preferredDate = new Date(/T/.test(dStr) ? dStr : `${dStr}T00:00:00`);
    } else {
      // default tomorrow
      preferredDate = new Date(Date.now() + 24 * 60 * 60 * 1000);
    }
    if (body.preferredTime) preferredTime = body.preferredTime.toString();
    if (body.alternativeTime) alternativeTime = body.alternativeTime.toString();

    if (type === 'program') {
      // Resolve program by name first, fallback by numeric id if provided
      const programName = (body.programName || '').toString();
      const programByName = programName
        ? await prisma.program.findFirst({ where: { name: programName } })
        : null;
      if (programByName) programId = programByName.id;
    }

    if (type === 'trainer') {
      const trainerName = (body.trainerName || '').toString();
      const foundTrainer = trainerName
        ? await prisma.trainer.findFirst({ where: { name: trainerName } })
        : null;
      if (foundTrainer) trainerId = foundTrainer.id;
    }

    if (type === 'pricing' || body.planName) {
      const planName = (body.planName || '').toString();
      const plan = planName
        ? await prisma.pricingPlan.findFirst({ where: { planName } })
        : null;
      if (plan) pricingPlanId = plan.id;
    }

    // Prevent duplicates: if a booking for the same user and same target already exists
    const existing = await prisma.booking.findFirst({
      where: {
        userId: user.id,
        OR: [
          programId ? { programId } : undefined,
          trainerId ? { trainerId } : undefined,
          pricingPlanId ? { pricingPlanId } : undefined,
        ].filter(Boolean) as any,
        // treat any non-cancelled status as active
        NOT: { status: 'cancelled' },
      },
    });

    if (existing) {
      return res.status(409).json({
        success: false,
        message: 'A booking for this selection already exists for this email. Please wait for confirmation or contact support.',
      });
    }

    const booking = await prisma.booking.create({
      data: {
        userId: user.id,
        trainerId: trainerId ?? undefined,
        programId: programId ?? undefined,
        pricingPlanId: pricingPlanId ?? undefined,
        preferredDate,
        preferredTime,
        alternativeTime: alternativeTime ?? undefined,
      },
    });

    return res.status(201).json({
      success: true,
      message: 'Submission received',
      data: {
        id: booking.id,
        status: booking.status,
        createdAt: booking.createdAt,
      },
    });
  } catch (error: any) {
    console.error('Booking error:', error);
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
        userId: true,
        trainerId: true,
        programId: true,
        pricingPlanId: true,
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
    const programsRaw = await prisma.program.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        durationWeeks: true,
        price: true,
      },
      orderBy: { name: 'asc' },
    });

    const programs = programsRaw.map((p: any) => ({
      id: p.id,
      name: p.name,
      description: p.description,
      duration: `${p.durationWeeks} weeks`,
      price: p.price,
    }));

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