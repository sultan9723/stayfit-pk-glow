import { Star, Award, Instagram, Linkedin } from "lucide-react";
import { Button } from "@/components/Button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import stayfitData from "../../../data/stayfit_content.json";

const TrainersSection = () => {
  const { male_trainers, female_trainers } = stayfitData;
  const allTrainers = [...male_trainers, ...female_trainers];

  const showButtons = true;

  return (
    <section className="py-20 bg-very-dark-brown">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-gradient-accent">
            Meet Our Expert Trainers
          </h2>
          <p className="text-xl text-warm-beige max-w-3xl mx-auto leading-relaxed">
            Our certified fitness professionals are dedicated to helping you achieve
            your goals with personalized guidance and expertise.
          </p>
        </div>

        {/* Trainers Grid (6 cards consistent like Programs) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allTrainers.map((trainer, index) => (
            <Card
              key={index}
              className="card-elegant group hover:shadow-accent transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between"
            >
              <CardContent className="p-6 flex flex-col h-full">
                {/* Trainer Image + Experience Badge */}
                <div className="relative mb-6 flex flex-col items-center">
                  <img
                    src={trainer.image}
                    alt={`${trainer.name} - ${trainer.specialty} trainer at StayFit.pk`}
                    className="w-24 h-24 rounded-full object-cover border-4 border-accent-primary/20 group-hover:border-accent-primary transition-colors duration-300"
                  />
                  <div className="absolute -bottom-3">
                    <Badge className="bg-gradient-accent text-very-dark-brown font-semibold px-3 py-1 text-xs">
                      <Award className="w-3 h-3 mr-1" />
                      {trainer.experience}
                    </Badge>
                  </div>
                </div>

                {/* Trainer Info */}
                <div className="text-center mt-6 flex-1">
                  <h3 className="text-xl font-semibold text-white mb-1">
                    {trainer.name}
                  </h3>
                  <p className="text-accent-primary font-medium mb-2">
                    {trainer.role}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center justify-center mb-3">
                    <Star className="w-4 h-4 text-accent-primary fill-current" />
                    <span className="text-white font-medium ml-1">
                      {trainer.rating}
                    </span>
                  </div>

                  {/* Bio */}
                  <p className="text-gray-muted text-sm leading-relaxed mb-4">
                    {trainer.bio}
                  </p>
                </div>

                {/* Certifications */}
                <div className="flex flex-wrap gap-2 justify-center mb-4">
                  {trainer.certifications.map((cert, certIndex) => (
                    <Badge
                      key={certIndex}
                      variant="outline"
                      className="border-accent-primary text-accent-primary text-xs"
                    >
                      {cert}
                    </Badge>
                  ))}
                </div>

                {/* Social Links */}
                <div className="flex items-center justify-center space-x-4 mb-4">
                  <a
                    href="#"
                    className="hover:text-accent-primary transition-colors duration-300"
                    aria-label={`${trainer.name} Instagram`}
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="hover:text-accent-primary transition-colors duration-300"
                    aria-label={`${trainer.name} LinkedIn`}
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>

                {/* Book Session Button (Consistent with Programs) */}
                {showButtons && (
                  <Button
                    variant="primary"
                    size="md"
                    className="btn-premium w-full px-8 py-3 bg-gradient-accent hover:bg-gradient-accent/90 text-white shadow-accent hover:shadow-lg transition-all duration-300"
                  >
                    Book Now
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Trainers Button */}
        {showButtons && (
          <div className="text-center mt-12">
            <Button 
              variant="primary" 
              size="md" 
              className="btn-premium w-full md:w-auto px-8 py-3 bg-gradient-accent hover:bg-accent-primary text-white shadow-accent hover:shadow-lg transition-all duration-300"
              asChild
            >
              <Link to="/trainers">View All Trainers</Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default TrainersSection;
