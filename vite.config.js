import { defineConfig, normalizePath, build } from "vite";
import fs from "fs";
import path, { resolve } from "path";
import { fileURLToPath } from "url";
import nunjucks from "vite-plugin-nunjucks";
import { viteStaticCopy } from "vite-plugin-static-copy";
import commonjs from "@rollup/plugin-commonjs";
import vue from "@vitejs/plugin-vue";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const root = resolve(__dirname, "src");

const modulesToCopy = {
  "rater-js": false,
  "bootstrap-icons": false,
  apexcharts: true,
  "@daracl/datatimepicker": true,
  "@daracl/toast": true,
  "dara-form": true,
  dragula: true,
  "choices.js": false,
  summernote: true,
  quill: true,
  tinymce: false,
  jsvectormap: true,
};

const copyModules = Object.keys(modulesToCopy).map((moduleName) => {
  const withDist = modulesToCopy[moduleName];
  return {
    src: normalizePath(resolve(__dirname, `./node_modules/${moduleName}${withDist ? "/dist" : ""}`)),
    dest: "assets/extensions",
    rename: moduleName,
  };
});

export default defineConfig((env) => ({
  base: "",
  transpileDependencies: true,
  plugins: [
    vue(),
    commonjs(),
    viteStaticCopy({
      targets: [
        {
          src: normalizePath(resolve(__dirname, "./src/assets/static")),
          dest: "assets",
        },
        {
          src: normalizePath(resolve(__dirname, "./dist/assets/compiled/fonts")),
          dest: "assets/compiled/css",
        },
        {
          src: normalizePath(resolve(__dirname, "./node_modules/bootstrap-icons/bootstrap-icons.svg")),
          dest: "assets/static/images",
        },
        ...copyModules,
      ],
      watch: {
        reloadPageOnChange: true,
      },
    }),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      "@style": resolve(__dirname, "style"),
      "~bootstrap": resolve(__dirname, "node_modules/bootstrap"),
      "~bootstrap-icons": resolve(__dirname, "node_modules/bootstrap-icons"),
      "~@fontsource": resolve(__dirname, "node_modules/@fontsource"),
    },
  },
}));
