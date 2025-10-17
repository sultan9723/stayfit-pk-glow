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

      {/* Find Us (Map) */}
      <section id="find-us" className="px-4 sm:px-6 lg:px-8 mt-10">
        <div className="max-w-7xl mx-auto">
          <div className="card-elegant bg-gradient-card shadow-elegant rounded-xl overflow-hidden">
            <div className="p-6">
              <h3 className="text-white-text text-xl font-semibold mb-2">Find Us</h3>
              <p className="text-warm-beige text-sm mb-4">
                <span className="text-white font-semibold">StayFit Gym</span> — 23-B, Street 10, Rawalpindi, Pakistan · Open: Mon–Sat, 6 AM – 10 PM ·
                <a href="tel:+923001234567" className="underline hover:text-accent-primary ml-1">+92 300 1234567</a>
              </p>
              <div className="w-full h-80 rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3323.1729925857197!2d73.05588937656313!3d33.59818744194256!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38df9568a7b9c5b5%3A0x3a0e66e1dcf7712c!2sRawalpindi%2C%20Punjab!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="StayFit.pk Location in Rawalpindi"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;