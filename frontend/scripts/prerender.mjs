import puppeteer from "puppeteer";
import { preview } from "vite";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { seoConfig, SITE_URL, SITE_NAME } from "../src/seo/seoConfig.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, "..", "dist");

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

/* =========================================================
   HTML ESCAPE HELPER
========================================================= */

function escapeHTML(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/* =========================================================
   SEO ROUTE HELPER
========================================================= */

function getSEO(route) {
  const trimmed = route.replace(/\/+$/, "") || "/";
  const lower = trimmed.toLowerCase();
  const withSlash = trimmed === "/" ? "/" : `${trimmed}/`;

  const seo =
    seoConfig[trimmed] ??
    seoConfig[lower] ??
    seoConfig[withSlash] ??
    seoConfig[route] ??
    seoConfig[route.toLowerCase()];

  if (!seo) {
    throw new Error(`SEO configuration not found for route: ${route}`);
  }

  return seo;
}

/* =========================================================
   ASSET TAG EXTRACTION
========================================================= */

function extractAssetTags(html) {
  const matches = [];

  // Match Vite script tags
  const scriptRegex =
    /<script\b[^>]*src=["']\/assets\/[^"']+["'][^>]*><\/script>/gi;

  let match;

  while ((match = scriptRegex.exec(html)) !== null) {
    matches.push(match[0]);
  }

  // Match stylesheet links
  const cssRegex =
    /<link\b[^>]*href=["']\/assets\/[^"']+\.css["'][^>]*>/gi;

  while ((match = cssRegex.exec(html)) !== null) {
    matches.push(match[0]);
  }

  // Match modulepreloads
  const preloadRegex =
    /<link\b[^>]*rel=["']modulepreload["'][^>]*>/gi;

  while ((match = preloadRegex.exec(html)) !== null) {
    matches.push(match[0]);
  }

  return matches.length > 0
    ? matches.map((m) => `    ${m}`).join("\n")
    : '    <script type="module" src="/src/main.tsx"></script>';
}

/* =========================================================
   BUILD CLEAN SEO HTML
========================================================= */

function buildCleanHtml({
  seo,
  rootContent,
  assetTags,
  bodyClass,
  htmlStyle,
}) {
  const robots = seo.noIndex
    ? "noindex, nofollow"
    : "index, follow, max-image-preview:large";

  const image = seo.image?.startsWith("http")
    ? seo.image
    : `${SITE_URL}${seo.image?.startsWith("/") ? "" : "/"}${seo.image || ""
    }`;

  // Support keywords as either a string or an array
  const keywords = Array.isArray(seo.keywords)
    ? seo.keywords.join(", ")
    : seo.keywords || seo.primaryKeyword || "";

  const fbVerification = seo.facebookVerification
    ? `
    <!-- Facebook Domain Verification -->
    <meta
      name="facebook-domain-verification"
      content="${escapeHTML(seo.facebookVerification)}"
    >
`
    : "";

  const styleAttr = htmlStyle
    ? ` style="${escapeHTML(htmlStyle)}"`
    : "";

  const classAttr = bodyClass
    ? ` class="${escapeHTML(bodyClass)}"`
    : "";

  return `<!DOCTYPE html>
<html lang="en"${styleAttr}>
  <head>
    <meta charset="UTF-8">

    <!-- Viewport -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- Favicon -->
    <link rel="icon" type="image/png" href="/favicon.png">

    <!-- Primary SEO -->
    <title>${escapeHTML(seo.title)}</title>

    <!-- Meta Tags -->
    <meta name="description" content="${escapeHTML(seo.description)}">

    <meta name="keywords" content="${escapeHTML(keywords)}">

    <meta name="robots" content="${robots}">

    <meta name="author" content="${escapeHTML(SITE_NAME)}">

    <meta name="theme-color" content="#ffffff">
${fbVerification}
    <!-- Open Graph -->
    <meta property="og:type" content="website">

    <meta property="og:site_name" content="${escapeHTML(SITE_NAME)}">

    <meta property="og:locale" content="en_IN">

    <meta property="og:title" content="${escapeHTML(seo.title)}">

    <meta property="og:description" content="${escapeHTML(seo.description)}">

    <meta property="og:url" content="${escapeHTML(seo.canonical)}">

    <meta property="og:image" content="${escapeHTML(image)}">

    <meta property="og:image:width" content="1200">

    <meta property="og:image:height" content="630">

    <meta property="og:image:alt" content="${escapeHTML(seo.title)}">

    <!-- Twitter SEO -->
    <meta name="twitter:card" content="summary_large_image">

    <meta name="twitter:title" content="${escapeHTML(seo.title)}">

    <meta name="twitter:description" content="${escapeHTML(seo.description)}">

    <meta name="twitter:image" content="${escapeHTML(image)}">

    <!-- Canonical -->
    <link rel="canonical" href="${escapeHTML(seo.canonical)}">

    <!-- Bundled Assets -->
${assetTags}
  </head>

  <body${classAttr}>
    <div id="root">${rootContent}</div>
  </body>
</html>
`;
}

/* =========================================================
   STATIC SEMANTIC FALLBACK
========================================================= */

function getSemanticBodyForRoute(route, seo) {
  if (route === "/") {
    return `
      <main class="flex-grow pt-[86px] md:pt-[100px]">
        <section
          id="hero-section"
          class="relative w-full min-h-screen overflow-hidden bg-cream flex flex-col"
        >
          <div
            class="relative z-20 flex-1 flex items-center justify-center px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20 py-24 lg:py-16 text-center"
          >
            <div class="w-full mx-auto flex flex-col items-center pt-32 lg:pt-40">
              <h1
                class="max-w-[760px] text-balance font-serif uppercase text-[clamp(36px,7vw,68px)] font-bold leading-[1.1] tracking-[-0.015em] text-white"
              >
                <span>Residential Plots</span>
                <span class="text-[#f9dc85]">in Nagpur</span>
              </h1>
            </div>
          </div>
        </section>
      </main>
    `;
  }

  return `
    <main class="flex-grow pt-[86px] md:pt-[100px]">
      <div
        class="relative min-h-screen overflow-x-hidden bg-[#FAF8F4] selection:bg-[#D4AF37]/20 selection:text-[#181512] text-[#181512]"
      >
        <section
          class="relative isolate overflow-hidden !bg-[#181512] !text-white border-b border-white/10"
        >
          <div
            class="relative z-10 max-w-5xl mx-auto px-6 py-14 md:py-20 lg:py-24 flex flex-col items-center text-center"
          >
            <h1
              class="!text-white font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.05] tracking-tight"
            >
              ${escapeHTML(seo.h1)}
            </h1>
          </div>
        </section>
      </div>
    </main>
  `;
}

/* =========================================================
   SLEEP HELPER
========================================================= */

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/* =========================================================
   MAIN PRERENDER PROCESS
========================================================= */

async function prerender() {
  let server = null;
  let browser = null;
  let baseURL = "";

  try {
    console.log("Starting prerender with shared SEO configuration...");

    // 1. Read base index.html from dist to extract asset tags
    const baseIndexPath = path.join(distDir, "index.html");
    const baseIndexHtml = await fs.readFile(baseIndexPath, "utf-8");

    const assetTags = extractAssetTags(baseIndexHtml);

    // 2. Detect CI/Vercel environment
    const isCI = Boolean(
      process.env.VERCEL ||
      process.env.CI ||
      process.env.AWS_LAMBDA_FUNCTION_NAME ||
      process.env.SKIP_BROWSER_PRERENDER
    );

    if (isCI) {
      console.log(
        "CI/Vercel build environment detected. Generating static SEO HTML."
      );
    } else {
      // 3. Launch Puppeteer and Vite preview
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
          "Headless Chrome launch unavailable:",
          launchErr.message
        );

        console.log(
          "Continuing in static SEO generation mode for all routes..."
        );

        if (browser) {
          await browser.close().catch(() => { });
          browser = null;
        }

        if (server) {
          await new Promise((resolve) =>
            server.httpServer.close(resolve)
          ).catch(() => { });

          server = null;
        }
      }
    }

    const renderedPages = [];

    // 4. Prerender each route
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
              .catch(() => { });

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

      // 5. Static semantic fallback if browser unavailable
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

    // 6. Close browser and preview server before writing
    if (browser) {
      await browser.close().catch(() => { });
      browser = null;
    }

    if (server) {
      await new Promise((resolve) =>
        server.httpServer.close(resolve)
      ).catch(() => { });

      server = null;
    }

    // 7. Write generated HTML
    console.log("Writing generated HTML files to dist...");

    for (const { route, cleanHtml } of renderedPages) {
      if (route === "/") {
        await fs.writeFile(
          path.join(distDir, "index.html"),
          cleanHtml,
          "utf-8"
        );

        console.log("Wrote: dist/index.html");
      } else {
        const cleanPath = route
          .replace(/^\/+|\/+$/g, "")
          .toLowerCase();

        const outputDir = path.join(distDir, cleanPath);

        // Directory index file
        await fs.mkdir(outputDir, { recursive: true });

        await fs.writeFile(
          path.join(outputDir, "index.html"),
          cleanHtml,
          "utf-8"
        );

        console.log(`Wrote: dist/${cleanPath}/index.html`);

        // Direct clean URL file
        const directHtmlPath = path.join(
          distDir,
          `${cleanPath}.html`
        );

        await fs.mkdir(path.dirname(directHtmlPath), {
          recursive: true,
        });

        await fs.writeFile(
          directHtmlPath,
          cleanHtml,
          "utf-8"
        );

        console.log(`Wrote: dist/${cleanPath}.html`);

        // Uppercase About alias
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
            "Wrote uppercase alias: dist/About/index.html and dist/About.html"
          );
        }

        // Uppercase Gallery alias
        else if (cleanPath === "gallery") {
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
            "Wrote uppercase alias: dist/Gallery/index.html and dist/Gallery.html"
          );
        }
      }
    }

    console.log("All pages prerendered successfully!");
  } catch (error) {
    console.error("Prerender failed:", error);
    process.exitCode = 1;
  } finally {
    if (browser) {
      await browser.close().catch(() => { });
    }

    if (server) {
      await new Promise((resolve) =>
        server.httpServer.close(resolve)
      ).catch(() => { });
    }
  }
}

prerender();