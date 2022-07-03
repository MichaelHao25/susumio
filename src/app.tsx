import Notiflix, { Notify } from "notiflix";
import "./assets/css/ali_icon_fu/iconfont.less";
import "./assets/css/ali_icon_wancll/iconfont.less";
import "./assets/css/aui-flex.css";
import "./assets/css/aui.css";
import "./assets/css/iconfont.css";
import "./assets/css/iconfont.less";
import "./index.less";

import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js") //这块注意不要改动
      .then((registration) => {
        console.log("SW registered: ", registration);
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError);
      });
  });
}

Notify.init({
  position: "right-top",
  cssAnimationStyle: "from-bottom",
  // timeout: 1000 * 60,
});

Notiflix.Confirm.init({
  plainText: false,
  messageMaxLength: 500,
  buttonsMaxLength: 500,
  titleMaxLength: 500,
});
if (process.env.NODE_ENV === "production") {
  Sentry.init({
    dsn: "https://1204fd24a64b48e0b6bd161a9b7e15ac@o1068070.ingest.sentry.io/6062216",
    integrations: [new Integrations.BrowserTracing()],
    /**
     * 捕获的粒度
     */
    tracesSampleRate: 1.0,
  });
}
