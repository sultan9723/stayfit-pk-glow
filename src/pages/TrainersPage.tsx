import { Helmet } from "react-helmet-async";

const TrainersPage = () => {
  return (
    <>
      <Helmet>
        <title>Expert Trainers - StayFit | Certified Fitness Professionals</title>
        <meta name="description" content="Meet our team of certified and experienced fitness trainers at StayFit, ready to help you achieve your fitness goals." />
      </Helmet>
      
      <div className="min-h-screen bg-navy-primary pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-center mb-8 text-gradient-golden">
            Our Expert Trainers
          </h1>
          <p className="text-center text-gray-muted mb-12 max-w-2xl mx-auto">
            Meet our certified fitness professionals dedicated to your success.
          </p>
          {/* Content will be expanded in future iterations */}
          <div className="text-center">
            <p className="text-white-text">Trainers content coming soon...</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default TrainersPage;