import { Router } from 'express';
import { prisma } from '../lib/prisma';

const router = Router();

/**
 * POST /api/book
 * Handles bookings for:
 *  - type: "program"  (expects programName)
 *  - type: "trainer"  (expects trainerName)
 *  - type: "pricing"  (expects planName)
 *  - optional: preferredDate (YYYY-MM-DD or ISO), preferredTime, alternativeTime
 */
router.post('/', async (req, res) => {
  try {
    const body = req.body ?? {};
    const type = String(body.type ?? '').trim().toLowerCase();

    const name = String(body.name ?? '').trim();
    const email = String(body.email ?? '').trim();
    const phone = String(body.phone ?? '').trim();

    if (!name || !email) {
      return res.status(400).json({ success: false, message: 'Name and email are required.' });
    }

    // Upsert user by email
    const user = await prisma.user.upsert({
      where: { email },
      update: { name, phone },
      create: { name, email, password: 'N/A', phone },
    });

    // Common fields
    let preferredDate: Date;
    const dStr = body.preferredDate ? String(body.preferredDate) : '';
    if (dStr) {
      preferredDate = new Date(/T/.test(dStr) ? dStr : `${dStr}T00:00:00`);
    } else {
      // default tomorrow
      preferredDate = new Date(Date.now() + 24 * 60 * 60 * 1000);
    }
    const preferredTime = body.preferredTime ? String(body.preferredTime) : 'Any';
    const alternativeTime = body.alternativeTime ? String(body.alternativeTime) : null;

    // These will be resolved from names
    let trainerId: number | null = null;
    let programId: number | null = null;
    let pricingPlanId: number | null = null;

    // Resolve by name (case-insensitive)
    if (type === 'program') {
      const programName = String(body.programName ?? '');
      if (!programName.trim()) {
        return res.status(400).json({ success: false, message: 'Program name is required.' });
      }
      const program = await prisma.program.findFirst({
        where: { name: { equals: programName, mode: 'insensitive' } },
      });
      if (!program) {
        return res.status(400).json({ success: false, message: 'Invalid program selected.' });
      }
      programId = program.id;
    }

    if (type === 'trainer') {
      const trainerName = String(body.trainerName ?? '');
      if (!trainerName.trim()) {
        return res.status(400).json({ success: false, message: 'Trainer name is required.' });
      }
      const trainer = await prisma.trainer.findFirst({
        where: { name: { equals: trainerName, mode: 'insensitive' } },
      });
      if (!trainer) {
        return res.status(400).json({ success: false, message: 'Invalid trainer selected.' });
      }
      trainerId = trainer.id;
    }

    if (type === 'pricing' || body.planName) {
      const planName = String(body.planName ?? '');
      if (!planName.trim() && type === 'pricing') {
        return res.status(400).json({ success: false, message: 'Plan name is required.' });
      }
      if (planName.trim()) {
        const plan = await prisma.pricingPlan.findFirst({
          where: { planName: { equals: planName, mode: 'insensitive' } },
        });
        if (!plan) {
          return res.status(400).json({ success: false, message: 'Invalid pricing plan selected.' });
        }
        pricingPlanId = plan.id;
      }
    }

    // Require at least one target based on type
    if (type === 'program' && !programId) {
      return res.status(400).json({ success: false, message: 'Program not found.' });
    }
    if (type === 'trainer' && !trainerId) {
      return res.status(400).json({ success: false, message: 'Trainer not found.' });
    }
    if (type === 'pricing' && !pricingPlanId) {
      return res.status(400).json({ success: false, message: 'Pricing plan not found.' });
    }
    if (!type) {
      return res.status(400).json({ success: false, message: 'type is required: "program" | "trainer" | "pricing".' });
    }

    // Prevent duplicates: same user + same selected thing (program/trainer/plan) and not cancelled
    const orFilters: any[] = [];
    if (programId) orFilters.push({ programId });
    if (trainerId) orFilters.push({ trainerId });
    if (pricingPlanId) orFilters.push({ pricingPlanId });

    let existing = null;
    if (orFilters.length > 0) {
      existing = await prisma.booking.findFirst({
        where: {
          userId: user.id,
          OR: orFilters,
          NOT: { status: 'cancelled' },
        },
      });
    }

    if (existing) {
      return res.status(409).json({
        success: false,
        message:
          'A booking for this selection already exists for this email. Please wait for confirmation or contact support.',
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

    console.log('✅ Booking created', {
      id: booking.id,
      userId: booking.userId,
      trainerId: booking.trainerId,
      programId: booking.programId,
      pricingPlanId: booking.pricingPlanId,
      preferredDate: booking.preferredDate.toISOString(),
      preferredTime: booking.preferredTime,
      status: booking.status,
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

// GET /api/book - list (basic admin)
router.get('/', async (_req, res) => {
  try {
    const bookings = await prisma.booking.findMany({
      orderBy: { createdAt: 'desc' },
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

    return res.json({ success: true, data: bookings, count: bookings.length });
  } catch (error: any) {
    console.error('Get bookings error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch bookings',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
});

// GET /api/book/programs
router.get('/programs', async (_req, res) => {
  try {
    const programsRaw = await prisma.program.findMany({
      select: { id: true, name: true, description: true, durationWeeks: true, price: true },
      orderBy: { name: 'asc' },
    });

    const programs = programsRaw.map((p: any) => ({
      id: p.id,
      name: p.name,
      description: p.description,
      duration: `${p.durationWeeks} weeks`,
      price: p.price,
    }));

    return res.json({ success: true, data: programs, count: programs.length });
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
