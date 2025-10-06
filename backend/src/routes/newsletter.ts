import { Router } from 'express';
import { prisma } from '../lib/prisma';

const router = Router();

// POST /api/newsletter - Subscribe an email
router.post('/', async (req, res) => {
  try {
    const raw = req.body ?? {};
    const email = String(raw.email ?? '').trim();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ success: false, message: 'Valid email is required.' });
    }

    const existing = await prisma.newsletter.findUnique({ where: { email } });
    if (existing) {
      return res.status(200).json({ success: true, message: 'Already subscribed', data: existing });
    }

    const sub = await prisma.newsletter.create({ data: { email } });
    console.log('✅ Newsletter subscribed:', email);

    return res.status(201).json({ success: true, message: 'Subscribed successfully', data: sub });
  } catch (error: any) {
    console.error('Newsletter subscribe error:', error);
    return res.status(500).json({ success: false, message: 'Failed to subscribe' });
  }
});

// GET /api/newsletter - list subscriptions (basic admin)
router.get('/', async (_req, res) => {
  try {
    const list = await prisma.newsletter.findMany({ orderBy: { createdAt: 'desc' } });
    return res.json({ success: true, count: list.length, data: list });
  } catch (error: any) {
    console.error('Newsletter list error:', error);
    return res.status(500).json({ success: false, message: 'Failed to fetch newsletter list' });
  }
});

export default router;
