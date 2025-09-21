import { ArrowRight, Clock, Users, Star } from "lucide-react";
import { Button } from "@/components/Button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import BookingModal from "@/components/BookingModal";
import stayfitData from "../../../data/stayfit_content.json";
import { useState } from "react";

const ProgramsSection = () => {
  const { programs } = stayfitData;
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<{id: string, title: string} | undefined>(undefined);
  
  // Optional button configuration
  const showButtons = true; // Set to false to hide all action buttons

  const handleBookNow = (program: any, index: number) => {
    setSelectedProgram({
      id: `program-${index + 1}`, // Generate ID based on index
      title: program.title
    });
    setIsBookingModalOpen(true);
  };

  const handleViewAllPrograms = () => {
    setSelectedProgram(undefined);
    setIsBookingModalOpen(true);
  };

  return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-gradient-accent">
            Programs & Classes
          </h2>
          <p className="text-xl text-very-dark-brown max-w-3xl mx-auto leading-relaxed">
            Choose from our diverse range of fitness programs designed by experts 
            to help you achieve your specific goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program, index) => (
<<<<<<< HEAD
            <Card
              key={index}
              className="card-elegant group hover:shadow-accent transition-all duration-500 hover:-translate-y-2 relative"
            >
              {program.popular && (
                <Badge className="absolute -top-3 left-6 bg-gradient-accent text-very-dark-brown font-semibold px-4 py-1">
                  <Star className="w-4 h-4 mr-1" />
                  Popular
                </Badge>
              )}
              
              <CardHeader className="pb-4">
                  {program.description}
                </p>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                    <Users className="w-4 h-4 mr-2" />
                    {program.capacity}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="border-accent-primary text-accent-primary">
                    {program.level}
                  </Badge>
                </div>

                <ul className="space-y-2">
                  {program.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-center text-sm text-warm-beige"
                    >
                      <div className="w-2 h-2 bg-accent-primary rounded-full mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {showButtons && (
                  <Button
                    variant="primary"
                    size="md"
                    className="btn-premium w-full px-8 py-3 bg-gradient-accent hover:bg-gradient-accent/90 text-white shadow-accent hover:shadow-lg transition-all duration-300"
                    onClick={() => handleBookNow(program, index)}
                  >
                    Book Now
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {showButtons && (
          <div className="text-center mt-12">
            <Button 
              variant="secondary" 
              size="md" 
              className="btn-premium w-full md:w-auto group-hover:shadow-accent transition-all duration-300 border-accent-primary text-accent-primary hover:bg-accent-primary hover:text-very-dark-brown"
              onClick={handleViewAllPrograms}
            >
              View All Programs
            </Button>
          </div>
        )}

        {/* Booking Modal */}
        <BookingModal
          isOpen={isBookingModalOpen}
          onClose={() => setIsBookingModalOpen(false)}
          selectedProgram={selectedProgram}
        />
      </div>
    </section>
  );
};

export default ProgramsSection;
