import { Effect, ImmerReducer } from 'umi';

import {
  OrdersLists,
  postAddressLists,
  postApiGoodsGoodsLists,
  postApiOrdersLists,
} from '@/services/api';
import {
  AddressItem,
  AddressListResponse,
  Details,
  ListResponse,
  OrderListResponse,
  OrdersListItem,
} from '@/services/interface';

export interface ListState {
  postApiGoodsGoodsLists: Details[];
  postApiOrdersLists: OrdersListItem[];
  postAddressLists: AddressItem[];
}

export enum AddressAction {
  SetDefault,
  DeleteItem,
}

export interface ListModel {
  state: ListState;
  effects: {
    postApiGoodsGoodsLists: Effect;
    postApiOrdersLists: Effect;
    postAddressLists: Effect;
  };
  reducers: {
    updateAddress: ImmerReducer<
      ListState,
      {
        type: string;
        payload: {
          type: AddressAction;
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
  },
  effects: {
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
    updateAddress(state, action) {
      const {
        payload: { addressId, type },
      } = action;

      if (type === AddressAction.SetDefault) {
        state.postAddressLists.forEach((address) => {
          if (address.id === addressId) {
            address.is_default = 1;
          } else {
            address.is_default = 0;
          }
        });
      }
      if (type === AddressAction.DeleteItem) {
        const index = state.postAddressLists.findIndex((address) => {
          if (address.id === addressId) {
            return false;
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
