import { Dumbbell, Heart, Zap, Apple } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const WhyStayFitSection = () => {
  const features = [
    {
      icon: Dumbbell,
      title: "Strength Training",
      description:
        "Build muscle and increase power with our comprehensive strength training programs and state-of-the-art equipment.",
    },
    {
      icon: Heart,
      title: "Cardio Fitness",
      description:
        "Improve cardiovascular health and endurance with our dynamic cardio workouts and modern machines.",
    },
    {
      icon: Zap,
      title: "MMA Training",
      description:
        "Learn mixed martial arts from professional fighters with authentic combat sports training programs.",
    },
    {
      icon: Apple,
      title: "Nutrition Coaching",
      description:
        "Get personalized nutrition plans and dietary guidance to complement your fitness journey.",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-very-dark-brown to-dark-brown">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-gradient-golden">
            Why Choose StayFit?
          </h2>
          <p className="text-xl text-warm-beige max-w-3xl mx-auto leading-relaxed">
            We provide comprehensive fitness solutions with expert guidance, 
            modern equipment, and personalized programs to help you achieve your goals.
          </p>
        </div>

        {/* Responsive Animated Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <motion.div
                whileHover={{
                  rotateX: 4,
                  rotateY: -4,
                  scale: 1.03,
                  transition: { type: "spring", stiffness: 300, damping: 15 },
                }}
              >
                <Card className="card-elegant group hover:shadow-golden transition-all duration-500">
                  <CardContent className="p-8 text-center">
                    {/* Icon with Glow */}
                    <div className="relative inline-flex items-center justify-center w-16 h-16 bg-gradient-golden rounded-full mb-6 overflow-hidden">
                      <motion.div
                        className="absolute inset-0 bg-gradient-golden blur-md opacity-40 group-hover:opacity-70"
                        animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.6, 0.4] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      />
                      <feature.icon className="relative w-8 h-8 text-very-dark-brown z-10 transition-transform duration-500 group-hover:scale-110" />
                    </div>

                    {/* Title & Description */}
                    <h3 className="text-xl font-semibold mb-4 text-white transition-all duration-300 group-hover:-translate-y-1">
                      {feature.title}
                    </h3>
                    <p className="text-warm-beige leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyStayFitSection;
