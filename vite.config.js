import { defineConfig, normalizePath, build } from "vite";
import fs from "fs";
import path, { resolve } from "path";
import { fileURLToPath } from "url";
import nunjucks from "vite-plugin-nunjucks";
import { viteStaticCopy } from "vite-plugin-static-copy";
import commonjs from "@rollup/plugin-commonjs";
import vue from "@vitejs/plugin-vue";

import prerenderSpaPlugin from "prerender-spa-plugin";

import monacoEditorPlugin from "vite-plugin-monaco-editor";

//import { getPagePath } from "./src/routes/menuRoutes";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const root = resolve(__dirname, "src");

const routesToPrerender = ["/", "/textDiff", "/qrGenerator", "/imageToDataUrl"];

//const routesToPrerender = getPagePath();

const modulesToCopy = {
  "rater-js": false,
  "bootstrap-icons": false,
  bootstrap: true,
  "@daracl/datatimepicker": true,
  "@daracl/toast": true,
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
  //transpileDependencies: true,
  esbuild: {
    // CommonJS 모듈을 ES 모듈로 변환하여 처리
    loader: "jsx",
    include: /\.js$/,
  },
  optimizeDeps: {
    include: ["bootstrap"],
  },
  build: {
    commonjsOptions: {
      include: [/bootstrap/, /node_modules/],
    },
  },
  plugins: [
    vue(),
    monacoEditorPlugin({}),
    prerenderSpaPlugin({
      staticDir: resolve(__dirname, "dist"), // Directory where your app is built
      routes: routesToPrerender,
      // Optional: other configuration options go here
    }),
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
