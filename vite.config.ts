import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [solid(), tailwindcss()],
  base: "./", // Use relative paths for GitHub Pages
  build: {
    outDir: "docs",
    emptyOutDir: true, // Clean the docs folder on build
  },
});
