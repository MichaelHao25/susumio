import { history } from "umi";

export default () => {
  const page = window.localStorage.getItem("loginSuccessBack");
  if (page) {
    history.replace(page);
  } else {
    history.replace("/");
  }
};
