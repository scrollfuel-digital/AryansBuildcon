import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getBlogBySlug, getBlogById, getBlogs } from "../../api/blogApi";
import { BlogData } from "../../types/blog";
import BlogDetails from "../../components/blog/BlogDetails";
import Loader from "../../components/common/Loader";

export const BlogDetailsPage: React.FC = () => {
  const { slug, id } = useParams<{
    slug?: string;
    id?: string;
  }>();

  const identifier = slug || id || "";

  const [blog, setBlog] = useState<BlogData | null>(null);
  const [relatedBlogs, setRelatedBlogs] = useState<BlogData[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!identifier) {
      setNotFound(true);
      setLoading(false);
      return;
    }

    loadBlogDetails(identifier);
  }, [identifier]);

  const loadBlogDetails = async (value: string) => {
    try {
      setLoading(true);
      setNotFound(false);

      let data: BlogData | null = null;

      /*
       * If route contains slug, use slug API.
       */
      if (slug) {
        try {
          data = await getBlogBySlug(slug);
        } catch (error) {
          console.error("Failed to fetch blog by slug:", error);
          data = null;
        }
      }

      /*
       * If route contains ID and slug API was not used,
       * use ID API.
       */
      if (!data && id) {
        try {
          data = await getBlogById(id);
        } catch (error) {
          console.error("Failed to fetch blog by ID:", error);
          data = null;
        }
      }

      /*
       * Blog does not exist.
       */
      if (!data) {
        setBlog(null);
        setRelatedBlogs([]);
        setNotFound(true);
        return;
      }

      console.log("Blog details API data:", data);

      /*
       * Don't show unpublished blogs on user side.
       */
      if (data.isPublished === false) {
        setBlog(null);
        setRelatedBlogs([]);
        setNotFound(true);
        return;
      }

      setBlog(data);

      /*
       * Load related blogs.
       */
      await fetchRelatedBlogs(data);
    } catch (error) {
      console.error("Failed to load blog details:", error);

      setBlog(null);
      setRelatedBlogs([]);
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedBlogs = async (currentBlog: BlogData) => {
    try {
      const allBlogs = await getBlogs();

      const currentId = currentBlog._id || currentBlog.id;

      const currentSlug = currentBlog.slug;

      const related = allBlogs
        .filter((blog) => {
          /*
           * Don't show current blog.
           */
          if (currentId && (blog._id === currentId || blog.id === currentId)) {
            return false;
          }

          if (currentSlug && blog.slug === currentSlug) {
            return false;
          }

          /*
           * Only published blogs.
           */
          if (blog.isPublished === false) {
            return false;
          }

          return true;
        })
        .slice(0, 2);

      setRelatedBlogs(related);
    } catch (error) {
      console.error("Failed to load related blogs:", error);

      setRelatedBlogs([]);
    }
  };

  /*
   * ================= LOADING =================
   */
  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <Loader message="Loading blog article..." />
      </div>
    );
  }

  /*
   * ================= NOT FOUND =================
   */
  if (notFound || !blog) {
    return (
      <div className="min-h-screen bg-cream flex flex-col items-center justify-center p-6 text-charcoal space-y-6">
        <span className="font-sans text-[11px] font-medium text-accent-gold uppercase tracking-[0.24em]">
          ✦ Journal Archive
        </span>

        <h2 className="font-serif text-3xl md:text-4xl font-light text-center">
          Blog Article{" "}
          <span className="italic text-accent-gold">Not Found</span>
        </h2>

        <p className="font-sans text-xs text-grey text-center max-w-md">
          The requested article may have been moved, unpublished, or does not
          exist.
        </p>

        <Link
          to="/blog"
          className="bg-charcoal text-white hover:bg-accent-gold font-sans text-xs font-semibold uppercase tracking-[0.16em] py-4 px-8 rounded-full transition-all duration-300"
        >
          Return to Blog Directory
        </Link>
      </div>
    );
  }

  /*
   * ================= BLOG DETAILS =================
   */
  return <BlogDetails blog={blog} relatedBlogs={relatedBlogs} />;
};

export default BlogDetailsPage;
