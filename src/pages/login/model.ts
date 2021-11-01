import { postApiUsersUserAccountsLogin } from "@/services/api";
import { Details } from "@/services/interface";
import { Notify, Report } from "notiflix";
import { EffectsCommandMap } from "dva";
import { ImmerReducer, Subscription } from "@@/plugin-dva/connect";

import { history } from "umi";

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

export interface UserinfoModel {
  namespace: "userinfo";
  state: UserinfoState;
  effects: {
    postApiUsersUserAccountsLogin: (
      action: {
        type: string;
        payload: {
          mobile: string;
          password: string;
        };
      },
      effects: EffectsCommandMap,
    ) => void;
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
      if (res) {
        const { data } = res;
        window.localStorage.setItem("userinfo", JSON.stringify(data));
        window.localStorage.setItem("token", data.token.token);
        yield put({
          type: "setState",
          payload: data,
        });
        Report.success("ok", res.msg, "OK", () => {
          history.push("/");
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
      const userInfo = window.localStorage.getItem("userinfo");
      if (userInfo) {
        const parseUserInfo = JSON.parse(userInfo);
        dispatch({
          type: "setState",
          payload: parseUserInfo,
        });
      }
    },
  },
};

export default userinfoModel;
