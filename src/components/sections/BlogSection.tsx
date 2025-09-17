import { Calendar, User, ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const BlogSection = () => {
  const blogPosts = [
    {
      title: "10 Essential Tips for Beginners Starting Their Fitness Journey",
      excerpt: "Starting your fitness journey can be overwhelming. Here are the most important tips to help you build sustainable habits and achieve lasting results.",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop",
      author: "Ahmed Khan",
      date: "2024-01-15",
      readTime: "5 min read",
      category: "Fitness Tips",
      slug: "fitness-tips-for-beginners"
    },
    {
      title: "The Science Behind High-Intensity Interval Training (HIIT)",
      excerpt: "Discover why HIIT workouts are so effective for fat loss and cardiovascular health, backed by scientific research and practical applications.",
      image: "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=600&h=400&fit=crop",
      author: "Sarah Ali",
      date: "2024-01-12",
      readTime: "7 min read",
      category: "Training",
      slug: "science-behind-hiit-training"
    },
    {
      title: "Nutrition Fundamentals: Fueling Your Workouts for Maximum Results",
      excerpt: "Learn how proper nutrition can significantly impact your workout performance and recovery. Essential macronutrients and meal timing explained.",
      image: "https://images.unsplash.com/photo-1547496502-affa22d38842?w=600&h=400&fit=crop",
      author: "Dr. Fatima Sheikh",
      date: "2024-01-10",
      readTime: "6 min read",
      category: "Nutrition",
      slug: "nutrition-fundamentals-workout-fuel"
    }
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <section className="py-20 bg-gradient-to-br from-light-wood to-sandstone">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-gradient-golden">
            Latest from Our Blog
          </h2>
          <p className="text-xl text-deep-brown max-w-3xl mx-auto leading-relaxed">
            Stay updated with the latest fitness tips, nutrition advice, and wellness insights 
            from our expert trainers and health professionals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <Card key={index} className="card-elegant group hover:shadow-golden transition-all duration-500 hover:-translate-y-2">
              <div className="relative overflow-hidden rounded-t-2xl">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-gradient-golden text-navy-primary font-semibold">
                    {post.category}
                  </Badge>
                </div>
              </div>

              <CardHeader className="pb-3">
                <h3 className="text-xl font-semibold text-white-text leading-tight group-hover:text-golden-accent transition-colors duration-300">
                  {post.title}
                </h3>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-deep-brown leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between text-sm text-deep-brown">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div className="flex items-center text-sm text-deep-brown">
                    <Calendar className="w-4 h-4 mr-2" />
                    <time dateTime={post.date}>
                      {formatDate(post.date)}
                    </time>
                  </div>

                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-golden-accent hover:text-yellow-400 hover:bg-golden-accent/10 group-hover:translate-x-1 transition-all duration-300"
                  >
                    Read More
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* SEO-friendly structured data would be added here */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "StayFit.pk Blog",
            "description": "Fitness tips, nutrition advice, and wellness insights",
            "url": "https://stayfit.pk/blog",
            "blogPost": blogPosts.map(post => ({
              "@type": "BlogPosting",
              "headline": post.title,
              "description": post.excerpt,
              "author": {
                "@type": "Person",
                "name": post.author
              },
              "datePublished": post.date,
              "image": post.image,
              "url": `https://stayfit.pk/blog/${post.slug}`
            }))
          })
        }} />

        <div className="text-center mt-12">
          <Button variant="outline" className="btn-hero-primary">
            View All Articles
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;