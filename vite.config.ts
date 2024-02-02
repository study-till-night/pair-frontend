import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import { VantResolver } from "@vant/auto-import-resolver";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [VantResolver()],
    }),
  ],
  resolve: {
    //设置路径别名
    alias: {
      "@": resolve(__dirname, "./src"),
      "@p": resolve(__dirname, "./src/page"),
      "@c": resolve(__dirname, "./src/components"),
      "*": resolve(""),
    },
  },
  base: "./",
});
