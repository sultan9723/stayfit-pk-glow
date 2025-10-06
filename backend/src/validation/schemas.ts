import { z } from 'zod';

// Contact form validation
export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name must be less than 100 characters'),
  email: z.string().email('Invalid email address'),
  subject: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters').max(1000, 'Message must be less than 1000 characters'),
  phone: z.string().optional(),
});

// Booking form validation
export const bookingSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name must be less than 100 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  programId: z.string().min(1, 'Program ID is required'),
  programName: z.string().min(1, 'Program name is required'),
  goal: z.string().min(1, 'Fitness goal is required'),
  preferredDate: z.string().min(1, 'Preferred date is required'),
  preferredTime: z.string().min(1, 'Preferred time slot is required'),
  alternativeTime: z.string().optional(),
});

// Trainer booking validation
export const trainerBookingSchema = z.object({
  trainerId: z.number().int().optional(),
  trainerName: z.string().optional(),
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name must be less than 100 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  sessionDate: z.string().datetime('Invalid date format'),
  preferredTime: z.string().optional(),
});

// Trainer creation validation
export const trainerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name must be less than 100 characters'),
  specialization: z.string().min(1, 'Specialization is required'),
  bio: z.string().optional(),
});

// Program creation validation
export const programSchema = z.object({
  name: z.string().min(1, 'Program name is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  duration: z.string().min(1, 'Duration is required'),
  price: z.number().positive('Price must be a positive number'),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type BookingInput = z.infer<typeof bookingSchema>;
export type TrainerBookingInput = z.infer<typeof trainerBookingSchema>;
export type TrainerInput = z.infer<typeof trainerSchema>;
export type ProgramInput = z.infer<typeof programSchema>;
