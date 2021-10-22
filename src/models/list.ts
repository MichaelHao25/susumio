import { Effect, ImmerReducer } from 'umi';

import {
  OrdersLists,
  postAddressLists,
  postApiGoodsGoodsLists,
  postApiOrdersLists,
  postApplyLists,
  postAssetLogsList,
  postCommentsLists,
  postFavorite,
  postUserFootLists,
} from '@/services/api';
import {
  AddressItem,
  AddressListResponse,
  CartList,
  CommentItem,
  Details,
  ListResponse,
  LogItem,
  OrderListResponse,
  OrdersListItem,
} from '@/services/interface';

export interface ListState {
  postApiGoodsGoodsLists: Details[];
  postApiOrdersLists: OrdersListItem[];
  postAddressLists: AddressItem[];
  postFavorite: CartList[];
  postCommentsLists: CommentItem[];
  postUserFootLists: CartList[];
  postAssetLogsList: LogItem[];
  postApplyList: any[];
}

export enum Action {
  SetDefault,
  DeleteItem,
}

export interface ListModel {
  state: ListState;
  effects: {
    postApiGoodsGoodsLists: Effect;
    postApiOrdersLists: Effect;
    postAddressLists: Effect;
    postFavorite: Effect;
    postCommentsLists: Effect;
    postUserFootLists: Effect;
    postAssetLogsList: Effect;
    postApplyList: Effect;
  };
  reducers: {
    updateComments: ImmerReducer<
      ListState,
      {
        type: string;
        payload: {
          type: Action;
          commentId: number;
        };
      }
    >;
    updateFavorite: ImmerReducer<
      ListState,
      {
        type: string;
        payload: {
          type: Action;
          favoriteId: number;
        };
      }
    >;
    updateAddress: ImmerReducer<
      ListState,
      {
        type: string;
        payload: {
          type: Action;
          addressId: number;
        };
      }
    >;
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
    postAddressLists: [],
    postFavorite: [],
    postCommentsLists: [],
    postUserFootLists: [],
    postAssetLogsList: [],
    postApplyList: [],
  },
  effects: {
    *postApplyList({ payload }, { call, select, put }) {
      const { list } = yield select(({ list }: { list: ListState }) => {
        return {
          list: list.postApplyList,
        };
      });
      const { cb, ...req } = payload;
      const res: ListResponse | undefined = yield call(postApplyLists, req);
      debugger;
      if (res) {
        yield put({
          type: 'setState',
          payload: {
            postApplyList:
              req.pageNum === 1
                ? res.data.applys
                : list.concat(res.data.applys),
          },
        });
        cb(res.data);
      } else {
        cb([]);
      }
    },
    *postAssetLogsList({ payload }, { call, select, put }) {
      const { list } = yield select(({ list }: { list: ListState }) => {
        return {
          list: list.postAssetLogsList,
        };
      });
      const { cb, ...req } = payload;
      const res: ListResponse | undefined = yield call(postAssetLogsList, req);
      if (res) {
        yield put({
          type: 'setState',
          payload: {
            postAssetLogsList:
              req.pageNum === 1 ? res.data : list.concat(res.data),
          },
        });
        cb(res.data);
      } else {
        cb([]);
      }
    },
    *postUserFootLists({ payload }, { call, select, put }) {
      const { list } = yield select(({ list }: { list: ListState }) => {
        return {
          list: list.postUserFootLists,
        };
      });
      const { cb, ...req } = payload;
      const res: ListResponse | undefined = yield call(postUserFootLists, req);
      if (res) {
        yield put({
          type: 'setState',
          payload: {
            postUserFootLists:
              req.pageNum === 1 ? res.data : list.concat(res.data),
          },
        });
        cb(res.data);
      } else {
        cb([]);
      }
    },
    *postCommentsLists({ payload }, { call, select, put }) {
      const { list } = yield select(({ list }: { list: ListState }) => {
        return {
          list: list.postCommentsLists,
        };
      });
      const { cb, ...req } = payload;
      const res: ListResponse | undefined = yield call(postCommentsLists, req);
      if (res) {
        yield put({
          type: 'setState',
          payload: {
            postCommentsLists:
              req.pageNum === 1 ? res.data : list.concat(res.data),
          },
        });
        cb(res.data);
      } else {
        cb([]);
      }
    },
    *postFavorite({ payload }, { call, select, put }) {
      const { list } = yield select(({ list }: { list: ListState }) => {
        return {
          list: list.postFavorite,
        };
      });
      const { cb, ...req } = payload;
      const res: ListResponse | undefined = yield call(postFavorite, req);
      if (res) {
        yield put({
          type: 'setState',
          payload: {
            postFavorite: req.pageNum === 1 ? res.data : list.concat(res.data),
          },
        });
        cb(res.data);
      } else {
        cb([]);
      }
    },
    *postAddressLists({ payload }, { call, select, put }) {
      const { list } = yield select(({ list }: { list: ListState }) => {
        return {
          list: list.postAddressLists,
        };
      });
      const { cb, ...req } = payload;
      const res: OrderListResponse | undefined = yield call(
        postAddressLists,
        req,
      );
      if (res) {
        yield put({
          type: 'setState',
          payload: {
            postAddressLists:
              req.pageNum === 1 ? res.data : list.concat(res.data),
          },
        });
        cb(res.data);
      } else {
        cb([]);
      }
    },
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
    updateComments(state, action) {
      const {
        payload: { commentId, type },
      } = action;
      if (type === Action.DeleteItem) {
        const index = state.postCommentsLists.findIndex((favorite) => {
          if (favorite.id === commentId) {
            return true;
          }
        });
        state.postCommentsLists.splice(index, 1);
      }
    },

    updateFavorite(state, action) {
      const {
        payload: { favoriteId, type },
      } = action;
      if (type === Action.DeleteItem) {
        const index = state.postFavorite.findIndex((favorite) => {
          if (favorite.id === favoriteId) {
            return true;
          }
        });
        state.postFavorite.splice(index, 1);
      }
    },
    updateAddress(state, action) {
      const {
        payload: { addressId, type },
      } = action;

      if (type === Action.SetDefault) {
        state.postAddressLists.forEach((address) => {
          if (address.id === addressId) {
            address.is_default = 1;
          } else {
            address.is_default = 0;
          }
        });
      }
      if (type === Action.DeleteItem) {
        const index = state.postAddressLists.findIndex((address) => {
          if (address.id === addressId) {
            return true;
          }
        });
        state.postAddressLists.splice(index, 1);
      }
    },
    setState: function (state, action) {
      const { payload } = action;
      // @ts-ignore
      const { key = [], value = {} } = payload;
      if (key.length !== 0 && Object.values(value).length !== 0) {
        let data: any = state;
        key.forEach((childKey: keyof ListState | []) => {
          if (typeof childKey === 'string') {
            data = data[childKey];
          } else {
            const k = Object.keys(childKey)[0];
            const v = Object.values(childKey)[0];
            // @ts-ignore
            data.find((item) => {
              if (item[k] === v) {
                Object.entries(value).forEach(([key, value]) => {
                  item[key] = value;
                });
                return true;
              }
            });
          }
        });
      } else {
        // 这种情况没啥用
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
      }
    },
  },
};
