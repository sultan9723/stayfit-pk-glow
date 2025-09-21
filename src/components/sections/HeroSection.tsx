import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { Button } from "@/components/Button";
import heroGym1 from "@/assets/hero-gym-1.jpg";
import heroCardio2 from "@/assets/hero-cardio-2.jpg";
import heroMma3 from "@/assets/hero-mma-3.jpg";
import useScrollAnimation from "../../hooks/useScrollAnimation";

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [heroRef, heroVisible] = useScrollAnimation({ threshold: 0.2 });

  const slides = [
    {
      image: heroGym1,
      title: "Transform Your Body",
      subtitle: "Build Strength & Endurance",
      description: "State-of-the-art equipment and expert guidance for your strength training journey"
    },
    {
      image: heroCardio2,
      title: "Ignite Your Cardio",
      subtitle: "Boost Your Energy & Stamina",
      description: "High-energy cardio programs designed to maximize your fitness potential"
    },
    {
      image: heroMma3,
      title: "Master Combat Sports",
      subtitle: "MMA & Boxing Training",
      description: "Professional MMA training with experienced fighters and certified coaches"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section ref={heroRef as React.RefObject<HTMLDivElement>} className="relative h-screen overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${slide.image})` }}
          />
          <div className="absolute inset-0 bg-very-dark-brown/70" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`${heroVisible ? 'fade-in-up animate' : 'fade-in-up'}`}>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 text-white leading-tight gradient-animate">
              {slides[currentSlide].title}
            </h1>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-4 text-accent-primary">
              {slides[currentSlide].subtitle}
            </h2>
            <p className="text-lg sm:text-xl text-warm-beige mb-8 max-w-2xl mx-auto leading-relaxed">
              {slides[currentSlide].description}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                variant="primary" 
                size="lg"
                className="btn-premium w-full md:w-auto px-8 py-4 bg-gradient-accent hover:bg-gradient-accent/90 text-white shadow-accent hover:shadow-lg transition-all duration-300"
              >
                Join Now
              </Button>
              <Button 
                variant="secondary" 
                size="lg"
                className="btn-premium w-full md:w-auto border-accent-primary text-accent-primary hover:bg-accent-primary hover:text-very-dark-brown transition-all duration-300"
              >
                Explore Programs
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 rounded-full p-3 transition-all duration-300"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 rounded-full p-3 transition-all duration-300"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-accent-primary" : "bg-white/30 hover:bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;