import puppeteer from "puppeteer";
import { preview } from "vite";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, "..", "dist");

export const SITE_URL = "https://aryansbuildcon.com";
export const SITE_NAME = "Aryans Buildcon";
const DEFAULT_IMAGE = "/og-image.jpg";

export const seoConfig = {
  "/": {
    title: "Residential Plots in Nagpur | Aryans Buildcon",
    description:
      "Explore residential plots in Nagpur by Aryans Buildcon. Discover planned layouts, project locations and property options for your future home.",
    keywords: ["Residential Plots in Nagpur"],
    primaryKeyword: "Residential Plots in Nagpur",
    h1: "Residential Plots in Nagpur",
    canonical: `${SITE_URL}/`,
    image: DEFAULT_IMAGE,
  },
  "/projects": {
    title: "Residential Plot Projects in Nagpur | Aryans Buildcon",
    description:
      "Explore residential plot projects in Nagpur by Aryans Buildcon, including Govindraj Nagari, Amrutsiddhi and Oasis-Vatika Shirul. View project details.",
    keywords: ["Residential Plot Projects in Nagpur"],
    primaryKeyword: "Residential Plot Projects in Nagpur",
    h1: "Residential Plot Projects in Nagpur",
    canonical: `${SITE_URL}/projects`,
    image: DEFAULT_IMAGE,
  },
  "/projects/oasis-vatika-shirul-residential-plots-nagpur": {
    title: "Oasis-Vatika Shirul – Residential Plots in Nagpur",
    description:
      "Explore Oasis-Vatika Shirul, an NMRDA-sanctioned residential layout in Hingna, Nagpur, featuring 89 plots, dedicated open space and planned infrastructure. Book a site visit today.",
    keywords: ["Residential Plots in Hingna Nagpur"],
    primaryKeyword: "Residential Plots in Hingna Nagpur",
    h1: "Oasis-Vatika Shirul – Residential Plots in Hingna, Nagpur",
    canonical: `${SITE_URL}/projects/oasis-vatika-shirul-residential-plots-nagpur/`,
    image: DEFAULT_IMAGE,
  },
  "/projects/amrutsiddhi-residential-plots-nagpur": {
    title: "Amrutsiddhi – Residential Plots in Nagpur | Aryans Buildcon",
    description:
      "Explore Amrutsiddhi, a 47-acre gated residential plotted community in Deoli (Nistane), Nagpur, featuring 463 plots, planned infrastructure and town planning sanctioned layout.",
    keywords: ["Residential Plots in Nagpur", "Plots for Sale in Nagpur"],
    primaryKeyword: "Residential Plots in Nagpur",
    secondaryKeyword: "Plots for Sale in Nagpur",
    h1: "Amrutsiddhi – Residential Plots in Nagpur",
    canonical: `${SITE_URL}/projects/amrutsiddhi-residential-plots-nagpur/`,
    image: DEFAULT_IMAGE,
  },
  "/projects/govindraj-nagari-plots-wardha-road-nagpur": {
    title: "Govindraj Nagari – Plots on Wardha Road, Nagpur",
    description:
      "Explore Govindraj Nagari, premium residential plots on Wardha Road, Nagpur. Located near Tamaswadi, this plotted community offers a great opportunity to build your dream home.",
    keywords: ["Plots on Wardha Road Nagpur"],
    primaryKeyword: "Plots on Wardha Road Nagpur",
    h1: "Govindraj Nagari – Plots on Wardha Road, Nagpur",
    canonical: `${SITE_URL}/projects/govindraj-nagari-plots-wardha-road-nagpur/`,
    image: DEFAULT_IMAGE,
  },
  "/about": {
    title: "About Aryans Buildcon | Real Estate Developer in Nagpur",
    description:
      "Learn about Aryans Buildcon, a real estate developer in Nagpur focused on residential plotted developments, planned layouts and customer-oriented property solutions.",
    keywords: ["Real Estate Developer in Nagpur"],
    primaryKeyword: "Real Estate Developer in Nagpur",
    h1: "About Aryans Buildcon",
    canonical: `${SITE_URL}/About`,
    image: DEFAULT_IMAGE,
  },
  "/blog": {
    title: "Real Estate Blogs & Property Tips | Aryans Buildcon",
    description:
      "Read real estate blogs by Aryans Buildcon covering property buying tips, residential plots, investment insights and real estate updates in Nagpur.",
    keywords: ["Real Estate Blogs"],
    primaryKeyword: "Real Estate Blogs",
    h1: "Real Estate Blogs & Property Insights",
    canonical: `${SITE_URL}/blog`,
    image: DEFAULT_IMAGE,
  },
  "/gallery": {
    title: "Residential Plot Projects Gallery | Aryans Buildcon",
    description:
      "View photos of Aryans Buildcon residential plot projects in Nagpur. Explore project layouts, site images, infrastructure and development highlights.",
    keywords: ["Residential Plot Projects Gallery Nagpur"],
    primaryKeyword: "Residential Plot Projects Gallery Nagpur",
    h1: "Residential Plot Projects Gallery",
    canonical: `${SITE_URL}/Gallery`,
    image: DEFAULT_IMAGE,
  },
  "/contact": {
    title: "Contact Aryans Buildcon | Residential Plots in Nagpur",
    description:
      "Contact Aryans Buildcon for residential plot enquiries in Nagpur. Get project details, location information and assistance with your property search.",
    keywords: ["Contact Aryans Buildcon Nagpur"],
    primaryKeyword: "Contact Aryans Buildcon Nagpur",
    h1: "Contact Aryans Buildcon",
    canonical: `${SITE_URL}/contact`,
    image: DEFAULT_IMAGE,
  },
};

