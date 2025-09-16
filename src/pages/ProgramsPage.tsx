import { Helmet } from "react-helmet-async";

const ProgramsPage = () => {
  return (
    <>
      <Helmet>
        <title>Fitness Programs - StayFit.pk | Strength, Cardio, MMA & Nutrition</title>
        <meta name="description" content="Explore our comprehensive fitness programs including strength training, cardio workouts, MMA, and nutrition coaching at StayFit.pk." />
      </Helmet>
      
      <div className="min-h-screen bg-navy-primary pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-center mb-8 text-gradient-golden">
            Our Programs
          </h1>
          <p className="text-center text-gray-muted mb-12 max-w-2xl mx-auto">
            Choose from our wide range of expertly designed fitness programs to achieve your goals.
          </p>
          {/* Content will be expanded in future iterations */}
          <div className="text-center">
            <p className="text-white-text">Programs content coming soon...</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProgramsPage;