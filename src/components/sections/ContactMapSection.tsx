import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const ContactMapSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  
  const contactRef = useScrollAnimation();
  const mapRef = useScrollAnimation();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.email.includes("@")) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsSubmitted(true);
      setFormData({ name: "", email: "", phone: "", message: "" });
      
      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll get back to you within 24 hours.",
      });
    } catch (error) {
      toast({
        title: "Failed to Send",
        description: "Something went wrong. Please try again or call us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Our Gym",
      details: ["123 Fitness Street", "Karachi, Pakistan", "ZIP: 12345"],
      action: "Get Directions"
    },
    {
      icon: Phone,
      title: "Call Us",
      details: ["+92 XXX XXXXXXX", "WhatsApp Available", "Emergency: +92 XXX XXXXXXX"],
      action: "Call Now"
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["info@stayfit.pk", "support@stayfit.pk", "Response within 24hrs"],
      action: "Send Email"
    },
    {
      icon: Clock,
      title: "Operating Hours",
      details: ["Mon-Sat: 5:00 AM - 11:00 PM", "Sunday: 7:00 AM - 9:00 PM", "Holidays: 8:00 AM - 6:00 PM"],
      action: "View Schedule"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-navy-primary to-dark-brown">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-on-scroll" ref={contactRef}>
          <h2 className="text-4xl font-bold mb-4 text-gradient-golden">
            Get in Touch
          </h2>
          <p className="text-xl text-gray-muted max-w-3xl mx-auto leading-relaxed">
            Ready to start your fitness journey? Contact us today for a free consultation 
            and tour of our state-of-the-art facilities.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Form */}
          <Card className="card-elegant animate-on-scroll">
            <CardHeader>
              <CardTitle className="text-2xl text-white-text">
                Send us a Message
              </CardTitle>
              <p className="text-gray-muted">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>
            </CardHeader>
            <CardContent>
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Input
                        type="text"
                        name="name"
                        placeholder="Your Full Name *"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="bg-white/10 border-white/20 text-white-text placeholder:text-gray-muted focus:border-golden-accent focus:ring-golden-accent"
                        required
                      />
                    </div>
                    <div>
                      <Input
                        type="email"
                        name="email"
                        placeholder="Your Email Address *"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="bg-white/10 border-white/20 text-white-text placeholder:text-gray-muted focus:border-golden-accent focus:ring-golden-accent"
                        required
                      />
                    </div>
                  </div>
                  
                  <Input
                    type="tel"
                    name="phone"
                    placeholder="Your Phone Number (Optional)"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="bg-white/10 border-white/20 text-white-text placeholder:text-gray-muted focus:border-golden-accent focus:ring-golden-accent"
                  />
                  
                  <Textarea
                    name="message"
                    placeholder="Tell us about your fitness goals and how we can help you... *"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    className="bg-white/10 border-white/20 text-white-text placeholder:text-gray-muted focus:border-golden-accent focus:ring-golden-accent resize-none"
                    required
                  />
                  
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-hero-primary"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-navy-primary border-t-transparent rounded-full animate-spin mr-2" />
                        Sending Message...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                  
                  <p className="text-xs text-gray-muted text-center">
                    * Required fields. We respect your privacy and will never share your information.
                  </p>
                </form>
              ) : (
                <div className="text-center space-y-6 py-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-green rounded-full mb-4">
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white-text mb-2">
                      Message Sent Successfully!
                    </h3>
                    <p className="text-gray-muted">
                      Thank you for reaching out. Our team will contact you within 24 hours.
                    </p>
                  </div>
                  <Button
                    onClick={() => setIsSubmitted(false)}
                    variant="outline"
                    className="border-golden-accent text-golden-accent hover:bg-golden-accent/10"
                  >
                    Send Another Message
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6 animate-on-scroll">
            {contactInfo.map((info, index) => (
              <Card key={index} className="card-elegant group hover:shadow-golden transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-gradient-golden rounded-full p-3 group-hover:scale-110 transition-transform duration-300">
                      <info.icon className="w-6 h-6 text-navy-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white-text mb-2">
                        {info.title}
                      </h3>
                      <div className="space-y-1 mb-4">
                        {info.details.map((detail, detailIndex) => (
                          <p key={detailIndex} className="text-gray-muted text-sm">
                            {detail}
                          </p>
                        ))}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-golden-accent text-golden-accent hover:bg-golden-accent/10"
                      >
                        {info.action}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Google Maps Section */}
        <Card className="card-elegant animate-on-scroll" ref={mapRef}>
          <CardHeader>
            <CardTitle className="text-2xl text-white-text text-center">
              Find Us on the Map
            </CardTitle>
            <p className="text-gray-muted text-center">
              Located in the heart of Karachi with easy access and ample parking
            </p>
          </CardHeader>
          <CardContent className="p-6">
            <div className="relative h-96 rounded-xl overflow-hidden bg-warm-beige">
              {/* Placeholder for Google Maps - Replace with actual Google Maps embed */}
              <div className="absolute inset-0 bg-gradient-to-br from-navy-primary to-dark-brown flex items-center justify-center">
                <div className="text-center space-y-4">
                  <MapPin className="w-16 h-16 text-golden-accent mx-auto" />
                  <div>
                    <h3 className="text-xl font-semibold text-white-text mb-2">
                      Interactive Map Coming Soon
                    </h3>
                    <p className="text-gray-muted max-w-md">
                      We're integrating Google Maps to help you easily find our location. 
                      For now, use the address above or contact us for directions.
                    </p>
                  </div>
                  <Button className="btn-hero-secondary">
                    Get Directions
                  </Button>
                </div>
              </div>
              
              {/* Actual Google Maps embed would go here:
              <iframe
                src="https://www.google.com/maps/embed?pb=YOUR_GOOGLE_MAPS_EMBED_CODE"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="StayFit.pk Location"
              />
              */}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ContactMapSection;