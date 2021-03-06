import {
  postApiUsersUserAccountsLogin,
  postFacebookLogin,
  postFacebookLoginBaseInfoGet,
  postLoginAsEmail,
  postRegisterAsEmail,
  postUserAccountsRegister,
} from "@/services/api";
import { Details, FBAPPID } from "@/services/interface";
import { ImmerReducer, Subscription } from "@@/plugin-dva/connect";
import { Effect, EffectsCommandMap } from "dva";
import { Notify, Report } from "notiflix";

import fbShareCheck from "@/utils/fbShareCheck";
import loginSuccessBack from "@/utils/loginSuccessBack";
import Notiflix from "notiflix";

export interface ListState {
  postApiGoodsGoodsLists: Details[];
}

export interface UserinfoState {
  token: {
    id: number;
    user_account_id: number;
    user_id: number;
    client_type: string;
    token: string;
    refresh_token: string;
    expire_time: number;
    create_time: string;
    update_time: string;
  };
  user: {
    id: number;
    mobile: string;
    user_name: string;
    nick_name: string;
    avatar: string;
    is_customer: boolean;
    gender: number;
    telephone: string;
    qq: string;
    wechat: string;
    is_bbs: boolean;
    email: string;
    province: string;
    province_code: string;
    city: string;
    city_code: string;
    area: string;
    area_code: string;
    memo: string;
    role_ids: number[];
    become_distributor_time: string;
    is_distributor: boolean;
    distributor_level_id: number;
    parent_id: string;
    parent_ids: string;
    become_bonus_time: string;
    is_bonus: boolean;
    bonus_level_id: number;
    status: number;
    keep_sign_in_num: number;
    total_sign_in_num: number;
    last_sign_in_time: string;
    create_time: string;
    update_time: string;
    user_level: string;
    user_level_id: number;
    is_set_pwd: number;
    guid: string;
    is_shopkeeper: boolean;
  };
  /**
   * 自动登录
   */
  autoLogin: boolean;
  /**
   * 未登陆
   */
  notLogin: boolean;
}

type Action = (
  action: {
    type: string;
    payload: {
      mobile: string;
      password: string;
    };
  },
  effects: EffectsCommandMap,
) => void;
const check = (mobile: string, password: string): boolean => {
  if (!password) {
    Notify.failure("Rellene la contraseña");
    return true;
  }
  if (!/^[A-Za-z0-9]{6,20}$/.test(password)) {
    Notify.failure(
      "La combinación de letras y números se limita a 6 a 20 bits",
    );
    return true;
  }
  if (mobile.includes("@")) {
    if (!mobile) {
      Notify.failure("El buzón no puede estar vacío");
      return true;
    }
    if (!/^[A-Za-z0-9._%-]+@([A-Za-z0-9-]+\.)+[A-Za-z]{2,4}$/.test(mobile)) {
      Notify.failure("Formato de correo incorrecto");
      return true;
    }
  } else if (mobile === "") {
    return true;
  }
  return false;
};

export interface UserinfoModel {
  namespace: "userinfo";
  state: UserinfoState;
  effects: {
    postApiUsersUserAccountsLogin: Action;
    loginAsMobileOrMail: Action;
    registerAsMobileOrMail: Action;
    login: Effect;
  };
  reducers: {
    setState: ImmerReducer<
      ListState,
      {
        type: string;
        payload: {
          [para in keyof ListState]: ListState[para];
        };
      }
    >;
  };
  subscriptions: { onload: Subscription };
}

