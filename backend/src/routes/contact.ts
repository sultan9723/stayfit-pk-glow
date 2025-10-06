import { Router } from 'express';
import { contactSchema, ContactInput } from '../validation/schemas';
import { prisma } from '../lib/prisma';

const router = Router();

// POST /api/contact - Save contact form submission
router.post('/', async (req, res) => {
  try {
    const validatedData: ContactInput = contactSchema.parse(req.body);

    const contact = await prisma.contactForm.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        subject: validatedData.subject ?? null,
        message: validatedData.message,
        phone: validatedData.phone ?? null,
      },
    });

    console.log('✅ Contact saved', {
      id: contact.id,
      name: contact.name,
      email: contact.email,
      createdAt: contact.createdAt,
    });

    return res.status(201).json({
      success: true,
      message: '✅ Contact form submitted successfully!',
      data: contact,
    });
  } catch (error: any) {
    console.error('Contact form error:', error);

    if (error.name === 'ZodError') {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: error.errors,
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Failed to submit contact form',
    });
  }
});

// GET /api/contact - Retrieve all contact submissions (admin use)
router.get('/', async (_req, res) => {
  try {
    const contacts = await prisma.contactForm.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return res.json({
      success: true,
      count: contacts.length,
      data: contacts,
    });
  } catch (error: any) {
    console.error('Get contacts error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch contacts',
    });
  }
});

export default router;