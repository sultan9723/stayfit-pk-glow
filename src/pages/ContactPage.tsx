import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { Button } from "@/components/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { buildApiUrl } from "@/lib/api";
import stayfitData from "../../data/stayfit_content.json";

const ContactPage = () => {
  const { contact } = stayfitData;

  // Controlled form submission state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !message.trim()) {
      toast({
        title: "Missing fields",
        description: "Name, Email, and Message are required.",
        variant: "destructive",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch(buildApiUrl("/api/contact"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          subject: subject.trim() || undefined,
          message: message.trim(),
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Failed to submit message");
      }

      toast({
        title: "Message sent!",
        description: "We'll get back to you shortly.",
      });

      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Something went wrong.";
      toast({
        title: "Submission Failed",
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact Us - StayFit | Get in Touch</title>
      </Helmet>

      <div className="min-h-screen bg-navy-primary pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Card className="card-elegant transition-transform duration-500 hover:scale-[1.02]">
            <CardHeader>
              <CardTitle className="text-white-text">
                Send us a Message
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    required
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-white/10 border-white/20 text-white-text placeholder:text-gray-muted focus:border-accent-primary"
                  />
                  <Input
                    required
                    type="email"
                    placeholder="Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white/10 border-white/20 text-white-text placeholder:text-gray-muted focus:border-accent-primary"
                  />
                </div>

                <Input
                  placeholder="Subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="bg-white/10 border-white/20 text-white-text placeholder:text-gray-muted focus:border-accent-primary"
                />

                <Textarea
                  required
                  placeholder="Your Message"
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="bg-white/10 border-white/20 text-white-text placeholder:text-gray-muted focus:border-accent-primary"
                />

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  variant="primary"
                  size="md"
                  className="btn-premium w-full px-8 py-3 bg-gradient-accent hover:bg-gradient-accent/90 text-white shadow-accent hover:shadow-lg transition-all duration-300"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
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
    </>
  );
};

export default ContactPage;