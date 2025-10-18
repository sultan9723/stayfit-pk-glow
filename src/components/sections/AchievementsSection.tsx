import { useEffect, useState, useRef, useCallback } from "react";
import { Users, Award, Clock, TrendingUp } from "lucide-react";

const AchievementsSection = () => {
  const [counts, setCounts] = useState({
    members: 0,
    trainers: 0,
    years: 0,
    transformations: 0,
  });

  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const achievements = [
    {
      icon: Users,
      number: 2500,
      suffix: "+",
      label: "Active Members",
      description: "Fitness enthusiasts trust us",
    },
    {
      icon: Award,
      number: 25,
      suffix: "+",
      label: "Expert Trainers",
      description: "Certified professionals",
    },
    {
      icon: Clock,
      number: 8,
      suffix: "",
      label: "Years Experience",
      description: "Serving the community",
    },
    {
      icon: TrendingUp,
      number: 5000,
      suffix: "+",
      label: "Transformations",
      description: "Success stories achieved",
    },
  ];

  const animateCounters = useCallback(() => {
    if (hasAnimated) return;

    achievements.forEach((achievement, index) => {
      const duration = 2000;
      const steps = 60;
      const increment = achievement.number / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= achievement.number) {
          current = achievement.number;
          clearInterval(timer);
        }

        setCounts((prev) => ({
          ...prev,
          [index === 0
            ? "members"
            : index === 1
            ? "trainers"
            : index === 2
            ? "years"
            : "transformations"]: Math.floor(current),
        }));
      }, duration / steps);
    });

    setHasAnimated(true);
  }, [hasAnimated, achievements]);

  useEffect(() => {
    const currentRef = sectionRef.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            animateCounters();
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(currentRef);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasAnimated, animateCounters]);

  const getCountValue = (index: number) => {
    switch (index) {
      case 0:
        return counts.members;
      case 1:
        return counts.trainers;
      case 2:
        return counts.years;
      case 3:
        return counts.transformations;
      default:
        return 0;
    }
  };

  return (
    <section
      ref={sectionRef}
      className="py-16 sm:py-20 bg-gradient-to-r from-navy-primary via-muted to-navy-primary overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gradient-accent">
            Our Achievements
          </h2>
          <p className="text-base sm:text-xl text-gray-muted max-w-3xl mx-auto leading-relaxed">
            Numbers that reflect our commitment to excellence and the trust our
            community places in us.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className="text-center group hover:-translate-y-2 transition-all duration-500"
            >
              <div className="bg-gradient-card rounded-2xl p-6 sm:p-8 shadow-elegant hover:shadow-accent transition-all duration-500">
                <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-gradient-golden rounded-full mb-5 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                  <achievement.icon className="w-7 h-7 sm:w-8 sm:h-8 text-navy-primary" />
                </div>

                <div className="counter-animate">
                  <h3 className="text-3xl sm:text-4xl font-bold text-white-text mb-2">
                    {getCountValue(index).toLocaleString()}
                    {achievement.suffix}
                  </h3>
                </div>

                <p className="text-lg sm:text-xl font-semibold text-accent-primary mb-2">
                  {achievement.label}
                </p>

                <p className="text-gray-muted text-sm sm:text-base">
                  {achievement.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Progress Bars */}
        <div className="mt-12 sm:mt-16 space-y-6">
          <div className="text-center mb-6 sm:mb-8">
            <h3 className="text-xl sm:text-2xl font-semibold text-white-text mb-2">
              Member Satisfaction
            </h3>
            <p className="text-gray-muted text-sm sm:text-base">
              Based on monthly surveys and feedback
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              { label: "Training Quality", percentage: 98 },
              { label: "Equipment Satisfaction", percentage: 95 },
              { label: "Overall Experience", percentage: 97 },
            ].map((metric, index) => (
              <div key={index} className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-white-text font-medium text-sm sm:text-base">
                    {metric.label}
                  </span>
                  <span className="text-accent-primary font-bold text-sm sm:text-base">
                    {metric.percentage}%
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2.5 sm:h-3">
                  <div
                    className="bg-gradient-golden h-2.5 sm:h-3 rounded-full transition-all duration-[2000ms] ease-out"
                    style={{
                      width: hasAnimated ? `${metric.percentage}%` : "0%",
                      transitionDelay: `${index * 200}ms`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;
