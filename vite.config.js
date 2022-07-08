import { defineConfig } from "vite";
import { join } from "path";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import ViteJsx from "@vitejs/plugin-vue-jsx";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    ViteJsx(),
  ],
  resolve: {
    alias: {
      "@": join(__dirname, "src"),
    },
  },
  server: {
    proxy: {
      "/response.json": {
        target: "http://26.169.227.41:8000",
        changeOrigin: true,
      },
    },
  },
});
