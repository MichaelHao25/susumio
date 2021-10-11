import { Effect, ImmerReducer } from 'umi';

import {
  OrdersLists,
  postApiGoodsGoodsLists,
  postApiOrdersLists,
} from '@/services/api';
import {
  Details,
  ListResponse,
  OrderListResponse,
  OrdersListItem,
} from '@/services/interface';

export interface ListState {
  postApiGoodsGoodsLists: Details[];
  postApiOrdersLists: OrdersListItem[];
}

export interface ListModel {
  state: ListState;
  effects: {
    postApiGoodsGoodsLists: Effect;
    postApiOrdersLists: Effect;
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
    postApiOrdersLists: [],
  },
  effects: {
    *postApiOrdersLists({ payload }, { call, select, put }) {
      const { list } = yield select(({ list }: { list: ListState }) => {
        return {
          list: list.postApiOrdersLists,
        };
      });
      const { cb, ...req } = payload;
      const res: OrderListResponse | undefined = yield call(
        postApiOrdersLists,
        req,
      );
      if (res) {
        yield put({
          type: 'setState',
          payload: {
            postApiOrdersLists:
              req.pageNum === 1 ? res.data : list.concat(res.data),
          },
        });
        cb(res.data);
      } else {
        cb([]);
      }
    },
    *postApiGoodsGoodsLists({ payload }, { call, select, put }) {
      const { list } = yield select(({ list }: { list: ListState }) => {
        return {
          list: list.postApiGoodsGoodsLists,
        };
      });

      const {
        pageLimit = 10,
        pageNum = 1,
        cb,
        customTag = '',
        id = '',
      } = payload;
      const res: ListResponse | undefined = yield call(postApiGoodsGoodsLists, {
        pageLimit,
        pageNum,
        customTag,
        id,
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
      } else {
        cb([]);
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
