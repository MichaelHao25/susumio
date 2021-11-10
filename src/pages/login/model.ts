import {
  postApiUsersUserAccountsLogin,
  postFacebookLogin,
  postFacebookLoginBaseInfoGet,
  postLoginAsEmail,
  postRegisterAsEmail,
  postUserAccountsRegister,
} from "@/services/api";
import { Details, FBAPPID } from "@/services/interface";
import { Notify, Report } from "notiflix";
import { Effect, EffectsCommandMap } from "dva";
import { ImmerReducer, Subscription } from "@@/plugin-dva/connect";

import { history } from "umi";
import fbShareCheck from "@/utils/fbShareCheck";
import loginSuccessBack from "@/utils/loginSuccessBack";

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
      const { mobile, password } = payload;
      if (check(mobile, password)) {
        return;
      }
      let res;
      if (mobile.includes("@")) {
        res = yield call(postLoginAsEmail, {
          email: mobile,
          password,
        });
      } else {
        res = yield call(postApiUsersUserAccountsLogin, {
          mobile,
          password,
        });
      }
      yield put({
        type: "login",
        payload: { res },
      });
    },
    *registerAsMobileOrMail({ payload }, { call, select, put }) {
      const { mobile, password } = payload;
      if (check(mobile, password)) {
        return;
      }
      let res;
      if (mobile.includes("@")) {
        res = yield call(postRegisterAsEmail, {
          email: mobile,
          password,
        });
      } else {
        res = yield call(postUserAccountsRegister, {
          mobile,
          password,
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
      // Facebook登陆
      const facebooklogin = document.createElement("script");
      facebooklogin.async = true;
      facebooklogin.defer = true;
      facebooklogin.id = "facebook-jssdk";
      facebooklogin.src = "https://connect.facebook.net/en_US/sdk.js";
      facebooklogin.onload = () => {
        postFacebookLoginBaseInfoGet().then((res: FBAPPID) => {
          console.log(res);
          if (res) {
            const { data } = res;
            FB.init(data);
            FB.XFBML.parse();
            FB.getLoginStatus(function (response = {}) {
              // 如果从fb获取到信息的话就调用fb的登陆
              console.log(response);

              if (response.authResponse) {
                const { authResponse: { accessToken = "" } = {} } = response;
                postFacebookLogin(accessToken).then((res) => {
                  dispatch({
                    type: "login",
                    payload: { res, autoLogin: true },
                  });
                });
              } else {
                // 否则就从本地获取信息
                console.log("从本地获取登陆信息");
                const userInfo = window.localStorage.getItem("userinfo");
                if (userInfo) {
                  const parseUserInfo = JSON.parse(userInfo);
                  dispatch({
                    type: "setState",
                    payload: parseUserInfo,
                  });
                }
              }
            });
          }
        });
      };
      document.body.appendChild(facebooklogin);

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
    },
  },
};

export default userinfoModel;
