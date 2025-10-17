import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/Button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  Award,
  Calendar,
  Instagram,
  Linkedin,
  Clock,
  GraduationCap,
  MessageCircle,
  Filter,
  Search,
  Phone,
} from "lucide-react";
import stayfitData from "../../data/stayfit_content.json";
import TrainerBookingModal from "@/components/TrainerBookingModal";
import useScrollAnimation from "../hooks/useScrollAnimation";
import { useScrollToHash } from "@/hooks/useScrollToHash";

const TrainersPage = () => {
  const { male_trainers, female_trainers } = stayfitData;
  const allTrainers = [...male_trainers, ...female_trainers];

  const [selectedSpecialty, setSelectedSpecialty] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [trainerModalOpen, setTrainerModalOpen] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState<{ id: string; name: string } | undefined>(undefined);

  const showButtons = true;

  // Smooth scroll for #hash
  useScrollToHash();

  // Animations
  const [heroRef, heroVisible] = useScrollAnimation({ threshold: 0.2 });
  const [searchRef, searchVisible] = useScrollAnimation({ threshold: 0.2 });
  const [trainersRef, trainersVisible] = useScrollAnimation({ threshold: 0.1 });
  const [ctaRef, ctaVisible] = useScrollAnimation({ threshold: 0.3 });

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
      trainer.specializations.some((spec) => spec.toLowerCase().includes(selectedSpecialty.toLowerCase()));

    const matchesSearch =
      trainer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trainer.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trainer.role.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSpecialty && matchesSearch;
  });

  return (
    <>
      <Helmet>
        <title>Expert Trainers - StayFit | Certified Fitness Professionals</title>
        <meta
          name="description"
          content="Meet our team of certified and experienced fitness trainers at StayFit, ready to help you achieve your fitness goals."
        />
      </Helmet>

      <div className="min-h-screen bg-very-dark-brown pt-20">
        {/* Hero */}
        <section ref={heroRef as React.RefObject<HTMLDivElement>} className="py-16 bg-gradient-to-b from-very-dark-brown to-navy-primary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`text-center mb-16 ${heroVisible ? "fade-in-up animate" : "fade-in-up"}`}>
              <div className="relative inline-block">
                <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gradient-accent gradient-animate">Meet Our Expert Trainers</h1>
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-accent-primary/20 rounded-full animate-pulse floating" />
                <div className="absolute -bottom-2 -right-4 w-6 h-6 bg-accent-secondary/20 rounded-full animate-ping floating" />
              </div>
              <p className="text-xl md:text-2xl text-warm-beige max-w-4xl mx-auto leading-relaxed">
                Our certified fitness professionals are dedicated to helping you achieve your goals with personalized guidance.
              </p>
            </div>

            {/* Submenu anchors */}
            <div className="h-0" id="strength" aria-hidden="true" />
            <div className="h-0" id="cardio" aria-hidden="true" />
            <div className="h-0" id="mma" aria-hidden="true" />
            <div className="h-0" id="yoga" aria-hidden="true" />
            <div className="h-0" id="hiit" aria-hidden="true" />
          </div>
        </section>

        {/* Search & Filters */}
        <section ref={searchRef as React.RefObject<HTMLDivElement>} className="py-12 bg-navy-primary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`text-center mb-8 ${searchVisible ? "fade-in-up animate" : "fade-in-up"}`}>
              <h2 className="text-3xl font-bold mb-4 text-gradient-accent">Find Your Perfect Trainer</h2>
              <p className="text-warm-beige max-w-2xl mx-auto">Search and filter our trainers by specialty to find the perfect match.</p>
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
                    variant={selectedSpecialty === specialty ? "primary" : "secondary"}
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
        <section ref={trainersRef as React.RefObject<HTMLDivElement>} className="py-16 bg-navy-primary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`text-center mb-16 ${trainersVisible ? "fade-in-up animate" : "fade-in-up"}`}>
              <h2 className="text-4xl font-bold mb-4 text-gradient-accent">Our Training Team</h2>
              <p className="text-xl text-warm-beige max-w-3xl mx-auto">Meet the professionals who will guide you on your fitness journey</p>
              <p className="text-warm-beige mt-2">Showing {filteredTrainers.length} of {allTrainers.length} trainers</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTrainers.map((trainer, index) => (
                <Card key={index} className={`h-full flex flex-col card-elegant group hover:shadow-accent transition-all duration-500 hover:-translate-y-2 relative card-entrance ${trainersVisible ? "animate" : ""} stagger-${(index % 6) + 1}`}>
                  <CardContent className="p-6 flex flex-col h-full">
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
                      <h3 className="text-xl font-semibold text-white mb-1">{trainer.name}</h3>
                      <p className="text-accent-primary font-medium mb-2">{trainer.role}</p>
                      <p className="text-warm-beige text-sm mb-3">{trainer.specialty}</p>
                      <div className="flex items-center justify-center mb-3">
                        <Star className="w-4 h-4 text-accent-primary fill-current" />
                        <span className="text-white font-medium ml-1">{trainer.rating}</span>
                        <span className="text-warm-beige text-sm ml-2">({trainer.clients_helped}+ clients)</span>
                      </div>
                      <p className="text-warm-beige text-sm leading-relaxed mb-4">{trainer.bio}</p>
                    </div>

                    <div className="space-y-3 flex-1">
                      <div className="flex flex-wrap gap-2 justify-center">
                        {trainer.specializations.slice(0, 3).map((spec: string, i: number) => (
                          <Badge key={i} variant="outline" className="border-accent-primary text-accent-primary text-xs">{spec}</Badge>
                        ))}
                        {trainer.specializations.length > 3 && (
                          <Badge variant="outline" className="border-accent-primary text-accent-primary text-xs">+{trainer.specializations.length - 3} more</Badge>
                        )}
                      </div>

                      <div className="flex items-center justify-center space-x-4 text-xs text-warm-beige">
                        <div className="flex items-center"><Clock className="w-3 h-3 mr-1" />{trainer.availability.split(",")[0]}</div>
                        <div className="flex items-center"><GraduationCap className="w-3 h-3 mr-1" />{trainer.education.split(",")[0]}</div>
                      </div>

                      <div className="flex items-center justify-center space-x-3">
                        <a href="https://instagram.com/stayfitpk" className="text-warm-beige hover:text-accent-primary transition-colors duration-300" aria-label={`${trainer.name} Instagram`}>
                          <Instagram className="w-5 h-5" />
                        </a>
                        <a href="https://linkedin.com/company/stayfitpk" className="text-warm-beige hover:text-accent-primary transition-colors duration-300" aria-label={`${trainer.name} LinkedIn`}>
                          <Linkedin className="w-5 h-5" />
                        </a>
                        <a href="mailto:info@stayfit.pk" className="text-warm-beige hover:text-accent-primary transition-colors duration-300" aria-label={`${trainer.name} Message`}>
                          <MessageCircle className="w-5 h-5" />
                        </a>
                        <a href="tel:+923001234567" className="text-warm-beige hover:text-accent-primary transition-colors duration-300" aria-label={`${trainer.name} Call`}>
                          <Phone className="w-5 h-5" />
                        </a>
                      </div>

                      {showButtons && (
                        <div className="flex gap-3 mt-auto">
                          <Button
                            variant="primary"
                            size="sm"
                            className="flex-1"
                            onClick={() => {
                              setSelectedTrainer({ id: `trainer-${index + 1}`, name: trainer.name });
                              setTrainerModalOpen(true);
                            }}
                          >
                            <Calendar className="w-4 h-4 mr-2" />
                            Book Session
                          </Button>
                          <Button variant="secondary" size="sm" className="flex-1">
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
                <p className="text-warm-beige text-lg">No trainers found matching your criteria.</p>
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
        <section ref={ctaRef as React.RefObject<HTMLDivElement>} className="py-16 bg-gradient-to-r from-very-dark-brown to-navy-primary">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className={`${ctaVisible ? "fade-in-up animate" : "fade-in-up"}`}>
              <h2 className="text-4xl font-bold mb-6 text-gradient-accent">Ready to Start Your Fitness Journey?</h2>
              <p className="text-xl text-warm-beige mb-8 leading-relaxed">Book a free consultation with one of our expert trainers and take the first step.</p>
              {showButtons && (
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button variant="primary" size="lg" asChild>
                    <Link to="/contact">
                      <Calendar className="w-5 h-5 mr-2" />
                      Book Free Consultation
                    </Link>
                  </Button>
                  <Button variant="secondary" size="lg" asChild>
                    <Link to="/programs">View Training Programs</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Trainer Success Stories */}
        <section className="py-16 bg-very-dark-brown">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 text-gradient-accent">Trainer Success Stories</h2>
              <p className="text-xl text-warm-beige max-w-3xl mx-auto">Short transformations from our trainer-led programs.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {["https://www.youtube.com/shorts/jrtsCy6b4xU","https://www.youtube.com/shorts/RpnmJ13tk-Y","https://www.youtube.com/shorts/8YgTLExnIns"].map((url, i) => (
                <div key={i} className="relative w-full aspect-video rounded-xl overflow-hidden shadow">
                  <iframe
                    src={url.replace("watch?v=", "embed/").replace("shorts/", "embed/")}
                    className="w-full h-full"
                    frameBorder={0}
                    allow="autoplay; encrypted-media; picture-in-picture"
                    allowFullScreen
                    title={`Trainer Success ${i + 1}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Trainer Booking Modal */}
      {trainerModalOpen && (
        <TrainerBookingModal
          isOpen={trainerModalOpen}
          onClose={() => setTrainerModalOpen(false)}
          selectedTrainer={selectedTrainer}
        />
      )}
    </>
  );
};

export default TrainersPage;
