import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.apk'],
  server: {
    port: 3000,
  },
  build: {
    rollupOptions: {
      external: ['source-map-js'],
    },
  },
});