const userinfoModel: UserinfoModel = {
  namespace: "userinfo",
  state: {
    token: {
      id: 0,
      user_account_id: 0,
      user_id: 0,
      client_type: "",
      token: "",
      refresh_token: "",
      expire_time: 0,
      create_time: "",
      update_time: "",
    },
    user: {
      id: 0,
      mobile: "",
      user_name: "",
      nick_name: "",
      avatar: "",
      is_customer: false,
      gender: 0,
      telephone: "",
      qq: "",
      wechat: "",
      is_bbs: false,
      email: "",
      province: "",
      province_code: "",
      city: "",
      city_code: "",
      area: "",
      area_code: "",
      memo: "",
      role_ids: [],
      become_distributor_time: "",
      is_distributor: false,
      distributor_level_id: 0,
      parent_id: "",
      parent_ids: "",
      become_bonus_time: "",
      is_bonus: false,
      bonus_level_id: 0,
      status: 0,
      keep_sign_in_num: 0,
      total_sign_in_num: 0,
      last_sign_in_time: "",
      create_time: "",
      update_time: "",
      user_level: "",
      user_level_id: 0,
      is_set_pwd: 0,
      guid: "",
      is_shopkeeper: false,
    },
  },
  effects: {
    *postApiUsersUserAccountsLogin({ payload }, { call, select, put }) {
      const { mobile, password } = payload;
      if (!(mobile && password)) {
        Notify.failure("请输入用户名或者密码！");
        return;
      }
      const res = yield call(postApiUsersUserAccountsLogin, {
        mobile,
        password,
      });
      yield put({
        type: "login",
        payload: { res },
      });
    },

    *loginAsMobileOrMail({ payload }, { call, select, put }) {
      const { mobile, password, parent_mobile = undefined } = payload;
      if (check(mobile, password)) {
        return;
      }
      let res;
      if (mobile.includes("@")) {
        res = yield call(postLoginAsEmail, {
          email: mobile,
          password,
          parent_mobile,
        });
      } else {
        res = yield call(postApiUsersUserAccountsLogin, {
          mobile,
          password,
          parent_mobile,
        });
      }
      yield put({
        type: "login",
        payload: { res },
      });
    },
    *registerAsMobileOrMail({ payload }, { call, select, put }) {
      const { mobile, password, parent_mobile = undefined } = payload;
      if (check(mobile, password)) {
        return;
      }
      let res;
      if (mobile.includes("@")) {
        res = yield call(postRegisterAsEmail, {
          email: mobile,
          password,
          parent_mobile,
        });
      } else {
        res = yield call(postUserAccountsRegister, {
          mobile,
          password,
          parent_mobile,
        });
      }

      yield put({
        type: "login",
        payload: { res },
      });
    },
    *login({ payload }, { call, select, put }) {
      const { res, autoLogin = false } = payload;
      if (res) {
        const { data } = res;
        window.localStorage.setItem("userinfo", JSON.stringify(data));
        window.localStorage.setItem("token", data.token.token);
        yield put({
          type: "setState",
          payload: data,
        });
        fbShareCheck({
          normalCallBack() {
            // Facebook的自动登陆的话就不弹窗了
            if (autoLogin === false) {
              Report.success("ok", res.msg, "OK", () => {
                loginSuccessBack();
              });
            }
          },
        });
      }
    },
  },

  reducers: {
    setState: function (state, action) {
      const { payload } = action;
      (
        Object.entries(payload) as [
          keyof ListState,
          ListState[keyof ListState],
        ][]
      ).map(
        <KEY extends keyof ListState, VALUE extends ListState[KEY]>([
          key,
          value,
        ]: [KEY, VALUE]) => {
          state[key] = value;
        },
      );
    },
  },
  subscriptions: {
    onload({ dispatch, history }) {
      window.checkLogin = (e: any) => {
        console.log("window.checkLogin");
        console.log(e);
        const { status = "", authResponse } = e || {};
        const { accessToken = "" } = authResponse || {};
        if (status === "connected") {
          postFacebookLogin(accessToken).then((res) => {
            dispatch({
              type: "userinfo/login",
              payload: { res },
            });
          });
        } else {
          Notiflix.Report.failure("警告", JSON.stringify(e), "好的");
        }
      };

      // Facebook登陆
      const facebooklogin = document.createElement("script");
      facebooklogin.async = true;
      facebooklogin.defer = true;
      facebooklogin.id = "facebook-jssdk";
      facebooklogin.src = "https://connect.facebook.net/en_US/sdk.js";
      facebooklogin.onload = () => {
        postFacebookLoginBaseInfoGet().then((res: FBAPPID) => {
          if (res) {
            const { data } = res;
            FB.init(data);
            FB.XFBML.parse();
            FB.getLoginStatus(function (response = {}) {
              // 如果从fb获取到信息的话就调用fb的登陆
              console.log("FB.getLoginStatus");

              console.log(response);

              if (response.authResponse) {
                const { authResponse: { accessToken = "" } = {} } = response;
                postFacebookLogin(accessToken)
                  .then((res) => {
                    dispatch({
                      type: "login",
                      payload: { res, autoLogin: true },
                    });
                  })
                  .catch(() => {
                    dispatch({
                      type: "setState",
                      payload: { notLogin: true },
                    });
                  });
              } else {
                // 否则就从本地获取信息
                console.log("从本地获取登陆信息,facebook登陆失败");
                const userInfo = window.localStorage.getItem("userinfo");
                if (userInfo) {
                  const parseUserInfo = JSON.parse(userInfo);
                  dispatch({
                    type: "setState",
                    payload: parseUserInfo,
                  });
                } else {
                  dispatch({
                    type: "setState",
                    payload: { notLogin: true },
                  });
                }
              }
            });
          }
        });
      };
      facebooklogin.onerror = () => {
        // 否则就从本地获取信息
        console.log("从本地获取登陆信息,facebookSdk加载失败");
        const userInfo = window.localStorage.getItem("userinfo");
        if (userInfo) {
          const parseUserInfo = JSON.parse(userInfo);
          dispatch({
            type: "setState",
            payload: parseUserInfo,
          });
        }
      };
      document.body.appendChild(facebooklogin);

      try {
        new Promise((resolve, reject) => {
          const controller = new AbortController();
          const { signal } = controller;
          const timeout = setTimeout(() => {
            signal.aborted();
          }, 1000 * 10);
          fetch(`https://www.googletagmanager.com/gtag/js?id=G-8E5ER6V86L`, {
            signal,
          })
            .then((res) => {
              resolve("");
              clearTimeout(timeout);
            })
            .catch(() => {
              clearTimeout(timeout);
              reject("");
            });
        })
          .then(() => {
            console.log("google analytics");
            // Google分析
            const google = document.createElement("script");
            google.src =
              "https://www.googletagmanager.com/gtag/js?id=G-8E5ER6V86L";
            google.defer = true;
            const googleStarUp = document.createElement("script");
            googleStarUp.defer = true;

            googleStarUp.innerText = `
      window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-8E5ER6V86L');
  `;
            document.body.appendChild(google);
            document.body.appendChild(googleStarUp);
          })
          .catch(() => {
            console.log("google analytics not found");
          });
      } catch (error) {
        console.log(error);
      }

      //  百度统计
      const baidu = document.createElement("script");
      baidu.src = `https://hm.baidu.com/hm.js?f5f5dc0f23281c16e5c29d0fe6af6ad8`;
      baidu.defer = true;
      document.body.appendChild(baidu);

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
      window.onerror = function (
        errorMessage,
        scriptURI,
        lineNumber,
        columnNumber,
        error,
      ) {
        console.log("错误", errorMessage);
      };
    },
  },
};

export default userinfoModel;
