import { Helmet } from "react-helmet-async";

const PricingPage = () => {
  return (
    <>
      <Helmet>
        <title>Membership Pricing - StayFit | Affordable Fitness Plans</title>
        <meta name="description" content="Choose from our flexible and affordable membership plans at StayFit. Find the perfect fitness package for your budget and goals." />
      </Helmet>
      
      <div className="min-h-screen bg-navy-primary pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-center mb-8 text-gradient-golden">
            Membership Plans
          </h1>
          <p className="text-center text-gray-muted mb-12 max-w-2xl mx-auto">
            Choose the perfect membership plan that fits your lifestyle and budget.
          </p>
          {/* Content will be expanded in future iterations */}
          <div className="text-center">
            <p className="text-white-text">Pricing content coming soon...</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PricingPage;