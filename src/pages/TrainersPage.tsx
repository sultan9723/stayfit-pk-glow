import { Helmet } from "react-helmet-async";
import { Button } from "@/components/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Star, Award, Calendar, Instagram, Linkedin, Users, Trophy, Target, Clock, CheckCircle } from "lucide-react";
import stayfitData from "../../data/stayfit_content.json";

const TrainersPage = () => {
  const { male_trainers, female_trainers } = stayfitData;
  const allTrainers = [...male_trainers, ...female_trainers];

  const trainerStats = [
    { icon: Users, label: "Total Clients", value: "500+" },
    { icon: Trophy, label: "Success Stories", value: "200+" },
    { icon: Award, label: "Certifications", value: "15+" },
    { icon: Target, label: "Years Experience", value: "25+" }
  ];

  const specializations = [
    "Strength & Body Building",
    "Cardio & Weight Loss", 
    "Mixed Martial Arts",
    "Yoga & Wellness",
    "Nutrition Coaching",
    "Personal Training",
    "Group Fitness",
    "Rehabilitation"
  ];

  return (
    <>
      <Helmet>
        <title>Expert Trainers - StayFit.pk | Certified Fitness Professionals</title>
        <meta name="description" content="Meet our team of certified and experienced fitness trainers at StayFit.pk, ready to help you achieve your fitness goals." />
      </Helmet>
      
      <div className="min-h-screen bg-navy-primary pt-20">
        {/* Hero Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h1 className="text-5xl font-bold mb-6 text-gradient-golden">
                Meet Our Expert Trainers
              </h1>
              <p className="text-xl text-gray-muted max-w-3xl mx-auto leading-relaxed">
                Our certified fitness professionals are dedicated to helping you achieve your goals with personalized guidance, 
                expert knowledge, and unwavering support throughout your fitness journey.
              </p>
            </div>

            {/* Trainer Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
              {trainerStats.map((stat, index) => (
                <Card key={index} className="card-elegant text-center">
                  <CardContent className="p-6">
                    <div className="bg-gradient-golden rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <stat.icon className="w-8 h-8 text-navy-primary" />
                    </div>
                    <h3 className="text-2xl font-bold text-white-text mb-2">{stat.value}</h3>
                    <p className="text-gray-muted text-sm">{stat.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Professional Introduction */}
        <section className="py-16 bg-gradient-to-br from-muted to-navy-primary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-6 text-gradient-golden">
                  Why Choose Our Trainers?
                </h2>
                <div className="space-y-4 mb-8">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-golden-accent mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-white-text font-semibold mb-1">Certified Professionals</h3>
                      <p className="text-gray-muted">All our trainers hold internationally recognized certifications and continuously update their knowledge.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-golden-accent mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-white-text font-semibold mb-1">Personalized Approach</h3>
                      <p className="text-gray-muted">Every training program is tailored to your specific goals, fitness level, and lifestyle.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-golden-accent mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-white-text font-semibold mb-1">Proven Results</h3>
                      <p className="text-gray-muted">Our trainers have helped hundreds of clients achieve their fitness goals with measurable results.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-golden-accent mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-white-text font-semibold mb-1">Ongoing Support</h3>
                      <p className="text-gray-muted">We provide continuous guidance, motivation, and support beyond just workout sessions.</p>
                    </div>
                  </div>
                </div>
                <Button variant="primary" size="lg" asChild>
                  <Link to="/contact">
                    Book Your Free Consultation
                  </Link>
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {specializations.map((specialty, index) => (
                  <Card key={index} className="card-elegant">
                    <CardContent className="p-4 text-center">
                      <div className="w-12 h-12 bg-gradient-golden rounded-full mx-auto mb-3 flex items-center justify-center">
                        <Target className="w-6 h-6 text-navy-primary" />
                      </div>
                      <h4 className="text-white-text font-semibold text-sm">{specialty}</h4>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Trainers Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 text-gradient-golden">
                Our Training Team
              </h2>
              <p className="text-xl text-gray-muted max-w-3xl mx-auto">
                Meet the professionals who will guide you on your fitness journey
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {allTrainers.map((trainer, index) => (
                <Card key={index} className="card-elegant group hover:shadow-golden transition-all duration-500 hover:-translate-y-2">
                  <CardContent className="p-6">
                    <div className="relative mb-6">
                      <img
                        src={trainer.image}
                        alt={`${trainer.name} - ${trainer.role} at StayFit.pk`}
                        className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-golden-accent/20 group-hover:border-golden-accent transition-colors duration-300"
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
                      <p className="text-golden-accent font-medium mb-2">
                        {trainer.role}
                      </p>
                      <p className="text-green-secondary text-sm mb-3">
                        {trainer.specialty}
                      </p>
                      
                      <div className="flex items-center justify-center mb-3">
                        <Star className="w-4 h-4 text-golden-accent fill-current" />
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
                          className="text-gray-muted hover:text-golden-accent transition-colors duration-300"
                          aria-label={`${trainer.name} Instagram`}
                        >
                          <Instagram className="w-5 h-5" />
                        </a>
                        <a
                          href="#"
                          className="text-gray-muted hover:text-golden-accent transition-colors duration-300"
                          aria-label={`${trainer.name} LinkedIn`}
                        >
                          <Linkedin className="w-5 h-5" />
                        </a>
                      </div>

                      <Button variant="secondary" size="sm" className="w-full">
                        <Calendar className="w-4 h-4 mr-2" />
                        Book Session
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-gradient-to-r from-very-dark-brown to-dark-brown">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold mb-6 text-gradient-golden">
              Ready to Start Your Fitness Journey?
            </h2>
            <p className="text-xl text-gray-muted mb-8 leading-relaxed">
              Book a free consultation with one of our expert trainers and take the first step towards achieving your fitness goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" size="lg" asChild>
                <Link to="/contact">
                  <Calendar className="w-5 h-5 mr-2" />
                  Book Free Consultation
                </Link>
              </Button>
              <Button variant="secondary" size="lg" asChild>
                <Link to="/programs">
                  View Training Programs
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default TrainersPage;