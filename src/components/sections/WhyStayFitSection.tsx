import { Dumbbell, Heart, Zap, Apple } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const WhyStayFitSection = () => {
  const sectionRef = useScrollAnimation();
  
  const features = [
    {
      icon: Dumbbell,
      title: "Strength Training",
      description: "Build muscle and increase power with our comprehensive strength training programs and state-of-the-art equipment."
    },
    {
      icon: Heart,
      title: "Cardio Fitness",
      description: "Improve cardiovascular health and endurance with our dynamic cardio workouts and modern machines."
    },
    {
      icon: Zap,
      title: "MMA Training",
      description: "Learn mixed martial arts from professional fighters with authentic combat sports training programs."
    },
    {
      icon: Apple,
      title: "Nutrition Coaching",
      description: "Get personalized nutrition plans and dietary guidance to complement your fitness journey."
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-light-wood to-sandstone">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-gradient-golden">
            Why Choose StayFit?
          </h2>
          <p className="text-xl text-very-dark-brown max-w-3xl mx-auto leading-relaxed">
            We provide comprehensive fitness solutions with expert guidance, 
            modern equipment, and personalized programs to help you achieve your goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="card-elegant group hover:shadow-golden transition-all duration-500 hover:-translate-y-2 animate-on-scroll" style={{ animationDelay: `${index * 100}ms` }}>
              <CardContent className="p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-golden rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-8 h-8 text-navy-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-very-dark-brown">
                  {feature.title}
                </h3>
                <p className="text-deep-brown leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyStayFitSection;