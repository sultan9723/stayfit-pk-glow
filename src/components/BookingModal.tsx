import React, { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  User,
  Target,
  Calendar as CalendarIcon,
} from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { buildApiUrl } from "@/lib/api";

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

const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  selectedProgram,
}) => {
  const { toast } = useToast();
  const [programs, setPrograms] = useState<Program[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    programId: selectedProgram?.id || "",
    programName: selectedProgram?.title || "",
    goal: "",
    preferredDate: undefined,
    preferredTime: "",
    alternativeTime: "",
  });

  // ✅ Load static programs
  useEffect(() => {
    if (isOpen) {
      setPrograms([
        {
          id: "1",
          name: "Strength Training",
          description:
            "Build power and endurance with guided strength sessions.",
          duration: "60–90 min",
          price: 4000,
        },
        {
          id: "2",
          name: "Cardio Only",
          description: "Boost stamina and heart health through cardio workouts.",
          duration: "45–60 min",
          price: 5000,
        },
        {
          id: "3",
          name: "Cardio + Strength",
          description: "Combined training for complete fitness improvement.",
          duration: "60–90 min",
          price: 8000,
        },
        {
          id: "4",
          name: "Group Class (Strength)",
          description: "Fun group workouts to build motivation and strength.",
          duration: "60 min",
          price: 8000,
        },
        {
          id: "5",
          name: "Group Class (Cardio + Strength)",
          description: "Blend cardio and strength with friends and trainers.",
          duration: "75 min",
          price: 10000,
        },
        {
          id: "6",
          name: "Personal Training",
          description: "1-on-1 coaching tailored to your unique fitness goals.",
          duration: "60 min",
          price: 20000,
        },
      ]);
    }
  }, [isOpen]);

  // ✅ Auto-fill when program is preselected
  useEffect(() => {
    if (selectedProgram) {
      setFormData((prev) => ({
        ...prev,
        programId: selectedProgram.id,
        programName: selectedProgram.title,
      }));
    }
  }, [selectedProgram]);

  const validate = (): boolean => {
    const errors: string[] = [];
    if (!formData.name.trim()) errors.push("Full name");
    if (!formData.email.trim()) errors.push("Email");
    if (!formData.phone.trim()) errors.push("Phone number");
    if (!formData.programId) errors.push("Program");
    if (!formData.goal) errors.push("Goal");
    if (!formData.preferredDate) errors.push("Preferred date");
    if (!formData.preferredTime) errors.push("Time slot");

    if (errors.length) {
      toast({
        title: "Missing Required Fields",
        description: `Please fill: ${errors.join(", ")}.`,
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    try {
      const payload = {
        type: "program",
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        programId: Number(formData.programId),
        goal: formData.goal,
        preferredDate: formData.preferredDate
          ? formData.preferredDate.toISOString().split("T")[0]
          : undefined,
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
        title: "Booking Confirmed 🎉",
        description: "Your booking has been successfully submitted.",
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        programId: "",
        programName: "",
        goal: "",
        preferredDate: undefined,
        preferredTime: "",
        alternativeTime: "",
      });

      onClose();
    } catch (error) {
      toast({
        title: "Booking Failed",
        description:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
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
            Book Your Fitness Program
          </DialogTitle>
          <DialogDescription className="text-center">
            Fill out the form to reserve your slot with StayFit
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* --- Personal Info --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <Input
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          <Input
            placeholder="Phone Number"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
          />

          {/* --- Program --- */}
          <Select
            value={formData.programId}
            onValueChange={(id) => {
              const p = programs.find((x) => String(x.id) === id);
              setFormData((prev) => ({
                ...prev,
                programId: id,
                programName: p?.name || "",
              }));
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Program" />
            </SelectTrigger>
            <SelectContent>
              {programs.map((program) => (
                <SelectItem key={program.id} value={String(program.id)}>
                  {program.name} — {program.duration} — Rs{program.price}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* --- Goal --- */}
          <Select
            value={formData.goal}
            onValueChange={(goal) => setFormData({ ...formData, goal })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Goal" />
            </SelectTrigger>
            <SelectContent>
              {GOAL_OPTIONS.map((g) => (
                <SelectItem key={g} value={g}>
                  {g}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* --- Date --- */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="secondary"
                type="button"
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
                onSelect={(date) =>
                  setFormData({ ...formData, preferredDate: date })
                }
                disabled={(date) => date < new Date()}
              />
            </PopoverContent>
          </Popover>

          {/* --- Time Slot --- */}
          <Select
            value={formData.preferredTime}
            onValueChange={(v) =>
              setFormData({ ...formData, preferredTime: v })
            }
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

export default BookingModal;