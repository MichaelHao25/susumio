import React, { useEffect, useRef } from "react";
import {
  connect,
  Dispatch,
  history,
  Link,
  UserinfoState,
  useSelector,
} from "umi";
import styles from "./index.less";
// @ts-ignore
import { Action, ListState } from "@/models/list";
import {
  postAddressDelete,
  postAddressSetDefault,
  postCancelOrders,
  postCommentsDelete,
  postFavoriteDelete,
  postGoodsSend,
  postOrderFinish,
  postPayPrepay,
  postTipDeliver,
} from "@/services/api";
import {
  AddressItem,
  AllList,
  OrderListItemGoodsInfo,
  OrdersListItem,
} from "@/services/interface";
import generateListKey, {
  IGenerateKeyPostApiGoodsGoodsLists,
  IGenerateKeyPostApplyList,
  IGenerateKeyPostForumList,
} from "@/utils/generateListKey";
import { Confirm, Notify } from "notiflix";
import LazyLoad from "react-lazyload";
import MiniRefreshTools from "../../plugin/minirefresh/minirefresh";
import "../../plugin/minirefresh/minirefresh.css";
import MoneyValueUnitRender from "../MoneyValueUnitRender";
import SoldOut from "../SoldOut";

interface PageProps {
  dispatch: Dispatch;
  header?: React.ReactNode;
  //   top?: string;
  //   bottom?: string;
  params?: {
    [key: string]: any;
  };
  type: AllList;
  list: ListState;
  renderItem?: (item: any) => React.ReactNode;
}

