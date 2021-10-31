import { Context, extend, ResponseError } from "umi-request";
import { history } from "umi";
import { Loading, Notify, Report } from "notiflix";

interface Error extends ResponseError {
  msg: string;
  code: number;
}

const errorHandler = function (error: Error) {
  // 如果是非自定义的错误的
  // 请求已发送但服务端返回状态码非 2xx 的响应
  const {
    data = {},
    request: {
      options: { url, method },
    },
    msg = "",
    code = 0,
    message: jsErroeMessage = "",
  } = error;
  // 如果有message的话就展示他没有的话就展示response
  console.log("method:", method, "url:", url);
  // 如果有报错信息的话就显示报错信息

  if (msg) {
    console.log("res:", data);
    if ([100400, 100401].includes(code)) {
      // 添加白名单如果在这里面的话就不跳转
      if (["/api_query/goods/is_collect"].includes(url)) {
      } else {
        history.replace("/login");
      }
    } else {
      Notify.failure(msg);
    }
  } else {
    // 请求初始化时出错或者异常响应返回的异常
    if (jsErroeMessage) {
      Notify.failure(error.message);
      console.log("res:", error.message);
    } else {
      // 如果没有报错信息代码初始化也没出错的话就打印响应结果
      Notify.failure(JSON.stringify(data));
      console.log("res:", data);
    }
  }
  stack.shift();
  if (stack.length === 0) {
    Loading.remove();
  }
  // todo全局需要处理，如果报错的话就返回 undefined;
  // console.log(error);

  return undefined;
};
const stack: number[] = [];
export const origin = "https://www.177pinche.com/index.php";
// export const origin = "http://api.lictic.com:88/index.php";

export const request = extend({
  // prefix: 'https://f26a70c7-44b4-4d49-9e65-2fd7e41553cf.mock.pstmn.io/api',
  prefix: origin,
  timeout: 10000,
  headers: {
    // 'X-Requested-With': 'XMLHttpRequest',
    // lang: 'zh_CN',
    // 'x-mock-match-request-body': 'true',
    // "content-type": "application/json;charset=UTF-8",
    "client-type": "app",
    auth: "Basic_Ivj6eZRxMTx2yiyunZvnG8R67",
  },
  // @ts-ignore
  errorHandler,
});
// php的话返回1的话就是OK
// 0就是失败现在针对0的话在全局处理。
request.interceptors.response.use(async (response, options) => {
  const res = await response.clone().json();
  const { code = 0 } = res;
  if (code !== 1) {
    // Report.failure('Error', res.msg, 'OK');
    throw res;
  }
  return response;
});
request.use(async (ctx: Context, next: () => void) => {
  // 检查是否可以携带token，如果有的话就添加token
  const token: string | null = window.localStorage.getItem("token");
  if (token) {
    // @ts-ignore
    ctx.req.options.headers.token = token;
  }
  // 中间件处理loading状态
  // Loading.circle('loading...');
  if (stack.length === 0) {
    Loading.pulse();
  }
  stack.push(Math.random());
  await next();
  const {
    req: {
      options: { url, method },
    },
    res,
  } = ctx;
  console.log("method:", method, "url:", url);
  console.log("res:", res);
  stack.shift();
  if (stack.length === 0) {
    Loading.remove();
  }
});
