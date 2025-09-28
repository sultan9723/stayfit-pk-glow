import { Helmet } from "react-helmet-async";
import { Button } from "@/components/Button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import {
  Star,
  Award,
  Calendar,
  Instagram,
  Linkedin,
  Users,
  Trophy,
  Target,
  Clock,
  GraduationCap,
  MessageCircle,
  Filter,
  Search,
} from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import stayfitData from "../../data/stayfit_content.json";
import useScrollAnimation from "../hooks/useScrollAnimation";
import TrainerBookingModal from "../components/TrainerBookingModal";

const TrainersPage = () => {
  const { male_trainers, female_trainers } = stayfitData;
  const allTrainers = [...male_trainers, ...female_trainers];
  const [selectedSpecialty, setSelectedSpecialty] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [hasAnimatedStats, setHasAnimatedStats] = useState(false);
  const [animatedValues, setAnimatedValues] = useState({
    clients: 0,
    stories: 0,
    certifications: 0,
    experience: 0
  });
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState<any>(null);

  const showButtons = true;

  const handleBookSession = (trainer: any) => {
    setSelectedTrainer({
      id: trainer.id || Math.random().toString(),
      name: trainer.name,
      specialty: trainer.specialty,
      experience: trainer.experience
    });
    setIsBookingModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsBookingModalOpen(false);
    setSelectedTrainer(null);
  };

  // Scroll animations
  const [heroRef, heroVisible] = useScrollAnimation({ threshold: 0.2 });
  const [statsRef, statsVisible] = useScrollAnimation({ threshold: 0.3 });
  const [searchRef, searchVisible] = useScrollAnimation({ threshold: 0.2 });
  const [trainersRef, trainersVisible] = useScrollAnimation({ threshold: 0.1 });
  const [ctaRef, ctaVisible] = useScrollAnimation({ threshold: 0.3 });

  const trainerStats = [
    { icon: Users, label: "Total Clients", value: "2,000+", targetValue: 2000 },
    { icon: Trophy, label: "Success Stories", value: "1,500+", targetValue: 1500 },
    { icon: Award, label: "Certifications", value: "25+", targetValue: 25 },
    { icon: Target, label: "Years Experience", value: "50+", targetValue: 50 },
  ];

  // Counter animation function
  const animateCounters = useCallback(() => {
    if (hasAnimatedStats) return;
    
    const targets = { clients: 2000, stories: 1500, certifications: 25, experience: 50 };
    const duration = 2500; // 2.5 seconds
    const steps = 60;
    
    Object.keys(targets).forEach((key, index) => {
      const targetValue = targets[key as keyof typeof targets];
      const increment = targetValue / steps;
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= targetValue) {
          current = targetValue;
          clearInterval(timer);
        }
        
        setAnimatedValues(prev => ({
          ...prev,
          [key]: Math.floor(current)
        }));
      }, duration / steps);
    });
    
    setHasAnimatedStats(true);
  }, [hasAnimatedStats]);

  // Trigger animation when stats section is visible
  useEffect(() => {
    if (statsVisible && !hasAnimatedStats) {
      animateCounters();
    }
  }, [statsVisible, hasAnimatedStats, animateCounters]);

  const specializations = [
    "All",
    "Strength & Body Building",
    "Cardio & Weight Loss",
    "Mixed Martial Arts",
    "Yoga & Wellness",
    "Nutrition Coaching",
    "Group Fitness",
    "HIIT Training",
  ];

  const filteredTrainers = allTrainers.filter((trainer) => {
    const matchesSpecialty =
      selectedSpecialty === "All" ||
      trainer.specialty.toLowerCase().includes(selectedSpecialty.toLowerCase()) ||
      trainer.specializations.some((spec) =>
        spec.toLowerCase().includes(selectedSpecialty.toLowerCase())
      );

    const matchesSearch =
      trainer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trainer.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trainer.role.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSpecialty && matchesSearch;
  });

  return (
    <>
      <Helmet>
        <title>
          Expert Trainers - StayFit | Certified Fitness Professionals
        </title>
        <meta
          name="description"
          content="Meet our team of certified and experienced fitness trainers at StayFit, ready to help you achieve your fitness goals."
        />
      </Helmet>

      <div className="min-h-screen bg-very-dark-brown pt-20">
        {/* Hero Section */}
        <section
          ref={heroRef as React.RefObject<HTMLDivElement>}
          className="py-16 bg-gradient-to-b from-very-dark-brown to-navy-primary"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className={`text-center mb-16 ${
                heroVisible ? "fade-in-up animate" : "fade-in-up"
              }`}
            >
              <div className="relative inline-block">
                <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gradient-accent gradient-animate">
                  Meet Our Expert Trainers
                </h1>
                {/* Decorative elements */}
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-accent-primary/20 rounded-full animate-pulse floating" />
                <div className="absolute -bottom-2 -right-4 w-6 h-6 bg-accent-secondary/20 rounded-full animate-ping floating" />
              </div>
              <p className="text-xl md:text-2xl text-warm-beige max-w-4xl mx-auto leading-relaxed">
                Our certified fitness professionals are dedicated to helping you
                achieve your goals with personalized guidance, expert knowledge,
                and unwavering support throughout your fitness journey.
              </p>
            </div>

            {/* Trainer Statistics */}
            <div
              ref={statsRef as React.RefObject<HTMLDivElement>}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
            >
              {trainerStats.map((stat, index) => {
                const getAnimatedValue = () => {
                  switch (index) {
                    case 0: return animatedValues.clients.toLocaleString();
                    case 1: return animatedValues.stories.toLocaleString();
                    case 2: return animatedValues.certifications.toLocaleString();
                    case 3: return animatedValues.experience.toLocaleString();
                    default: return "0";
                  }
                };

                return (
                  <Card
                    key={index}
                    className={`card-elegant text-center group hover:shadow-accent transition-all duration-500 card-entrance hover:-translate-y-3 ${
                      statsVisible ? "animate" : ""
                    } stagger-${index + 1}`}
                  >
                    <CardContent className="p-6 relative overflow-hidden">
                      {/* Animated background glow */}
                      <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg" />
                      
                      {/* Icon with enhanced animations */}
                      <div className="relative mb-6">
                        <div className="bg-gradient-accent rounded-full w-16 h-16 mx-auto flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg group-hover:shadow-accent glow-pulse">
                          <stat.icon className="w-8 h-8 text-very-dark-brown group-hover:scale-110 transition-transform duration-300 icon-rotate" />
                        </div>
                        
                        {/* Floating particles effect */}
                        <div className="absolute -top-2 -right-2 w-3 h-3 bg-accent-primary rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-500" />
                        <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-accent-secondary rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-500" />
                      </div>
                      
                      {/* Animated counter */}
                      <div className="relative">
                        <h3 className="text-3xl font-bold text-white mb-2 group-hover:text-accent-primary transition-colors duration-300">
                          {getAnimatedValue()}
                          <span className="text-accent-primary">+</span>
                        </h3>
                        
                        {/* Progress bar animation */}
                        <div className="w-full h-1 bg-gray-700 rounded-full mb-3 overflow-hidden">
                          <div 
                            className="h-full bg-gradient-accent rounded-full transition-all duration-2000 ease-out"
                            style={{ 
                              width: statsVisible ? '100%' : '0%',
                              transitionDelay: `${index * 200}ms`
                            }}
                          />
                        </div>
                      </div>
                      
                      <p className="text-warm-beige text-sm group-hover:text-white transition-colors duration-300 font-medium">
                        {stat.label}
                      </p>
                      
                      {/* Hover effect border */}
                      <div className="absolute inset-0 border-2 border-transparent group-hover:border-accent-primary/30 rounded-lg transition-colors duration-500" />
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Search and Filter Section */}
        <section
          ref={searchRef as React.RefObject<HTMLDivElement>}
          className="py-12 bg-navy-primary"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className={`text-center mb-8 ${
                searchVisible ? "fade-in-up animate" : "fade-in-up"
              }`}
            >
              <h2 className="text-3xl font-bold mb-4 text-gradient-accent">
                Find Your Perfect Trainer
              </h2>
              <p className="text-warm-beige max-w-2xl mx-auto">
                Search and filter our trainers by specialty to find the perfect
                match for your fitness goals
              </p>
            </div>

            <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-warm-beige w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search trainers by name, specialty, or role..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-very-dark-brown border border-accent-primary/20 rounded-lg text-white placeholder-warm-beige focus:border-accent-primary focus:outline-none"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {specializations.map((specialty) => (
                  <Button
                    key={specialty}
                    variant={
                      selectedSpecialty === specialty ? "primary" : "secondary"
                    }
                    size="sm"
                    onClick={() => setSelectedSpecialty(specialty)}
                    className="whitespace-nowrap"
                  >
                    <Filter className="w-4 h-4 mr-2" />
                    {specialty}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Trainers Grid */}
        <section
          ref={trainersRef as React.RefObject<HTMLDivElement>}
          className="py-16 bg-navy-primary"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className={`text-center mb-16 ${
                trainersVisible ? "fade-in-up animate" : "fade-in-up"
              }`}
            >
              <h2 className="text-4xl font-bold mb-4 text-gradient-accent">
                Our Training Team
              </h2>
              <p className="text-xl text-warm-beige max-w-3xl mx-auto">
                Meet the professionals who will guide you on your fitness
                journey
              </p>
              <p className="text-warm-beige mt-2">
                Showing {filteredTrainers.length} of {allTrainers.length}{" "}
                trainers
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTrainers.map((trainer, index) => (
                <Card
                  key={index}
                  className={`card-elegant group hover:shadow-accent transition-all duration-500 hover:-translate-y-2 relative card-entrance ${
                    trainersVisible ? "animate" : ""
                  } stagger-${(index % 6) + 1}`}
                >
                  <CardContent className="p-6">
                    <div className="relative mb-6">
                      <img
                        src={trainer.image}
                        alt={`${trainer.name} - ${trainer.role} at StayFit.pk`}
                        className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-accent-primary/20 group-hover:border-accent-primary transition-colors duration-300"
                      />

                      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                        <Badge className="bg-gradient-golden text-very-dark-brown font-semibold px-3 py-1 text-xs">
                          <Award className="w-3 h-3 mr-1" />
                          {trainer.experience}
                        </Badge>
                      </div>
                    </div>

                    <div className="text-center mb-4">
                      <h3 className="text-xl font-semibold text-white mb-1">
                        {trainer.name}
                      </h3>
                      <p className="text-accent-primary font-medium mb-2">
                        {trainer.role}
                      </p>
                      <p className="text-warm-beige text-sm mb-3">
                        {trainer.specialty}
                      </p>

                      <div className="flex items-center justify-center mb-3">
                        <Star className="w-4 h-4 text-accent-primary fill-current" />
                        <span className="text-white font-medium ml-1">
                          {trainer.rating}
                        </span>
                        <span className="text-warm-beige text-sm ml-2">
                          ({trainer.clients_helped}+ clients)
                        </span>
                      </div>

                      <p className="text-warm-beige text-sm leading-relaxed mb-4">
                        {trainer.bio}
                      </p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-2 justify-center">
                        {trainer.specializations.slice(0, 3).map((spec, specIndex) => (
                          <Badge
                            key={specIndex}
                            variant="outline"
                            className="border-accent-primary text-accent-primary text-xs"
                          >
                            {spec}
                          </Badge>
                        ))}
                        {trainer.specializations.length > 3 && (
                          <Badge
                            variant="outline"
                            className="border-accent-primary text-accent-primary text-xs"
                          >
                            +{trainer.specializations.length - 3} more
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center justify-center space-x-4 text-xs text-warm-beige">
                        <div className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {trainer.availability.split(",")[0]}
                        </div>
                        <div className="flex items-center">
                          <GraduationCap className="w-3 h-3 mr-1" />
                          {trainer.education.split(",")[0]}
                        </div>
                      </div>

                      <div className="flex items-center justify-center space-x-3">
                        <a
                          href="#"
                          className="text-warm-beige hover:text-accent-primary transition-colors duration-300"
                          aria-label={`${trainer.name} Instagram`}
                        >
                          <Instagram className="w-5 h-5" />
                        </a>
                        <a
                          href="#"
                          className="text-warm-beige hover:text-accent-primary transition-colors duration-300"
                          aria-label={`${trainer.name} LinkedIn`}
                        >
                          <Linkedin className="w-5 h-5" />
                        </a>
                        <a
                          href="#"
                          className="text-warm-beige hover:text-accent-primary transition-colors duration-300"
                          aria-label={`${trainer.name} Message`}
                        >
                          <MessageCircle className="w-5 h-5" />
                        </a>
                      </div>

                      {showButtons && (
                        <div className="flex gap-2">
                          <Button 
                            variant="primary" 
                            size="sm" 
                            className="btn-premium flex-1 px-4 py-2 bg-gradient-accent hover:bg-gradient-accent/90 text-white shadow-accent hover:shadow-lg transition-all duration-300"
                            onClick={() => handleBookSession(trainer)}
                          >
                            <Calendar className="w-4 h-4 mr-2" />
                            Book Session
                          </Button>
                          <Button 
                            variant="secondary" 
                            size="sm" 
                            className="btn-premium flex-1 border-accent-primary text-accent-primary hover:bg-accent-primary hover:text-very-dark-brown transition-all duration-300"
                          >
                            <MessageCircle className="w-4 h-4 mr-2" />
                            Contact
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredTrainers.length === 0 && (
              <div className="text-center py-12">
                <p className="text-warm-beige text-lg">
                  No trainers found matching your criteria.
                </p>
                <Button
                  variant="secondary"
                  size="md"
                  className="mt-4"
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedSpecialty("All");
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* Call to Action */}
        <section
          ref={ctaRef as React.RefObject<HTMLDivElement>}
          className="py-16 bg-gradient-to-r from-very-dark-brown to-navy-primary"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className={`${ctaVisible ? "fade-in-up animate" : "fade-in-up"}`}>
              <h2 className="text-4xl font-bold mb-6 text-gradient-accent">
                Ready to Start Your Fitness Journey?
              </h2>
              <p className="text-xl text-warm-beige mb-8 leading-relaxed">
                Book a free consultation with one of our expert trainers and take
                the first step towards achieving your fitness goals.
              </p>
              {showButtons && (
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    variant="primary" 
                    size="lg" 
                    className="btn-premium w-full md:w-auto px-8 py-4 bg-gradient-accent hover:bg-gradient-accent/90 text-white shadow-accent hover:shadow-lg transition-all duration-300"
                    asChild
                  >
                    <Link to="/contact">
                      <Calendar className="w-5 h-5 mr-2" />
                      Book Free Consultation
                    </Link>
                  </Button>
                  <Button 
                    variant="secondary" 
                    size="lg" 
                    className="btn-premium w-full md:w-auto border-accent-primary text-accent-primary hover:bg-accent-primary hover:text-very-dark-brown transition-all duration-300"
                    asChild
                  >
                    <Link to="/programs">View Training Programs</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Success Stories */}
        <section className="py-16 bg-very-dark-brown">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 text-gradient-accent">
                Success Stories
              </h2>
              <p className="text-xl text-warm-beige max-w-3xl mx-auto">
                See how our trainers have helped clients achieve their fitness
                goals
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Ahmed Khan",
                  achievement: "Lost 25kg in 6 months",
                  trainer: "Ammar Asif",
                  quote:
                    "Ammar's nutrition guidance and cardio training helped me completely transform my lifestyle.",
                },
                {
                  name: "Sara Ahmed",
                  achievement: "Built lean muscle mass",
                  trainer: "Salman Ahmad",
                  quote:
                    "Salman's strength training program helped me achieve the body I always wanted.",
                },
                {
                  name: "Fatima Ali",
                  achievement: "Improved flexibility & wellness",
                  trainer: "Sarah Khan",
                  quote:
                    "Sarah's yoga sessions helped me manage stress and improve my overall well-being.",
                },
              ].map((story, index) => (
                <Card
                  key={index}
                  className="card-elegant text-center group hover:shadow-accent transition-all duration-300"
                >
                  <CardContent className="p-6">
                    <div className="text-4xl mb-4">🏆</div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {story.name}
                    </h3>
                    <p className="text-accent-primary font-medium mb-3">
                      {story.achievement}
                    </p>
                    <p className="text-warm-beige text-sm mb-4">
                      with {story.trainer}
                    </p>
                    <p className="text-warm-beige italic">"{story.quote}"</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Trainer Booking Modal */}
      <TrainerBookingModal
        isOpen={isBookingModalOpen}
        onClose={handleCloseModal}
        trainer={selectedTrainer}
      />
    </>
  );
};

export default TrainersPage;
