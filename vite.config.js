import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [tailwindcss(), react()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  server: {
    proxy: {
      "/leetcode": {
        target: "https://leetcode.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/leetcode/, ""),
        configure: (proxy) => {
          proxy.on("proxyReq", (proxyReq) => {
            proxyReq.setHeader(
              "Referer",
              "https://leetcode.com/Darshan_as/"
            );
            proxyReq.setHeader(
              "Origin",
              "https://leetcode.com"
            );
            proxyReq.setHeader(
              "User-Agent",
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36"
            );
          });
        },
      },
    },
  },
});