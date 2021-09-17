import { Effect, ImmerReducer, history } from 'umi';

import {
  postApiGoodsGoodsLists,
  postApiUsersUserAccountsLogin,
} from '@/services/api';
import { Details, ListResponse } from '@/services/interface';
import Notiflix, { Notify, Report } from 'notiflix';
import { AnyAction } from 'redux';
import { EffectsCommandMap } from 'dva';

export interface ListState {
  postApiGoodsGoodsLists: Details[];
}

export interface userinfoModel {
  namespace: 'userinfo';
  state: {
    token: {
      id: number | null;
      user_account_id: number | null;
      user_id: number | null;
      client_type: string | null;
      token: string | null;
      refresh_token: string | null;
      expire_time: number | null;
      create_time: string | null;
      update_time: string | null;
    };
    user: {
      id: number | null;
      mobile: string | null;
      user_name: string | null;
      nick_name: string | null;
      avatar: string | null;
      is_customer: boolean | null;
      gender: number | null;
      telephone: string | null;
      qq: string | null;
      wechat: string | null;
      email: string | null;
      province: string | null;
      province_code: string | null;
      city: string | null;
      city_code: string | null;
      area: string | null;
      area_code: string | null;
      memo: string | null;
      role_ids: number[] | null;
      become_distributor_time: string | null;
      is_distributor: boolean | null;
      distributor_level_id: number | null;
      parent_id: string | null;
      parent_ids: string | null;
      become_bonus_time: string | null;
      is_bonus: boolean | null;
      bonus_level_id: number | null;
      status: number | null;
      keep_sign_in_num: number | null;
      total_sign_in_num: number | null;
      last_sign_in_time: string | null;
      create_time: string | null;
      update_time: string | null;
      user_level: string | null;
      user_level_id: number | null;
      is_set_pwd: number | null;
      guid: string | null;
    };
  };
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
}

export default <userinfoModel>{
  namespace: 'userinfo',
  state: {
    token: {
      id: null,
      user_account_id: null,
      user_id: null,
      client_type: null,
      token: null,
      refresh_token: null,
      expire_time: null,
      create_time: null,
      update_time: null,
    },
    user: {
      id: null,
      mobile: null,
      user_name: null,
      nick_name: null,
      avatar: null,
      is_customer: null,
      gender: null,
      telephone: null,
      qq: null,
      wechat: null,
      email: null,
      province: null,
      province_code: null,
      city: null,
      city_code: null,
      area: null,
      area_code: null,
      memo: null,
      role_ids: null,
      become_distributor_time: null,
      is_distributor: null,
      distributor_level_id: null,
      parent_id: null,
      parent_ids: null,
      become_bonus_time: null,
      is_bonus: null,
      bonus_level_id: null,
      status: null,
      keep_sign_in_num: null,
      total_sign_in_num: null,
      last_sign_in_time: null,
      create_time: null,
      update_time: null,
      user_level: null,
      user_level_id: null,
      is_set_pwd: null,
      guid: null,
    },
  },
  effects: {
    *postApiUsersUserAccountsLogin({ payload }, { call, select, put }) {
      const { mobile, password } = payload;
      if (!(mobile && password)) {
        Notify.failure('请输入用户名或者密码！');
        return;
      }
      const res = yield call(postApiUsersUserAccountsLogin, {
        mobile,
        password,
      });
      const { code = 0, data } = res;
      if (code) {
        window.localStorage.setItem('userinfo', JSON.stringify(data));
        window.localStorage.setItem('token', data.token.token);
        Report.success('ok', res.msg, 'OK', () => {
          history.push('/');
        });
      } else {
        Report.failure('Error', res.msg, 'OK');
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
};
