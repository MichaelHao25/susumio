import { history } from "umi";
import React, { ReactNode } from "react";

interface Props {
  /**
   * 标题
   */
  title: ReactNode;
  /**
   * 不显示后退按钮
   */
  noBack?: boolean;
  /**
   * 右边的组件
   */
  right?: ReactNode;
  /**
   * 左边的组件
   */
  left?: ReactNode;
  /**
   * 标题的样式
   */
  titleStyle?: React.CSSProperties;
  /**
   * 后退按钮点击的回调函数
   */
  leftOnClick?: () => void;
}

export default (props: Props) => {
  const { title, noBack, right, left = "", titleStyle, leftOnClick } = props;
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
            if (leftOnClick) {
              leftOnClick();
            } else {
              history.goBack();
            }
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
