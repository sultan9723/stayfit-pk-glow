import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import stayfitData from "../../data/stayfit_content.json";

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = stayfitData.blog_posts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-navy-primary pt-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h1 className="text-3xl font-bold text-white-text mb-4">Article Not Found</h1>
          <p className="text-warm-beige mb-6">The article you are looking for does not exist.</p>
          <Link to="/blog" className="text-accent-primary underline">Back to Blog</Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{post.title} - StayFit Blog</title>
        <meta name="description" content={post.excerpt} />
      </Helmet>
      <div className="min-h-screen bg-navy-primary pt-20">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-6">
            <p className="text-xs text-gray-muted">{post.category} • {post.readTime} • {post.date}</p>
            <h1 className="text-3xl sm:text-4xl font-bold text-white-text mt-2">{post.title}</h1>
          </div>
          <div className="w-full h-64 sm:h-80 rounded-xl overflow-hidden mb-6">
            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
          </div>
          <p className="text-warm-beige leading-relaxed">
            {post.excerpt}
          </p>
          <div className="mt-8">
            <Link to="/blog" className="text-accent-primary underline">← Back to Blog</Link>
          </div>
        </article>
      </div>
    </>
  );
};

export default BlogPostPage;
