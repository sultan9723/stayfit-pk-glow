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
      
      <div className="min-h-screen bg-very-dark-brown pt-20">
        {/* Hero */}
        <section className="py-16 bg-gradient-to-b from-very-dark-brown to-navy-primary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-gradient-accent">
              Membership Pricing
            </h1>
            <p className="text-xl md:text-2xl text-warm-beige max-w-3xl mx-auto leading-relaxed">
              Choose the perfect fitness plan for your goals. All memberships include access to our premium facilities and expert guidance.
            </p>
          </div>
        </section>

        {/* Objectives */}
        <section className="py-12 bg-navy-primary">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8 text-gradient-accent">
              What You Can Achieve
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { title: "Become Fit" },
                { title: "Weight Loss" },
                { title: "Tone Up My Body" },
                { title: "Release The Stress" },
              ].map((item) => (
                <ObjectiveCard key={item.title} title={item.title} />
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Plans */}
        <PricingPlans />

        {/* Why Choose Our Plans */}
        <section className="py-16 bg-navy-primary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 text-gradient-accent">
                Why Choose StayFit?
              </h2>
              <p className="text-xl text-warm-beige max-w-3xl mx-auto">
                Our membership plans are designed to provide maximum value and results
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Expert Trainers",
                  description: "Certified professionals with years of experience",
                  icon: "👨‍💼"
                },
                {
                  title: "Premium Equipment",
                  description: "State-of-the-art fitness equipment and facilities",
                  icon: "🏋️‍♂️"
                },
                {
                  title: "Flexible Scheduling",
                  description: "Work out on your schedule with extended hours",
                  icon: "⏰"
                },
                {
                  title: "Nutrition Guidance",
                  description: "Personalized diet plans and nutrition counseling",
                  icon: "🥗"
                },
                {
                  title: "Community Support",
                  description: "Join a supportive fitness community",
                  icon: "👥"
                },
                {
                  title: "Results Guaranteed",
                  description: "Proven programs that deliver real results",
                  icon: "🎯"
                }
              ].map((benefit, index) => (
                <div key={index} className="card-elegant p-6 text-center group hover:shadow-accent transition-all duration-300">
                  <div className="text-4xl mb-4">{benefit.icon}</div>
                  <h3 className="text-xl font-semibold text-white mb-3">{benefit.title}</h3>
                  <p className="text-warm-beige">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <TestimonialsSection />
      </div>
    </>
  );
};

export default PricingPage;