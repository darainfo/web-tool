import { defineConfig, normalizePath, build } from "vite";
import fs from "fs";
import path, { resolve } from "path";
import { fileURLToPath } from "url";
import { viteStaticCopy } from "vite-plugin-static-copy";
import commonjs from "@rollup/plugin-commonjs";
import vue from "@vitejs/plugin-vue";
import vitePrerender from "vite-plugin-prerender";

import monacoEditorPlugin from "vite-plugin-monaco-editor";

import { getAllRoutePath } from "./src/routes/menuRoutes";

import { sitemMapXml } from "./sitemap";

import packageJson from "./package.json";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const root = resolve(__dirname, "src");

const modulesToCopy = {
  "bootstrap-icons": false,
  bootstrap: true,
  "@daracl/datatimepicker": true,
  "@daracl/toast": true,
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
  base: "/",
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
    vitePrerender({
      // Required - The path to the vite-outputted app to prerender.
      staticDir: path.join(__dirname, "dist"),
      // Required - Routes to render.
      routes: getAllRoutePath(),

      postProcess: (renderedRoutes) => {
        //console.log("Prerendering finished!");
        //console.log("Rendered routes:", renderedRoutes);

        let metaTags = `<meta name="robots" content="index, follow">
<meta property="description" content="daracl web tool javascript utilities for case change, text comparison, text sorting, and text size, qrcode Generator">
<meta property="og:title" content="Web tool">
<meta property="og:description" content="daracl web tool javascript utilities for case change, text comparison, text sorting, and text size, qrcode Generator">
<meta property="og:url" content="https://tool.daracl.com">
</head>`;
        let html = renderedRoutes.html;

        renderedRoutes.html = html.replace("</head>", metaTags);

        return renderedRoutes;
      },
    }),

    {
      name: "my-sitemap-generate-plugin", // 플러그인 이름
      closeBundle() {
        console.log("All bundles are generated!");

        const sitemapPath = path.resolve(__dirname, "dist", "sitemap.xml");

        sitemMapXml(fs, sitemapPath, packageJson.homepage, getAllRoutePath());
      },
    },
    commonjs(),
    // {
    //   name: "post-build-plugin",
    //   // 빌드가 끝난 후 작업을 처리
    //   buildEnd() {
    //     //console.log(" 1111  빌드가 완료되었습니다!");

    //     const sitemapPath = path.resolve(__dirname, "dist", "sitemap.xml");

    //     sitemMapXml(fs, sitemapPath, getAllRoutePath());
    //   },
    // },
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