// Aliases
seoConfig["/About"] = seoConfig["/about"];
seoConfig["/Gallery"] = seoConfig["/gallery"];
seoConfig["/projects/oasis-vatika-shirul-residential-plots-nagpur/"] =
  seoConfig["/projects/oasis-vatika-shirul-residential-plots-nagpur"];
seoConfig["/projects/amrutsiddhi-residential-plots-nagpur/"] =
  seoConfig["/projects/amrutsiddhi-residential-plots-nagpur"];
seoConfig["/projects/govindraj-nagari-plots-wardha-road-nagpur/"] =
  seoConfig["/projects/govindraj-nagari-plots-wardha-road-nagpur"];

function getSEO(route) {
  const trimmed = route.replace(/\/+$/, "") || "/";
  const lower = trimmed.toLowerCase();
  return (
    seoConfig[trimmed] ??
    seoConfig[lower] ??
    seoConfig[route] ??
    seoConfig[route.toLowerCase()] ??
    seoConfig["/"]
  );
}

const routes = [
  "/",
  "/about",
  "/projects",
  "/projects/oasis-vatika-shirul-residential-plots-nagpur/",
  "/projects/amrutsiddhi-residential-plots-nagpur/",
  "/projects/govindraj-nagari-plots-wardha-road-nagpur/",
  "/blog",
  "/gallery",
  "/contact",
];

