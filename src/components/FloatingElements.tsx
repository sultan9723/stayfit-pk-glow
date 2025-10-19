import { MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const FloatingElements = () => {
  const whatsappNumber = "+923330711555"; // Replace with actual WhatsApp number
  const whatsappMessage = "Hi! I'm interested in joining StayFit.pk. Can you provide more information?";
  const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^\d]/g, "")}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <>
      {/* WhatsApp Floating Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="floating-element bottom-6 right-6 w-14 h-14 bg-green-secondary hover:bg-green-600 rounded-full flex items-center justify-center shadow-green"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-6 h-6 text-white" />
      </a>

      {/* Call Button */}
      <a
        href="tel:+923330711555"
        className="floating-element bottom-24 right-6 w-12 h-12 bg-golden-accent hover:bg-yellow-500 rounded-full flex items-center justify-center shadow-golden"
        aria-label="Call StayFit.pk"
      >
        <Phone className="w-5 h-5 text-navy-primary" />
      </a>

      {/* Chatbot Widget Placeholder */}
      <div className="floating-element bottom-6 left-6 hidden lg:block">
        <Button
          variant="outline"
          className="bg-card/90 backdrop-blur-sm border-golden-accent/30 text-white-text hover:bg-golden-accent/10"
          onClick={() => {
            // Placeholder for future Gemini chatbot integration
            console.log("Chatbot integration coming soon!");
          }}
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          Need Help?
        </Button>
      </div>
    </>
  );
};

export default FloatingElements;