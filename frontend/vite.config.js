import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: process.env.PROXY_TARGET,
        changeOrigin: true,
        secure: false,
      },
    },
  },
  commonjsOptions: {
    esmExternals: true,
  },
});
