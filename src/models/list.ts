import { Effect, ImmerReducer } from "umi";

import {
  postAddressLists,
  postApiGoodsGoodsLists,
  postApiOrdersLists,
  postApplyList,
  postAssetLogsList,
  postCommentsLists,
  postFavorite,
  postForumList,
  postForumListFromMy,
  postOrdersList,
  postTeamChildUsers,
  postTeamUsers,
  postUserFootLists,
} from "@/services/api";
import {
  AddressItem,
  CartList,
  CommentItem,
  Details,
  DropOrdersListItem,
  IPostForumList,
  IPostForumListResponse,
  ListResponse,
  LogItem,
  OrderListResponse,
  OrdersListItem,
  PostApplyList,
  PostOrdersList,
  PostTeamChildUsers,
  PostTeamChildUsersList,
  PostTeamUsers,
} from "@/services/interface";
import generateListKey from "@/utils/generateListKey";
export enum SortType {
  /**
   * 升序 从小到大
   */
  Asc,
  /**
   * 降序 从大到小
   */
  Desc,
}
export enum SortKey {
  /**
   * 根据id大小来排序
   */
  Id,
  /**
   * 根据销售金额
   */
  sellPrice,

  /**
   * 根据销售数量
   */
  sellNum,
  /**
   * 根据上架时间
   */
  newGoods,
}
export interface ListState {
  sortType?: SortType;
  sortKey?: SortKey;
  /**
   * 讲他的key按照域名拆开
   */
  postApiGoodsGoodsLists: {
    [key: string]: Details[];
  };
  // postApiGoodsGoodsListsIndex: Details[];

