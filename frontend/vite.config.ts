import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import fs from "fs";
import { defineConfig, type Plugin } from "vite";

function prerenderPreviewPlugin(): Plugin {
  return {
    name: "serve-prerendered-html",
    configurePreviewServer(server) {
      server.middlewares.use((req, res, next) => {
        if (!req.url) return next();
        const urlPath = req.url.split("?")[0];

        // Pass through assets, files with extensions, root
        if (
          urlPath === "/" ||
          urlPath.startsWith("/assets/") ||
          urlPath.includes(".")
        ) {
          return next();
        }

        const clean = urlPath.replace(/^\/+|\/+$/g, "").toLowerCase();

        // Check if dist/${clean}.html or dist/${clean}/index.html exists
        const htmlFile = path.resolve(__dirname, "dist", `${clean}.html`);
        const indexFile = path.resolve(__dirname, "dist", clean, "index.html");

        if (fs.existsSync(htmlFile)) {
          res.setHeader("Content-Type", "text/html; charset=utf-8");
          return res.end(fs.readFileSync(htmlFile, "utf-8"));
        }

        if (fs.existsSync(indexFile)) {
          res.setHeader("Content-Type", "text/html; charset=utf-8");
          return res.end(fs.readFileSync(indexFile, "utf-8"));
        }

        next();
      });
    },
  };
}

export default defineConfig(() => {
  return {
    root: path.resolve(__dirname),
    define: {
      global: "window",
    },
    plugins: [react(), tailwindcss(), prerenderPreviewPlugin()],
    assetsInclude: ["**/*.pdf"],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      host: "0.0.0.0",
      port: 3000,
      allowedHosts: true,
      hmr: process.env.DISABLE_HMR !== "true",
      watch: process.env.DISABLE_HMR === "true" ? null : {},
      proxy: {
        "/api": {
          target:
            process.env.USE_LOCAL_API === "true"
              ? "http://127.0.0.1:5000"
              : "https://api.aryansbuildcon.com",
          changeOrigin: true,
          secure: false,
        },
        "/uploads": {
          target:
            process.env.USE_LOCAL_API === "true"
              ? "http://127.0.0.1:5000"
              : "https://api.aryansbuildcon.com",
          changeOrigin: true,
          secure: false,
        },
      },
    },
    preview: {
      host: "0.0.0.0",
      port: 4173,
      proxy: {
        "/api": {
          target:
            process.env.USE_LOCAL_API === "true"
              ? "http://127.0.0.1:5000"
              : "https://api.aryansbuildcon.com",
          changeOrigin: true,
          secure: false,
        },
        "/uploads": {
          target:
            process.env.USE_LOCAL_API === "true"
              ? "http://127.0.0.1:5000"
              : "https://api.aryansbuildcon.com",
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
});
