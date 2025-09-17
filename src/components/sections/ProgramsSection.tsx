import { ArrowRight, Clock, Users, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const ProgramsSection = () => {
  const sectionRef = useScrollAnimation();
  
  const programs = [
    {
      title: "Strength & Power",
      description: "Build lean muscle and increase your strength with our progressive training methods.",
      duration: "60 min",
      capacity: "8-12 people",
      level: "All Levels",
      features: ["Free weights", "Functional training", "Progressive overload"],
      popular: false
    },
    {
      title: "HIIT Cardio",
      description: "High-intensity interval training to burn fat and improve cardiovascular fitness.",
      duration: "45 min",
      capacity: "15-20 people",
      level: "Intermediate",
      features: ["Fat burning", "Metabolic boost", "Full body workout"],
      popular: true
    },
    {
      title: "MMA Fundamentals",
      description: "Learn the basics of mixed martial arts including striking, grappling, and self-defense.",
      duration: "90 min",
      capacity: "10-15 people",
      level: "Beginner",
      features: ["Boxing", "Wrestling", "Brazilian Jiu-Jitsu"],
      popular: false
    },
    {
      title: "Yoga & Flexibility",
      description: "Improve flexibility, balance, and mental well-being through guided yoga sessions.",
      duration: "75 min",
      capacity: "12-18 people",
      level: "All Levels",
      features: ["Stress relief", "Flexibility", "Mindfulness"],
      popular: false
    },
    {
      title: "Personal Training",
      description: "One-on-one coaching with certified trainers for personalized fitness goals.",
      duration: "60 min",
      capacity: "1-on-1",
      level: "All Levels",
      features: ["Customized plan", "Dedicated coach", "Flexible schedule"],
      popular: true
    },
    {
      title: "Nutrition Coaching",
      description: "Expert nutritional guidance and meal planning to optimize your fitness results.",
      duration: "Consultation",
      capacity: "Individual",
      level: "All Levels",
      features: ["Meal plans", "Supplement advice", "Progress tracking"],
      popular: false
    }
  ];

  return (
<<<<<<< HEAD
<<<<<<< HEAD
    <section className="py-20 bg-gradient-to-br from-sandstone to-warm-beige">
=======
    <section className="py-20 bg-navy-primary">
>>>>>>> parent of ac5510b (theme changed)
=======
    <section className="py-20 bg-navy-primary">
>>>>>>> parent of ac5510b (theme changed)
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-gradient-golden">
            Programs & Classes
          </h2>
<<<<<<< HEAD
<<<<<<< HEAD
          <p className="text-xl text-very-dark-brown max-w-3xl mx-auto leading-relaxed">
=======
          <p className="text-xl text-gray-muted max-w-3xl mx-auto leading-relaxed">
>>>>>>> parent of ac5510b (theme changed)
=======
          <p className="text-xl text-gray-muted max-w-3xl mx-auto leading-relaxed">
>>>>>>> parent of ac5510b (theme changed)
            Choose from our diverse range of fitness programs designed by experts 
            to help you achieve your specific goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program, index) => (
            <Card key={index} className="card-elegant group hover:shadow-golden transition-all duration-500 hover:-translate-y-2 relative animate-on-scroll" style={{ animationDelay: `${index * 150}ms` }}>
              {program.popular && (
                <Badge className="absolute -top-3 left-6 bg-gradient-golden text-navy-primary font-semibold px-4 py-1">
                  <Star className="w-4 h-4 mr-1" />
                  Popular
                </Badge>
              )}
              
              <CardHeader className="pb-4">
<<<<<<< HEAD
<<<<<<< HEAD
                <h3 className="text-2xl font-semibold text-very-dark-brown mb-2">
                  {program.title}
                </h3>
                <p className="text-deep-brown leading-relaxed">
=======
                <h3 className="text-2xl font-semibold text-white-text mb-2">
                  {program.title}
                </h3>
                <p className="text-gray-muted leading-relaxed">
>>>>>>> parent of ac5510b (theme changed)
=======
                <h3 className="text-2xl font-semibold text-white-text mb-2">
                  {program.title}
                </h3>
                <p className="text-gray-muted leading-relaxed">
>>>>>>> parent of ac5510b (theme changed)
                  {program.description}
                </p>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm">
<<<<<<< HEAD
<<<<<<< HEAD
                  <div className="flex items-center text-deep-brown">
                    <Clock className="w-4 h-4 mr-2" />
                    {program.duration}
                  </div>
                  <div className="flex items-center text-deep-brown">
=======
                  <div className="flex items-center text-gray-muted">
                    <Clock className="w-4 h-4 mr-2" />
                    {program.duration}
                  </div>
                  <div className="flex items-center text-gray-muted">
>>>>>>> parent of ac5510b (theme changed)
=======
                  <div className="flex items-center text-gray-muted">
                    <Clock className="w-4 h-4 mr-2" />
                    {program.duration}
                  </div>
                  <div className="flex items-center text-gray-muted">
>>>>>>> parent of ac5510b (theme changed)
                    <Users className="w-4 h-4 mr-2" />
                    {program.capacity}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="border-golden-accent text-golden-accent">
                    {program.level}
                  </Badge>
                </div>

                <ul className="space-y-2">
                  {program.features.map((feature, featureIndex) => (
<<<<<<< HEAD
<<<<<<< HEAD
                    <li key={featureIndex} className="flex items-center text-sm text-deep-brown">
=======
                    <li key={featureIndex} className="flex items-center text-sm text-gray-muted">
>>>>>>> parent of ac5510b (theme changed)
=======
                    <li key={featureIndex} className="flex items-center text-sm text-gray-muted">
>>>>>>> parent of ac5510b (theme changed)
                      <div className="w-2 h-2 bg-golden-accent rounded-full mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button className="w-full btn-hero-primary group-hover:shadow-golden transition-all duration-300">
                  Book Now
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" className="btn-hero-secondary">
            View All Programs
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProgramsSection;