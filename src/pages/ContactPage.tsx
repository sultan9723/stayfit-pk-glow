import { Helmet } from "react-helmet-async";

const ContactPage = () => {
  return (
    <>
      <Helmet>
        <title>Contact Us - StayFit | Get in Touch</title>
        <meta name="description" content="Contact StayFit for inquiries about membership, training programs, or any questions. Visit our gym or reach out online." />
      </Helmet>
      
      <div className="min-h-screen bg-navy-primary pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-center mb-8 text-gradient-golden">
            Contact Us
          </h1>
          <p className="text-center text-gray-muted mb-12 max-w-2xl mx-auto">
            Get in touch with us for any questions about our programs or membership.
          </p>
          {/* Content will be expanded in future iterations */}
          <div className="text-center">
            <p className="text-white-text">Contact content coming soon...</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;