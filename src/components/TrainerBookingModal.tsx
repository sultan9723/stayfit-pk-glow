import React, { useEffect, useState } from "react";
import { Calendar, Clock, User, Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/Button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface TrainerBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTrainer?: {
    id: string;
    name: string;
  };
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  trainerId: string;
  trainerName: string;
  goal: string;
  preferredDate: Date | undefined;
  preferredTime: string;
  alternativeTime: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  trainerId?: string;
  goal?: string;
  preferredDate?: string;
  preferredTime?: string;
}

const GOAL_OPTIONS = [
  "Weight Loss",
  "Muscle Building",
  "General Fitness",
  "MMA",
  "Yoga",
  "Nutrition",
];

const TIME_SLOTS = [
  "Slot 1 Co — 8 AM to 11 AM",
  "Slot 2 Female only — 11 AM to 7 PM",
  "Slot 3 Co — 7 PM to 12 Midnight",
];

const TrainerBookingModal: React.FC<TrainerBookingModalProps> = ({ isOpen, onClose, selectedTrainer }) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    trainerId: selectedTrainer?.id || "",
    trainerName: selectedTrainer?.name || "",
    goal: "",
    preferredDate: undefined,
    preferredTime: "",
    alternativeTime: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (selectedTrainer) {
      setFormData((prev) => ({
        ...prev,
        trainerId: selectedTrainer.id,
        trainerName: selectedTrainer.name,
      }));
    }
  }, [selectedTrainer]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) newErrors.name = "Full name is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) newErrors.email = "Email address is required";
    else if (!emailRegex.test(formData.email)) newErrors.email = "Please enter a valid email address";

    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!phoneRegex.test(formData.phone.replace(/\s/g, ""))) newErrors.phone = "Please enter a valid phone number (minimum 10 digits)";

    if (!formData.trainerId) newErrors.trainerId = "Trainer is required";
    if (!formData.goal) newErrors.goal = "Please select your fitness goal";

    if (!formData.preferredDate) newErrors.preferredDate = "Please select a preferred date";
    else if (formData.preferredDate < new Date()) newErrors.preferredDate = "Please select a future date";

    if (!formData.preferredTime) newErrors.preferredTime = "Please select a preferred time slot";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string | Date | undefined) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const payload = {
        type: "trainer",
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        trainerId: formData.trainerId,
        trainerName: formData.trainerName,
        goal: formData.goal,
        preferredDate: formData.preferredDate?.toISOString().split("T")[0],
        preferredTime: formData.preferredTime,
        alternativeTime: formData.alternativeTime || undefined,
      };

      const base = import.meta.env.VITE_API_BASE || "";
      const res = await fetch(`${base}/api/book`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Failed to submit booking");
      }

      toast({
        title: "Session Requested!",
        description: "Your trainer session request has been submitted successfully.",
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        trainerId: selectedTrainer?.id || "",
        trainerName: selectedTrainer?.name || "",
        goal: "",
        preferredDate: undefined,
        preferredTime: "",
        alternativeTime: "",
      });
      setErrors({});
      onClose();
    } catch (error) {
      console.error("Trainer booking error:", error);
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
      name: "",
      email: "",
      phone: "",
      trainerId: selectedTrainer?.id || "",
      trainerName: selectedTrainer?.name || "",
      goal: "",
      preferredDate: undefined,
      preferredTime: "",
      alternativeTime: "",
    });
    setErrors({});
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-[#FFF5EE] text-black border border-accent-primary rounded-lg shadow-lg p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-dark-brown">
            Book a Trainer Session
          </DialogTitle>
          <DialogDescription className="text-dark-brown/80 text-center">
            Fill out the form below to request a session with your selected trainer
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white flex items-center">
              <User className="w-5 h-5 mr-2 text-accent-primary" />
              Personal Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-dark-brown">Full Name *</Label>
                <Input id="name" type="text" value={formData.name} onChange={(e) => handleInputChange("name", e.target.value)} className="bg-white border-accent-primary text-dark-brown placeholder:text-dark-brown/60 focus:ring-accent-primary" placeholder="Enter your full name" />
                {errors.name && <p className="text-red-400 text-sm">{errors.name}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-dark-brown">Email Address *</Label>
                <Input id="email" type="email" value={formData.email} onChange={(e) => handleInputChange("email", e.target.value)} className="bg-white border-accent-primary text-dark-brown placeholder:text-dark-brown/60 focus:ring-accent-primary" placeholder="your.email@example.com" />
                {errors.email && <p className="text-red-400 text-sm">{errors.email}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-dark-brown">Phone Number *</Label>
              <Input id="phone" type="tel" value={formData.phone} onChange={(e) => handleInputChange("phone", e.target.value)} className="bg-white border-accent-primary text-dark-brown placeholder:text-dark-brown/60 focus:ring-accent-primary" placeholder="+92-300-1234567" />
              {errors.phone && <p className="text-red-400 text-sm">{errors.phone}</p>}
            </div>
          </div>

          {/* Trainer Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-dark-brown flex items-center">
              <Label className="text-dark-brown">Trainer *</Label>
            </h3>
            <Input id="trainer" type="text" value={formData.trainerName} readOnly className="bg-white border-accent-primary text-dark-brown placeholder:text-dark-brown/60 focus:ring-accent-primary" />
            {errors.trainerId && <p className="text-red-400 text-sm">{errors.trainerId}</p>}
          </div>

          {/* Scheduling */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-dark-brown flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-accent-primary" />
              Scheduling
            </h3>

            <div className="space-y-2">
              <Label className="text-dark-brown">Preferred Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="secondary"
                    className={cn(
                      "w-full justify-start text-left font-normal bg-white border-accent-primary text-dark-brown hover:bg-accent-primary/10 hover:text-dark-brown",
                      !formData.preferredDate && "text-dark-brown/60"
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
                <PopoverContent className="w-auto p-0 bg-white text-dark-brown border-accent-primary" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={formData.preferredDate}
                    onSelect={(date) => handleInputChange("preferredDate", date)}
                    disabled={(date) => date < new Date()}
                    initialFocus
                    className="bg-white text-dark-brown"
                  />
                </PopoverContent>
              </Popover>
              {errors.preferredDate && <p className="text-red-400 text-sm">{errors.preferredDate}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-dark-brown">Preferred Time Slot *</Label>
                <Select value={formData.preferredTime} onValueChange={(v) => handleInputChange("preferredTime", v)}>
                  <SelectTrigger className="bg-white border-accent-primary text-dark-brown focus:ring-accent-primary">
                    <SelectValue placeholder="Select time slot" />
                  </SelectTrigger>
                  <SelectContent className="bg-white text-dark-brown border-accent-primary">
                    {TIME_SLOTS.map((time) => (
                      <SelectItem key={time} value={time} className="text-dark-brown hover:bg-accent-primary/10 hover:text-dark-brown">
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.preferredTime && <p className="text-red-400 text-sm">{errors.preferredTime}</p>}
              </div>

              <div className="space-y-2">
                <Label className="text-dark-brown">Alternative Time (Optional)</Label>
                <Select value={formData.alternativeTime} onValueChange={(v) => handleInputChange("alternativeTime", v)}>
                  <SelectTrigger className="bg-white border-accent-primary text-dark-brown focus:ring-accent-primary">
                    <SelectValue placeholder="Select alternative time" />
                  </SelectTrigger>
                  <SelectContent className="bg-white text-dark-brown border-accent-primary">
                    {TIME_SLOTS.map((time) => (
                      <SelectItem key={time} value={time} className="text-dark-brown hover:bg-accent-primary/10 hover:text-dark-brown">
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-center pt-4">
            <Button type="submit" variant="primary" size="md" disabled={isLoading} className="w-full md:w-auto">
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

export default TrainerBookingModal;
