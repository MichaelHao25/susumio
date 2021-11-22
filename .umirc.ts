import { defineConfig } from "umi";

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
  // dynamicImport: {
  //   loading: '@/component/Loading',
  // },
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
});
