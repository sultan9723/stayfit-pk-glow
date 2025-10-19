import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { Button } from "@/components/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { buildApiUrl } from "@/lib/api";
import stayfitData from "../../data/stayfit_content.json";
import { Instagram, Facebook, Youtube } from "lucide-react";
import { useScrollToHash } from "@/hooks/useScrollToHash";

const ContactPage = () => {
  // Smooth scroll for #hash targets
  useScrollToHash();
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
        <meta
          name="description"
          content="StayFit.pk — 23-B, Street 10, Rawalpindi, Pakistan. Open Mon–Sat, 6 AM – 10 PM. Contact us by phone, WhatsApp, or email for memberships, programs, and training."
        />
      </Helmet>

      <div className="min-h-screen bg-navy-primary pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <section id="message">
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
          </section>

          {/* Quick Contact Buttons */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <a
              href="tel:+923330711555"
              aria-label="Call Now"
              className="text-center rounded-lg px-4 py-3 bg-white/10 text-white hover:bg-white/20 transition"
            >
              📞 Call Now
            </a>
            <a
              href="https://wa.me/923330711555?text=Hello%20StayFit.pk%20—%20I%20have%20a%20question"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp Us"
              className="text-center rounded-lg px-4 py-3 bg-[#16A34A] text-white hover:bg-[#138a3f] transition"
            >
              💬 WhatsApp Us
            </a>
            <a
              href="mailto:info@stayfit.pk"
              aria-label="Email Us"
              className="text-center rounded-lg px-4 py-3 bg-white/10 text-white hover:bg-white/20 transition"
            >
              📧 Email Us
            </a>
          </div>
        </div>

        {/* Find Us & Map */}
        <section id="find-us" className="px-4 sm:px-6 lg:px-8">
        <Card className="card-elegant bg-gradient-card shadow-elegant transition-transform duration-500 hover:scale-[1.02]">
          <CardHeader>
            <CardTitle className="text-white-text">Find Us</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4 text-warm-beige text-sm">
              <p>
                <span className="text-white font-semibold">StayFit Gym</span> — 23-B, Street 10, Rawalpindi, Pakistan
              </p>
              <p>Open: Mon–Sat, 6 AM – 12 PM</p>
              <p>
                Phone: <a className="underline hover:text-accent-primary" href="tel:+923330711555">+92 333 0711555</a> ·
                
              </p>
            </div>
            <div className="w-full h-96 rounded-lg overflow-hidden">
              <iframe
                src="https://maps.app.goo.gl/vxN7rKEQcyH48n4P9?g_st=ipc"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="StayFit Gym Location in Rawalpindi"
              />
            </div>
            {/* Follow Us */}
            <div className="mt-6 flex items-center justify-center gap-6">
              <a
                href="https://www.instagram.com/stayfitpakistan?igsh=MXZzdzN4b2s2dTdkdw=="
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Instagram"
                className="text-white hover:text-accent-primary"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a
                href="https://www.facebook.com/share/1AC1Mp4QT7/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Facebook"
                className="text-white hover:text-accent-primary"
              >
                <Facebook className="w-6 h-6" />
              </a>
              <a
                href="https://youtube.com/@stayfitpakistan1?si=7DMN1j9SCpaUY1Bt"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Subscribe on YouTube"
                className="text-white hover:text-accent-primary"
              >
                <Youtube className="w-6 h-6" />
              </a>
            </div>
          </CardContent>
        </Card>
        </section>
      </div>
    </>
  );
};

export default ContactPage;