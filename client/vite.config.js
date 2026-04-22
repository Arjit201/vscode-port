// client/vite.config.js
// ─────────────────────────────────────────────────────────
// In DEVELOPMENT: the proxy block forwards /api/* requests
// from React (port 5173) to your Node server (port 5000).
// This means you never hardcode localhost:5000 in your code.
//
// In PRODUCTION: the proxy is irrelevant — Vite only runs
// in dev mode. The built React app uses VITE_API_URL (set
// in Vercel's environment variables) to reach your Render
// backend directly.
// ─────────────────────────────────────────────────────────
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: "dist",       // Vercel looks for this folder
    sourcemap: false,     // smaller build output
  },
});
