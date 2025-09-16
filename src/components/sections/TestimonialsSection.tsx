import { useState } from "react";
import { Play, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const TestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      name: "Zain Ahmed",
      transformation: "Lost 30kg in 8 months",
      quote: "StayFit.pk changed my life completely. The trainers are incredibly supportive and the programs are perfectly structured.",
      videoThumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
      rating: 5,
      program: "Weight Loss Program"
    },
    {
      name: "Ayesha Khan",
      transformation: "Gained 8kg muscle mass",
      quote: "The strength training program here is exceptional. I've achieved results I never thought possible.",
      videoThumbnail: "https://images.unsplash.com/photo-1594737626072-90dc274bc2bd?w=400&h=300&fit=crop",
      rating: 5,
      program: "Strength Training"
    },
    {
      name: "Hassan Ali",
      transformation: "MMA Competition Ready",
      quote: "The MMA training here prepared me for my first amateur fight. Professional coaching and great environment.",
      videoThumbnail: "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=400&h=300&fit=crop",
      rating: 5,
      program: "MMA Training"
    },
    {
      name: "Maria Qureshi",
      transformation: "Improved Flexibility & Peace",
      quote: "The yoga classes have not only improved my flexibility but also brought peace to my daily life.",
      videoThumbnail: "https://images.unsplash.com/photo-1506629905606-b5625f6f8bb7?w=400&h=300&fit=crop",
      rating: 5,
      program: "Yoga & Wellness"
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 bg-navy-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-gradient-golden">
            Success Stories
          </h2>
          <p className="text-xl text-gray-muted max-w-3xl mx-auto leading-relaxed">
            Hear from our members who have transformed their lives through our programs.
          </p>
        </div>

        {/* Video Testimonials Carousel */}
        <div className="relative mb-16">
          <div className="flex items-center justify-center">
            <button
              onClick={prevTestimonial}
              className="absolute left-0 z-10 bg-white/10 hover:bg-white/20 rounded-full p-3 transition-all duration-300"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6 text-white-text" />
            </button>

            <Card className="card-elegant max-w-4xl mx-auto">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  {/* Video Thumbnail */}
                  <div className="relative group">
                    <img
                      src={testimonials[currentTestimonial].videoThumbnail}
                      alt={`${testimonials[currentTestimonial].name} transformation story`}
                      className="w-full h-64 object-cover rounded-xl"
                    />
                    <div className="absolute inset-0 bg-navy-primary/40 rounded-xl flex items-center justify-center group-hover:bg-navy-primary/20 transition-colors duration-300">
                      <Button
                        size="lg"
                        className="bg-golden-accent hover:bg-yellow-500 text-navy-primary rounded-full p-4"
                        onClick={() => {
                          // Placeholder for video modal
                          console.log("Open video modal for:", testimonials[currentTestimonial].name);
                        }}
                      >
                        <Play className="w-8 h-8" />
                      </Button>
                    </div>
                  </div>

                  {/* Testimonial Content */}
                  <div className="space-y-4">
                    <div className="flex items-center mb-4">
                      {Array.from({ length: testimonials[currentTestimonial].rating }).map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-golden-accent fill-current" />
                      ))}
                    </div>

                    <blockquote className="text-lg text-white-text leading-relaxed italic">
                      "{testimonials[currentTestimonial].quote}"
                    </blockquote>

                    <div className="border-l-4 border-golden-accent pl-4">
                      <h4 className="text-xl font-semibold text-white-text">
                        {testimonials[currentTestimonial].name}
                      </h4>
                      <p className="text-golden-accent font-medium">
                        {testimonials[currentTestimonial].transformation}
                      </p>
                      <p className="text-gray-muted text-sm">
                        {testimonials[currentTestimonial].program}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <button
              onClick={nextTestimonial}
              className="absolute right-0 z-10 bg-white/10 hover:bg-white/20 rounded-full p-3 transition-all duration-300"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6 text-white-text" />
            </button>
          </div>

          {/* Testimonial Indicators */}
          <div className="flex justify-center space-x-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentTestimonial ? "bg-golden-accent" : "bg-white/30 hover:bg-white/50"
                }`}
                aria-label={`View testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* All Video Thumbnails Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="relative group cursor-pointer"
              onClick={() => setCurrentTestimonial(index)}
            >
              <img
                src={testimonial.videoThumbnail}
                alt={`${testimonial.name} video testimonial`}
                className="w-full h-32 object-cover rounded-lg transition-all duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-very-dark-brown/40 rounded-lg flex items-center justify-center group-hover:bg-very-dark-brown/20 transition-colors duration-300">
                <Play className="w-6 h-6 text-golden-accent" />
              </div>
              <div className="absolute bottom-2 left-2 right-2">
                <p className="text-white text-xs font-medium truncate">
                  {testimonial.name}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" className="btn-hero-secondary">
            View All Success Stories
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;