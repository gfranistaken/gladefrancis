import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://gladefrancis.com",
  output: "static",
  trailingSlash: "never",
  build: { format: "file" },
  integrations: [sitemap()],
  redirects: {
    "/projects/normforms": "/projects",
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