const global = {
  params: {},
};
export default connect(({ list }: { list: ListState }) => {
  return {
    list,
  };
})(
  React.memo((props: PageProps) => {
    const miniRefresh = useRef<any>();
    const { user } = useSelector(
      ({ userinfo }: { userinfo: UserinfoState }) => {
        return userinfo;
      },
    );
    const {
      header = "",
      //   top = "",
      //   bottom = "",
      dispatch,
      type,
      list,
      params = {},
      renderItem,
    } = props;
    // 解决闭包问题
    global.params = params;
    const page = useRef({
      pageLimit: 10,
      pageNum: 1,
    });
    const cb =
      (reload: boolean) =>
      (data = []) => {
        page.current.pageNum = page.current.pageNum + 1;
        if (reload) {
          miniRefresh.current.endDownLoading(true);
        } else {
          if (data instanceof Array && data.length < 10) {
            miniRefresh.current.endUpLoading(true);
          } else {
            miniRefresh.current.endUpLoading(false);
          }
        }
      };
    const loadData = (reload = false) => {
      console.log("loadData");
      if (reload) {
        page.current.pageNum = 1;
      }
      switch (type) {
        case AllList.postForumListFromMy: {
          dispatch({
            type: "list/postForumListFromMy",
            payload: {
              ...page.current,
              ...global.params,
              cb: cb(reload),
            },
          });
          break;
        }
        case AllList.postForumList: {
          dispatch({
            type: "list/postForumList",
            payload: {
              ...page.current,
              ...global.params,
              cb: cb(reload),
            },
          });
          break;
        }
        case AllList.postTeamUsers: {
          dispatch({
            type: "list/postTeamUsers",
            payload: {
              ...page.current,
              ...global.params,
              cb: cb(reload),
            },
          });
          break;
        }
        case AllList.postTeamChildUsers: {
          dispatch({
            type: "list/postTeamChildUsers",
            payload: {
              ...page.current,
              ...global.params,
              cb: cb(reload),
            },
          });
          break;
        }
        case AllList.postOrdersList: {
          dispatch({
            type: "list/postOrdersList",
            payload: {
              ...page.current,
              ...global.params,
              cb: cb(reload),
            },
          });
          break;
        }
        case AllList.postApplyList: {
          dispatch({
            type: "list/postApplyList",
            payload: {
              ...page.current,
              ...global.params,
              cb: cb(reload),
            },
          });
          break;
        }
        case AllList.postAssetLogsList: {
          dispatch({
            type: "list/postAssetLogsList",
            payload: {
              ...page.current,
              ...global.params,
              cb: cb(reload),
            },
          });
          break;
        }
        case AllList.postUserFootLists: {
          dispatch({
            type: "list/postUserFootLists",
            payload: {
              ...page.current,
              ...global.params,
              cb: cb(reload),
            },
          });
          break;
        }
        case AllList.postCommentsLists: {
          dispatch({
            type: "list/postCommentsLists",
            payload: {
              ...page.current,
              ...global.params,
              cb: cb(reload),
            },
          });
          break;
        }
        case AllList.postFavorite: {
          dispatch({
            type: "list/postFavorite",
            payload: {
              ...page.current,
              ...global.params,
              cb: cb(reload),
            },
          });
          break;
        }

        case AllList.postApiGoodsGoodsLists: {
          dispatch({
            type: "list/postApiGoodsGoodsLists",
            payload: {
              ...page.current,
              ...global.params,
              cb: cb(reload),
            },
          });
          break;
        }
        case AllList.postApiOrdersListsForStorehouse: {
          dispatch({
            type: "list/postApiOrdersLists",
            payload: {
              ...page.current,
              ...global.params,
              cb: cb(reload),
            },
          });
          break;
        }
        case AllList.postApiOrdersLists: {
          dispatch({
            type: "list/postApiOrdersLists",
            payload: {
              ...page.current,
              ...global.params,
              cb: cb(reload),
            },
          });
          break;
        }
        case AllList.postAddressLists: {
          dispatch({
            type: "list/postAddressLists",
            payload: {
              ...page.current,
              ...global.params,
              cb: cb(reload),
            },
          });
          break;
        }
      }
    };
    useEffect(() => {
      miniRefresh.current = new MiniRefreshTools.theme.defaults({
        isUseBodyScroll: true,
        down: {
          isAuto: false,
          callback: () => {
            console.log("down-callback");

            loadData(true);
          },
        },
        up: {
          toTop: {
            // 是否开启点击回到顶部
            isEnable: false,
          },
          isAuto: false,
          callback: () => {
            console.log("up-callback");
            loadData(false);
          },
        },
        isScrollBar: 0,
      });
      return () => {
        miniRefresh.current.unload();
      };
    }, []);
    useEffect(() => {
      let listKey: keyof ListState | [keyof ListState, string] =
        "postAddressLists";
      switch (type) {
        case AllList.postForumListFromMy: {
          const key = generateListKey({
            type: AllList.postForumListFromMy,
            params: props.params as IGenerateKeyPostForumList,
          });
          listKey = ["postForumListFromMy", key];
          break;
        }
        case AllList.postForumList: {
          const key = generateListKey({
            type: AllList.postForumList,
            params: props.params as IGenerateKeyPostForumList,
          });
          listKey = ["postForumList", key];
          break;
        }
        /**
         * 搜索/首页/店中店共用的这个列表，现在缓存会造成搜索的结果无法呈现出来。
         */
        case AllList.postApiGoodsGoodsLists: {
          const key = generateListKey({
            type: AllList.postApiGoodsGoodsLists,
            params: props.params as IGenerateKeyPostApiGoodsGoodsLists,
          });
          listKey = ["postApiGoodsGoodsLists", key];
          break;
        }
        case AllList.postApiOrdersLists: {
          listKey = "postApiOrdersLists";
          break;
        }
        case AllList.postAddressLists: {
          listKey = "postAddressLists";
          break;
        }
        case AllList.postFavorite: {
          listKey = "postFavorite";
          break;
        }
        case AllList.postCommentsLists: {
          listKey = "postCommentsLists";
          break;
        }
        case AllList.postUserFootLists: {
          listKey = "postUserFootLists";
          break;
        }
        case AllList.postAssetLogsList: {
          listKey = "postAssetLogsList";
          break;
        }
        case AllList.postApplyList: {
          const key = generateListKey({
            type: AllList.postApplyList,
            params: props.params as IGenerateKeyPostApplyList,
          });
          listKey = ["postApplyList", key];
          break;
        }
        case AllList.postOrdersList: {
          listKey = "postOrdersList";
          break;
        }
        case AllList.postTeamChildUsers: {
          listKey = "postTeamChildUsers";
          break;
        }
        case AllList.postTeamUsers: {
          listKey = "postTeamUsers";
          break;
        }
        case AllList.postApiOrdersListsForStorehouse: {
          listKey = "postApiOrdersLists";
          break;
        }
      }
      if (listKey instanceof Array) {
        if (
          [
            "postApiGoodsGoodsLists",
            "postForumList",
            "postForumListFromMy",
          ].includes(listKey[0])
        ) {
          const tempList = list?.[listKey[0]]?.[listKey[1]] || [];
          page.current.pageNum = ~~(tempList.length / 10 + 1);
          if (tempList.length === 0) {
            loadData(false);
          }
        }
        if ("postApplyList".includes(listKey[0])) {
          const tempList = list?.[listKey[0]]?.[listKey[1]]?.list || [];
          page.current.pageNum = ~~(tempList.length / 10 + 1);
          if (tempList.length === 0) {
            loadData(false);
          }
        }
      } else {
        page.current.pageNum = ~~((list[listKey] || []).length / 10 + 1);
        if (list[listKey].length === 0) {
          loadData(false);
        }
      }
    }, [props.params, type]);

    function getList() {
      switch (type) {
        case AllList.postForumListFromMy: {
          const key = generateListKey({
            type: AllList.postForumListFromMy,
            params: props.params as IGenerateKeyPostForumList,
          });
          return (list.postForumListFromMy[key] || []).map((item) => {
            if (renderItem) {
              return renderItem(item);
            } else {
              return <div>没有渲染目标</div>;
            }
          });
        }
        case AllList.postForumList: {
          const key = generateListKey({
            type: AllList.postForumList,
            params: props.params as IGenerateKeyPostForumList,
          });
          return (list.postForumList[key] || []).map((item) => {
            if (renderItem) {
              return renderItem(item);
            } else {
              return <div>没有渲染目标</div>;
            }
          });
        }
        case AllList.postTeamUsers: {
          return (
            <div className="aui-content" style={{ width: "100%" }}>
              {list.postTeamUsers.length === 0 ? (
                <div
                  className="aui-col-xs-12 aui-text-center"
                  style={{ marginTop: "30%" }}
                >
                  <LazyLoad once>
                    <img
                      loading="lazy"
                      src={require("../../assets/img/no_content.png")}
                      style={{ width: "18%", margin: "0 auto" }}
                    />
                  </LazyLoad>
                  <h5
                    style={{ marginTop: "1rem" }}
                    className="aui-font-size-14"
                  >
                    Oh. Aquí no hay nada.
                  </h5>
                </div>
              ) : (
                ""
              )}
              <ul className="aui-list aui-media-list aui-bg-default">
                {list.postTeamUsers.map((team) => {
                  return (
                    <li
                      className="aui-list-item aui-list-item-middle aui-bg-white aui-margin-b-10"
                      key={team.id}
                    >
                      <div className="aui-media-list-item-inner">
                        <div
                          className="aui-list-item-media"
                          style={{ width: "3rem" }}
                        >
                          <img
                            src={
                              team.avatar
                                ? team.avatar
                                : require("../../assets/img/avatar.png")
                            }
                            className="aui-img-round aui-list-img-sm"
                          />
                        </div>
                        <div className="aui-list-item-inner">
                          <div className="aui-list-item-text">
                            <div className="aui-list-item-title">
                              {team.nick_name || team.mobile}
                            </div>
                            <div className="aui-list-item-right aui-text-info">
                              +
                              {team.user_info.already_drawcash_commission_money}
                            </div>
                          </div>
                          <div className="aui-list-item-text aui-margin-t-5">
                            <div className="aui-list-item-title aui-font-size-14 aui-text-pray">
                              Fecha de inscripción:
                              {team.become_distributor_time}
                            </div>
                            <div className="aui-list-item-right  aui-text-pray">
                              {team.team_num || 0}成员
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        }
        case AllList.postTeamChildUsers: {
          return (
            <div className="aui-content" style={{ width: "100%" }}>
              {list.postTeamChildUsers.length === 0 ? (
                <div
                  className="aui-col-xs-12 aui-text-center"
                  style={{ marginTop: "30%" }}
                >
                  <LazyLoad once>
                    <img
                      loading="lazy"
                      src={require("../../assets/img/no_content.png")}
                      style={{ width: "18%", margin: "0 auto" }}
                    />
                  </LazyLoad>
                  <h5
                    style={{ marginTop: "1rem" }}
                    className="aui-font-size-14"
                  >
                    Oh. Aquí no hay nada.
                  </h5>
                </div>
              ) : (
                ""
              )}
              <ul className="aui-list aui-media-list aui-bg-default">
                {list.postTeamChildUsers.map((cust) => {
                  return (
                    <li
                      className="aui-list-item aui-list-item-middle aui-bg-white aui-margin-b-10"
                      key={cust.id}
                    >
                      <div className="aui-media-list-item-inner">
                        <div
                          className="aui-list-item-media"
                          style={{ width: "3rem" }}
                        >
                          <img
                            src={
                              cust.avatar
                                ? cust.avatar
                                : require("../../assets/img/avatar.png")
                            }
                            className="aui-img-round aui-list-img-sm"
                          />
                        </div>
                        <div className="aui-list-item-inner">
                          <div
                            className="aui-list-item-text"
                            style={{ display: "flex" }}
                          >
                            <div className="aui-list-item-title">
                              {cust.mobile}
                            </div>
                            <div className="aui-list-item-right aui-text-info">
                              {cust.user_info.order_money}
                            </div>
                          </div>
                          <div
                            className="aui-list-item-text aui-margin-t-5"
                            style={{ display: "flex" }}
                          >
                            <div className="aui-list-item-title aui-font-size-14 aui-text-pray">
                              Fecha de inscripción: <br />
                              {cust.create_time}
                            </div>
                            <div className="aui-list-item-right  aui-text-pray">
                              {cust.user_info.order_num}Pedido
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        }
        case AllList.postOrdersList: {
          const statusFilter = (value: number): string | undefined => {
            if (value == 1) {
              return "Pagará";
            } else if (value == 2) {
              return "Pagará";
            } else if (value == 3) {
              return "Realizado";
            }
          };
          return (
            <div className="aui-content" style={{ width: "100%" }}>
              {list.postOrdersList.length === 0 ? (
                <div
                  className="aui-col-xs-12 aui-text-center"
                  style={{ marginTop: "30%" }}
                >
                  <LazyLoad once>
                    <img
                      loading="lazy"
                      src={require("../../assets/img/no_content.png")}
                      style={{ width: "18%", margin: "0 auto" }}
                    />
                  </LazyLoad>
                  <h5
                    style={{ marginTop: "1rem" }}
                    className="aui-font-size-14"
                  >
                    Oh. Aquí no hay nada.
                  </h5>
                </div>
              ) : (
                ""
              )}
              {list.postOrdersList.map((order) => {
                return (
                  <div key={order.order_id}>
                    <div
                      style={{ height: ".5rem", backgroundColor: "#f4f4f4" }}
                      className="aui-col-xs-12"
                    />
                    <div className="aui-padded-10 aui-font-size-14 aui-bg-white">
                      <span>
                        <span>
                          {order.source_user_info.nick_name ||
                            order.source_user_info.mobile}
                        </span>
                        <span className="aui-font-size-12">
                          {"(Nivel " + order.level + ")"}
                        </span>
                        <span className="aui-margin-l-10 aui-text-pray aui-font-size-12">
                          {order.order_info && order.order_info.create_time}
                        </span>
                      </span>
                      <span className="aui-pull-right aui-text-info">
                        {statusFilter(order.order_status)}
                      </span>
                    </div>
                    <div className="aui-padded-l-10 aui-font-size-14 aui-bg-white">
                      <span>
                        <span>
                          {order.order_info && order.order_info.order_no}
                        </span>
                      </span>
                    </div>
                    <ul className="aui-list aui-media-list">
                      {order.order_goods_info.map((goods) => {
                        return (
                          <li
                            className="aui-list-item aui-list-item-middle aui-bg-default aui-margin-b-5"
                            key={goods.id}
                          >
                            <div className="aui-media-list-item-inner">
                              <div
                                className="aui-list-item-media"
                                style={{ width: "3rem" }}
                              >
                                <img
                                  src={
                                    goods.order_goods_info &&
                                    goods.order_goods_info.thum
                                  }
                                  className="aui-list-img-sm"
                                />
                              </div>
                              <div className="aui-list-item-inner">
                                <div className="aui-list-item-text">
                                  <div className="aui-list-item-title">
                                    {goods.order_goods_info &&
                                      goods.order_goods_info.name}
                                  </div>
                                  <div className="aui-list-item-right">
                                    {order.order_status == 3
                                      ? "Comisión recibida"
                                      : "Comisión prevista"}
                                  </div>
                                </div>
                                <div className="aui-list-item-text aui-margin-t-5">
                                  <div className="aui-list-item-title aui-font-size-14 aui-text-pray">
                                    x
                                    {goods.order_goods_info &&
                                      goods.order_goods_info.num}
                                  </div>
                                  <div className="aui-list-item-right  aui-text-pray">
                                    {order.order_status == 3 ? (
                                      <MoneyValueUnitRender afterSymbol="+">
                                        {goods.real_money}
                                      </MoneyValueUnitRender>
                                    ) : (
                                      <MoneyValueUnitRender afterSymbol="+">
                                        {goods.expect_money}
                                      </MoneyValueUnitRender>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}
            </div>
          );
        }
        case AllList.postApplyList: {
          const statusFilter = (value: number) => {
            if (value == 1) {
              return "Pendiente de examen";
            } else if (value == 2) {
              return "Sin verificar";
            } else if (value == 3) {
              return "Fondos asignados";
            }
          };
          const key = generateListKey({
            type: AllList.postApplyList,
            params: props.params as IGenerateKeyPostApplyList,
          });
          return (
            <div className="aui-content" style={{ width: "100%" }}>
              {(list.postApplyList?.[key]?.list || []).length === 0 ? (
                <div
                  className="aui-col-xs-12 aui-text-center"
                  style={{ marginTop: "30%" }}
                >
                  <LazyLoad once>
                    <img
                      loading="lazy"
                      src={require("../../assets/img/no_content.png")}
                      style={{ width: "18%", margin: "0 auto" }}
                      alt={"no_content"}
                    />
                  </LazyLoad>
                  <h5
                    style={{ marginTop: "1rem" }}
                    className="aui-font-size-14"
                  >
                    Oh. Aquí no hay nada.
                  </h5>
                </div>
              ) : (
                ""
              )}
              <ul className="aui-list aui-media-list aui-bg-default">
                {(list.postApplyList?.[key]?.list || []).map((apply, index) => {
                  return (
                    <li
                      className="aui-list-item aui-list-item-middle aui-bg-white aui-margin-b-10"
                      key={index}
                      data-click="goDetail(apply)"
                    >
                      <div className="aui-media-list-item-inner">
                        <div className="aui-list-item-inner">
                          <div className="aui-list-item-text">
                            <div className="aui-list-item-title">
                              {apply.intro}
                            </div>
                            <div className="aui-list-item-right aui-text-info">
                              +
                              <MoneyValueUnitRender>
                                {apply.money}
                              </MoneyValueUnitRender>
                            </div>
                          </div>
                          <div className="aui-list-item-text aui-margin-t-5">
                            <div className="aui-list-item-title aui-font-size-12 aui-text-pray">
                              Numeración:{apply.apply_no}
                            </div>
                            <div
                              className="aui-list-item-right  aui-text-pray aui-font-size-12"
                              style={{ color: "#e95d40!important" }}
                            >
                              {statusFilter(apply.status)}
                            </div>
                          </div>
                          <div className="aui-list-item-text aui-margin-t-5">
                            <div className="aui-list-item-title aui-font-size-12 aui-text-pray">
                              Tiempo de aplicación:{apply.create_time}
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        }
        case AllList.postAssetLogsList: {
          return (
            <div className="aui-content" style={{ width: "100%" }}>
              {list.postAssetLogsList.length === 0 ? (
                <div
                  className="aui-col-xs-12 aui-text-center"
                  style={{ marginTop: "30%" }}
                >
                  <LazyLoad once>
                    <img
                      loading="lazy"
                      src={require("../../assets/img/no_content.png")}
                      style={{ width: "18%", margin: "0 auto" }}
                    />
                  </LazyLoad>
                  <h5
                    style={{ marginTop: "1rem" }}
                    className="aui-font-size-14"
                  >
                    Oh. Aquí no hay nada.
                  </h5>
                </div>
              ) : (
                ""
              )}
              <ul className="wallet-ul">
                {list.postAssetLogsList.map((log) => {
                  return (
                    <li className={styles.wallet_li} key={log.id}>
                      <div className="wallet-text text-one aui-font-size-16 aui-text-default">
                        <div className="wallet-text-left">{log.intro}</div>
                        <div className="wallet-text-right">
                          {log.symbol}
                          <MoneyValueUnitRender>
                            {log.change_money}
                          </MoneyValueUnitRender>
                        </div>
                      </div>
                      <div className="wallet-text text-two aui-font-size-12">
                        <div className="wallet-text-left">
                          {log.update_time}
                        </div>
                        <div className="wallet-text-right" />
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        }
        case AllList.postUserFootLists: {
          return (
            <div className="aui-content" style={{ width: "100%" }}>
              {list.postUserFootLists.length === 0 ? (
                <div
                  className="aui-col-xs-12 aui-text-center"
                  style={{ marginTop: "30%" }}
                >
                  <LazyLoad once>
                    <img
                      loading="lazy"
                      src={require("../../assets/img/no_content.png")}
                      style={{ width: "18%", margin: "0 auto" }}
                    />
                  </LazyLoad>
                  <h5
                    style={{ marginTop: "1rem" }}
                    className="aui-font-size-14"
                  >
                    Oh. Aquí no hay nada.
                  </h5>
                </div>
              ) : (
                ""
              )}

              <div className="aui-flex-col aui-flex-center">
                <div className="aui-flex-item-12">
                  <div className="aui-flex-col">
                    {list.postUserFootLists.map((trace) => {
                      if (trace.goods_info === null) {
                        return "";
                      }
                      return (
                        <div
                          className="aui-flex-item-6"
                          style={{ position: "relative", padding: "3px" }}
                          key={trace.id}
                        >
                          <LazyLoad once>
                            <img
                              loading="lazy"
                              style={{ display: "block" }}
                              src={trace.goods_info.thum}
                              onClick={() => {
                                history.push(
                                  `/goodsDetails?id=${trace.goods_id}`,
                                );
                              }}
                            />
                          </LazyLoad>
                          <h5
                            className="aui-text-default aui-ellipsis-2 aui-font-size-12 aui-padded-t-5 aui-padded-l-10 aui-padded-r-10  aui-bg-white"
                            style={{ height: "2.2rem" }}
                          >
                            {trace.goods_info.name}
                          </h5>
                          <p className="aui-padded-b-5 aui-padded-t-5 aui-padded-l-10 aui-padded-r-10  aui-bg-white">
                            {/* <span
                              className="aui-text-price"
                              style={{ fontSize: "0.5rem" }}
                            >
                              $
                            </span> */}
                            <span className="aui-text-price aui-font-size-14">
                              <MoneyValueUnitRender>
                                {trace.goods_info.sell_price}
                              </MoneyValueUnitRender>
                            </span>
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          );
        }
        case AllList.postCommentsLists: {
          const removeComments = (commentId: number) => {
            Confirm.show(
              "Confirmar comentarios borrados?",
              "",
              "Confirmar",
              "Cancelar",
              () => {
                postCommentsDelete(commentId).then((res) => {
                  if (res) {
                    Notify.success(res.msg);
                    dispatch({
                      type: "list/updateComments",
                      payload: {
                        type: Action.DeleteItem,
                        commentId,
                      },
                    });
                  }
                });
              },
            );
          };
          return (
            <div className="aui-content" style={{ width: "100%" }}>
              {list.postCommentsLists.length === 0 ? (
                <div
                  className="aui-col-xs-12 aui-text-center"
                  style={{ marginTop: "30%" }}
                >
                  <LazyLoad once>
                    <img
                      loading="lazy"
                      src={require("../../assets/img/no_content.png")}
                      style={{ width: "18%", margin: "0 auto" }}
                    />
                  </LazyLoad>
                  <h5
                    style={{ marginTop: "1rem" }}
                    className="aui-font-size-14"
                  >
                    Oh. Aquí no hay nada.
                  </h5>
                </div>
              ) : (
                ""
              )}

              {list.postCommentsLists.map((comment) => {
                return (
                  <div
                    className="aui-padded-5  aui-bg-white aui-border-b"
                    key={comment.id}
                  >
                    <div
                      className="aui-bg-white aui-padded-r-15 aui-padded-l-15"
                      style={{ height: "2rem", lineHeight: "2rem" }}
                    >
                      <span className="aui-font-size-14 aui-pull-left">
                        {comment.create_time}
                      </span>
                      <i
                        className="aui-iconfont iconfont icon-shanchu aui-pull-right"
                        onClick={() => removeComments(comment.id)}
                      />
                    </div>
                    <div
                      className="aui-padded-t-5 aui-bg-white"
                      style={{ backgroundImage: "none" }}
                    >
                      <ul className="aui-list aui-media-list">
                        <li
                          className="aui-list-item aui-margin-b-5 aui-bg-default"
                          style={{ backgroundImage: "none" }}
                          onClick={() => {
                            history.push(
                              `/goodsDetails?id=${comment.goods_id}`,
                            );
                          }}
                        >
                          <div className="aui-media-list-item-inner">
                            <div className="aui-list-item-media">
                              {comment.order_goods_info && (
                                <LazyLoad once>
                                  <img
                                    loading="lazy"
                                    src={comment.order_goods_info.thum}
                                  />
                                </LazyLoad>
                              )}
                            </div>
                            <div className="aui-list-item-inner">
                              <div className="aui-list-item-text">
                                {comment.order_goods_info ? (
                                  <div className="aui-list-item-title aui-ellipsis-2 aui-font-size-14">
                                    {comment.order_goods_info.name}
                                  </div>
                                ) : (
                                  ""
                                )}
                              </div>
                              <div className="aui-margin-t-5">
                                <span
                                  style={{
                                    fontSize: "0.6rem",
                                    color: "#757575",
                                  }}
                                >
                                  Especificaciones:
                                  {comment.order_goods_info.spec_group_info}
                                </span>
                                <span
                                  className="aui-font-size-14 aui-pull-right aui-font-size-16 aui-margin-r-15"
                                  style={{ color: "#df0303" }}
                                >
                                  <MoneyValueUnitRender>
                                    {comment.order_goods_info.sell_price}
                                  </MoneyValueUnitRender>
                                </span>
                              </div>
                              <div>
                                <span
                                  style={{
                                    fontSize: "0.6rem",
                                    color: "#757575",
                                  }}
                                >
                                  Cantidad:{comment.order_goods_info.num}
                                </span>
                                <span
                                  className="aui-pull-right aui-margin-r-15"
                                  style={{
                                    color: "#757575",
                                    fontSize: "0.6rem",
                                    textDecoration: "line-through",
                                    marginTop: "-0.2rem",
                                  }}
                                >
                                  {comment.order_goods_info.real_price}
                                </span>
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div>
                      {"."
                        .repeat(5)
                        .split("")
                        .map((_, index) => {
                          return (
                            <i
                              key={index}
                              className="aui-iconfont iconfont icon-shoucang aui-margin-5"
                              style={{
                                fontSize: "1.2rem",
                                color:
                                  index + 1 <= parseInt(comment.score, 10)
                                    ? "#ffc640"
                                    : "#ccc",
                              }}
                            />
                          );
                        })}
                    </div>
                    <div className="aui-list-item-text aui-padded-t-5 aui-padded-b-5">
                      {comment.content}
                    </div>
                    <div className="aui-row aui-row-padded">
                      {comment.imgs.map((img, index) => (
                        <div className="aui-col-xs-3" key={index}>
                          <LazyLoad once>
                            <img loading="lazy" src={img} />
                          </LazyLoad>
                        </div>
                      ))}
                    </div>
                    <hr className="layui-bg-gray" />
                  </div>
                );
              })}
            </div>
          );
        }

        case AllList.postFavorite: {
          const removeFavorite = (favoriteId: number) => {
            Confirm.show("¿Cancelar del favorito?", "", "Sí", "No", () => {
              postFavoriteDelete(favoriteId).then((res) => {
                if (res) {
                  Notify.success(res.msg);
                  dispatch({
                    type: "list/updateFavorite",
                    payload: {
                      type: Action.DeleteItem,
                      favoriteId,
                    },
                  });
                }
              });
            });
          };
          return (
            <div
              className="aui-content aui-margin-b-10"
              style={{ width: "100%" }}
            >
              {list.postFavorite.length === 0 ? (
                <div
                  className="aui-col-xs-12 aui-text-center"
                  style={{ marginTop: "30%" }}
                >
                  <LazyLoad once>
                    <img
                      loading="lazy"
                      src={require("../../assets/img/no_content.png")}
                      style={{ width: "18%", margin: "0 auto" }}
                    />
                  </LazyLoad>
                  <h5
                    style={{ marginTop: "1rem" }}
                    className="aui-font-size-14"
                  >
                    Oh. Aquí no hay nada.
                  </h5>
                </div>
              ) : (
                <></>
              )}
              <div className="aui-flex-col aui-flex-center">
                <div className="aui-flex-item-12">
                  <div className="aui-flex-col">
                    {list.postFavorite.map((collection) => {
                      if (!collection.goods_info) {
                        return (
                          <div
                            className="aui-flex-item-6"
                            style={{ position: "relative", padding: "3px" }}
                            key={collection.id}
                          >
                            商品不存在
                            <span
                              className="aui-iconfont iconfont icon-shanchu aui-pull-right"
                              onClick={() => {
                                removeFavorite(collection.id);
                              }}
                            />
                          </div>
                        );
                      }
                      return (
                        <div
                          className="aui-flex-item-6"
                          style={{ position: "relative", padding: "3px" }}
                          key={collection.id}
                        >
                          <LazyLoad once>
                            <img
                              loading="lazy"
                              style={{ display: "block" }}
                              src={collection.goods_info.thum}
                              onClick={() => {
                                history.push(
                                  `/goodsDetails?id=${collection.goods_id}`,
                                );
                              }}
                            />
                          </LazyLoad>
                          <h5 className="aui-text-default aui-ellipsis-2 aui-font-size-12 aui-padded-t-5 aui-padded-l-10 aui-padded-r-10  aui-bg-white">
                            {collection.goods_info.name}
                          </h5>
                          <p className="aui-padded-b-5 aui-padded-t-5 aui-padded-l-10 aui-padded-r-10  aui-bg-white">
                            {/* <span
                              className="aui-text-price"
                              style={{ fontSize: "0.5rem" }}
                            >
                              $
                            </span> */}
                            <span className="aui-text-price aui-font-size-14">
                              <MoneyValueUnitRender>
                                {collection.goods_info.sell_price}
                              </MoneyValueUnitRender>
                            </span>
                            <span
                              className="aui-iconfont iconfont icon-shanchu aui-pull-right"
                              onClick={() => {
                                removeFavorite(collection.id);
                              }}
                            />
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          );
        }
        case AllList.postAddressLists: {
          const setDefaultAddress = (addressId: number): void => {
            postAddressSetDefault({
              addressId,
            }).then((res) => {
              if (res) {
                Notify.success(res.msg);
                dispatch({
                  type: "list/updateAddress",
                  payload: {
                    type: Action.SetDefault,
                    addressId,
                  },
                });
              }
            });
          };
          const modifyAddress = (addressId: number): void => {
            history.push("/addressEdit", {
              addressId,
            });
          };
          const deleteAddress = (addressId: number): void => {
            Confirm.show(
              "waring",
              "¿Borrar la dirección?",
              "Confirmar",
              "Cancelar",
              () => {
                postAddressDelete({
                  addressId,
                }).then((res) => {
                  if (res) {
                    Notify.success(res.msg);
                    dispatch({
                      type: "list/updateAddress",
                      payload: {
                        type: Action.DeleteItem,
                        addressId,
                      },
                    });
                  }
                });
              },
            );
          };
          const selectAddress = (address: AddressItem) => {
            const { selectAddress = false } = params ? params : {};

            if (selectAddress) {
              sessionStorage.setItem("address", JSON.stringify(address));
              history.goBack();
            }
          };
          return (
            <section className="aui-content" style={{ width: "100%" }}>
              {list.postAddressLists.length === 0 ? (
                <div
                  className="aui-col-xs-12 aui-text-center"
                  style={{ marginTop: "30%" }}
                >
                  <LazyLoad once>
                    <img
                      loading="lazy"
                      src={require("../../assets/img/no_content.png")}
                      style={{ width: "18%", margin: "0 auto" }}
                    />
                  </LazyLoad>
                  <h5
                    style={{ marginTop: "1rem" }}
                    className="aui-font-size-14"
                  >
                    Oh. Aquí no hay nada.
                  </h5>
                </div>
              ) : (
                ""
              )}
              {list.postAddressLists.map((address: AddressItem) => {
                return (
                  <div key={address.id} className="aui-card-list">
                    <div onClick={() => selectAddress(address)}>
                      <div className="aui-card-list-header aui-font-size-14">
                        {address.consignee_name}
                        {address.mobile}
                      </div>
                      <div className="aui-card-list-content-padded aui-padded-t-0 text-light">
                        {address.province} {address.city} {address.area}
                        {address.address}
                      </div>
                    </div>
                    <div className="aui-card-list-footer aui-border-t">
                      <div onClick={() => setDefaultAddress(address.id)}>
                        {address.is_default != 1 ? (
                          <>
                            <i
                              className="aui-iconfont iconfont icon-roundcheckfill aui-margin-r-5 aui-font-size-15"
                              style={{ color: "#ccc" }}
                            />
                            Dirección predeterminada
                          </>
                        ) : (
                          <>
                            <i className="aui-iconfont iconfont icon-roundcheckfill aui-margin-r-5 aui-font-size-15 aui-text-info" />
                            Dirección predeterminada
                          </>
                        )}
                      </div>
                      <div>
                        <div
                          onClick={() => modifyAddress(address.id)}
                          style={{ display: "inline" }}
                        >
                          <i className="aui-iconfont iconfont icon-icon- aui-margin-r-5 aui-font-size-15" />
                          Edición
                        </div>
                        <div
                          onClick={() => deleteAddress(address.id)}
                          style={{ display: "inline" }}
                        >
                          <i className="aui-iconfont iconfont icon-shanchu aui-margin-r-5 aui-margin-l-15 aui-font-size-15" />
                          Eliminar
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </section>
          );
        }

        case AllList.postApiGoodsGoodsLists: {
          const key = generateListKey({
            type: AllList.postApiGoodsGoodsLists,
            params: props.params as IGenerateKeyPostApiGoodsGoodsLists,
          });
          const tempList = list.postApiGoodsGoodsLists[key] || [];
          return tempList.map((item) => {
            return (
              <Link
                to={`/goodsDetails?id=${item.id}`}
                key={item.id}
                className="aui-flex-item-6"
                style={{ position: "relative", padding: "3px" }}
              >
                {/* aspect-ratio : 1 */}
                <div style={{ paddingTop: "100%", position: "relative" }}>
                  <LazyLoad once>
                    <img
                      loading="lazy"
                      src={item.thum}
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        objectFit: "cover",
                      }}
                    />
                  </LazyLoad>
                  {item.stock === 0 && <SoldOut />}
                </div>{" "}
                {/**/}
                <h5
                  className="aui-text-default aui-ellipsis-2 aui-font-size-12 aui-padded-t-5 aui-padded-l-5 aui-padded-r-5 aui-bg-white"
                  style={{ height: "2rem", marginBottom: 0 }}
                >
                  {item.name}
                </h5>
                <div
                  style={{ marginBottom: 0, position: "relative" }}
                  className="aui-padded-b-5 aui-padded-t-5 aui-padded-l-10 aui-padded-r-10 aui-bg-white "
                >
                  {/* <span className="aui-text-price aui-font-size-10">$</span>{" "} */}
                  <span className="aui-text-price ">
                    <MoneyValueUnitRender fontSize={"14px"}>
                      {item.sell_price}
                    </MoneyValueUnitRender>
                  </span>
                  <div
                    style={{
                      position: "absolute",
                      right: ".5rem",
                      bottom: ".25rem",
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    {item.free_shipping ? (
                      <img
                        src={require("../../assets/img/label/tag1.png")}
                        alt=""
                        style={{
                          width: "24px",
                          height: "24px",
                          marginLeft: "5px",
                        }}
                      />
                    ) : (
                      ""
                    )}
                    {item.tag_ids.includes(7) ? (
                      <img
                        src={require("../../assets/img/label/tag2.png")}
                        alt=""
                        style={{
                          width: "24px",
                          height: "24px",
                          marginLeft: "5px",
                        }}
                      />
                    ) : (
                      ""
                    )}
                    {item.shared ? (
                      <img
                        src={require("../../assets/img/label/tag3.png")}
                        alt=""
                        style={{
                          width: "24px",
                          height: "24px",
                          marginLeft: "5px",
                        }}
                      />
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </Link>
            );
          });
        }
        // todo 暂时先用下面的列表
        // case AllList.postApiOrdersListsForStorehouse: {
        //   return (
        //     <div className={storehouse.order_list}>
        //       {list.postApiOrdersLists.map((item) => {
        //         return (
        //           <div className={storehouse.item} key={item.id}>
        //             <div className={storehouse.header}>
        //               <div className={storehouse.sn}>
        //                 订单号：23847563928174
        //               </div>
        //               <div className={storehouse.status}>待发货</div>
        //             </div>
        //             <div className={storehouse.content}>
        //               <div className={storehouse.df_ai}>
        //                 <div className={storehouse.name}>1元代金券</div>
        //                 <div className={storehouse.time}>2019-01-08 09:05</div>
        //               </div>
        //               <div className={storehouse.form}>付款人：Momo</div>
        //               <div className={storehouse.df_ai}>
        //                 <div className={storehouse.money}>¥1*100件=¥100</div>
        //                 <div className={storehouse.button}>去发货</div>
        //               </div>
        //             </div>
        //           </div>
        //         );
        //       })}

        //     </div>
        //   );
        // }
        // 店中店的列表页
        case AllList.postApiOrdersListsForStorehouse: {
          const orderStatus = (order: OrdersListItem): string => {
            let str = "";
            if (order.status == 1) {
              str += "Esperando el pago";
            } else if (order.status == 2) {
              str += "Esperando la entrega";
            } else if (order.status == 3) {
              str += "Mercancías entregadas";
            } else if (order.status == 4) {
              str += "Realizado";
            } else if (order.status == 9) {
              str += "Orden cancelada";
            }
            return str;
          };

          const cancelOrder = (
            e: React.MouseEvent<HTMLDivElement>,
            order: OrdersListItem,
          ) => {
            e.stopPropagation();
            Confirm.show(
              "Confirm",
              "Por favor,seleccione la causa de la cancelación?",
              "Confirmar",
              "Cancelar",
              function () {
                postCancelOrders({
                  order_id: order.id,
                  cancel_reason: "Confirmar",
                }).then((res) => {
                  if (res) {
                    Notify.success(res.msg);
                    dispatch({
                      type: "list/setState",
                      payload: {
                        key: ["postApiOrdersLists", { id: order.id }],
                        value: {
                          status: 9,
                        },
                      },
                    });
                  }
                });
              },
              function () {},
            );
          };
          const orderPay = (
            e: React.MouseEvent<HTMLDivElement>,
            order: OrdersListItem,
          ) => {
            e.stopPropagation();
            postPayPrepay({
              order_id: order.id,
            }).then((res) => {
              if (res) {
                history.push("/paySelect", {
                  order_no: order.order_no,
                  total_money: order.total_money,
                });
              }
            });
          };
          const refund = (
            e: React.MouseEvent<HTMLDivElement>,
            goods: OrderListItemGoodsInfo,
          ) => {
            e.stopPropagation();
            history.push("/refundGoods", {
              goods: goods,
            });
          };
          const goComment = (
            e: React.MouseEvent<HTMLDivElement>,
            goods: OrderListItemGoodsInfo,
          ) => {
            e.stopPropagation();
            history.push("/commentAdd", {
              goods: goods,
            });
          };
          const goLogistics = (
            e: React.MouseEvent<HTMLDivElement>,
            order: OrdersListItem,
          ) => {
            e.stopPropagation();
            history.push("/logistics", {
              order,
            });
          };
          const remind = (
            e: React.MouseEvent<HTMLDivElement>,
            order: OrdersListItem,
          ) => {
            e.stopPropagation();
            postTipDeliver({
              order_id: order.id,
            }).then((res) => {
              if (res) {
                Notify.success(res.msg);
              }
            });
          };

          /**
           * 店中店发货
           * @param e
           * @param order
           */
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          function sendGoods(
            e: React.MouseEvent<HTMLDivElement, MouseEvent>,
            order: OrdersListItem,
          ): void {
            e.stopPropagation();
            postGoodsSend(order.id).then((res) => {
              if (res) {
                Notify.success(res.msg);
                dispatch({
                  type: "list/setState",
                  payload: {
                    key: ["postApiOrdersLists", { id: order.id }],
                    value: {
                      status: 4,
                    },
                  },
                });
              }
            });
          }

          const finish = (
            e: React.MouseEvent<HTMLDivElement>,
            order: OrdersListItem,
          ) => {
            e.stopPropagation();
            Confirm.show(
              "Confirm",
              "Confirmen la recepción?",
              "Confirmar",
              "Cancelar",
              function () {
                postOrderFinish({
                  order_id: order.id,
                }).then((res) => {
                  if (res) {
                    Notify.success(res.msg);
                    dispatch({
                      type: "list/setState",
                      payload: {
                        key: ["postApiOrdersLists", { id: order.id }],
                        value: {
                          status: 4,
                        },
                      },
                    });
                  }
                });
              },
              function () {},
            );
          };
          // 显示html详情
          const viewDetails = (
            e: React.MouseEvent<HTMLDivElement>,
            order: OrdersListItem,
          ): void => {
            history.push("/viewHtmlDetails", {
              order,
            });
          };

          return (
            <div className="aui-content" style={{ width: "100%" }}>
              {/*什么都没有*/}
              {list.postApiOrdersLists.length === 0 ? (
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <div
                    className="aui-col-xs-12 aui-text-center"
                    style={{ marginTop: "30%" }}
                  >
                    <LazyLoad once>
                      <img
                        loading="lazy"
                        src={require("../../assets/img/no_content.png")}
                        style={{ width: "18%", margin: "0 auto" }}
                      />
                    </LazyLoad>
                    <h5
                      style={{ marginTop: "1rem" }}
                      className="aui-font-size-14"
                    >
                      Oh. Aquí no hay nada.
                    </h5>
                  </div>
                </div>
              ) : (
                <></>
              )}
              {list.postApiOrdersLists.map((order) => {
                return (
                  <div
                    className="aui-padded-5 aui-bg-white aui-margin-t-10"
                    key={order.id}
                    onClick={() => {
                      history.push("/orderDetail", {
                        order,
                      });
                    }}
                  >
                    <div className="aui-padded-5 aui-font-size-12">
                      <span>{order.cancel_time}</span>
                      {order.order_no}
                      <span className="aui-pull-right aui-text-info">
                        {orderStatus(order)}
                      </span>
                    </div>
                    <div className=" aui-padded-l-5 aui-padded-r-5 aui-bg-white">
                      <ul className="aui-list aui-media-list">
                        {order.order_goods_info.map((goods) => {
                          return (
                            <li
                              className="aui-list-item aui-margin-b-5 aui-bg-default"
                              key={goods.id}
                            >
                              <div
                                className="aui-media-list-item-inner"
                                style={{ width: "100%" }}
                              >
                                <div
                                  className="aui-list-item-media aui-col-4"
                                  //   to={`/goodsDetails?id=${goods.goods_id}`}
                                >
                                  <LazyLoad once>
                                    <img loading="lazy" src={goods.thum} />
                                  </LazyLoad>
                                </div>

                                <div className="aui-list-item-inner aui-col-8">
                                  <div className="aui-list-item-text aui-col-xs-12">
                                    <div
                                      className="aui-list-item-title aui-ellipsis-2 aui-font-size-14"
                                      style={{ width: "70%" }}
                                    >
                                      {goods.name}
                                    </div>
                                    <div className="aui-list-item-righ aui-text-price">
                                      {/* <span style={{ fontSize: "0.5rem" }}>
                                        $
                                      </span> */}
                                      <span className="aui-font-size-14">
                                        <MoneyValueUnitRender>
                                          {goods.real_price}
                                        </MoneyValueUnitRender>
                                      </span>
                                    </div>
                                  </div>

                                  {order.market_activity_id !== 0 ? (
                                    <div className="aui-list-item-text aui-col-xs-12">
                                      <div
                                        className="aui-list-item-title aui-ellipsis-2 aui-font-size-14"
                                        style={{ width: "70%" }}
                                      />
                                      <div
                                        className="aui-list-item-righ"
                                        style={{
                                          textDecoration: "line-through",
                                        }}
                                      >
                                        {/* <span style={{ fontSize: "0.4rem" }}>
                                          $
                                        </span> */}
                                        <span className="aui-font-size-12 ">
                                          {/* {goods.sell_price} */}
                                          <MoneyValueUnitRender>
                                            {goods.sell_price}
                                          </MoneyValueUnitRender>
                                        </span>
                                      </div>
                                    </div>
                                  ) : (
                                    <></>
                                  )}

                                  <div className="aui-list-item-text aui-col-xs-12 aui-text-pray aui-margin-t-5">
                                    <div
                                      className="aui-list-item-title aui-font-size-12 aui-text-pray"
                                      style={{ width: "70%" }}
                                    >
                                      {goods.spec_group_id != 0 ? (
                                        <span>
                                          Especificaciones:{" "}
                                          {goods.spec_group_info}
                                        </span>
                                      ) : (
                                        <></>
                                      )}
                                    </div>
                                    <div className="aui-list-item-righ aui-text-pray">
                                      <span className="aui-padded-5">
                                        x{goods.num}
                                      </span>
                                    </div>
                                  </div>

                                  <div className="aui-list-item-text aui-margin-t-10">
                                    <div
                                      className="aui-list-item-title aui-text-pray aui-font-size-12 "
                                      style={{ width: "70%" }}
                                    />
                                  </div>
                                </div>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                    {/* 小计 */}
                    <div
                      className="aui-padded-t-10 aui-padded-b-10 aui-text-right aui-bg-white aui-font-size-12 "
                      style={{ width: "100%" }}
                    >
                      Total
                      <span>{order.order_goods_info.length}</span> Productos
                      Total:
                      {/* <span
                        className="aui-text-price "
                        style={{ fontSize: "0.5rem" }}
                      >
                        $
                      </span> */}
                      <span className="aui-text-price aui-font-size-14 ">
                        <MoneyValueUnitRender>
                          {order.total_money}
                        </MoneyValueUnitRender>
                      </span>
                      <span>
                        {/* $ */}( Flete incluido{" "}
                        <span>
                          <MoneyValueUnitRender>
                            {order.freight_money}
                          </MoneyValueUnitRender>
                        </span>{" "}
                        )
                      </span>
                    </div>
                    {/* 按钮组 */}
                    <div className="order-buttons aui-padded-b-5 ">
                      {/*发货*/}
                      {order.status === 2 && order.shoper_id === user.id && (
                        <div
                          className="button active "
                          onClick={(e) => {
                            e.stopPropagation();
                            history.push(`/storehouse/delivery?id=${order.id}`);
                          }}
                        >
                          Delivery
                        </div>
                      )}
                      {/*{(order.status == 2 || order.status == 3) &&*/}
                      {/*order.shoper_id === user.id && (*/}
                      {/*  <div*/}
                      {/*    className="button active "*/}
                      {/*    onClick={(e) => sendGoods(e, order)}*/}
                      {/*  >*/}
                      {/*    Verificar*/}
                      {/*  </div>*/}
                      {/*)}*/}
                      {order.status == 3 ? (
                        <div
                          className="button "
                          style={{ width: "6rem" }}
                          onClick={(e) => viewDetails(e, order)}
                        >
                          Detalles
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          );
        }
        // 我的订单详情页
        case AllList.postApiOrdersLists: {
          const orderStatus = (order: OrdersListItem): string => {
            let str = "";
            if (order.status == 1) {
              str += "Esperando el pago";
            } else if (order.status == 2) {
              str += "Esperando la entrega";
            } else if (order.status == 3) {
              str += "Mercancías entregadas";
            } else if (order.status == 4) {
              str += "Realizado";
            } else if (order.status == 9) {
              str += "Orden cancelada";
            }
            return str;
          };

          const cancelOrder = (
            e: React.MouseEvent<HTMLDivElement>,
            order: OrdersListItem,
          ) => {
            e.stopPropagation();
            Confirm.show(
              "Confirm",
              "Por favor,seleccione la causa de la cancelación?",
              "Confirmar",
              "Cancelar",
              function () {
                postCancelOrders({
                  order_id: order.id,
                  cancel_reason: "Confirmar",
                }).then((res) => {
                  if (res) {
                    Notify.success(res.msg);
                    dispatch({
                      type: "list/setState",
                      payload: {
                        key: ["postApiOrdersLists", { id: order.id }],
                        value: {
                          status: 9,
                        },
                      },
                    });
                  }
                });
              },
              function () {},
            );
          };
          const orderPay = (
            e: React.MouseEvent<HTMLDivElement>,
            order: OrdersListItem,
          ) => {
            e.stopPropagation();
            postPayPrepay({
              order_id: order.id,
            }).then((res) => {
              if (res) {
                history.push("/paySelect", {
                  order_no: order.order_no,
                  total_money: order.total_money,
                });
              }
            });
          };
          const refund = (
            e: React.MouseEvent<HTMLDivElement>,
            goods: OrderListItemGoodsInfo,
          ) => {
            e.stopPropagation();
            history.push("/refundGoods", {
              goods: goods,
            });
          };
          const goComment = (
            e: React.MouseEvent<HTMLDivElement>,
            goods: OrderListItemGoodsInfo,
          ) => {
            e.stopPropagation();
            history.push("/commentAdd", {
              goods: goods,
            });
          };
          const goLogistics = (
            e: React.MouseEvent<HTMLDivElement>,
            order: OrdersListItem,
          ) => {
            e.stopPropagation();
            history.push("/logistics", {
              order,
            });
          };
          const remind = (
            e: React.MouseEvent<HTMLDivElement>,
            order: OrdersListItem,
          ) => {
            e.stopPropagation();
            postTipDeliver({
              order_id: order.id,
            }).then((res) => {
              if (res) {
                Notify.success(res.msg);
              }
            });
          };
          const finish = (
            e: React.MouseEvent<HTMLDivElement>,
            order: OrdersListItem,
          ) => {
            e.stopPropagation();
            Confirm.show(
              "Confirm",
              "Confirmen la recepción?",
              "Confirmar",
              "Cancelar",
              function () {
                postOrderFinish({
                  order_id: order.id,
                }).then((res) => {
                  if (res) {
                    Notify.success(res.msg);
                    dispatch({
                      type: "list/setState",
                      payload: {
                        key: ["postApiOrdersLists", { id: order.id }],
                        value: {
                          status: 4,
                        },
                      },
                    });
                  }
                });
              },
              function () {},
            );
          };
          // 显示html详情
          const viewDetails = (
            e: React.MouseEvent<HTMLDivElement>,
            order: OrdersListItem,
          ): void => {
            e.stopPropagation();
            history.push("/viewHtmlDetails", {
              order,
            });
          };

          return (
            <div className="aui-content" style={{ width: "100%" }}>
              {/*什么都没有*/}
              {list.postApiOrdersLists.length === 0 ? (
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <div
                    className="aui-col-xs-12 aui-text-center"
                    style={{ marginTop: "30%" }}
                  >
                    <LazyLoad once>
                      <img
                        loading="lazy"
                        src={require("../../assets/img/no_content.png")}
                        style={{ width: "18%", margin: "0 auto" }}
                      />
                    </LazyLoad>
                    <h5
                      style={{ marginTop: "1rem" }}
                      className="aui-font-size-14"
                    >
                      Oh. Aquí no hay nada.
                    </h5>
                  </div>
                </div>
              ) : (
                <></>
              )}
              {list.postApiOrdersLists.map((order) => {
                return (
                  <div
                    className="aui-padded-5 aui-bg-white aui-margin-t-10"
                    key={order.id}
                    onClick={() => {
                      history.push("/orderDetail", {
                        order,
                      });
                    }}
                  >
                    <div className="aui-padded-5 aui-font-size-12">
                      <span>{order.cancel_time}</span>
                      {order.order_no}
                      <span className="aui-pull-right aui-text-info">
                        {orderStatus(order)}
                      </span>
                    </div>
                    <div className=" aui-padded-l-5 aui-padded-r-5 aui-bg-white">
                      <ul className="aui-list aui-media-list">
                        {order.order_goods_info.map((goods) => {
                          return (
                            <li
                              className="aui-list-item aui-margin-b-5 aui-bg-default"
                              key={goods.id}
                            >
                              <div
                                className="aui-media-list-item-inner"
                                style={{ width: "100%" }}
                              >
                                <div
                                  className="aui-list-item-media aui-col-4"
                                  //   onClick={(e) => {
                                  //     history.push(
                                  //       `/goodsDetails?id=${goods.goods_id}`,
                                  //     );
                                  //     e.stopPropagation();
                                  //     e.preventDefault();
                                  //   }}
                                >
                                  <LazyLoad once>
                                    <img loading="lazy" src={goods.thum} />
                                  </LazyLoad>
                                </div>

                                <div className="aui-list-item-inner aui-col-8">
                                  <div className="aui-list-item-text aui-col-xs-12">
                                    <div
                                      className="aui-list-item-title aui-ellipsis-2 aui-font-size-14"
                                      style={{ width: "70%" }}
                                    >
                                      {goods.name}
                                    </div>
                                    <div className="aui-list-item-righ aui-text-price">
                                      {/* <span style={{ fontSize: "0.5rem" }}>
                                        $
                                      </span> */}
                                      <span className="aui-font-size-14">
                                        <MoneyValueUnitRender>
                                          {goods.real_price}
                                        </MoneyValueUnitRender>
                                      </span>
                                    </div>
                                  </div>

                                  {order.market_activity_id !== 0 ? (
                                    <div className="aui-list-item-text aui-col-xs-12">
                                      <div
                                        className="aui-list-item-title aui-ellipsis-2 aui-font-size-14"
                                        style={{ width: "70%" }}
                                      />
                                      <div
                                        className="aui-list-item-righ"
                                        style={{
                                          textDecoration: "line-through",
                                        }}
                                      >
                                        {/* <span style={{ fontSize: "0.4rem" }}>
                                          $
                                        </span> */}
                                        <span className="aui-font-size-12 ">
                                          <MoneyValueUnitRender>
                                            {goods.sell_price}
                                          </MoneyValueUnitRender>
                                        </span>
                                      </div>
                                    </div>
                                  ) : (
                                    <></>
                                  )}

                                  <div className="aui-list-item-text aui-col-xs-12 aui-text-pray aui-margin-t-5">
                                    <div
                                      className="aui-list-item-title aui-font-size-12 aui-text-pray"
                                      style={{ width: "70%" }}
                                    >
                                      {goods.spec_group_id != 0 ? (
                                        <span>
                                          Especificaciones:{" "}
                                          {goods.spec_group_info}
                                        </span>
                                      ) : (
                                        <></>
                                      )}
                                    </div>
                                    <div className="aui-list-item-righ aui-text-pray">
                                      <span className="aui-padded-5">
                                        x{goods.num}
                                      </span>
                                    </div>
                                  </div>

                                  <div className="aui-list-item-text aui-margin-t-5">
                                    <div
                                      className="aui-list-item-title aui-text-pray aui-font-size-12 "
                                      style={{ width: "70%" }}
                                    />
                                    {order.status == 4 &&
                                    goods.is_comment == 0 &&
                                    goods.return_goods_status != 3 &&
                                    goods.return_goods_status != 1 ? (
                                      <div
                                        className="aui-list-item-right "
                                        style={{ width: "30%" }}
                                        onClick={(e) => goComment(e, goods)}
                                      >
                                        <div className="order-buttons aui-text-right">
                                          <div className="mini-button aui-font-size-10">
                                            comentar
                                          </div>
                                        </div>
                                      </div>
                                    ) : (
                                      <></>
                                    )}
                                  </div>

                                  <div className="aui-list-item-text aui-margin-t-10">
                                    <div
                                      className="aui-list-item-title aui-text-pray aui-font-size-12 "
                                      style={{ width: "70%" }}
                                    />
                                    {(order.status == 2 || order.status == 3) &&
                                    goods.return_goods_status == 0 ? (
                                      <div
                                        className="aui-list-item-right"
                                        style={{ width: "30%" }}
                                        onClick={(e) => refund(e, goods)}
                                      >
                                        <div className="order-buttons aui-text-right">
                                          <div
                                            className="mini-button aui-font-size-10"
                                            style={{ width: "4rem" }}
                                          >
                                            Reembolso
                                          </div>
                                        </div>
                                      </div>
                                    ) : (
                                      <></>
                                    )}
                                    {goods.return_goods_status == 1 ? (
                                      <div
                                        className="aui-list-item-right aui-text-right"
                                        style={{ width: "30%" }}
                                        onClick={(e) => refund(e, goods)}
                                      >
                                        Solicitud de reembolso
                                      </div>
                                    ) : (
                                      <></>
                                    )}
                                    {goods.return_goods_status == 2 ? (
                                      <div
                                        className="aui-list-item-right aui-text-right"
                                        style={{ width: "30%" }}
                                      >
                                        Reembolso denegado
                                      </div>
                                    ) : (
                                      <></>
                                    )}

                                    {goods.return_goods_status == 3 &&
                                    goods.is_return_money == 0 ? (
                                      <div
                                        className="aui-list-item-right aui-text-right"
                                        style={{ width: "30%" }}
                                      >
                                        Devolución exitosa
                                        <br />
                                        Pendiente de reembolso
                                      </div>
                                    ) : (
                                      <></>
                                    )}
                                    {goods.return_goods_status == 3 &&
                                    goods.is_return_money == 1 ? (
                                      <div
                                        className="aui-list-item-right aui-text-right"
                                        style={{ width: "30%" }}
                                      >
                                        Devolución exitosa
                                      </div>
                                    ) : (
                                      <></>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                    {/* 小计 */}
                    <div
                      className="aui-padded-t-10 aui-padded-b-10 aui-text-right aui-bg-white aui-font-size-12 "
                      style={{ width: "100%" }}
                    >
                      Total
                      <span>{order.order_goods_info.length}</span> Productos
                      Total:
                      {/* <span
                        className="aui-text-price "
                        style={{ fontSize: "0.5rem" }}
                      >
                        $
                      </span> */}
                      <span className="aui-text-price aui-font-size-14 ">
                        <MoneyValueUnitRender>
                          {order.total_money}
                        </MoneyValueUnitRender>
                      </span>
                      <span>
                        {" "}
                        {/* $ */}( Flete incluido{" "}
                        <span>
                          <MoneyValueUnitRender>
                            {order.freight_money}
                          </MoneyValueUnitRender>
                        </span>{" "}
                        )
                      </span>
                    </div>
                    {/* 按钮组 */}
                    <div className="order-buttons aui-padded-b-5 ">
                      {order.status == 1 ? (
                        <div
                          className="button active "
                          onClick={(e) => orderPay(e, order)}
                        >
                          Pagar
                        </div>
                      ) : (
                        <></>
                      )}
                      {order.status == 1 ? (
                        <div
                          className="button "
                          onClick={(e) => cancelOrder(e, order)}
                        >
                          Cancelar
                        </div>
                      ) : (
                        <></>
                      )}
                      {order.status == 2 ? (
                        <div
                          className="button "
                          onClick={(e) => remind(e, order)}
                        >
                          Recordatorio
                        </div>
                      ) : (
                        <></>
                      )}
                      {order.status == 3 ? (
                        <div
                          className="button active "
                          style={{ width: "7rem" }}
                          onClick={(e) => finish(e, order)}
                        >
                          Confirmar
                        </div>
                      ) : (
                        <></>
                      )}
                      {order.status >= 3 && order.status != 9 ? (
                        <div
                          className="button "
                          onClick={(e) => goLogistics(e, order)}
                        >
                          Logística
                        </div>
                      ) : (
                        <></>
                      )}
                      {order.status == 3 ? (
                        <div
                          className="button "
                          style={{ width: "6rem" }}
                          onClick={(e) => viewDetails(e, order)}
                        >
                          Detalles
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          );
        }
      }
    }

    return (
      <div className={styles.container}>
        <div
          id="minirefresh"
          className="minirefresh-wrap"
          //   style={{ top: top ? top : "0", bottom: bottom ? bottom : "0" }}
        >
          <div className="minirefresh-scroll">
            {header}
            <div className="aui-flex-col ">{getList()}</div>
          </div>
        </div>
      </div>
    );
  }),
);
