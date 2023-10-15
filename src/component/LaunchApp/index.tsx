import { useEffect, useState } from "react";
import "./index.less";
export default () => {
  const [close, setClose] = useState<boolean>(false);
  const [blur, setBlur] = useState<boolean>(true);
  useEffect(() => {
    window.onblur = () => {
      setBlur(true);
    };
    window.onfocus = () => {
      setBlur(false);
    };
  });
  if (close) {
    return <></>;
  }
  if (navigator.userAgent.includes("LT-APP")) {
    return <></>;
  }
  return (
    <div className="launchApp">
      <span
        className="aui-iconfont aui-icon-close"
        onClick={() => setClose(true)}
      ></span>
      <div className="product">
        <img src={require("../../assets/img/logo2.png")} alt="" />
        <span>Susumio</span>
      </div>
      <div className="space"></div>
      <div
        className="button"
        onClick={() => {
          if (navigator.userAgent.includes("iPhone")) {
            // console.time("a");
            // location.href = `ltapp284543://app?url=${encodeURIComponent(window.location.href)}`;
            // console.timeEnd("a");
            // console.time("b");
            // location.href = `ltapp284543://app?url=${encodeURIComponent(window.location.href)}`;
            // console.timeEnd("b");

            location.href = `ltapp284543://app?url=${encodeURIComponent(
              window.location.href,
            )}`;
            setTimeout(() => {
              // if (blur === false) {
              location.href = `https://apps.apple.com/cn/app/susum%C3%ADo/id1604701762`;
              // }
            }, 1000);
          }
          if (navigator.userAgent.includes("Android")) {
            location.href = `ltapp260193://app?url=${encodeURIComponent(
              window.location.href,
            )}`;
            setTimeout(() => {
              // if (blur === false) {
              location.href = `https://bit.ly/3gMmpC6`;
              // }
            }, 1000);
          }
        }}
      >
        Iniciar APP
      </div>
    </div>
  );
};

// Android

// https://bit.ly/3gMmpC6

//  iPhone

// https://apps.apple.com/cn/app/susum%C3%ADo/id1604701762
