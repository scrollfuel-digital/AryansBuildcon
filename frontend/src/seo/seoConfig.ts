export const SITE_URL = "https://aryansbuildcon.com";

export const SITE_NAME = "Aryans Buildcon";

export interface SEOData {
  title: string;
  description: string;
  keywords: string;
  h1: string;
  canonical: string;
  image: string;
  noIndex?: boolean;
  facebookVerification?: string;
}

const DEFAULT_IMAGE = "/og-image.jpg";

export const seoConfig: Record<string, SEOData> = {
  // Home
  "/": {
    title: "Residential Plots in Nagpur | Aryans Buildcon",
    description:
      "Explore residential plots in Nagpur by Aryans Buildcon. Discover planned layouts, project locations and property options for your future home.",
    keywords: "Residential Plots in Nagpur",
    h1: "Residential Plots in Nagpur",
    canonical: `${SITE_URL}/`,
    image: DEFAULT_IMAGE,
  },

  // Projects Listing
  "/projects": {
    title: "Residential Plot Projects in Nagpur | Aryans Buildcon",
    description:
      "Explore residential plot projects in Nagpur by Aryans Buildcon, including Govindraj Nagari, Amrutsiddhi and Oasis-Vatika Shirul. View project details.",
    keywords: "Residential Plot Projects in Nagpur",
    h1: "Residential Plot Projects in Nagpur",
    canonical: `${SITE_URL}/projects`,
    image: DEFAULT_IMAGE,
  },

  // Oasis-Vatika Shirul
  "/projects/oasis-vatika-shirul-residential-plots-nagpur": {
    title: "Oasis-Vatika Shirul – Residential Plots in Nagpur",
    description:
      "Explore Oasis-Vatika Shirul, an NMRDA-sanctioned residential layout in Hingna, Nagpur, featuring 89 plots, dedicated open space and planned infrastructure. Book a site visit today.",
    keywords: "Residential Plots in Hingna Nagpur",
    h1: "Oasis-Vatika Shirul – Residential Plots in Hingna, Nagpur",
    canonical: `${SITE_URL}/projects/oasis-vatika-shirul-residential-plots-nagpur/`,
    image: DEFAULT_IMAGE,
  },

  // Amrutsiddhi
  "/projects/amrutsiddhi-residential-plots-nagpur": {
    title: "Amrutsiddhi – Residential Plots in Nagpur | Aryans Buildcon",
    description:
      "Explore Amrutsiddhi, a 47-acre gated residential plotted community in Deoli (Nistane), Nagpur, featuring 463 plots, planned infrastructure and town planning sanctioned layout.",
    keywords: "Residential Plots in Nagpur",
    h1: "Amrutsiddhi – Residential Plots in Nagpur",
    canonical: `${SITE_URL}/projects/amrutsiddhi-residential-plots-nagpur/`,
    image: DEFAULT_IMAGE,
  },

  // Govindraj Nagari
  "/projects/govindraj-nagari-plots-wardha-road-nagpur": {
    title: "Govindraj Nagari – Plots on Wardha Road, Nagpur",
    description:
      "Explore Govindraj Nagari, premium residential plots on Wardha Road, Nagpur. Located near Tamaswadi, this plotted community offers a great opportunity to build your dream home.",
    keywords: "Plots on Wardha Road Nagpur",
    h1: "Govindraj Nagari – Plots on Wardha Road, Nagpur",
    canonical: `${SITE_URL}/projects/govindraj-nagari-plots-wardha-road-nagpur/`,
    image: DEFAULT_IMAGE,
  },

  // About
  "/about": {
    title: "About Aryans Buildcon | Real Estate Developer in Nagpur",
    description:
      "Learn about Aryans Buildcon, a real estate developer in Nagpur focused on residential plotted developments, planned layouts and customer-oriented property solutions.",
    keywords: "Real Estate Developer in Nagpur",
    h1: "About Aryans Buildcon",
    canonical: `${SITE_URL}/About`,
    image: DEFAULT_IMAGE,
  },

  // Blog
  "/blog": {
    title: "Real Estate Blogs & Property Tips | Aryans Buildcon",
    description:
      "Read real estate blogs by Aryans Buildcon covering property buying tips, residential plots, investment insights and real estate updates in Nagpur.",
    keywords: "Real Estate Blogs",
    h1: "Real Estate Blogs & Property Insights",
    canonical: `${SITE_URL}/blog`,
    image: DEFAULT_IMAGE,
  },

  // Gallery
  "/gallery": {
    title: "Residential Plot Projects Gallery | Aryans Buildcon",
    description:
      "View photos of Aryans Buildcon residential plot projects in Nagpur. Explore project layouts, site images, infrastructure and development highlights.",
    keywords: "Residential Plot Projects Gallery Nagpur",
    h1: "Residential Plot Projects Gallery",
    canonical: `${SITE_URL}/Gallery`,
    image: DEFAULT_IMAGE,
  },

  // Contact
  "/contact": {
    title: "Contact Aryans Buildcon | Residential Plots in Nagpur",
    description:
      "Contact Aryans Buildcon for residential plot enquiries in Nagpur. Get project details, location information and assistance with your property search.",
    keywords: "Contact Aryans Buildcon Nagpur",
    h1: "Contact Aryans Buildcon",
    canonical: `${SITE_URL}/contact`,
    image: DEFAULT_IMAGE,
  },
};

// Aliases for capitalized and trailing-slash routes
seoConfig["/About"] = seoConfig["/about"];
seoConfig["/about/"] = seoConfig["/about"];
seoConfig["/Gallery"] = seoConfig["/gallery"];
seoConfig["/gallery/"] = seoConfig["/gallery"];
seoConfig["/projects/"] = seoConfig["/projects"];
seoConfig["/blog/"] = seoConfig["/blog"];
seoConfig["/contact/"] = seoConfig["/contact"];
seoConfig["/projects/oasis-vatika-shirul-residential-plots-nagpur/"] =
  seoConfig["/projects/oasis-vatika-shirul-residential-plots-nagpur"];
seoConfig["/projects/amrutsiddhi-residential-plots-nagpur/"] =
  seoConfig["/projects/amrutsiddhi-residential-plots-nagpur"];
seoConfig["/projects/govindraj-nagari-plots-wardha-road-nagpur/"] =
  seoConfig["/projects/govindraj-nagari-plots-wardha-road-nagpur"];

export function getSEO(pathname: string): SEOData {
  const trimmed = pathname.replace(/\/+$/, "") || "/";
  const lower = trimmed.toLowerCase();

  return (
    seoConfig[trimmed] ??
    seoConfig[lower] ??
    seoConfig[pathname] ??
    seoConfig[pathname.toLowerCase()] ??
    seoConfig["/"]
  );
}
