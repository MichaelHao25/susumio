import { CacheableResponsePlugin } from "workbox-cacheable-response";
import { setCacheNameDetails } from "workbox-core";
import { ExpirationPlugin } from "workbox-expiration";
import * as googleAnalytics from "workbox-google-analytics";
import * as navigationPreload from "workbox-navigation-preload";
import { precacheAndRoute } from "workbox-precaching";
import { NavigationRoute, registerRoute, Route } from "workbox-routing";
import {
  CacheFirst,
  NetworkFirst,
  StaleWhileRevalidate,
} from "workbox-strategies";

import packageJson from "../package.json";

googleAnalytics.initialize({
  parameterOverrides: {
    cd1: "offline",
  },
});

setCacheNameDetails({
  prefix: "app",
  suffix: packageJson.version,
  precache: "susumio",
});
precacheAndRoute(self.__WB_MANIFEST as string[]);

navigationPreload.enable();

const navigationRoute = new NavigationRoute(
  new NetworkFirst({
    cacheName: "navigations",
  }),
);
const imageAssetRoute = new Route(
  ({ request }) => {
    return request.destination === "image";
  },
  new CacheFirst({
    cacheName: "image-assets",
    plugins: [
      new ExpirationPlugin({
        maxEntries: 1000,
      }),
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  }),
);
const otherAssetRoute = new Route(
  ({ request }) => {
    return ["document", "font", "image", "script", "style"].includes(
      request.destination,
    );
  },
  new StaleWhileRevalidate({
    cacheName: "other-assets",
    plugins: [
      new ExpirationPlugin({
        maxEntries: 1000,
      }),
    ],
  }),
);
registerRoute(navigationRoute);
registerRoute(imageAssetRoute);
registerRoute(otherAssetRoute);
