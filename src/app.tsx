import "./assets/css/aui.css";
import "./assets/css/aui-flex.css";
import "./assets/css/iconfont.less";
import "./assets/css/iconfont.css";
import "./assets/css/ali_icon_fu/iconfont.less";
import "./assets/css/ali_icon_wancll/iconfont.less";
import "./index.less";
import Notiflix, { Notify } from "notiflix";

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

// paypal
const clientId = `AfT8aC1gkayVTl9gP4PBbifGpV9e1Ki-NBG8BN1wxNSpQW_N2-accMva485YaNZpVFjmZVQOjchOpHxi`;
const currency = `USD`;
const src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=${currency}`;
const script = document.createElement("script");
script.src = src;
document.body.appendChild(script);

// 物流
const script2 = document.createElement("script");
script2.src = "https://www.17track.net/externalcall.js";
document.body.appendChild(script2);

// // 物流
// const facebooklogin = document.createElement("script");
// facebooklogin.async = true;
// facebooklogin.defer = true;
// facebooklogin.id = "facebook-jssdk";
// facebooklogin.src = "https://connect.facebook.net/en_US/sdk.js";
// facebooklogin.onload = () => {
//   window.FB.init({
//     appId: "168851405444737",
//     cookie: true, // Enable cookies to allow the server to access the session.
//     xfbml: true, // Parse social plugins on this webpage.
//     version: "v12.0", // Use this Graph API version for this call.
//   });
//   window.FB.getLoginStatus(function (response) {
//     console.log(response);
//     window.FB.api(
//       "/me",
//       "GET",
//       { fields: "id,name,email,picture" },
//       function (response) {
//         console.log(response);
//       },
//     );
//   });
// };
// document.body.appendChild(facebooklogin);
