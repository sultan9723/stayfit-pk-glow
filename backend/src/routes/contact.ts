import { Router } from 'express';
import { contactSchema, ContactInput } from '../validation/schemas';

const router = Router();

// POST /api/contact - Submit contact form
router.post('/', async (req, res) => {
  try {
    // Validate request body
    const validatedData: ContactInput = contactSchema.parse(req.body);

    // No DB model for Contact in current schema.
    // For deployment readiness, acknowledge receipt and log the message.
    console.log('Contact submission:', validatedData);

    return res.status(201).json({
      success: true,
      message: 'Contact form submitted successfully',
      data: {
        name: validatedData.name,
        email: validatedData.email,
        subject: validatedData.subject ?? null,
        createdAt: new Date().toISOString(),
      },
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
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
});

// GET /api/contact - Get all contact submissions (admin only)
router.get('/', async (req, res) => {
  try {
    // No persisted contacts; return empty list for compatibility.
    return res.json({ success: true, data: [], count: 0 });
  } catch (error: any) {
    console.error('Get contacts error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch contacts',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
});

export default router;