import { ArrowRight, Clock, Users, Star } from "lucide-react";
import { Button } from "@/components/Button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import stayfitData from "../../../data/stayfit_content.json";

const ProgramsSection = () => {
  const { programs } = stayfitData;

  return (
    <section className="py-20 bg-very-dark-brown">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-gradient-golden">
            Programs & Classes
          </h2>
          <p className="text-xl text-warm-beige max-w-3xl mx-auto leading-relaxed">
            Choose from our diverse range of fitness programs designed by experts 
            to help you achieve your specific goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program, index) => (
            <Card key={index} className="card-elegant group hover:shadow-golden transition-all duration-500 hover:-translate-y-2 relative">
              {program.popular && (
                <Badge className="absolute -top-3 left-6 bg-gradient-golden text-very-dark-brown font-semibold px-4 py-1">
                  <Star className="w-4 h-4 mr-1" />
                  Popular
                </Badge>
              )}
              
              <CardHeader className="pb-4">
                <h3 className="text-2xl font-semibold text-white mb-2">
                  {program.title}
                </h3>
                <p className="text-warm-beige leading-relaxed">
                  {program.description}
                </p>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-warm-beige">
                    <Clock className="w-4 h-4 mr-2" />
                    {program.duration}
                  </div>
                  <div className="flex items-center text-warm-beige">
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
                    <li key={featureIndex} className="flex items-center text-sm text-warm-beige">
                      <div className="w-2 h-2 bg-golden-accent rounded-full mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button variant="primary" size="md" className="w-full group-hover:shadow-golden transition-all duration-300">
                  Book Now
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="secondary" size="md">
            View All Programs
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProgramsSection;