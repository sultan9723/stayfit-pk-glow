import { Calendar, User, ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/Button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import stayfitData from "../../../data/stayfit_content.json";

const BlogSection = () => {
  const { blog_posts } = stayfitData;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <section className="py-20 bg-navy-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-gradient-accent">
            Latest News
          </h2>
          <p className="text-xl text-gray-muted max-w-3xl mx-auto leading-relaxed">
            Stay updated with the latest news, highlights from StayFit, and inspiring success stories 
            from our fitness community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blog_posts.map((post, index) => (
            <Card key={index} className="card-elegant group hover:shadow-accent transition-all duration-500 hover:-translate-y-2">
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
                <h3 className="text-xl font-semibold text-white-text leading-tight group-hover:text-accent-primary transition-colors duration-300">
                  {post.title}
                </h3>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-gray-muted leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-muted">
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
                  <div className="flex items-center text-sm text-gray-muted">
                    <time dateTime={post.date}>
                      {formatDate(post.date)}
                    </time>
                  </div>

                  <Button 
                    variant="heroSecondary" 
                    size="sm"
                    className="btn-premium group-hover:translate-x-1 transition-all duration-300"
                  >
                    Read More
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            variant="heroPrimary" 
            size="md"
            className="btn-premium w-full md:w-auto px-8 py-3 shadow-accent hover:shadow-lg transition-all duration-300"
          >
            View All News
          </Button>
        </div>
      </div>

      {/* SEO-friendly structured data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Blog",
          "name": "StayFit.pk Blog",
          "description": "Fitness tips, nutrition advice, and wellness insights",
          "url": "https://stayfit.pk/blog",
          "blogPost": blog_posts.map(post => ({
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
    </section>
  );
};

export default BlogSection;