import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

const jsonRes = (res) => {
  const r = {
    setHeader: (k, v) => res.setHeader(k, v),
    status: (code) => {
      res.statusCode = code;
      return r;
    },
    json: (obj) => {
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(obj));
    },
    end: () => res.end(),
  };
  return r;
};

function localApi() {
  return {
    name: "local-api",
    configureServer(server) {
      const env = loadEnv(server.config.mode, process.cwd(), "");
      if (!env.KV_REST_API_URL) return;
      process.env.KV_REST_API_URL = env.KV_REST_API_URL;
      process.env.KV_REST_API_TOKEN = env.KV_REST_API_TOKEN;
      server.middlewares.use("/api/dino-score", (req, res) => {
        let body = "";
        req.on("data", (c) => (body += c));
        req.on("end", () => {
          try {
            req.body = body ? JSON.parse(body) : {};
          } catch {
            req.body = {};
          }
          import("./api/dino-score.js").then(({ default: handler }) =>
            handler(req, jsonRes(res))
          );
        });
      });
    },
  };
}

export default defineConfig({
  plugins: [tailwindcss(), react(), localApi()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    // ponytail: omit .json so /components route doesn't resolve to components.json
    extensions: [".mjs", ".js", ".mts", ".ts", ".jsx", ".tsx"],
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