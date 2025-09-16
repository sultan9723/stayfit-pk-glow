import { Helmet } from "react-helmet-async";

const BlogPage = () => {
  return (
    <>
      <Helmet>
        <title>Fitness Blog - StayFit.pk | Health & Wellness Tips</title>
        <meta name="description" content="Read our latest fitness articles, workout tips, nutrition advice, and wellness guides from StayFit.pk experts." />
      </Helmet>
      
      <div className="min-h-screen bg-navy-primary pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-center mb-8 text-gradient-golden">
            Fitness Blog
          </h1>
          <p className="text-center text-gray-muted mb-12 max-w-2xl mx-auto">
            Stay updated with the latest fitness tips, nutrition advice, and wellness guides.
          </p>
          {/* Content will be expanded in future iterations */}
          <div className="text-center">
            <p className="text-white-text">Blog content coming soon...</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogPage;