import { Helmet } from "react-helmet-async";
import PricingPlans from "@/components/sections/PricingPlans";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import ObjectiveCard from "@/components/ObjectiveCard";

const PricingPage = () => {
  return (
    <>
      <Helmet>
        <title>Membership Pricing - StayFit | Affordable Fitness Plans</title>
        <meta name="description" content="Choose from our flexible and affordable membership plans at StayFit. Find the perfect fitness package for your budget and goals." />
      </Helmet>
      
      <div className="min-h-screen bg-navy-primary pt-20">
        {/* Hero */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-5xl font-extrabold text-center mb-4 text-gradient-golden">Welcome To Stayfit GYM</h1>
            <p className="text-center text-xl text-white-text/90">Professional Services</p>
          </div>
        </section>

        {/* Objectives */}
        <section className="py-8">
          <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { title: "Become Fit" },
              { title: "Weight Loss" },
              { title: "Tone Up My Body" },
              { title: "Release The Stress" },
            ].map((item) => (
              <ObjectiveCard key={item.title} title={item.title} />
            ))}
          </div>
        </section>

        {/* Packs grid (representative images/titles) */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Strength-Body Building", subtitle: "Cardio + Strength" },
              { title: "Cardio and Strength", subtitle: "" },
              { title: "Mixed Martial Arts", subtitle: "Join our Mixed Martial Arts Today..." },
              { title: "Diet and Nutrition", subtitle: "Diet and Nutrition By Stayfit" },
              { title: "Crossfit", subtitle: "crossfit by stayfit" },
              { title: "Training Services", subtitle: "Training" },
            ].map((pack) => (
              <div key={pack.title} className="card-elegant p-6">
                <h3 className="text-xl font-bold text-white-text mb-1">{pack.title}</h3>
                {pack.subtitle && (
                  <p className="text-gray-muted text-sm">{pack.subtitle}</p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Pricing Plans (cloned content adapted) */}
        <PricingPlans />

        {/* Testimonials */}
        <TestimonialsSection />
      </div>
    </>
  );
};

export default PricingPage;