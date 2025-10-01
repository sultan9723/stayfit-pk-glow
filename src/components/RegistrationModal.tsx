import React, { useEffect, useState } from "react";
import { Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan: string;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
}

const RegistrationModal: React.FC<RegistrationModalProps> = ({ isOpen, onClose, selectedPlan }) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({ name: "", email: "", phone: "" });
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (!isOpen) {
      setFormData({ name: "", email: "", phone: "" });
      setErrors({});
    }
  }, [isOpen]);

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!formData.name.trim()) e.name = "Full name is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) e.email = "Email address is required";
    else if (!emailRegex.test(formData.email)) e.email = "Please enter a valid email address";
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
    if (!formData.phone.trim()) e.phone = "Phone number is required";
    else if (!phoneRegex.test(formData.phone.replace(/\s/g, ""))) e.phone = "Please enter a valid phone number (minimum 10 digits)";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (key: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsLoading(true);
    try {
      const payload = {
        type: "pricing",
        planName: selectedPlan,
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
      };
      const base = import.meta.env.VITE_API_BASE || "";
      const res = await fetch(`${base}/api/book`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Failed to register");
      }
      toast({ title: "Registered!", description: `You registered for ${selectedPlan}. We'll contact you soon.` });
      onClose();
    } catch (error) {
      console.error("Registration error:", error);
      toast({ title: "Registration Failed", description: error instanceof Error ? error.message : "Something went wrong.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto bg-very-dark-brown border-accent-primary">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gradient-accent text-center">Register for Plan</DialogTitle>
          <DialogDescription className="text-warm-beige text-center">Complete your details to register for your selected membership plan.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label className="text-warm-beige">Plan</Label>
            <Input readOnly value={selectedPlan} className="bg-deep-brown border-accent-primary text-white placeholder:text-warm-beige focus:ring-accent-primary" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-warm-beige">Full Name *</Label>
              <Input id="name" type="text" value={formData.name} onChange={(e) => handleChange("name", e.target.value)} className="bg-deep-brown border-accent-primary text-white placeholder:text-warm-beige focus:ring-accent-primary" placeholder="Enter your full name" />
              {errors.name && <p className="text-red-400 text-sm">{errors.name}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-warm-beige">Email Address *</Label>
              <Input id="email" type="email" value={formData.email} onChange={(e) => handleChange("email", e.target.value)} className="bg-deep-brown border-accent-primary text-white placeholder:text-warm-beige focus:ring-accent-primary" placeholder="your.email@example.com" />
              {errors.email && <p className="text-red-400 text-sm">{errors.email}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-warm-beige">Phone Number *</Label>
            <Input id="phone" type="tel" value={formData.phone} onChange={(e) => handleChange("phone", e.target.value)} className="bg-deep-brown border-accent-primary text-white placeholder:text-warm-beige focus:ring-accent-primary" placeholder="+92-300-1234567" />
            {errors.phone && <p className="text-red-400 text-sm">{errors.phone}</p>}
          </div>

          <div className="flex justify-center pt-2">
            <Button type="submit" variant="primary" size="md" disabled={isLoading} className="btn-premium w-full md:w-auto px-8 py-3 bg-gradient-accent hover:bg-gradient-accent/90 text-white shadow-accent hover:shadow-lg transition-all duration-300">
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Submitting...
                </>
              ) : (
                <>
                  Register Now
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

export default RegistrationModal;
