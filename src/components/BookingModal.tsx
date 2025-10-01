import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, Mail, Phone, Target, Calendar as CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface Program {
  id: string;
  name: string;
  description: string;
  duration: string;
  price: number;
}

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProgram?: {
    id: string;
    title: string;
  };
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  programId: string;
  programName: string;
  goal: string;
  preferredDate: Date | undefined;
  preferredTime: string;
  alternativeTime: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  programId?: string;
  goal?: string;
  preferredDate?: string;
  preferredTime?: string;
}

const GOAL_OPTIONS = [
  'Weight Loss',
  'Muscle Building',
  'General Fitness',
  'MMA',
  'Yoga',
  'Nutrition'
];

const TIME_SLOTS = [
  'Slot 1 Co — 8 AM to 11 AM',
  'Slot 2 Female only — 11 AM to 7 PM',
  'Slot 3 Co — 7 PM to 12 Midnight'
];

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, selectedProgram }) => {
  const { toast } = useToast();
  const [programs, setPrograms] = useState<Program[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingPrograms, setIsLoadingPrograms] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    programId: selectedProgram?.id || '',
    programName: selectedProgram?.title || '',
    goal: '',
    preferredDate: undefined,
    preferredTime: '',
    alternativeTime: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});

  // Fetch programs from API
  useEffect(() => {
    const fetchPrograms = async () => {
      setIsLoadingPrograms(true);
      try {
        const response = await fetch('http://localhost:3001/api/book/programs');
        if (response.ok) {
          const data = await response.json();
          setPrograms(data.data || []);
        } else {
          console.error('Failed to fetch programs');
        }
      } catch (error) {
        console.error('Error fetching programs:', error);
      } finally {
        setIsLoadingPrograms(false);
      }
    };

    if (isOpen) {
      fetchPrograms();
    }
  }, [isOpen]);

  // Update form data when selectedProgram changes
  useEffect(() => {
    if (selectedProgram) {
      setFormData(prev => ({
        ...prev,
        programId: selectedProgram.id,
        programName: selectedProgram.title
      }));
    }
  }, [selectedProgram]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number (minimum 10 digits)';
    }

    // Program validation
    if (!formData.programId) {
      newErrors.programId = 'Please select a program';
    }

    // Goal validation
    if (!formData.goal) {
      newErrors.goal = 'Please select your fitness goal';
    }

    // Date validation
    if (!formData.preferredDate) {
      newErrors.preferredDate = 'Please select a preferred date';
    } else if (formData.preferredDate < new Date()) {
      newErrors.preferredDate = 'Please select a future date';
    }

    // Time validation
    if (!formData.preferredTime) {
      newErrors.preferredTime = 'Please select a preferred time slot';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string | Date | undefined) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleProgramChange = (programId: string) => {
    const selectedProgram = programs.find(p => p.id === programId);
    setFormData(prev => ({
      ...prev,
      programId,
      programName: selectedProgram?.name || ''
    }));
    if (errors.programId) {
      setErrors(prev => ({ ...prev, programId: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      const payload = {
        type: "program",
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        programId: formData.programId,
        programName: formData.programName,
        goal: formData.goal,
        preferredDate: formData.preferredDate?.toISOString().split('T')[0],
        preferredTime: formData.preferredTime,
        alternativeTime: formData.alternativeTime || undefined
      };

      const base = import.meta.env.VITE_API_BASE || '';
      const response = await fetch(`${base}/api/book`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toast({
          title: "Booking Confirmed! 🎉",
          description: "Your fitness program booking has been submitted successfully. We'll contact you soon!",
          variant: "default",
        });
        
        // Reset form and close modal
        setFormData({
          name: '',
          email: '',
          phone: '',
          programId: '',
          programName: '',
          goal: '',
          preferredDate: undefined,
          preferredTime: '',
          alternativeTime: ''
        });
        setErrors({});
        onClose();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit booking');
      }
    } catch (error) {
      console.error('Booking error:', error);
      toast({
        title: "Booking Failed",
        description: error instanceof Error ? error.message : "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      programId: selectedProgram?.id || '',
      programName: selectedProgram?.title || '',
      goal: '',
      preferredDate: undefined,
      preferredTime: '',
      alternativeTime: ''
    });
    setErrors({});
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-very-dark-brown border-accent-primary">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gradient-accent text-center">
            Book Your Fitness Program
          </DialogTitle>
          <DialogDescription className="text-warm-beige text-center">
            Fill out the form below to reserve your spot in our fitness program
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white flex items-center">
              <User className="w-5 h-5 mr-2 text-accent-primary" />
              Personal Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-warm-beige">
                  Full Name *
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="bg-deep-brown border-accent-primary text-white placeholder:text-warm-beige focus:ring-accent-primary"
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <p className="text-red-400 text-sm">{errors.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-warm-beige">
                  Email Address *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="bg-deep-brown border-accent-primary text-white placeholder:text-warm-beige focus:ring-accent-primary"
                  placeholder="your.email@example.com"
                />
                {errors.email && (
                  <p className="text-red-400 text-sm">{errors.email}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-warm-beige">
                Phone Number *
              </Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="bg-deep-brown border-accent-primary text-white placeholder:text-warm-beige focus:ring-accent-primary"
                placeholder="+92-300-1234567"
              />
              {errors.phone && (
                <p className="text-red-400 text-sm">{errors.phone}</p>
              )}
            </div>
          </div>

          {/* Program Information Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white flex items-center">
              <Target className="w-5 h-5 mr-2 text-accent-primary" />
              Program Information
            </h3>

            <div className="space-y-2">
              <Label className="text-warm-beige">Program *</Label>
              {selectedProgram ? (
                <Input
                  id="program"
                  type="text"
                  value={formData.programName}
                  readOnly
                  className="bg-deep-brown border-accent-primary text-white placeholder:text-warm-beige focus:ring-accent-primary"
                />
              ) : (
                <Select
                  value={formData.programId}
                  onValueChange={handleProgramChange}
                >
                  <SelectTrigger className="bg-deep-brown border-accent-primary text-white focus:ring-accent-primary">
                    <SelectValue placeholder={isLoadingPrograms ? "Loading programs..." : "Select a program"} />
                  </SelectTrigger>
                  <SelectContent className="bg-deep-brown border-accent-primary">
                    {programs.map((program) => (
                      <SelectItem
                        key={program.id}
                        value={program.id}
                        className="text-white hover:bg-accent-primary hover:text-deep-brown"
                      >
                        {program.name} - {program.duration} - ${program.price}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
              {errors.programId && (
                <p className="text-red-400 text-sm">{errors.programId}</p>
              )}
            </div>
          </div>

          {/* Scheduling Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-accent-primary" />
              Scheduling
            </h3>
            
            <div className="space-y-2">
              <Label className="text-warm-beige">Preferred Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="secondary"
                    className={cn(
                      "w-full justify-start text-left font-normal bg-deep-brown border-accent-primary text-white hover:bg-accent-primary hover:text-deep-brown",
                      !formData.preferredDate && "text-warm-beige"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.preferredDate ? (
                      format(formData.preferredDate, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-deep-brown border-accent-primary" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={formData.preferredDate}
                    onSelect={(date) => handleInputChange('preferredDate', date)}
                    disabled={(date) => date < new Date()}
                    initialFocus
                    className="bg-deep-brown text-white"
                  />
                </PopoverContent>
              </Popover>
              {errors.preferredDate && (
                <p className="text-red-400 text-sm">{errors.preferredDate}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-warm-beige">Preferred Time Slot *</Label>
                <Select
                  value={formData.preferredTime}
                  onValueChange={(value) => handleInputChange('preferredTime', value)}
                >
                  <SelectTrigger className="bg-deep-brown border-accent-primary text-white focus:ring-accent-primary">
                    <SelectValue placeholder="Select time slot" />
                  </SelectTrigger>
                  <SelectContent className="bg-deep-brown border-accent-primary">
                    {TIME_SLOTS.map((time) => (
                      <SelectItem
                        key={time}
                        value={time}
                        className="text-white hover:bg-accent-primary hover:text-deep-brown"
                      >
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.preferredTime && (
                  <p className="text-red-400 text-sm">{errors.preferredTime}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-warm-beige">Alternative Time (Optional)</Label>
                <Select
                  value={formData.alternativeTime}
                  onValueChange={(value) => handleInputChange('alternativeTime', value)}
                >
                  <SelectTrigger className="bg-deep-brown border-accent-primary text-white focus:ring-accent-primary">
                    <SelectValue placeholder="Select alternative time" />
                  </SelectTrigger>
                  <SelectContent className="bg-deep-brown border-accent-primary">
                    {TIME_SLOTS.map((time) => (
                      <SelectItem
                        key={time}
                        value={time}
                        className="text-white hover:bg-accent-primary hover:text-deep-brown"
                      >
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-4">
            <Button
              type="submit"
              variant="primary"
              size="md"
              disabled={isLoading}
              className="btn-premium w-full md:w-auto px-8 py-3 bg-gradient-accent hover:bg-gradient-accent/90 text-white shadow-accent hover:shadow-lg transition-all duration-300"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Submitting...
                </>
              ) : (
                <>
                  Book Now
                  <Clock className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;
