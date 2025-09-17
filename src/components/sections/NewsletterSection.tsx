import { useState } from "react";
import { Mail, Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const sectionRef = useScrollAnimation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes("@")) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // Simulate API call (replace with actual Mailchimp/SendGrid integration)
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Here you would integrate with your email service provider
      // Example: await subscribeToNewsletter(email);
      
      setIsSubscribed(true);
      setEmail("");
      
      toast({
        title: "Successfully Subscribed!",
        description: "Welcome to the StayFit.pk community. Check your email for confirmation.",
      });
    } catch (error) {
      toast({
        title: "Subscription Failed",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const benefits = [
    "Exclusive workout tips and nutrition advice",
    "Early access to new programs and classes",
    "Member-only discounts and special offers",
    "Free downloadable fitness guides and meal plans",
    "Weekly motivation and success stories"
  ];

  return (
    <section className="py-20 bg-gradient-to-r from-dark-brown via-warm-beige to-dark-brown">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" ref={sectionRef}>
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="text-4xl font-bold mb-4 text-gradient-golden">
            Stay Connected with StayFit.pk
          </h2>
          <p className="text-xl text-gray-muted leading-relaxed">
            Join our fitness community and get exclusive tips, workout plans, and special offers 
            delivered straight to your inbox.
          </p>
        </div>

        <Card className="card-elegant animate-on-scroll">
          <CardContent className="p-8 lg:p-12">
            {!isSubscribed ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                {/* Benefits */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="bg-gradient-golden rounded-full p-3">
                      <Mail className="w-6 h-6 text-navy-primary" />
                    </div>
                    <h3 className="text-2xl font-semibold text-white-text">
                      What You'll Get
                    </h3>
                  </div>

                  <ul className="space-y-4">
                    {benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-golden-accent rounded-full mt-2 flex-shrink-0" />
                        <span className="text-gray-muted leading-relaxed">
                          {benefit}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Subscription Form */}
                <div className="space-y-6">
                  <div className="text-center lg:text-left">
                    <h3 className="text-2xl font-semibold text-white-text mb-2">
                      Join Our Newsletter
                    </h3>
                    <p className="text-gray-muted">
                      Be the first to know about new programs, fitness tips, and exclusive offers.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-3">
                      <Input
                        type="email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-white/10 border-white/20 text-white-text placeholder:text-gray-muted focus:border-golden-accent focus:ring-golden-accent"
                        required
                      />
                      
                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full btn-hero-primary text-lg py-3"
                      >
                        {isLoading ? (
                          <>
                            <div className="w-5 h-5 border-2 border-navy-primary border-t-transparent rounded-full animate-spin mr-2" />
                            Subscribing...
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5 mr-2" />
                            Subscribe Now
                          </>
                        )}
                      </Button>
                    </div>

                    <p className="text-xs text-gray-muted text-center">
                      By subscribing, you agree to receive marketing emails from StayFit.pk. 
                      You can unsubscribe at any time.
                    </p>
                  </form>
                </div>
              </div>
            ) : (
              // Success State
              <div className="text-center space-y-6">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-green rounded-full mb-4">
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>

                <div>
                  <h3 className="text-3xl font-bold text-white-text mb-2">
                    Welcome to the Community!
                  </h3>
                  <p className="text-xl text-gray-muted leading-relaxed">
                    Thank you for subscribing to our newsletter. Check your email for a confirmation 
                    message and your first free fitness guide.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Button
                    onClick={() => setIsSubscribed(false)}
                    variant="outline"
                    className="border-golden-accent text-golden-accent hover:bg-golden-accent/10"
                  >
                    Subscribe Another Email
                  </Button>
                  
                  <Button className="btn-hero-secondary">
                    Explore Our Programs
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Social Proof */}
        <div className="text-center mt-12">
          <p className="text-gray-muted mb-4">
            Join <span className="text-golden-accent font-semibold">2,500+</span> fitness enthusiasts 
            who get our weekly newsletter
          </p>
          
          <div className="flex justify-center items-center space-x-2">
            <div className="flex -space-x-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-gradient-golden border-2 border-navy-primary flex items-center justify-center"
                >
                  <span className="text-xs font-bold text-navy-primary">
                    {String.fromCharCode(65 + i)}
                  </span>
                </div>
              ))}
            </div>
            <span className="text-gray-muted text-sm ml-3">
              Active subscribers
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;