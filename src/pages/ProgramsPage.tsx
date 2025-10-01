import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { ArrowRight, Clock, Users, Star, Filter, Search, Calendar, CheckCircle, Target, Zap } from "lucide-react";
import { Button } from "@/components/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import BookingModal from "@/components/BookingModal";
import stayfitData from "../../data/stayfit_content.json";
import useScrollAnimation from "../hooks/useScrollAnimation";

const ProgramsPage = () => {
  const { programs } = stayfitData;
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
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

  // Scroll animations
  const [heroRef, heroVisible] = useScrollAnimation({ threshold: 0.2 });
  const [statsRef, statsVisible] = useScrollAnimation({ threshold: 0.3 });
  const [searchRef, searchVisible] = useScrollAnimation({ threshold: 0.2 });
  const [programsRef, programsVisible] = useScrollAnimation({ threshold: 0.1 });
  const [ctaRef, ctaVisible] = useScrollAnimation({ threshold: 0.3 });

  const levels = ["All", "All Levels", "Beginner to Advanced", "Intermediate to Advanced"];

  const filteredPrograms = programs.filter(program => {
    const matchesLevel = selectedLevel === "All" || program.level === selectedLevel;
    const matchesSearch = program.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.features.some(feature => feature.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesLevel && matchesSearch;
  });

  const programStats = [
    { icon: Target, label: "Total Programs", value: "6+" },
    { icon: Users, label: "Active Members", value: "500+" },
    { icon: Star, label: "Certified Trainers", value: "6+" },
    { icon: Clock, label: "Years Experience", value: "10+" }
  ];

  return (
    <>
      <Helmet>
        <title>Fitness Programs - StayFit | Strength, Cardio, MMA & Nutrition</title>
        <meta name="description" content="Explore our comprehensive fitness programs including strength training, cardio workouts, MMA, and nutrition coaching at StayFit." />
      </Helmet>
      
      <div className="min-h-screen bg-very-dark-brown pt-20">
        {/* Hero Section */}
        <section ref={heroRef as React.RefObject<HTMLDivElement>} className="py-8 lg:py-16 bg-gradient-to-b from-very-dark-brown to-navy-primary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`text-center mb-16 ${heroVisible ? 'fade-in-up animate' : 'fade-in-up'}`}>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gradient-accent gradient-animate">
                Fitness Programs
              </h1>
              <p className="text-xl md:text-2xl text-warm-beige max-w-4xl mx-auto leading-relaxed">
                Discover our comprehensive range of fitness programs designed by experts to help you achieve your specific goals. 
                From strength training to MMA, we have the perfect program for every fitness level.
              </p>
            </div>

            {/* Program Statistics */}
            <div ref={statsRef as React.RefObject<HTMLDivElement>} className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
              {programStats.map((stat, index) => (
                <Card key={index} className={`card-elegant text-center group hover:shadow-accent transition-all duration-300 card-entrance ${statsVisible ? 'animate' : ''} stagger-${index + 1}`}>
                  <CardContent className="p-6">
                    <div className="bg-gradient-accent rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <stat.icon className="w-8 h-8 text-very-dark-brown" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">{stat.value}</h3>
                    <p className="text-warm-beige text-sm">{stat.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Search and Filter Section */}
        <section ref={searchRef as React.RefObject<HTMLDivElement>} className="py-8 lg:py-12 bg-navy-primary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`text-center mb-8 ${searchVisible ? 'fade-in-up animate' : 'fade-in-up'}`}>
              <h2 className="text-3xl font-bold mb-4 text-gradient-accent">
                Find Your Perfect Program
              </h2>
              <p className="text-warm-beige max-w-2xl mx-auto">
                Search and filter our programs by level to find the perfect match for your fitness goals
              </p>
            </div>

            <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-warm-beige w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search programs by name, description, or features..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-very-dark-brown border border-accent-primary/20 rounded-lg text-white placeholder-warm-beige focus:border-accent-primary focus:outline-none"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {levels.map((level) => (
                  <Button
                    key={level}
                    variant={selectedLevel === level ? "primary" : "secondary"}
                    size="sm"
                    onClick={() => setSelectedLevel(level)}
                    className="whitespace-nowrap"
                  >
                    <Filter className="w-4 h-4 mr-2" />
                    {level}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Programs Grid */}
        <section ref={programsRef as React.RefObject<HTMLDivElement>} className="py-8 lg:py-16 bg-very-dark-brown">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`text-center mb-16 ${programsVisible ? 'fade-in-up animate' : 'fade-in-up'}`}>
              <h2 className="text-4xl font-bold mb-4 text-gradient-accent">
                Available Programs
              </h2>
              <p className="text-xl text-warm-beige max-w-3xl mx-auto">
                Choose from our diverse range of fitness programs designed by experts
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {filteredPrograms.map((program, index) => (
                <Card key={index} className={`card-elegant group hover:shadow-accent transition-all duration-500 hover:-translate-y-2 relative card-entrance ${programsVisible ? 'animate' : ''} stagger-${(index % 6) + 1} min-h-[320px]`}>
                  {program.popular && (
                    <Badge className="absolute -top-3 left-6 bg-gradient-accent text-very-dark-brown font-semibold px-4 py-1">
                      <Star className="w-4 h-4 mr-1" />
                      Popular
                    </Badge>
                  )}
                  
                  <CardHeader className="pb-4">
                    <CardTitle className="text-2xl font-semibold text-white mb-2">
                      {program.title}
                    </CardTitle>
                    <p className="text-warm-beige leading-relaxed">
                      {program.description}
                    </p>
                  </CardHeader>

                  <CardContent className="space-y-4 p-4">
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
                      <Badge variant="outline" className="border-accent-primary text-accent-primary">
                        {program.level}
                      </Badge>
                    </div>

                    <ul className="space-y-2">
                      {program.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-sm text-warm-beige">
                          <CheckCircle className="w-4 h-4 text-accent-primary mr-3 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {showButtons && (
                      <div className="flex gap-3">
                        <Button 
                          variant="primary" 
                          size="sm" 
                          className="btn-premium flex-1 px-4 py-2 bg-gradient-accent hover:bg-gradient-accent/90 text-white shadow-accent hover:shadow-lg transition-all duration-300"
                          onClick={() => handleBookNow(program, index)}
                        >
                          <Calendar className="w-4 h-4 mr-2" />
                          Book Now
                        </Button>
                        <Button 
                          variant="secondary" 
                          size="sm" 
                          className="btn-premium flex-1 border-accent-primary text-accent-primary hover:bg-accent-primary hover:text-very-dark-brown transition-all duration-300"
                        >
                          <ArrowRight className="w-4 h-4 mr-2" />
                          Learn More
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredPrograms.length === 0 && (
              <div className="text-center py-12">
                <p className="text-warm-beige text-lg">No programs found matching your criteria.</p>
                <Button 
                  variant="secondary" 
                  size="md" 
                  className="btn-premium mt-4 border-accent-primary text-accent-primary hover:bg-accent-primary hover:text-very-dark-brown transition-all duration-300"
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedLevel("All");
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* Call to Action */}
        <section ref={ctaRef as React.RefObject<HTMLDivElement>} className="py-8 lg:py-16 bg-gradient-to-r from-very-dark-brown to-navy-primary">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className={`${ctaVisible ? 'fade-in-up animate' : 'fade-in-up'}`}>
              <h2 className="text-4xl font-bold mb-6 text-gradient-accent">
                Ready to Start Your Fitness Journey?
              </h2>
              <p className="text-xl text-warm-beige mb-8 leading-relaxed">
                Join our programs today and take the first step towards achieving your fitness goals with expert guidance and support.
              </p>
            {showButtons && (
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button 
                  variant="primary" 
                  size="lg" 
                  className="btn-premium px-8 py-4 bg-gradient-accent hover:bg-gradient-accent/90 text-white shadow-accent hover:shadow-lg transition-all duration-300"
                  onClick={() => {
                    setSelectedProgram({ id: "program-0", title: "First Session Booking" });
                    setIsBookingModalOpen(true);
                  }}
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Book Your First Session
                </Button>
                <Button 
                  variant="secondary" 
                  size="lg" 
                  className="btn-premium border-accent-primary text-accent-primary hover:bg-accent-primary hover:text-very-dark-brown transition-all duration-300"
                  asChild
                >
                  <Link to="/trainers">
                    Meet Our Trainers
                  </Link>
                </Button>
              </div>
            )}
            </div>
          </div>
        </section>

        {/* Booking Modal */}
        <BookingModal
          isOpen={isBookingModalOpen}
          onClose={() => setIsBookingModalOpen(false)}
          selectedProgram={selectedProgram}
        />
      </div>
    </>
  );
};

export default ProgramsPage;