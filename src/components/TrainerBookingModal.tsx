import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X, Loader2 } from 'lucide-react';
import { BASE_URL } from '../config';
import { useToast } from '../hooks/use-toast';

// Validation schema
const trainerBookingSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  trainerId: z.string().min(1, 'Trainer is required'),
  trainerName: z.string(),
  sessionDate: z.string().min(1, 'Please select a session date'),
  preferredTime: z.string().min(1, 'Please select a preferred time'),
});

type TrainerBookingFormData = z.infer<typeof trainerBookingSchema>;

interface Trainer {
  id: string;
  name: string;
  specialty: string;
  experience: number;
}

interface TrainerBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  trainer: Trainer | null;
}

const TrainerBookingModal: React.FC<TrainerBookingModalProps> = ({
  isOpen,
  onClose,
  trainer
}) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue
  } = useForm<TrainerBookingFormData>({
    resolver: zodResolver(trainerBookingSchema),
  });

  // Set trainer data when modal opens
  React.useEffect(() => {
    if (trainer && isOpen) {
      setValue('trainerId', trainer.id);
      setValue('trainerName', trainer.name);
    }
  }, [trainer, isOpen, setValue]);

  const onSubmit = async (data: TrainerBookingFormData) => {
    setLoading(true);
    setMessage({ text: '', type: '' });

    try {
      const response = await fetch(`${BASE_URL}/api/trainers/book`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: "Success!",
          description: "Session booked successfully! We will contact you soon.",
          variant: "default",
        });
        setTimeout(() => {
          onClose();
          reset();
          setMessage({ text: '', type: '' });
        }, 1500);
      } else {
        toast({
          title: "Error",
          description: result.message || 'Booking failed. Please try again.',
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Network Error",
        description: "Please check your connection and try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    onClose();
    reset();
    setMessage({ text: '', type: '' });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-slate-800 rounded-xl shadow-2xl p-6 w-full max-w-md border border-slate-700">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">
            Book Training Session
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {trainer && (
          <div className="mb-6 p-4 bg-slate-700 rounded-lg">
            <h3 className="text-lg font-semibold text-white">{trainer.name}</h3>
            <p className="text-gray-300">{trainer.specialty}</p>
            <p className="text-sm text-gray-400">{trainer.experience} years experience</p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
              Full Name *
            </label>
            <input
              id="name"
              {...register('name')}
              className={`w-full px-4 py-3 bg-slate-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200 ${
                errors.name ? 'border-red-500' : 'border-slate-600'
              }`}
              placeholder="Enter your full name"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Email Address *
            </label>
            <input
              id="email"
              type="email"
              {...register('email')}
              className={`w-full px-4 py-3 bg-slate-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200 ${
                errors.email ? 'border-red-500' : 'border-slate-600'
              }`}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
              Phone Number *
            </label>
            <input
              id="phone"
              type="tel"
              {...register('phone')}
              className={`w-full px-4 py-3 bg-slate-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200 ${
                errors.phone ? 'border-red-500' : 'border-slate-600'
              }`}
              placeholder="Enter your phone number"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-400">{errors.phone.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="sessionDate" className="block text-sm font-medium text-gray-300 mb-2">
              Session Date *
            </label>
            <input
              id="sessionDate"
              type="date"
              {...register('sessionDate')}
              min={new Date().toISOString().split('T')[0]}
              className={`w-full px-4 py-3 bg-slate-700 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200 ${
                errors.sessionDate ? 'border-red-500' : 'border-slate-600'
              }`}
            />
            {errors.sessionDate && (
              <p className="mt-1 text-sm text-red-400">{errors.sessionDate.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="preferredTime" className="block text-sm font-medium text-gray-300 mb-2">
              Preferred Time *
            </label>
            <select
              id="preferredTime"
              {...register('preferredTime')}
              className={`w-full px-4 py-3 bg-slate-700 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200 ${
                errors.preferredTime ? 'border-red-500' : 'border-slate-600'
              }`}
            >
              <option value="">Select time</option>
              <option value="morning">Morning (6:00 AM - 12:00 PM)</option>
              <option value="afternoon">Afternoon (12:00 PM - 6:00 PM)</option>
              <option value="evening">Evening (6:00 PM - 10:00 PM)</option>
            </select>
            {errors.preferredTime && (
              <p className="mt-1 text-sm text-red-400">{errors.preferredTime.message}</p>
            )}
          </div>

          {message.text && (
            <div className={`p-4 rounded-lg text-sm font-medium ${
              message.type === 'success' 
                ? 'bg-green-900/20 border border-green-500 text-green-400' 
                : 'bg-red-900/20 border border-red-500 text-red-400'
            }`}>
              {message.text}
            </div>
          )}

          <div className="flex space-x-3 pt-4">
            <button
              type="submit"
              disabled={isSubmitting || loading}
              className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-bold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-slate-800 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
            >
              {isSubmitting || loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Booking...
                </>
              ) : (
                'Book Session'
              )}
            </button>
            <button
              type="button"
              onClick={handleClose}
              className="px-6 py-3 bg-slate-600 hover:bg-slate-700 text-white font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-600"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TrainerBookingModal;
