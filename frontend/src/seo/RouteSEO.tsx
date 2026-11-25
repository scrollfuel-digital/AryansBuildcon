import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { getSEO, SITE_NAME, SITE_URL } from "./seoConfig";

export default function RouteSEO() {
  const location = useLocation();

  // Get SEO data for current route
  const seo = getSEO(location.pathname);

  // Resolve absolute image URL
  const image = seo.image.startsWith("http")
    ? seo.image
    : `${SITE_URL}${seo.image.startsWith("/") ? "" : "/"}${seo.image}`;

  // Robots configuration
  const robots = seo.noIndex
    ? "noindex, nofollow"
    : "index, follow, max-image-preview:large";

  return (
    <Helmet>
      {/* Primary SEO */}
      <title>{seo.title}</title>

      <meta name="description" content={seo.description} />
      <meta name="keywords" content={seo.keywords} />
      <meta name="robots" content={robots} />
      <meta name="author" content={SITE_NAME} />

      {/* Facebook Domain Verification */}
      {seo.facebookVerification && (
        <meta
          name="facebook-domain-verification"
          content={seo.facebookVerification}
        />
      )}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_IN" />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:url" content={seo.canonical} />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content={seo.title} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* Twitter / X SEO */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={image} />

      {/* Canonical URL */}
      <link rel="canonical" href={seo.canonical} />
    </Helmet>
  );
}
