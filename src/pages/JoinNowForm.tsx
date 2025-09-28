import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { BASE_URL } from '../config';
import { Loader2 } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import stayfitData from '../../data/stayfit_content.json';

// Validation schema
const joinNowSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  programId: z.string().min(1, 'Please select a program'),
  programName: z.string(),
  goal: z.string().min(10, 'Please describe your fitness goal'),
  preferredDate: z.string().min(1, 'Please select a preferred date'),
  preferredTime: z.string().min(1, 'Please select a preferred time'),
  alternativeTime: z.string().optional(),
});

type JoinNowFormData = z.infer<typeof joinNowSchema>;

interface Program {
  id: string;
  name: string;
  description: string;
  duration: string;
  price: number;
}

const JoinNowForm = () => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const navigate = useNavigate();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch
  } = useForm<JoinNowFormData>({
    resolver: zodResolver(joinNowSchema),
  });

  const selectedProgramId = watch('programId');

  // Fetch programs on component mount
  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        // Try to fetch from API first
        const response = await fetch(`${BASE_URL}/api/book/programs`);
        const data = await response.json();
        if (data.success && data.data) {
          console.log('Programs loaded from API:', data.data);
          setPrograms(data.data);
        } else {
          // Fallback to local data if API fails or returns no data
          const localPrograms = stayfitData.programs.map((program, index) => ({
            id: `program-${index + 1}`,
            name: program.title,
            description: program.description,
            duration: program.duration,
            price: program.popular ? 150 : 120, // Mock pricing
          }));
          console.log('Using local programs data:', localPrograms);
          setPrograms(localPrograms);
        }
      } catch (error) {
        console.error('Error fetching programs from API, using local data:', error);
        // Fallback to local data if API call fails
        const localPrograms = stayfitData.programs.map((program, index) => ({
          id: `program-${index + 1}`,
          name: program.title,
          description: program.description,
          duration: program.duration,
          price: program.popular ? 150 : 120, // Mock pricing
        }));
        console.log('Using local programs data (fallback):', localPrograms);
        setPrograms(localPrograms);
      }
    };
    fetchPrograms();
  }, []);

  // Update programName when programId changes
  useEffect(() => {
    if (selectedProgramId) {
      const selectedProgram = programs.find(p => p.id === selectedProgramId);
      if (selectedProgram) {
        setValue('programName', selectedProgram.name);
      }
    }
  }, [selectedProgramId, programs, setValue]);

  const onSubmit = async (data: JoinNowFormData) => {
    setLoading(true);
    setMessage({ text: '', type: '' });

    try {
      const response = await fetch(`${BASE_URL}/api/book`, {
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
          description: "Thank you for your interest! We will contact you soon to discuss membership options.",
          variant: "default",
        });
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        toast({
          title: "Error",
          description: result.message || 'Submission failed. Please try again.',
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

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-2xl w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-white">
            Join StayFit Today
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            Get started on your fitness journey with our premium membership options
          </p>
        </div>
        
        <div className="bg-slate-800 rounded-xl shadow-2xl p-8 border border-slate-700">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                <label htmlFor="programId" className="block text-sm font-medium text-gray-300 mb-2">
                  Select Program *
                </label>
                <select
                  id="programId"
                  {...register('programId')}
                  className={`w-full px-4 py-3 bg-slate-700 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200 ${
                    errors.programId ? 'border-red-500' : 'border-slate-600'
                  }`}
                >
                  <option value="">Choose a program</option>
                  {programs.length > 0 ? (
                    programs.map((program) => (
                      <option key={program.id} value={program.id}>
                        {program.name} - {program.duration} - ${program.price}
                      </option>
                    ))
                  ) : (
                    <option value="" disabled>Loading programs...</option>
                  )}
                </select>
                {errors.programId && (
                  <p className="mt-1 text-sm text-red-400">{errors.programId.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="preferredDate" className="block text-sm font-medium text-gray-300 mb-2">
                  Preferred Start Date *
                </label>
                <input
                  id="preferredDate"
                  type="date"
                  {...register('preferredDate')}
                  min={new Date().toISOString().split('T')[0]}
                  className={`w-full px-4 py-3 bg-slate-700 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200 ${
                    errors.preferredDate ? 'border-red-500' : 'border-slate-600'
                  }`}
                />
                {errors.preferredDate && (
                  <p className="mt-1 text-sm text-red-400">{errors.preferredDate.message}</p>
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

              <div>
                <label htmlFor="alternativeTime" className="block text-sm font-medium text-gray-300 mb-2">
                  Alternative Time
                </label>
                <select
                  id="alternativeTime"
                  {...register('alternativeTime')}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200"
                >
                  <option value="">Select alternative time</option>
                  <option value="morning">Morning (6:00 AM - 12:00 PM)</option>
                  <option value="afternoon">Afternoon (12:00 PM - 6:00 PM)</option>
                  <option value="evening">Evening (6:00 PM - 10:00 PM)</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="goal" className="block text-sm font-medium text-gray-300 mb-2">
                Fitness Goal *
              </label>
              <textarea
                id="goal"
                rows={4}
                {...register('goal')}
                className={`w-full px-4 py-3 bg-slate-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200 ${
                  errors.goal ? 'border-red-500' : 'border-slate-600'
                }`}
                placeholder="Describe your fitness goals and what you hope to achieve..."
              />
              {errors.goal && (
                <p className="mt-1 text-sm text-red-400">{errors.goal.message}</p>
              )}
            </div>

            {/* Membership Benefits */}
            <div className="bg-slate-700 rounded-lg p-6 border border-slate-600">
              <h3 className="text-lg font-semibold text-white mb-4">What you get with StayFit membership:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>Access to all fitness programs</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>Personal trainer consultations</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>Nutrition guidance</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>24/7 gym access</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>Group classes included</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>Progress tracking</span>
                </div>
              </div>
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

            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={isSubmitting || loading}
                className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-bold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-slate-800 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
              >
                {isSubmitting || loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Join Now'
                )}
              </button>
              <button
                type="button"
                onClick={() => navigate('/')}
                className="px-6 py-3 bg-slate-600 hover:bg-slate-700 text-white font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-600"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JoinNowForm;
