
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from "@/components/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Youtube, Loader2 } from "lucide-react";
import stayfitData from "../../data/stayfit_content.json";
import { BASE_URL } from "../config";
import { useToast } from "../hooks/use-toast";

// Validation schema
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

const ContactPage = () => {
  const { contact } = stayfitData;

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setLoading(true);
    setMessage({ text: '', type: '' });

    try {
      const response = await fetch(`${BASE_URL}/api/contact`, {
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
          description: "Your message has been sent successfully! We will get back to you soon.",
          variant: "default",
        });
        reset();
      } else {
        toast({
          title: "Error",
          description: result.message || 'Failed to send message. Please try again.',
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
    <>
      <Helmet>
        <title>Contact Us - StayFit | Get in Touch</title>
        <meta
          name="description"
          content="Contact StayFit for inquiries about membership, training programs, or any questions. Visit our gym or reach out online."
        />
      </Helmet>

      <div className="min-h-screen bg-navy-primary pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Page Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold mb-4 text-gradient-accent">
              Contact Us
            </h1>
            <p className="text-xl text-gray-muted max-w-2xl mx-auto">
              Get in touch with StayFit.pk for any questions about our programs,
              membership, or to schedule a visit.
            </p>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Left Side: Info + Socials */}
            <div className="space-y-8">
              {/* Contact Information */}
              <Card className="card-elegant transition-transform duration-500 hover:scale-[1.02]">
                <CardHeader>
                  <CardTitle className="text-white-text">Get in Touch</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="bg-gradient-golden rounded-full p-3">
                      <MapPin className="w-6 h-6 text-navy-primary" />
                    </div>
                    <div>
                      <h3 className="text-white-text font-semibold">Address</h3>
                      <p className="text-gray-muted">{contact.address}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="bg-gradient-golden rounded-full p-3">
                      <Phone className="w-6 h-6 text-navy-primary" />
                    </div>
                    <div>
                      <h3 className="text-white-text font-semibold">Phone</h3>
                      <p className="text-gray-muted">{contact.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="bg-gradient-golden rounded-full p-3">
                      <Mail className="w-6 h-6 text-navy-primary" />
                    </div>
                    <div>
                      <h3 className="text-white-text font-semibold">Email</h3>
                      <p className="text-gray-muted">{contact.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="bg-gradient-golden rounded-full p-3">
                      <Clock className="w-6 h-6 text-navy-primary" />
                    </div>
                    <div>
                      <h3 className="text-white-text font-semibold">
                        Business Hours
                      </h3>
                      <p className="text-gray-muted">{contact.business_hours.weekdays}</p>
                      <p className="text-gray-muted">{contact.business_hours.weekends}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Social Media */}
              <Card className="card-elegant transition-transform duration-500 hover:scale-[1.02]">
                <CardHeader>
                  <CardTitle className="text-white-text">Follow Us</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex space-x-4">
                    <Button
                      variant="accent"
                      size="sm"
                      asChild
                      className="w-12 h-12 p-0 rounded-full flex items-center justify-center"
                    >
                      <a
                        href="https://www.facebook.com/share/16znbiAdTF/?mibextid=wwXIfr"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Facebook className="w-6 h-6" />
                      </a>
                    </Button>
                    <Button
                      variant="accent"
                      size="sm"
                      asChild
                      className="w-12 h-12 p-0 rounded-full flex items-center justify-center"
                    >
                      <a
                        href="https://www.instagram.com/stayfitpk"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Instagram className="w-6 h-6" />
                      </a>
                    </Button>
                    <Button
                      variant="accent"
                      size="sm"
                      asChild
                      className="w-12 h-12 p-0 rounded-full flex items-center justify-center"
                    >
                      <a
                        href="https://youtube.com/@stayfitpakistan1"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Youtube className="w-6 h-6" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <Card className="card-elegant transition-transform duration-500 hover:scale-[1.02]">
              <CardHeader>
                <CardTitle className="text-white-text">Send us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Input
                        {...register('name')}
                        placeholder="Your Name"
                        className={`bg-white/10 border text-white-text placeholder:text-gray-muted focus:border-accent-primary ${
                          errors.name ? 'border-red-500' : 'border-white/20'
                        }`}
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
                      )}
                    </div>
                    <div>
                      <Input
                        {...register('email')}
                        type="email"
                        placeholder="Your Email"
                        className={`bg-white/10 border text-white-text placeholder:text-gray-muted focus:border-accent-primary ${
                          errors.email ? 'border-red-500' : 'border-white/20'
                        }`}
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
                      )}
                    </div>
                  </div>
                  <div>
                    <Input
                      {...register('subject')}
                      placeholder="Subject"
                      className={`bg-white/10 border text-white-text placeholder:text-gray-muted focus:border-accent-primary ${
                        errors.subject ? 'border-red-500' : 'border-white/20'
                      }`}
                    />
                    {errors.subject && (
                      <p className="mt-1 text-sm text-red-400">{errors.subject.message}</p>
                    )}
                  </div>
                  <div>
                    <Textarea
                      {...register('message')}
                      placeholder="Your Message"
                      rows={5}
                      className={`bg-white/10 border text-white-text placeholder:text-gray-muted focus:border-accent-primary ${
                        errors.message ? 'border-red-500' : 'border-white/20'
                      }`}
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-400">{errors.message.message}</p>
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

                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    disabled={isSubmitting || loading}
                    className="btn-premium w-full px-8 py-3 bg-gradient-accent hover:bg-gradient-accent/90 text-white shadow-accent hover:shadow-lg transition-all duration-300 flex items-center justify-center"
                  >
                    {isSubmitting || loading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Google Map */}
          <Card className="card-elegant bg-gradient-card shadow-elegant transition-transform duration-500 hover:scale-[1.02]">
            <CardHeader>
              <CardTitle className="text-white-text">Find Us</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-full h-96 rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3323.1729925857197!2d73.05588937656313!3d33.59818744194256!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38df9568a7b9c5b5%3A0x3a0e66e1dcf7712c!2sRawalpindi%2C%20Punjab!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="StayFit.pk Location in Rawalpindi"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default ContactPage;