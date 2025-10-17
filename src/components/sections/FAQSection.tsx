import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/Button";

const FAQSection = () => {
  const faqs = [
    {
      question: "What are your membership options and pricing?",
      answer:
        "We offer flexible membership plans including monthly, quarterly, and annual options. Our plans range from basic gym access to premium packages that include personal training, nutrition coaching, and group classes. Visit our pricing page or contact us for detailed information about current rates and special offers.",
    },
    {
      question: "Do I need to have prior fitness experience to join?",
      answer:
        "Absolutely not! StayFit.pk welcomes members of all fitness levels, from complete beginners to advanced athletes. Our certified trainers will assess your current fitness level and create a personalized program that matches your goals and abilities. We provide proper guidance and support every step of the way.",
    },
    {
      question: "What safety measures do you have in place?",
      answer:
        "Your safety is our top priority. All our equipment is regularly maintained and sanitized. Our trainers are certified in first aid and CPR. We maintain proper ventilation, follow health protocols, and ensure adequate spacing between equipment. Our facility is also equipped with emergency medical supplies.",
    },
    {
      question: "Can I try a class before committing to membership?",
      answer:
        "Yes! We offer trial sessions and day passes so you can experience our facilities and classes before making a commitment. Contact us to schedule a free tour and trial workout. This allows you to meet our trainers, see our equipment, and get a feel for our community atmosphere.",
    },
    {
      question: "What types of group classes do you offer?",
      answer:
        "We offer a variety of group classes including HIIT, strength training, cardio blast, yoga, pilates, MMA fundamentals, boxing, and specialized programs for different fitness goals. Our class schedule is designed to accommodate various time preferences and fitness levels.",
    },
    {
      question: "Do you provide personal training services?",
      answer:
        "Yes, we have a team of certified personal trainers who offer one-on-one coaching sessions. Personal training includes customized workout plans, proper form instruction, motivation, and progress tracking. Sessions can be scheduled based on your availability and specific fitness goals.",
    },
    {
      question: "What equipment and facilities do you have?",
      answer:
        "Our facility features state-of-the-art cardio machines, free weights, resistance training equipment, functional training areas, MMA mats, boxing ring, yoga studio, locker rooms with showers, and a nutrition consultation area. All equipment is commercial-grade and regularly updated.",
    },
    {
      question: "Do you offer nutrition guidance?",
      answer:
        "Yes, we provide comprehensive nutrition coaching services. Our certified nutritionists create personalized meal plans, offer supplement guidance, and provide ongoing support to help you achieve your fitness goals. Nutrition consultations can be included in premium memberships or purchased separately.",
    },
    {
      question: "What are your operating hours?",
      answer:
        "We're open Monday to Friday from 6:00 AM to 10:00 PM, and weekends from 7:00 AM to 8:00 PM. These extended hours are designed to accommodate various schedules, whether you prefer early morning workouts or evening sessions after work.",
    },
    {
      question: "Can I freeze or cancel my membership?",
      answer:
        "Yes, we offer flexible membership options. You can freeze your membership for medical reasons, travel, or other circumstances with proper notice. Cancellation policies vary by membership type, but we always work with our members to find solutions that work for everyone. Please check your membership agreement for specific terms.",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-navy-primary to-muted">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-gradient-accent">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-muted leading-relaxed">
            Find answers to common questions about our services, membership options, 
            and facilities. Can't find what you're looking for? Contact us directly.
          </p>
        </div>

        <div className="bg-gradient-card rounded-2xl p-8 shadow-elegant">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border border-white/10 rounded-xl px-6 bg-white/5 hover:bg-white/10 transition-colors duration-300"
              >
                <AccordionTrigger className="text-left text-white-text hover:text-accent-primary font-semibold py-6 text-lg hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-muted leading-relaxed pb-6 text-base">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* SEO-friendly FAQ structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": faqs.map((faq) => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": faq.answer,
                },
              })),
            }),
          }}
        />

        {/* ✅ Updated Consistent Buttons */}
        <div className="text-center mt-12">
          <p className="text-gray-muted mb-6">
            Still have questions? We're here to help!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              variant="primary"
              size="lg"
              className="transition-all duration-300"
            >
              <a href="tel:+923330711555">Call Us Now</a>
            </Button>

            <Button
              asChild
              variant="secondary"
              size="lg"
              className="transition-all duration-300"
            >
              <a href="mailto:info@stayfit.pk">Send Email</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;