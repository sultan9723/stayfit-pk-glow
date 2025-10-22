import { Check, Star, Clock, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/Button";
import { Badge } from "@/components/ui/badge";
import useScrollAnimation from "@/hooks/useScrollAnimation";
import { useState } from "react";
import RegistrationModal from "@/components/RegistrationModal";

const plans = [
  {
    name: "Strength Training",
    price: "Rs4,000",
    period: "Per Month",
    features: [
      "Strength training only",
      "Free weights access",
      "Basic diet plan",
      "General training guidance",
    ],
    highlight: false,
    popular: false,
    duration: "60-90 min",
    capacity: "8-30 people",
    level: "All Levels",
  },
  {
    name: "Cardio Only",
    price: "Rs5,000",
    period: "Per Month",
    features: [
      "Cardio equipment access",
      "Treadmill & cycling",
      "Basic diet plan",
      "Cardio guidance",
    ],
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
    features: [
      "Full gym access",
      "Cardio & strength training",
      "Comprehensive diet plan",
      "Personal guidance",
    ],
    highlight: false,
    popular: false,
    duration: "60-90 min",
    capacity: "8-45 people",
    level: "All Levels",
  },
  {
    name: "Group Class (Strength)",
    price: "Rs8,000",
    period: "Per Month",
    features: [
      "Group strength training",
      "Instructor-led sessions",
      "Diet plan included",
      "Community training",
    ],
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
    features: [
      "Complete group training",
      "Cardio & strength classes",
      "Premium diet plan",
      "Expert instruction",
    ],
    highlight: false,
    popular: true, // ✅ Only this card will show "Most Popular"
    duration: "75 min",
    capacity: "10-15 people",
    level: "All Levels",
  },
  {
    name: "Personal Training",
    price: "Rs20,000",
    period: "Per Month",
    features: [
      "1-on-1 training",
      "Personalized programs",
      "Complete diet plan",
      "Flexible scheduling",
    ],
    highlight: false,
    popular: false,
    duration: "60 min",
    capacity: "1-on-1",
    level: "All Levels",
  },
];

const PricingPlans = () => {
  const showButtons = true;

  const [headerRef, headerVisible] = useScrollAnimation({ threshold: 0.2 });
  const [cardsRef, cardsVisible] = useScrollAnimation({ threshold: 0.1 });
  const [ctaRef, ctaVisible] = useScrollAnimation({ threshold: 0.3 });

  const [isRegOpen, setIsRegOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{ name: string } | null>(null);

  const openRegister = (planName: string) => {
    setSelectedPlan({ name: planName });
    setIsRegOpen(true);
  };

  return (
    <section className="py-12 lg:py-20 bg-very-dark-brown">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          ref={headerRef as React.RefObject<HTMLDivElement>}
          className={`text-center mb-16 ${
            headerVisible ? "fade-in-up animate" : "fade-in-up"
          }`}
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-gradient-accent gradient-animate">
            Membership Pricing Plans
          </h2>
          <p className="text-xl text-warm-beige max-w-3xl mx-auto leading-relaxed">
            Choose from our flexible membership plans designed to fit your fitness goals and budget.
            All plans include expert guidance and premium facilities.
          </p>
        </div>

        {/* Pricing Grid */}
        <div
          ref={cardsRef as React.RefObject<HTMLDivElement>}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`card-elegant group hover:shadow-accent transition-all duration-500 hover:-translate-y-2 relative min-h-[380px] w-full lg:min-w-[320px] lg:max-w-[360px] ${
                plan.popular ? "hover:scale-105 lg:hover:scale-110" : ""
              }`}
            >
              {/* ✅ Popular Badge - now exactly matches your design */}
              {plan.popular && (
                <div className="absolute top-3 left-6">
                  <Badge className="bg-gradient-accent text-white font-semibold px-4 py-1 flex items-center gap-1 rounded-md shadow-md">
                    <Star className="w-4 h-4 fill-white" />
                    Popular
                  </Badge>
                </div>
              )}

              <CardHeader className="pb-4 pt-10 text-center">
                <CardTitle className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-2">
                  {plan.name}
                </CardTitle>
                <div className="mb-2">
                  <span className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-accent-primary">
                    {plan.price}
                  </span>
                  <span className="text-sm text-warm-beige ml-2">{plan.period}</span>
                </div>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col space-y-4 p-4 sm:px-6 sm:pb-6">
                {/* Plan Info */}
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center text-warm-beige bg-navy-primary/50 rounded-lg p-2">
                    <Clock className="w-4 h-4 mr-2 text-accent-primary" />
                    <span className="text-xs lg:text-sm">{plan.duration}</span>
                  </div>
                  <div className="flex items-center text-warm-beige bg-navy-primary/50 rounded-lg p-2">
                    <Users className="w-4 h-4 mr-2 text-accent-primary" />
                    <span className="text-xs lg:text-sm">{plan.capacity}</span>
                  </div>
                </div>

                {/* Level */}
                <div className="text-center">
                  <Badge
                    variant="outline"
                    className="border-accent-primary text-accent-primary bg-accent-primary/10"
                  >
                    {plan.level}
                  </Badge>
                </div>

                {/* Features */}
                <div className="flex-1">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-start text-sm text-warm-beige"
                      >
                        <Check className="w-4 h-4 text-accent-primary mr-3 flex-shrink-0 mt-0.5" />
                        <span className="text-xs lg:text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Button */}
                {showButtons && (
                  <div className="mt-6 pt-4 border-t border-gray-700 flex justify-center">
                    <Button
                      variant="primary"
                      size="md"
                      className="w-full transition-all duration-300"
                      onClick={() => openRegister(plan.name)}
                    >
                      Enroll Now
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Free Consultation CTA */}
        {showButtons && (
          <div
            ref={ctaRef as React.RefObject<HTMLDivElement>}
            className={`text-center mt-16 ${
              ctaVisible ? "fade-in-up animate" : "fade-in-up"
            }`}
          >
            <div className="bg-gradient-to-r from-navy-primary to-very-dark-brown rounded-2xl p-6 sm:p-8 lg:p-12 border border-accent-primary/20">
              <div className="max-w-2xl mx-auto">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-4">
                  Not sure which plan is right for you?
                </h3>
                <p className="text-warm-beige mb-6 text-base lg:text-lg">
                  Our fitness experts are here to help you choose the perfect plan for your goals and budget.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button
                    variant="primary"
                    size="lg"
                    className="transition-all duration-300"
                    onClick={() =>
                      window.open(
                        "https://wa.me/923330711555?text=Hello%20StayFit.pk%20—%20I%20want%20a%20free%20consultation",
                        "_blank"
                      )
                    }
                  >
                    Get Free Consultation (WhatsApp)
                  </Button>
                  <Button
                    variant="secondary"
                    size="lg"
                    className="transition-all duration-300"
                    onClick={() =>
                      (window.location.href = "tel:+923330711555")
                    }
                  >
                    Call Now: +92 333 0711555
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Registration Modal */}
      <RegistrationModal
        isOpen={isRegOpen}
        onClose={() => setIsRegOpen(false)}
        selectedPlan={selectedPlan?.name || ""}
      />
    </section>
  );
};

export default PricingPlans;
