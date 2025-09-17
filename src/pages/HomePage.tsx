import { Helmet } from "react-helmet-async";
import HeroSection from "@/components/sections/HeroSection";
import WhyStayFitSection from "@/components/sections/WhyStayFitSection";
import ProgramsSection from "@/components/sections/ProgramsSection";
import TrainersSection from "@/components/sections/TrainersSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import AchievementsSection from "@/components/sections/AchievementsSection";
import GallerySection from "@/components/sections/GallerySection";
import BlogSection from "@/components/sections/BlogSection";
import FAQSection from "@/components/sections/FAQSection";
import NewsletterSection from "@/components/sections/NewsletterSection";
import ContactMapSection from "@/components/sections/ContactMapSection";

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>StayFit.pk - Premium Fitness Center in Pakistan | Gym, MMA, Cardio & Nutrition</title>
        <meta 
          name="description" 
          content="Transform your fitness journey at StayFit.pk - Pakistan's premier fitness center offering strength training, cardio, MMA, and personalized nutrition programs with expert trainers." 
        />
        <meta 
          name="keywords" 
          content="fitness center Pakistan, gym Karachi, MMA training, cardio workout, strength training, nutrition coaching, personal trainer, fitness programs" 
        />
        <link rel="canonical" href="https://stayfit.pk" />
        
        <meta property="og:title" content="StayFit.pk - Premium Fitness Center in Pakistan" />
        <meta property="og:description" content="Transform your fitness journey with our comprehensive fitness programs including strength training, cardio, MMA, and nutrition coaching." />
        <meta property="og:url" content="https://stayfit.pk" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "StayFit.pk Home",
            "description": "Transform your fitness journey at Pakistan's premier fitness center",
            "url": "https://stayfit.pk",
            "mainEntity": {
              "@type": "LocalBusiness",
              "name": "StayFit.pk",
              "description": "Premium fitness center offering strength training, cardio, MMA, and nutrition programs"
            }
          })}
        </script>
      </Helmet>

      <HeroSection />
      <WhyStayFitSection />
      <ProgramsSection />
      <TrainersSection />
      <TestimonialsSection />
      <AchievementsSection />
      <GallerySection />
      <BlogSection />
      <FAQSection />
      <ContactMapSection />
      <NewsletterSection />
    </>
  );
};

export default HomePage;