function extractAssetTags(html) {
  const matches = [];

  // Match Vite script tags
  const scriptRegex = /<script\b[^>]*src=["']\/assets\/[^"']+["'][^>]*><\/script>/gi;
  let match;
  while ((match = scriptRegex.exec(html)) !== null) {
    matches.push(match[0]);
  }

  // Match stylesheet links
  const cssRegex = /<link\b[^>]*href=["']\/assets\/[^"']+\.css["'][^>]*>/gi;
  while ((match = cssRegex.exec(html)) !== null) {
    matches.push(match[0]);
  }

  // Match modulepreloads
  const preloadRegex = /<link\b[^>]*rel=["']modulepreload["'][^>]*>/gi;
  while ((match = preloadRegex.exec(html)) !== null) {
    matches.push(match[0]);
  }

  return matches.length > 0
    ? matches.map((m) => `    ${m}`).join("\n")
    : '    <script type="module" src="/src/main.tsx"></script>';
}

function buildCleanHtml({ seo, rootContent, assetTags, bodyClass, htmlStyle }) {
  const robots = seo.noIndex
    ? "noindex, nofollow"
    : "index, follow, max-image-preview:large";

  const image = seo.image.startsWith("http")
    ? seo.image
    : `${SITE_URL}${seo.image.startsWith("/") ? "" : "/"}${seo.image}`;

  const fbVerification = seo.facebookVerification
    ? `\n    <!-- Facebook Domain Verification -->\n    <meta name="facebook-domain-verification" content="${seo.facebookVerification}">\n`
    : "";

  const styleAttr = htmlStyle ? ` style="${htmlStyle}"` : "";
  const classAttr = bodyClass ? ` class="${bodyClass}"` : "";

  return `<!DOCTYPE html>
<html lang="en"${styleAttr}>
  <head>
    <meta charset="UTF-8">

    <!-- Viewport -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- Favicon -->
    <link rel="icon" type="image/png" href="/favicon.png">

    <!-- Primary SEO -->
    <title>${seo.title}</title>

    <!-- Meta Tags -->
    <meta name="description" content="${seo.description}">

    <meta name="keywords" content="${
      seo.keywords && seo.keywords.length > 0
        ? seo.keywords.join(", ")
        : seo.primaryKeyword
    }">

    <meta name="robots" content="${robots}">

    <meta name="author" content="${SITE_NAME}">

    <meta name="theme-color" content="#ffffff">
${fbVerification}
    <!-- Open Graph -->
    <meta property="og:type" content="website">

    <meta property="og:site_name" content="${SITE_NAME}">

    <meta property="og:locale" content="en_IN">

    <meta property="og:title" content="${seo.title}">

    <meta property="og:description" content="${seo.description}">

    <meta property="og:url" content="${seo.canonical}">

    <meta property="og:image" content="${image}">

    <meta property="og:image:width" content="1200">

    <meta property="og:image:height" content="630">

    <meta property="og:image:alt" content="${seo.title}">

    <!-- Twitter SEO -->
    <meta name="twitter:card" content="summary_large_image">

    <meta name="twitter:title" content="${seo.title}">

    <meta name="twitter:description" content="${seo.description}">

    <meta name="twitter:image" content="${image}">

    <!-- Canonical -->
    <link rel="canonical" href="${seo.canonical}">

    <!-- Bundled Assets -->
${assetTags}
  </head>
  <body${classAttr}>
    <div id="root">${rootContent}</div>
  </body>
</html>
`;
}

function getSemanticBodyForRoute(route, seo) {
  if (route === "/") {
    return `<main class="flex-grow pt-[86px] md:pt-[100px]"><section id="hero-section" class="relative w-full min-h-screen overflow-hidden bg-cream flex flex-col"><div class="relative z-20 flex-1 flex items-center justify-center px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20 py-24 lg:py-16 text-center"><div class="w-full mx-auto flex flex-col items-center pt-32 lg:pt-40"><h1 class="max-w-[760px] text-balance font-serif uppercase text-[clamp(36px,7vw,68px)] font-bold leading-[1.1] tracking-[-0.015em] text-white"><span>Residential Plots</span> <span class="text-[#f9dc85]">in Nagpur</span></h1></div></div></section></main>`;
  }

  return `<main class="flex-grow pt-[86px] md:pt-[100px]"><div class="relative min-h-screen overflow-x-hidden bg-[#FAF8F4] selection:bg-[#D4AF37]/20 selection:text-[#181512] text-[#181512]"><section class="relative isolate overflow-hidden !bg-[#181512] !text-white border-b border-white/10"><div class="relative z-10 max-w-5xl mx-auto px-6 py-14 md:py-20 lg:py-24 flex flex-col items-center text-center"><h1 class="!text-white font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.05] tracking-tight">${seo.h1}</h1></div></section></div></main>`;
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function prerender() {
  let server = null;
  let browser = null;
  let baseURL = "";

  try {
    console.log("Starting prerender with pristine SEO format...");

    // 1. Read base index.html from dist to extract asset tags
    const baseIndexPath = path.join(distDir, "index.html");
    const baseIndexHtml = await fs.readFile(baseIndexPath, "utf-8");
    const assetTags = extractAssetTags(baseIndexHtml);

    const isCI = Boolean(
      process.env.VERCEL ||
      process.env.CI ||
      process.env.AWS_LAMBDA_FUNCTION_NAME ||
      process.env.SKIP_BROWSER_PRERENDER
    );

    if (isCI) {
      console.log(
        "ℹ️ CI/Vercel build environment detected. Generating static SEO prerender..."
      );
    } else {
      // 2. Try to launch Puppeteer and start Vite preview server
      try {
        browser = await puppeteer.launch({
          headless: true,
          args: [
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--disable-dev-shm-usage",
            "--disable-gpu",
          ],
        });

        server = await preview({
          preview: {
            host: "127.0.0.1",
            port: 0,
            strictPort: true,
          },
        });

        const address = server.httpServer.address();
        if (!address || typeof address === "string") {
          throw new Error("Unable to determine preview server address.");
        }

        baseURL = `http://127.0.0.1:${address.port}`;
        console.log(`Preview server running at: ${baseURL}`);
      } catch (launchErr) {
        console.warn(
          "⚠️ Headless Chrome launch unavailable:",
          launchErr.message
        );
        console.log(
          "ℹ️ Continuing in static SEO pre-generation mode for all routes..."
        );
        if (browser) {
          await browser.close().catch(() => {});
          browser = null;
        }
        if (server) {
          await new Promise((resolve) => server.httpServer.close(resolve)).catch(
            () => {}
          );
          server = null;
        }
      }
    }

    const renderedPages = [];

    // 3. Pre-render each route
    for (const route of routes) {
      const seo = getSEO(route);
      let rootContent = "";
      let htmlStyle = "";
      let bodyClass = "";

      if (browser && baseURL) {
        try {
          console.log(`Prerendering route via browser: ${route}`);
          const page = await browser.newPage();

          page.on("pageerror", (error) => {
            console.error(`Page error [${route}]:`, error.message);
          });

          const response = await page.goto(`${baseURL}${route}`, {
            waitUntil: "networkidle2",
            timeout: 60000,
          });

          if (response && response.ok()) {
            await page
              .waitForSelector("#root > *", { timeout: 20000 })
              .catch(() => {});
            await sleep(1500);

            rootContent = await page
              .$eval("#root", (el) => el.innerHTML)
              .catch(() => "");
            htmlStyle = await page
              .$eval("html", (el) => el.getAttribute("style") || "")
              .catch(() => "");
            bodyClass = await page
              .$eval("body", (el) => el.getAttribute("class") || "")
              .catch(() => "");
          }

          await page.close();
        } catch (pageErr) {
          console.warn(
            `Browser capture failed for ${route}, using static fallback:`,
            pageErr.message
          );
        }
      }

      // If browser wasn't available or capture was empty, generate clean semantic shell with page-wise h1
      if (!rootContent) {
        rootContent = getSemanticBodyForRoute(route, seo);
      }

      const cleanHtml = buildCleanHtml({
        seo,
        rootContent,
        assetTags,
        bodyClass,
        htmlStyle,
      });

      renderedPages.push({
        route,
        cleanHtml,
      });

      console.log(`Prepared: ${route} (${seo.title})`);
    }

    // 4. Close browser and server before writing files
    if (browser) {
      await browser.close().catch(() => {});
      browser = null;
    }

    if (server) {
      await new Promise((resolve) => server.httpServer.close(resolve)).catch(
        () => {}
      );
      server = null;
    }

    // 5. Write clean HTML files to disk
    console.log("Writing formatted HTML files to dist...");

    for (const { route, cleanHtml } of renderedPages) {
      if (route === "/") {
        await fs.writeFile(path.join(distDir, "index.html"), cleanHtml, "utf-8");
        console.log("Wrote: dist/index.html");
      } else {
        const cleanPath = route.replace(/^\/+|\/+$/g, "").toLowerCase();
        const outputDir = path.join(distDir, cleanPath);

        // 1. Write directory index.html (e.g. dist/projects/index.html)
        await fs.mkdir(outputDir, { recursive: true });
        await fs.writeFile(
          path.join(outputDir, "index.html"),
          cleanHtml,
          "utf-8"
        );
        console.log(`Wrote: dist/${cleanPath}/index.html`);

        // 2. Write direct clean-url file (e.g. dist/projects.html)
        const directHtmlPath = path.join(distDir, `${cleanPath}.html`);
        await fs.mkdir(path.dirname(directHtmlPath), { recursive: true });
        await fs.writeFile(directHtmlPath, cleanHtml, "utf-8");
        console.log(`Wrote: dist/${cleanPath}.html`);

        // Create uppercase aliases for About and Gallery so legacy URLs also work seamlessly
        if (cleanPath === "about") {
          const upperDir = path.join(distDir, "About");
          await fs.mkdir(upperDir, { recursive: true });
          await fs.writeFile(
            path.join(upperDir, "index.html"),
            cleanHtml,
            "utf-8"
          );
          await fs.writeFile(
            path.join(distDir, "About.html"),
            cleanHtml,
            "utf-8"
          );
          console.log(
            "Wrote uppercase alias: dist/About/index.html & dist/About.html"
          );
        } else if (cleanPath === "gallery") {
          const upperDir = path.join(distDir, "Gallery");
          await fs.mkdir(upperDir, { recursive: true });
          await fs.writeFile(
            path.join(upperDir, "index.html"),
            cleanHtml,
            "utf-8"
          );
          await fs.writeFile(
            path.join(distDir, "Gallery.html"),
            cleanHtml,
            "utf-8"
          );
          console.log(
            "Wrote uppercase alias: dist/Gallery/index.html & dist/Gallery.html"
          );
        }
      }
    }

    console.log("All pages prerendered successfully with pristine SEO format!");
  } catch (error) {
    console.error("Prerender failed:", error);
    process.exitCode = 1;
  } finally {
    if (browser) {
      await browser.close().catch(() => {});
    }
    if (server) {
      await new Promise((resolve) => server.httpServer.close(resolve)).catch(
        () => {}
      );
    }
  }
}

prerender();
