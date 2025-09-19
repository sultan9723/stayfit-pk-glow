import { Star, Award, Calendar, Instagram, Linkedin } from "lucide-react";
import { Button } from "@/components/Button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import stayfitData from "../../../data/stayfit_content.json";

const TrainersSection = () => {
  const { male_trainers, female_trainers } = stayfitData;
  const allTrainers = [...male_trainers, ...female_trainers];
  
  // Optional button configuration
  const showButtons = true; // Set to false to hide all action buttons

  return (
    <section className="py-20 bg-gradient-to-br from-muted to-navy-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-gradient-accent">
            Meet Our Expert Trainers
          </h2>
          <p className="text-xl text-gray-muted max-w-3xl mx-auto leading-relaxed">
            Our certified fitness professionals are dedicated to helping you achieve 
            your goals with personalized guidance and expertise.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {allTrainers.map((trainer, index) => (
            <Card key={index} className="card-elegant group hover:shadow-accent transition-all duration-500 hover:-translate-y-2">
              <CardContent className="p-6">
                <div className="relative mb-6">
                  <img
                    src={trainer.image}
                    alt={`${trainer.name} - ${trainer.specialty} trainer at StayFit.pk`}
                    className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-accent-primary/20 group-hover:border-accent-primary transition-colors duration-300"
                  />
                  
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-golden text-navy-primary font-semibold px-3 py-1 text-xs">
                      <Award className="w-3 h-3 mr-1" />
                      {trainer.experience}
                    </Badge>
                  </div>
                </div>

                <div className="text-center mb-4">
                  <h3 className="text-xl font-semibold text-white-text mb-1">
                    {trainer.name}
                  </h3>
                  <p className="text-accent-primary font-medium mb-2">
                    {trainer.role}
                  </p>
                  
                  <div className="flex items-center justify-center mb-3">
                    <Star className="w-4 h-4 text-accent-primary fill-current" />
                    <span className="text-white-text font-medium ml-1">
                      {trainer.rating}
                    </span>
                  </div>

                  <p className="text-gray-muted text-sm leading-relaxed mb-4">
                    {trainer.bio}
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2 justify-center">
                    {trainer.certifications.map((cert, certIndex) => (
                      <Badge key={certIndex} variant="outline" className="border-green-secondary text-green-secondary text-xs">
                        {cert}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-center space-x-3">
                    <a
                      href="#"
                      className="text-gray-muted hover:text-accent-primary transition-colors duration-300"
                      aria-label={`${trainer.name} Instagram`}
                    >
                      <Instagram className="w-5 h-5" />
                    </a>
                    <a
                      href="#"
                      className="text-gray-muted hover:text-accent-primary transition-colors duration-300"
                      aria-label={`${trainer.name} LinkedIn`}
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                  </div>

                  {showButtons && (
                    <Button variant="secondary" size="sm" className="w-full">
                      <Calendar className="w-4 h-4 mr-2" />
                      Book Session
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {showButtons && (
          <div className="text-center mt-12">
            <Button variant="primary" size="md" asChild>
              <Link to="/trainers">
                View All Trainers
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default TrainersSection;