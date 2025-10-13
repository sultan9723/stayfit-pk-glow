import { Helmet } from "react-helmet-async";
import { useScrollToHash } from "@/hooks/useScrollToHash"; // 👈 NEW import for smooth scrolling
import HeroSection from "@/components/sections/HeroSection";
import WhyStayFitSection from "@/components/sections/WhyStayFitSection";
import ProgramsSection from "@/components/sections/ProgramsSection";
import PricingPlans from "@/components/sections/PricingPlans";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import AchievementsSection from "@/components/sections/AchievementsSection";
import GallerySection from "@/components/sections/GallerySection";
import BlogSection from "@/components/sections/BlogSection";
import FAQSection from "@/components/sections/FAQSection";
import NewsletterSection from "@/components/sections/NewsletterSection";

const HomePage = () => {
  // 👇 Enables smooth scrolling for #hash links (like /#gallery or /#why-choose)
  useScrollToHash();

  return (
    <>
      <Helmet>
        <title>
          StayFit - Premium Fitness Center in Pakistan | Gym, MMA, Cardio & Nutrition
        </title>
        <meta
          name="description"
          content="Transform your fitness journey at StayFit.pk - Pakistan's premier fitness center offering strength training, cardio, MMA, and personalized nutrition programs with expert trainers."
        />
        <meta
          name="keywords"
          content="fitness center Pakistan, gym Karachi, MMA training, cardio workout, strength training, nutrition coaching, personal trainer, fitness programs"
        />
        <link rel="canonical" href="https://stayfit.pk" />

        <meta
          property="og:title"
          content="StayFit.pk - Premium Fitness Center in Pakistan"
        />
        <meta
          property="og:description"
          content="Transform your fitness journey with our comprehensive fitness programs including strength training, cardio, MMA, and nutrition coaching."
        />
        <meta property="og:url" content="https://stayfit.pk" />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "StayFit Home",
            description:
              "Transform your fitness journey at Pakistan's premier fitness center",
            url: "https://stayfit.pk",
            mainEntity: {
              "@type": "LocalBusiness",
              name: "StayFit",
              description:
                "Premium fitness center offering strength training, cardio, MMA, and nutrition programs",
            },
          })}
        </script>
      </Helmet>

      {/* ✅ Add IDs for smooth navigation */}
      <HeroSection />

      <section id="why-choose">
        <WhyStayFitSection />
      </section>

      <section id="programs">
        <ProgramsSection />
      </section>

      <section id="pricing">
        <PricingPlans />
      </section>

      <section id="success-stories">
        <TestimonialsSection />
      </section>

      <section id="achievements">
        <AchievementsSection />
      </section>

      <section id="gallery">
        <GallerySection />
      </section>

      <section id="blog">
        <BlogSection />
      </section>

      <section id="faq">
        <FAQSection />
      </section>

      <section id="newsletter">
        <NewsletterSection />
      </section>
    </>
  );
};

export default HomePage;