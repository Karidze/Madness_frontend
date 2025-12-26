// vite.config.js

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: process.env.PORT || 5173,
    host: "0.0.0.0",
    allowedHosts: [
      "madnessfrontend-production.up.railway.app",
      "subprofitable-distractingly-allen.ngrok-free.dev"
    ]
  },
  preview: {
    port: process.env.PORT || 8080,
    host: "0.0.0.0"
  }
});
