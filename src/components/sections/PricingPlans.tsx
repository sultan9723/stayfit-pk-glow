import { Check, Star, Clock, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/Button";
import { Badge } from "@/components/ui/badge";

const plans = [
  {
    name: "Free Trial",
    price: "Free",
    period: "Current Status",
    features: ["Basic gym access", "Equipment orientation", "Initial assessment", "Trial period"],
    highlight: false,
    popular: false,
    duration: "7 days",
    capacity: "Unlimited",
    level: "All Levels",
  },
  {
    name: "Strength Training",
    price: "Rs4,000",
    period: "Per Month",
    features: ["Strength training only", "Free weights access", "Basic diet plan", "General training guidance"],
    highlight: false,
    popular: false,
    duration: "60-90 min",
    capacity: "8-12 people",
    level: "All Levels",
  },
  {
    name: "Cardio Only",
    price: "Rs5,000",
    period: "Per Month",
    features: ["Cardio equipment access", "Treadmill & cycling", "Basic diet plan", "Cardio guidance"],
    highlight: false,
    popular: false,
    duration: "45-60 min",
    capacity: "10-15 people",
    level: "All Levels",
  },
  {
    name: "Cardio + Strength",
    price: "Rs8,000",
    period: "Per Month",
    features: ["Full gym access", "Cardio & strength training", "Comprehensive diet plan", "Personal guidance"],
    highlight: true,
    popular: true,
    duration: "60-90 min",
    capacity: "8-12 people",
    level: "All Levels",
  },
  {
    name: "Group Class (Strength)",
    price: "Rs8,000",
    period: "Per Month",
    features: ["Group strength training", "Instructor-led sessions", "Diet plan included", "Community training"],
    highlight: false,
    popular: false,
    duration: "60 min",
    capacity: "8-12 people",
    level: "All Levels",
  },
  {
    name: "Group Class (Cardio + Strength)",
    price: "Rs10,000",
    period: "Per Month",
    features: ["Complete group training", "Cardio & strength classes", "Premium diet plan", "Expert instruction"],
    highlight: false,
    popular: true,
    duration: "75 min",
    capacity: "10-15 people",
    level: "All Levels",
  },
  {
    name: "Personal Training",
    price: "Rs20,000",
    period: "Per Month",
    features: ["1-on-1 training", "Personalized programs", "Complete diet plan", "Flexible scheduling"],
    highlight: false,
    popular: false,
    duration: "60 min",
    capacity: "1-on-1",
    level: "All Levels",
  },
];

const PricingPlans = () => {
  // Optional button configuration
  const showButtons = true; // Set to false to hide all action buttons
  
  return (
    <section className="py-20 bg-very-dark-brown">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-gradient-accent">
            Membership Pricing Plans
          </h2>
          <p className="text-xl text-warm-beige max-w-3xl mx-auto leading-relaxed">
            Choose from our flexible membership plans designed to fit your fitness goals and budget. 
            All plans include expert guidance and premium facilities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {plans.map((plan, index) => (
            <Card
              key={index} 
              className={`card-elegant group hover:shadow-accent transition-all duration-500 hover:-translate-y-2 relative ${
                plan.highlight ? "border-accent-primary shadow-accent" : ""
              }`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-6 bg-gradient-golden text-very-dark-brown font-semibold px-4 py-1">
                  <Star className="w-4 h-4 mr-1" />
                  Popular
                </Badge>
              )}
              
              <CardHeader className="pb-4">
                <CardTitle className="flex items-baseline justify-between mb-2">
                  <span className="text-2xl font-semibold text-white">{plan.name}</span>
                  <span className="text-3xl font-extrabold text-accent-primary">{plan.price}</span>
                </CardTitle>
                <p className="text-sm text-warm-beige">{plan.period}</p>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-warm-beige">
                    <Clock className="w-4 h-4 mr-2" />
                    {plan.duration}
                  </div>
                  <div className="flex items-center text-warm-beige">
                    <Users className="w-4 h-4 mr-2" />
                    {plan.capacity}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="border-accent-primary text-accent-primary">
                    {plan.level}
                  </Badge>
                </div>

                <ul className="space-y-2">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-warm-beige">
                      <Check className="w-4 h-4 text-accent-primary mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {showButtons && (
                  <Button 
                    variant="primary" 
                    size="md" 
                    className="w-full group-hover:shadow-accent transition-all duration-300"
                  >
                    {plan.price === "Free" ? "Start Free Trial" : "Register Now"}
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {showButtons && (
          <div className="text-center mt-12">
            <p className="text-warm-beige mb-4">
              Not sure which plan is right for you? Contact us for a free consultation!
            </p>
            <Button variant="secondary" size="md">
              Get Free Consultation
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default PricingPlans;
