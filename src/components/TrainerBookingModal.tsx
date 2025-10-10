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
import { buildApiUrl } from "@/lib/api";
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

const TrainerBookingModal: React.FC<TrainerBookingModalProps> = ({
  isOpen,
  onClose,
  selectedTrainer,
}) => {
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

  // ✅ Auto-update trainer info when modal opens
  useEffect(() => {
    if (selectedTrainer) {
      setFormData((prev) => ({
        ...prev,
        trainerId: selectedTrainer.id,
        trainerName: selectedTrainer.name,
      }));
    }
  }, [selectedTrainer]);

  // ✅ Basic validation (no complexity, no CORS risk)
  const validate = (): boolean => {
    const missing = [];
    if (!formData.name.trim()) missing.push("Full Name");
    if (!formData.email.trim()) missing.push("Email");
    if (!formData.phone.trim()) missing.push("Phone");
    if (!formData.trainerId) missing.push("Trainer");
    if (!formData.goal) missing.push("Goal");
    if (!formData.preferredDate) missing.push("Preferred Date");
    if (!formData.preferredTime) missing.push("Preferred Time");
    if (missing.length > 0) {
      toast({
        title: "Missing Required Fields",
        description: `Please fill: ${missing.join(", ")}.`,
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  // ✅ Submit form → unified backend /api/book
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
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

      const res = await fetch(buildApiUrl("/api/book"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to submit booking");

      toast({
        title: "Trainer Session Booked! 🎉",
        description: "Your trainer session has been successfully requested.",
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

      onClose();
    } catch (error) {
      console.error("Trainer booking error:", error);
      toast({
        title: "Booking Failed",
        description:
          error instanceof Error ? error.message : "Something went wrong.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-[#FFF5EE] text-dark-brown border border-accent-primary rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Book a Trainer Session
          </DialogTitle>
          <DialogDescription className="text-center">
            Fill the form below to schedule a personal session with your trainer
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Personal Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <Input
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <Input
            placeholder="Phone Number"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />

          {/* Trainer Name (readonly) */}
          <Input
            readOnly
            value={formData.trainerName}
            placeholder="Selected Trainer"
            className="bg-white border-accent-primary text-dark-brown"
          />

          {/* Goal */}
          <Select
            value={formData.goal}
            onValueChange={(goal) => setFormData({ ...formData, goal })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Fitness Goal" />
            </SelectTrigger>
            <SelectContent>
              {GOAL_OPTIONS.map((g) => (
                <SelectItem key={g} value={g}>
                  {g}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Preferred Date */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="secondary"
                className={cn(
                  "w-full justify-start bg-white text-dark-brown border-accent-primary",
                  !formData.preferredDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formData.preferredDate
                  ? format(formData.preferredDate, "PPP")
                  : "Select Preferred Date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0 bg-white border-accent-primary">
              <CalendarComponent
                mode="single"
                selected={formData.preferredDate}
                onSelect={(date) => setFormData({ ...formData, preferredDate: date })}
                disabled={(date) => date < new Date()}
              />
            </PopoverContent>
          </Popover>

          {/* Preferred Time */}
          <Select
            value={formData.preferredTime}
            onValueChange={(v) => setFormData({ ...formData, preferredTime: v })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Time Slot" />
            </SelectTrigger>
            <SelectContent>
              {TIME_SLOTS.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Alternative Time */}
          <Select
            value={formData.alternativeTime}
            onValueChange={(v) => setFormData({ ...formData, alternativeTime: v })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Alternative Time (optional)" />
            </SelectTrigger>
            <SelectContent>
              {TIME_SLOTS.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="primary"
            disabled={isLoading}
            className="w-full bg-gradient-accent text-white"
          >
            {isLoading ? "Submitting..." : "Book Now"}
            {!isLoading && <Clock className="ml-2 h-4 w-4" />}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TrainerBookingModal;