import { Effect, ImmerReducer } from 'umi';

import { postApiGoodsGoodsLists } from '@/services/api';
import { Details, ListResponse } from '@/services/interface';

export interface ListState {
  postApiGoodsGoodsLists: Details[];
}

export interface ListModel {
  state: ListState;
  effects: {
    postApiGoodsGoodsLists: Effect;
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

export default <ListModel>{
  state: {
    postApiGoodsGoodsLists: [],
  },
  effects: {
    *postApiGoodsGoodsLists({ payload }, { call, select, put }) {
      const { list } = yield select(({ list }: { list: ListState }) => {
        return {
          list: list.postApiGoodsGoodsLists,
        };
      });
      const { pageLimit = 10, pageNum = 1, cb } = payload;
      const res: ListResponse | undefined = yield call(postApiGoodsGoodsLists, {
        pageLimit,
        pageNum,
      });
      if (res) {
        yield put({
          type: 'setState',
          payload: {
            postApiGoodsGoodsLists:
              pageNum === 1 ? res.data : list.concat(res.data),
          },
        });
        cb(res.data);
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
