import { defineConfig } from "umi";
import { InjectManifest } from "workbox-webpack-plugin";
import packageJson from "./package.json";
export default defineConfig({
  nodeModulesTransform: {
    type: "none",
  },
  workerLoader: {},
  // msfu ---- config
  // webpack5: {
  //   lazyCompilation: {
  //     entries: true,
  //     imports: true,
  //   },
  // },
  dynamicImport: {
    loading: "@/component/Loading",
  },
  hash: true,
  // mfsu: {},
  // msfu ---- config
  dva: {
    immer: true,
  },
  // routes: [
  //   { path: "/", component: "@/pages/index", exact: true },
  //   { path: "/goodsDetails", component: "@/pages/goodsDetails", exact: true },
  //
  // ],
  antd: false,
  fastRefresh: {},
  // chainWebpack(config) {
  //   config.module
  //     .rule('woff')
  //     .test(/.(woff|eot|woff2|ttf)$/)
  //     .use('file-loader')
  //     .loader('file-loader');
  // }
  chainWebpack(memo) {
    // workbox 配置

    memo.plugin("workbox").use(InjectManifest, [
      {
        swSrc: "./src/sw.ts",
        exclude: ["sw.js"],
        maximumFileSizeToCacheInBytes: 1024 * 1024 * 1024 * 10,
      },
    ]);
    // memo.plugin("workbox").use(GenerateSW, [
    //   {
    //     cacheId: `webpack-pwa-${packageJson.version}`, // 设置前缀
    //     navigationPreload: true, // 导航preload
    //     skipWaiting: true, // 强制等待中的 Service Worker 被激活
    //     clientsClaim: true, // Service Worker 被激活后使其立即获得页面控制权
    //     cleanupOutdatedCaches: true, //删除过时、老版本的缓存
    //     swDest: "service-wroker.js", // 输出 Service worker 文件
    //     include: ["**/*.{js,css,png,jpg,svga,jpeg,gif}"], // 匹配的文件
    //     exclude: ["service-wroker.js"], // 忽略的文件
    //     runtimeCaching: [
    //       {
    //         /**
    //          * 缓存所有的资产
    //          */
    //         urlPattern: /.*?/i,
    //         handler: "StaleWhileRevalidate",
    //         method: "GET",
    //         options: {
    //           cacheName: "allGetSource",
    //           expiration: {
    //             maxEntries: 1000, //最多缓存300个，超过的按照LRU原则删除
    //             maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
    //           },
    //         },
    //       },
    //       // {
    //       //   urlPattern: /.*\.js.*/i,
    //       //   handler: 'StaleWhileRevalidate',
    //       //   options: {
    //       //     cacheName: 'seed-js',
    //       //     expiration: {
    //       //       maxEntries: 300, //最多缓存300个，超过的按照LRU原则删除
    //       //       maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
    //       //     },
    //       //   },
    //       // },
    //       // {
    //       //   urlPattern: /.*css.*/i,
    //       //   handler: 'StaleWhileRevalidate',
    //       //   options: {
    //       //     cacheName: 'seed-css',
    //       //     expiration: {
    //       //       maxEntries: 300, //最多缓存300个，超过的按照LRU原则删除
    //       //       maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
    //       //     },
    //       //   },
    //       // },
    //       // {
    //       //   urlPattern: /.*(png|svga|jpg|jpeg|gif).*/i,
    //       //   handler: 'StaleWhileRevalidate',
    //       //   options: {
    //       //     cacheName: 'seed-image',
    //       //     expiration: {
    //       //       maxEntries: 300, //最多缓存300个，超过的按照LRU原则删除
    //       //       maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
    //       //     },
    //       //   },
    //       // },
    //     ],
    //   },
    // ]);
  },
});
