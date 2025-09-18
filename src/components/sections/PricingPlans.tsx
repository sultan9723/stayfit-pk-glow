import { Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/Button";

const plans = [
  {
    name: "Strength",
    price: "Rs3500",
    period: "Per Month",
    features: ["Strength Only", "Effective Diet Plan", "General Training", "Free Assessment"],
    highlight: false,
  },
  {
    name: "Cardio Strength",
    price: "Rs6000",
    period: "Per Month",
    features: ["Cardio", "Strength", "Diet Plan", "General Training"],
    highlight: true,
  },
  {
    name: "Personal Training",
    price: "Rs15000",
    period: "Per Month",
    features: ["Cardio", "Strength", "Diet Plan", "Complete Training"],
    highlight: false,
  },
];

const PricingPlans = () => {
  return (
    <section className="py-16 bg-navy-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-3 text-gradient-golden">Pricing Plans</h2>
          <p className="text-gray-muted">Choose your pack and start your journey today</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`${plan.highlight ? "border-golden-accent shadow-golden" : ""} card-elegant`}
            >
              <CardHeader>
                <CardTitle className="flex items-baseline justify-between">
                  <span className="text-white-text">{plan.name}</span>
                  <span className="text-3xl font-extrabold text-golden-accent">{plan.price}</span>
                </CardTitle>
                <p className="text-sm text-gray-muted">{plan.period}</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-white-text">
                      <Check className="w-5 h-5 text-golden-accent" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Button variant="primary" size="md" className="w-full">
                  Register Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingPlans;
