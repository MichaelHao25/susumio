import "./assets/css/aui.css";
import "./assets/css/aui-flex.css";
import "./assets/css/iconfont.less";
import "./assets/css/iconfont.css";
import "./assets/css/ali_icon_fu/iconfont.less";
import "./assets/css/ali_icon_wancll/iconfont.less";
import "./index.less";
import Notiflix, { Notify } from "notiflix";
import {
  postFacebookLogin,
  postFacebookLoginBaseInfoGet,
} from "./services/api";
import { FBAPPID } from "./services/interface";

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
