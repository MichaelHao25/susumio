import { history } from "umi";
import React, { ReactNode } from "react";

interface Props {
  title: ReactNode;
  noBack?: boolean;
  right?: ReactNode;
  left?: ReactNode;
  titleStyle?: React.CSSProperties;
}

export default (props: Props) => {
  const { title, noBack, right, left = "", titleStyle } = props;
  return (
    <header
      className="aui-bar aui-bar-nav aui-bar-light"
      id="header"
      style={{ backgroundColor: "#ffffff!important" }}
    >
      {noBack ? (
        <></>
      ) : (
        <a
          onClick={() => {
            history.goBack();
          }}
          className="aui-pull-left aui-btn"
        >
          <span
            className="aui-iconfont aui-icon-left"
            style={{ color: "#333!important" }}
          >
            {left ? left : ""}
          </span>
        </a>
      )}

      <div
        className="aui-title"
        style={{ color: "#333!important", ...titleStyle }}
        id="title"
      >
        {title}
      </div>
      {right}
    </header>
  );
};
