import { useState } from "react";
import { motion, Variants } from "framer-motion";
import { Filter, Search, Calendar, Clock, Users, CheckCircle, Star } from "lucide-react";
import { Button } from "@/components/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import stayfitData from "../../data/stayfit_content.json";
import BookingModal from "@/components/BookingModal";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (custom: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", delay: custom * 0.1 },
  }),
};

const ProgramsSection = () => {
  const { programs } = stayfitData;
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<{ id: string; title: string } | undefined>();

  const levels = ["All", "All Levels", "Beginner to Advanced", "Intermediate to Advanced"];

  const filteredPrograms = programs.filter((program) => {
    const matchesLevel = selectedLevel === "All" || program.level === selectedLevel;
    const matchesSearch =
      program.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.features.some((feature) =>
        feature.toLowerCase().includes(searchTerm.toLowerCase())
      );
    return matchesLevel && matchesSearch;
  });

  const handleBookNow = (program: any, index: number) => {
    setSelectedProgram({
      id: `program-${index + 1}`,
      title: program.title,
    });
    setIsBookingModalOpen(true);
  };

  return (
    <section
      id="programs"
      className="pt-[6rem] pb-12 lg:pb-16 bg-gradient-to-b from-navy-primary to-very-dark-brown"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="space-y-4"
        >
          <h2 className="text-4xl font-bold text-gradient-accent">
            Find Your Perfect Program
          </h2>
          <p className="text-warm-beige max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            Search and filter our programs by level to find the perfect match for your fitness goals.
          </p>
        </motion.div>

        {/* Search + Filter */}
        <motion.div
          className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto mt-10 mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-warm-beige w-5 h-5" />
            <input
              type="text"
              placeholder="Search programs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-very-dark-brown border border-accent-primary/20 rounded-lg text-white placeholder-warm-beige focus:border-accent-primary focus:outline-none"
            />
          </div>

          <div className="flex gap-2 flex-wrap justify-center">
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
        </motion.div>

        {/* Programs Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
        >
          {filteredPrograms.map((program, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={fadeUp}
              whileHover={{
                scale: 1.03,
                rotateX: 1.2,
                rotateY: -1.2,
                boxShadow: "0 6px 20px rgba(255,193,7,0.15)",
              }}
              whileTap={{
                scale: 0.97,
                boxShadow: "0 0 15px rgba(255,193,7,0.3)",
              }}
              className="transition-transform duration-300 relative"
            >
              <Card className="card-elegant group overflow-hidden min-h-[320px] relative">
                
                {/* ✅ Professionally aligned badge */}
                {program.popular && (
                  <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-30">
                    <Badge className="bg-gradient-accent text-very-dark-brown font-semibold px-3 py-1 sm:px-4 sm:py-1.5 flex items-center rounded-full shadow-md backdrop-blur-md">
                      <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1 text-very-dark-brown" />
                      Most Popular
                    </Badge>
                  </div>
                )}

                <CardHeader className="pb-4">
                  <CardTitle className="text-2xl font-semibold text-white mb-2">
                    {program.title}
                  </CardTitle>
                  <p className="text-warm-beige leading-relaxed text-sm sm:text-base">
                    {program.description}
                  </p>
                </CardHeader>

                <CardContent className="space-y-4 p-4">
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <div className="flex items-center text-warm-beige">
                      <Clock className="w-4 h-4 mr-2" />
                      {program.duration}
                    </div>
                    <div className="flex items-center text-warm-beige">
                      <Users className="w-4 h-4 mr-2" />
                      {program.capacity}
                    </div>
                  </div>

                  <Badge
                    variant="outline"
                    className="border-accent-primary text-accent-primary"
                  >
                    {program.level}
                  </Badge>

                  <ul className="space-y-2">
                    {program.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center text-sm text-warm-beige"
                      >
                        <CheckCircle className="w-4 h-4 text-accent-primary mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Single CTA only */}
                  <div className="mt-4">
                    <Button
                      variant="heroPrimary"
                      size="sm"
                      className="btn-premium w-full"
                      onClick={() => handleBookNow(program, index)}
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      Book Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        selectedProgram={selectedProgram}
      />
    </section>
  );
};

export default ProgramsSection;