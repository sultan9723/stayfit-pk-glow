import { Star, Award, Calendar, Instagram, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const TrainersSection = () => {
  const trainers = [
    {
      name: "Ahmed Khan",
      specialty: "Strength & Conditioning",
      experience: "8 Years",
      certifications: ["NASM-CPT", "CSCS"],
      rating: 4.9,
      bio: "Former powerlifter with expertise in strength training and muscle building.",
      image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=400&fit=crop&crop=face"
    },
    {
      name: "Sarah Ali",
      specialty: "HIIT & Cardio",
      experience: "6 Years",
      certifications: ["ACE-CPT", "HIIT Specialist"],
      rating: 4.8,
      bio: "High-energy trainer specializing in fat loss and cardiovascular fitness.",
      image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=400&fit=crop&crop=face"
    },
    {
      name: "Muhammad Usman",
      specialty: "MMA & Boxing",
      experience: "12 Years",
      certifications: ["Pro Fighter", "Boxing Coach"],
      rating: 5.0,
      bio: "Professional MMA fighter and certified boxing coach with championship experience.",
      image: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=400&h=400&fit=crop&crop=face"
    },
    {
      name: "Fatima Sheikh",
      specialty: "Yoga & Wellness",
      experience: "10 Years",
      certifications: ["RYT-500", "Meditation Instructor"],
      rating: 4.9,
      bio: "Certified yoga instructor focused on mindfulness and holistic wellness.",
      image: "https://images.unsplash.com/photo-1506629905606-b5625f6f8bb7?w=400&h=400&fit=crop&crop=face"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-warm-beige to-light-wood">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-gradient-golden">
            Meet Our Expert Trainers
          </h2>
          <p className="text-xl text-deep-brown max-w-3xl mx-auto leading-relaxed">
            Our certified fitness professionals are dedicated to helping you achieve 
            your goals with personalized guidance and expertise.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {trainers.map((trainer, index) => (
            <Card key={index} className="card-elegant group hover:shadow-golden transition-all duration-500 hover:-translate-y-2">
              <CardContent className="p-6">
                <div className="relative mb-6">
                  <img
                    src={trainer.image}
                    alt={`${trainer.name} - ${trainer.specialty} trainer at StayFit.pk`}
                    className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-golden-accent/20 group-hover:border-golden-accent transition-colors duration-300"
                  />
                  
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-golden text-navy-primary font-semibold px-3 py-1 text-xs">
                      <Award className="w-3 h-3 mr-1" />
                      {trainer.experience}
                    </Badge>
                  </div>
                </div>

                <div className="text-center mb-4">
                  <h3 className="text-xl font-semibold text-white mb-1">
                    {trainer.name}
                  </h3>
                  <p className="text-golden-accent font-medium mb-2">
                    {trainer.specialty}
                  </p>
                  
                  <div className="flex items-center justify-center mb-3">
                    <Star className="w-4 h-4 text-golden-accent fill-current" />
                    <span className="text-white font-medium ml-1">
                      {trainer.rating}
                    </span>
                  </div>

                  <p className="text-deep-brown text-sm leading-relaxed mb-4">
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
                      className="text-deep-brown hover:text-golden-accent transition-colors duration-300"
                      aria-label={`${trainer.name} Instagram`}
                    >
                      <Instagram className="w-5 h-5" />
                    </a>
                    <a
                      href="#"
                      className="text-deep-brown hover:text-golden-accent transition-colors duration-300"
                      aria-label={`${trainer.name} LinkedIn`}
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                  </div>

                  <Button className="w-full btn-hero-secondary text-sm">
                    <Calendar className="w-4 h-4 mr-2" />
                    Book Session
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" className="btn-hero-primary">
            View All Trainers
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TrainersSection;