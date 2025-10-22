import { Helmet } from "react-helmet-async";
import stayfitData from "../../data/stayfit_content.json";
import { Link } from "react-router-dom";
import { Instagram, Facebook, Youtube } from "lucide-react";

const BlogPage = () => {
  return (
    <>
      <Helmet>
        <title>Fitness Blog - StayFit | Health & Wellness Tips</title>
        <meta name="description" content="Read our latest fitness articles, workout tips, nutrition advice, and wellness guides from StayFit experts." />
      </Helmet>
      
      <div className="min-h-screen bg-navy-primary pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-center mb-8 text-gradient-accent">Fitness Blog</h1>
          <p className="text-center text-gray-muted mb-12 max-w-2xl mx-auto">
            Stay updated with the latest fitness tips, nutrition advice, and wellness guides.
          </p>

          {/* Community Reels */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-semibold text-white-text mb-6 text-center">Community Reels</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {[
                "https://www.youtube.com/shorts/jrtsCy6b4xU",
                "https://www.youtube.com/shorts/RpnmJ13tk-Y",
                "https://www.youtube.com/shorts/8YgTLExnIns",
              ].map((url, idx) => (
                <div key={idx} className="relative w-full aspect-video rounded-xl overflow-hidden shadow">
                  <iframe
                    src={url.replace("watch?v=", "embed/").replace("shorts/", "embed/")}
                    className="w-full h-full"
                    frameBorder={0}
                    allow="autoplay; encrypted-media; picture-in-picture"
                    allowFullScreen
                    title={`StayFit Reel ${idx + 1}`}
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Latest News */}
          <section className="mt-12">
            <h2 className="text-2xl sm:text-3xl font-semibold text-white-text mb-6 text-center">Latest News</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {stayfitData.blog_posts.slice(0, 3).map((post, i) => (
                <Link key={post.slug} to={`/blog/${post.slug}`} className="card-elegant group block overflow-hidden">
                  <div className="h-48 w-full overflow-hidden">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-gray-muted mb-1">{post.category} • {post.readTime}</p>
                    <h3 className="text-white-text text-lg font-semibold mb-1 group-hover:text-accent-primary">{post.title}</h3>
                    <p className="text-warm-beige text-sm line-clamp-2">{post.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Fitness Articles */}
          <section className="mt-12">
            <h2 className="text-2xl sm:text-3xl font-semibold text-white-text mb-6 text-center">Fitness Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="card-elegant p-6">
                <h3 className="text-xl font-semibold text-white mb-2">Top 5 Benefits of Morning Workouts</h3>
                <p className="text-warm-beige mb-4">Discover how training earlier can boost energy, improve consistency, and accelerate your progress.</p>
                <ul className="list-disc list-inside text-warm-beige space-y-1 text-sm">
                  <li>Improved focus and energy throughout the day</li>
                  <li>Better workout consistency</li>
                  <li>Faster metabolism and calorie burn</li>
                  <li>Lower gym crowd and wait times</li>
                  <li>Better sleep quality and routine</li>
                </ul>
              </div>
              <div className="card-elegant p-6">
                <h3 className="text-xl font-semibold text-white mb-2">How to Balance Cardio and Strength</h3>
                <p className="text-warm-beige mb-4">A quick guide to mixing endurance and muscle-building for optimal results.</p>
                <ul className="list-disc list-inside text-warm-beige space-y-1 text-sm">
                  <li>Alternate training days or split sessions wisely</li>
                  <li>Prioritize compound lifts on strength days</li>
                  <li>Use intervals to keep cardio efficient</li>
                  <li>Fuel adequately with protein and carbs</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Follow Us */}
          <section className="mt-12">
            <h2 className="text-2xl sm:text-3xl font-semibold text-white-text mb-4 text-center">Follow Us</h2>
            <div className="flex items-center justify-center gap-6">
              <a href="https://instagram.com/stayfitpk" target="_blank" rel="noopener noreferrer" aria-label="Follow on Instagram" className="text-white hover:text-accent-primary"><Instagram className="w-6 h-6" /></a>
              <a href="https://facebook.com/stayfitpk" target="_blank" rel="noopener noreferrer" aria-label="Follow on Facebook" className="text-white hover:text-accent-primary"><Facebook className="w-6 h-6" /></a>
              <a href="https://youtube.com/@stayfitpk" target="_blank" rel="noopener noreferrer" aria-label="Subscribe on YouTube" className="text-white hover:text-accent-primary"><Youtube className="w-6 h-6" /></a>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default BlogPage;