  postApiOrdersLists: OrdersListItem[];
  postAddressLists: AddressItem[];
  postFavorite: CartList[];
  postCommentsLists: CommentItem[];
  postUserFootLists: CartList[];
  postAssetLogsList: LogItem[];
  postApplyList: any[];
  postOrdersList: DropOrdersListItem[];
  postOrdersListHeaderInfo: {
    totalExceptMoney: number;
    totalOrderNum: number;
  };
  postTeamChildUsers: PostTeamChildUsers[];
  postTeamChildUsersHeaderInfo: {
    dataCount: number;
  };
  postTeamUsers: PostTeamChildUsers[];
  postTeamUsersHeaderInfo: {
    level1Num: number;
    level2Num: number;
    level3Num: number;
    totalNum: number;
  };
  postForumList: IPostForumList[];
  postForumListFromMy: IPostForumList[];
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
    postOrdersList: Effect;
    postTeamChildUsers: Effect;
    postTeamUsers: Effect;
    postForumList: Effect;
    postForumListFromMy: Effect;
  };
  reducers: {
    sortList: ImmerReducer<
      ListState,
      {
        type: string;
        payload: {
          sortKey: SortKey;
          sortType: SortType;
        };
      }
    >;
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
    postApiGoodsGoodsLists: {},
    postApiOrdersLists: [],
    postAddressLists: [],
    postFavorite: [],
    postCommentsLists: [],
    postUserFootLists: [],
    postAssetLogsList: [],
    postApplyList: [],
    postOrdersList: [],
    postOrdersListHeaderInfo: {
      totalExceptMoney: 0,
      totalOrderNum: 0,
    },
    postTeamChildUsers: [],
    postTeamChildUsersHeaderInfo: {
      dataCount: 0,
    },
    postTeamUsers: [],
    postTeamUsersHeaderInfo: {
      level1Num: 0,
      level2Num: 0,
      level3Num: 0,
      totalNum: 0,
    },
    // postApiGoodsGoodsListsIndex: [],
    postForumList: [],
    postForumListFromMy: [],
  },
  effects: {
    *postForumListFromMy({ payload }, { call, select, put }) {
      const { list } = yield select(({ list }: { list: ListState }) => {
        return {
          list: list.postForumListFromMy,
        };
      });
      const { cb, ...req } = payload;
      const res: IPostForumListResponse | undefined = yield call(
        postForumListFromMy,
        req,
      );
      if (res) {
        yield put({
          type: "setState",
          payload: {
            postForumListFromMy:
              req.pageNum === 1 ? res.data : list.concat(res.data),
          },
        });
        cb(res.data);
      } else {
        cb([]);
      }
    },
    *postForumList({ payload }, { call, select, put }) {
      const { list } = yield select(({ list }: { list: ListState }) => {
        return {
          list: list.postForumList,
        };
      });
      const { cb, ...req } = payload;
      const res: IPostForumListResponse | undefined = yield call(
        postForumList,
        req,
      );
      if (res) {
        yield put({
          type: "setState",
          payload: {
            postForumList: req.pageNum === 1 ? res.data : list.concat(res.data),
          },
        });
        cb(res.data);
      } else {
        cb([]);
      }
    },
    *postTeamUsers({ payload }, { call, select, put }) {
      const { list } = yield select(({ list }: { list: ListState }) => {
        return {
          list: list.postTeamUsers,
        };
      });
      const { cb, ...req } = payload;
      const res: PostTeamUsers | undefined = yield call(postTeamUsers, req);
      if (res) {
        yield put({
          type: "setState",
          payload: {
            postTeamUsers:
              req.pageNum === 1
                ? res.data.team_users
                : list.concat(res.data.team_users),
            postTeamUsersHeaderInfo: {
              level1Num: res.data.team_info.level_1_num,
              level2Num: res.data.team_info.level_2_num,
              level3Num: res.data.team_info.level_3_num,
              totalNum: res.data.team_info.total_num,
            },
          },
        });
        cb(res.data.team_users);
      } else {
        cb([]);
      }
    },
    *postTeamChildUsers({ payload }, { call, select, put }) {
      const { list } = yield select(({ list }: { list: ListState }) => {
        return {
          list: list.postTeamChildUsers,
        };
      });
      const { cb, ...req } = payload;
      const res: PostTeamChildUsersList | undefined = yield call(
        postTeamChildUsers,
        req,
      );
      if (res) {
        yield put({
          type: "setState",
          payload: {
            postTeamChildUsers:
              req.pageNum === 1 ? res.data : list.concat(res.data),
            postTeamChildUsersHeaderInfo: {
              dataCount: res.page.data_count,
            },
          },
        });
        cb(res.data);
      } else {
        cb([]);
      }
    },
    *postOrdersList({ payload }, { call, select, put }) {
      const { list } = yield select(({ list }: { list: ListState }) => {
        return {
          list: list.postOrdersList,
        };
      });
      const { cb, ...req } = payload;
      const res: PostOrdersList | undefined = yield call(postOrdersList, req);
      if (res) {
        yield put({
          type: "setState",
          payload: {
            postOrdersList:
              req.pageNum === 1
                ? res.data.orders
                : list.concat(res.data.orders),
            postOrdersListHeaderInfo: {
              totalExceptMoney: res.data.total_except_money,
              totalOrderNum: res.data.total_order_num,
            },
          },
        });
        cb(res.data.orders);
      } else {
        cb([]);
      }
    },
    // todo 暂时没有接入
    *postApplyList({ payload }, { call, select, put }) {
      const { list } = yield select(({ list }: { list: ListState }) => {
        return {
          list: list.postApplyList,
        };
      });
      const { cb, ...req } = payload;
      const res: PostApplyList | undefined = yield call(postApplyList, req);
      if (res) {
        yield put({
          type: "setState",
          payload: {
            postApplyList:
              req.pageNum === 1
                ? res.data.applys
                : list.concat(res.data.applys),
          },
        });
        cb(res.data.applys);
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
          type: "setState",
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
          type: "setState",
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
          type: "setState",
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
          type: "setState",
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
          type: "setState",
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
          type: "setState",
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
      const list: ListState["postApiGoodsGoodsLists"] = yield select(
        ({ list }: { list: ListState }) => {
          return list.postApiGoodsGoodsLists;
          // return {
          //   list: list.postApiGoodsGoodsLists,
          //   // indexList: list.postApiGoodsGoodsListsIndex,
          // };
        },
      );
      /**
       * 如果是首页的话
       */

      const {
        pageLimit = 10,
        pageNum = 1,
        cb,
        customTag = "",
        id = "",
        keyword = "",
        shoperId = "",
        customTagId = "",
      } = payload;

      const res: ListResponse | undefined = yield call(postApiGoodsGoodsLists, {
        pageLimit,
        pageNum,
        customTag,
        id,
        keyword,
        shoperId,
        customTagId,
      });

      if (res) {
        // if (window.location.pathname === "/") {
        const key = generateListKey({
          customTag,
          id,
          keyword,
          shoperId,
          customTagId,
        });
        yield put({
          type: "setState",
          payload: {
            postApiGoodsGoodsLists: {
              ...list,
              [key]: pageNum === 1 ? res.data : list[key].concat(res.data),
            },
          },
        });
        // } else {
        //   yield put({
        //     type: "setState",
        //     payload: {
        //       postApiGoodsGoodsLists:
        //         pageNum === 1 ? res.data : list.concat(res.data),
        //     },
        //   });
        // }
        cb(res.data);
      } else {
        cb([]);
      }
    },
  },

  reducers: {
    sortList(state, action) {
      const {
        payload: { sortKey, sortType },
      } = action;

      if (sortKey === SortKey.Id && sortType === SortType.Asc) {
        state.postApiGoodsGoodsLists = state.postApiGoodsGoodsLists.sort(
          (a, b) => {
            return b.id - a.id;
          },
        );
      } else if (sortKey === SortKey.Id && sortType === SortType.Desc) {
        state.postApiGoodsGoodsLists = state.postApiGoodsGoodsLists.sort(
          (a, b) => {
            return a.id - b.id;
          },
        );
      } else if (sortKey === SortKey.sellPrice && sortType === SortType.Asc) {
        state.postApiGoodsGoodsLists = state.postApiGoodsGoodsLists.sort(
          (a, b) => {
            return b.sell_price - a.sell_price;
          },
        );
      } else if (sortKey === SortKey.sellPrice && sortType === SortType.Desc) {
        state.postApiGoodsGoodsLists = state.postApiGoodsGoodsLists.sort(
          (a, b) => {
            return a.sell_price - b.sell_price;
          },
        );
      } else if (sortKey === SortKey.sellNum && sortType === SortType.Asc) {
        state.postApiGoodsGoodsLists = state.postApiGoodsGoodsLists.sort(
          (a, b) => {
            return b.sell_num - a.sell_num;
          },
        );
      } else if (sortKey === SortKey.sellNum && sortType === SortType.Desc) {
        state.postApiGoodsGoodsLists = state.postApiGoodsGoodsLists.sort(
          (a, b) => {
            return a.sell_num - b.sell_num;
          },
        );
      } else if (sortKey === SortKey.newGoods && sortType === SortType.Asc) {
        state.postApiGoodsGoodsLists = state.postApiGoodsGoodsLists.sort(
          (a, b) => {
            return (
              new Date(b.update_time).getTime() -
              new Date(a.update_time).getTime()
            );
          },
        );
      } else if (sortKey === SortKey.newGoods && sortType === SortType.Desc) {
        state.postApiGoodsGoodsLists = state.postApiGoodsGoodsLists.sort(
          (a, b) => {
            return (
              new Date(a.update_time).getTime() -
              new Date(b.update_time).getTime()
            );
          },
        );
      }
    },
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
          if (typeof childKey === "string") {
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
