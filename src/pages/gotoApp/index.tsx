import { useEffect, useState } from "react";

const loadingBase64 = `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBjbGFzcz0ibGRzLW1lc3NhZ2UiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIHZpZXdCb3g9IjAgMCAxMDAgMTAwIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWlkWU1pZCI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjUgNTApIj48Y2lyY2xlIGN4PSIwIiBjeT0iMCIgcj0iOSIgZmlsbD0iIzMyYzY4MiIgdHJhbnNmb3JtPSJzY2FsZSgwLjIzOTY4MyAwLjIzOTY4MykiPiA8YW5pbWF0ZVRyYW5zZm9ybSBhdHRyaWJ1dGVOYW1lPSJ0cmFuc2Zvcm0iIHR5cGU9InNjYWxlIiBiZWdpbj0iLTAuMjY2NjY2NjY2NjY2NjY2NjZzIiBjYWxjTW9kZT0ic3BsaW5lIiBrZXlTcGxpbmVzPSIwLjMgMCAwLjcgMTswLjMgMCAwLjcgMSIgdmFsdWVzPSIwOzE7MCIga2V5VGltZXM9IjA7MC41OzEiIGR1cj0iMC44cyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz48L2NpcmNsZT48L2c+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNTAgNTApIj48Y2lyY2xlIGN4PSIwIiBjeT0iMCIgcj0iOSIgZmlsbD0iIzMyYzY4MiIgdHJhbnNmb3JtPSJzY2FsZSgwLjAwMTUyNzY3IDAuMDAxNTI3NjcpIj48YW5pbWF0ZVRyYW5zZm9ybSBhdHRyaWJ1dGVOYW1lPSJ0cmFuc2Zvcm0iIHR5cGU9InNjYWxlIiBiZWdpbj0iLTAuMTMzMzMzMzMzMzMzMzMzMzNzIiBjYWxjTW9kZT0ic3BsaW5lIiBrZXlTcGxpbmVzPSIwLjMgMCAwLjcgMTswLjMgMCAwLjcgMSIgdmFsdWVzPSIwOzE7MCIga2V5VGltZXM9IjA7MC41OzEiIGR1cj0iMC44cyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz48L2NpcmNsZT48L2c+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNzUgNTApIj48Y2lyY2xlIGN4PSIwIiBjeT0iMCIgcj0iOSIgZmlsbD0iIzMyYzY4MiIgdHJhbnNmb3JtPSJzY2FsZSgwLjI5ODg1NyAwLjI5ODg1NykiPjxhbmltYXRlVHJhbnNmb3JtIGF0dHJpYnV0ZU5hbWU9InRyYW5zZm9ybSIgdHlwZT0ic2NhbGUiIGJlZ2luPSIwcyIgY2FsY01vZGU9InNwbGluZSIga2V5U3BsaW5lcz0iMC4zIDAgMC43IDE7MC4zIDAgMC43IDEiIHZhbHVlcz0iMDsxOzAiIGtleVRpbWVzPSIwOzAuNTsxIiBkdXI9IjAuOHMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIi8+PC9jaXJjbGU+PC9nPjwvc3ZnPg==`;
export default () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  });
  return (
    <div
      style={{
        width: "100%",
        height: "400px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {loading ? (
        <>
          <div>
            <img style={{ width: "100px" }} src={loadingBase64} alt="" />
          </div>
          <div>loading...</div>
        </>
      ) : (
        <div
          onClick={() => {
            const url = new URL(window.location.href);
            const link = url.searchParams.get("link");
            if (link) {
              if (navigator.userAgent.includes("iPhone")) {
                location.href = `ltapp284543://app?url=${decodeURIComponent(
                  link,
                )}`;
              }
              if (navigator.userAgent.includes("Android")) {
                location.href = `ltapp260193://app?url=${decodeURIComponent(
                  link,
                )}`;
              }
            } else {
              location.href = url.origin;
            }
          }}
        >
          打开App
        </div>
      )}
    </div>
  );
};
// IOS 启动
// URL scheme： ltapp284543
// 应用示例：

// 在手机浏览器中启动App
// <a href="ltapp284543://app">启动APP</a>

// 在手机浏览器中启动App并在 App 中打开 http://xw.qq.com 链接
// 注意：url参数需进行UrlEncode编码
// <a href="ltapp284543://app?url=http%3a%2f%2fxw.qq.com">启动APP</a>

// 通过 javascript 脚本隐式启动App
// <script>location.href = "ltapp284543://app";</script>

// 安卓系统上通过 intent 启动(仅支持安卓)：
// <a href="intent://app#Intent;scheme=ltapp284543;package=com.susumio.app.xi3vugi;end">启动APP</a>
// <a href="intent://app?url=http%3a%2f%2fxw.qq.com#Intent;scheme=ltapp284543;package=com.susumio.app.xi3vugi;end">启动APP（带url参数）</a>

// Android启动
// URL scheme： ltapp260193
// 应用示例：

// 在手机浏览器中启动App
// <a href="ltapp260193://app">启动APP</a>

// 在手机浏览器中启动App并在 App 中打开 http://xw.qq.com 链接
// 注意：url参数需进行UrlEncode编码
// <a href="ltapp260193://app?url=http%3a%2f%2fxw.qq.com">启动APP</a>

// 通过 javascript 脚本隐式启动App
// <script>location.href = "ltapp260193://app";</script>

// 安卓系统上通过 intent 启动(仅支持安卓)：
// <a href="intent://app#Intent;scheme=ltapp260193;package=com.susumio.app.xwuksob;end">启动APP</a>
// <a href="intent://app?url=http%3a%2f%2fxw.qq.com#Intent;scheme=ltapp260193;package=com.susumio.app.xwuksob;end">启动APP（带url参数）</a>
