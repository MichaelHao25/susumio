import React, { useEffect, useRef } from "react";
import { connect, Dispatch, history, Link } from "umi";
import styles from "./index.less";
// @ts-ignore
import MiniRefreshTools from "minirefresh";
import "minirefresh/dist/debug/minirefresh.css";
import {
  AddressItem,
  AllList,
  OrderListItemGoodsInfo,
  OrdersListItem,
} from "@/services/interface";
import { Action, ListState } from "@/models/list";
import { Confirm, Notify } from "notiflix";
import {
  postAddressDelete,
  postAddressSetDefault,
  postCancelOrders,
  postCommentsDelete,
  postFavoriteDelete,
  postOrderFinish,
  postPayPrepay,
  postTipDeliver,
} from "@/services/api";

interface PageProps {
  dispatch: Dispatch;
  header?: React.ReactNode;
  top?: string;
  bottom?: string;
  params?: {
    [key: string]: any;
  };
  type: AllList;
  list: ListState;
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
    const {
      header = "",
      top = "",
      bottom = "",
      dispatch,
      type,
      list,
      params = {},
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
          if (data.length < 10) {
            miniRefresh.current.endUpLoading(true);
          } else {
            miniRefresh.current.endUpLoading(false);
          }
        }
      };
    const loadData = (reload = false) => {
      if (reload) {
        page.current.pageNum = 1;
      }
      switch (type) {
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
        case AllList.postApiOrdersLists: {
          dispatch({
            type: "list/postApiOrdersLists",
            payload: {
              ...page.current,
              ...global.params,
              cb: cb(reload),
            },
          });
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
        }
      }
    };
    useEffect(() => {
      miniRefresh.current = new MiniRefreshTools.theme.defaults({
        // isUseBodyScroll:true,
        down: {
          isAuto: false,
          callback: () => {
            loadData(true);
          },
        },
        up: {
          isAuto: false,
          callback: () => {
            loadData(false);
          },
        },
      });
    }, []);
    useEffect(() => {
      page.current.pageNum = 1;
      loadData(false);
    }, [props.params]);

    function getList() {
      switch (type) {
        case AllList.postTeamUsers: {
          return (
            <div className="aui-content" style={{ width: "100%" }}>
              {list.postTeamUsers.length === 0 ? (
                <div
                  className="aui-col-xs-12 aui-text-center"
                  style={{ marginTop: "30%" }}
                >
                  <img
                    loading="lazy"
                    src={require("../../assets/img/no_content.png")}
                    style={{ width: "18%", margin: "0 auto" }}
                  />
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
                  <img
                    loading="lazy"
                    src={require("../../assets/img/no_content.png")}
                    style={{ width: "18%", margin: "0 auto" }}
                  />
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
                  <img
                    loading="lazy"
                    src={require("../../assets/img/no_content.png")}
                    style={{ width: "18%", margin: "0 auto" }}
                  />
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
                                    {order.order_status == 3
                                      ? "+" + goods.real_money
                                      : "+" + goods.expect_money}
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
          return (
            <div className="aui-content" style={{ width: "100%" }}>
              {list.postApplyList.length === 0 ? (
                <div
                  className="aui-col-xs-12 aui-text-center"
                  style={{ marginTop: "30%" }}
                >
                  <img
                    loading="lazy"
                    src={require("../../assets/img/no_content.png")}
                    style={{ width: "18%", margin: "0 auto" }}
                  />
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
                {list.postApplyList.map((apply) => {
                  return (
                    <li
                      className="aui-list-item aui-list-item-middle aui-bg-white aui-margin-b-10"
                      v-for="(apply, key) in list"
                      data-click="goDetail(apply)"
                    >
                      <div className="aui-media-list-item-inner">
                        <div className="aui-list-item-inner">
                          <div className="aui-list-item-text">
                            <div
                              className="aui-list-item-title"
                              v-text="apply.intro"
                            />
                            <div
                              className="aui-list-item-right aui-text-info"
                              v-text="'+' + apply.money"
                            />
                          </div>
                          <div className="aui-list-item-text aui-margin-t-5">
                            <div
                              className="aui-list-item-title aui-font-size-12 aui-text-pray"
                              v-text="'Numeración: ' + apply.apply_no"
                            />
                            <div
                              className="aui-list-item-right  aui-text-pray aui-font-size-18"
                              style={{ color: "#e95d40!important" }}
                            >
                              {"{"}
                              {"{"}apply.status | statusFilter{"}"}
                              {"}"}
                            </div>
                          </div>
                          <div className="aui-list-item-text aui-margin-t-5">
                            <div
                              className="aui-list-item-title aui-font-size-12 aui-text-pray"
                              v-text="'Tiempo de aplicación: ' + apply.create_time"
                            />
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
                  <img
                    loading="lazy"
                    src={require("../../assets/img/no_content.png")}
                    style={{ width: "18%", margin: "0 auto" }}
                  />
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
                          {log.change_money}
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
                  <img
                    loading="lazy"
                    src={require("../../assets/img/no_content.png")}
                    style={{ width: "18%", margin: "0 auto" }}
                  />
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
                      return (
                        <div
                          className="aui-flex-item-6"
                          style={{ position: "relative", padding: "3px" }}
                          key={trace.id}
                        >
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
                          <h5
                            className="aui-text-default aui-ellipsis-2 aui-font-size-12 aui-padded-t-5 aui-padded-l-10 aui-padded-r-10  aui-bg-white"
                            style={{ height: "2.2rem" }}
                          >
                            {trace.goods_info.name}
                          </h5>
                          <p className="aui-padded-b-5 aui-padded-t-5 aui-padded-l-10 aui-padded-r-10  aui-bg-white">
                            <span
                              className="aui-text-price"
                              style={{ fontSize: "0.5rem" }}
                            >
                              $
                            </span>
                            <span className="aui-text-price aui-font-size-14">
                              {trace.goods_info.sell_price}
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
                  <img
                    loading="lazy"
                    src={require("../../assets/img/no_content.png")}
                    style={{ width: "18%", margin: "0 auto" }}
                  />
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
                              {comment.order_goods_info ? (
                                <img
                                  loading="lazy"
                                  src={comment.order_goods_info.thum}
                                />
                              ) : (
                                ""
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
                                  {comment.order_goods_info.sell_price}
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
                              className="aui-iconfont iconfont icon-shoucang aui-margin-5"
                              style={{
                                fontSize: "1.2rem",
                                color:
                                  index + 1 <= parseInt(comment.score)
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
                          <img loading="lazy" src={img} />
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
                  <img
                    loading="lazy"
                    src={require("../../assets/img/no_content.png")}
                    style={{ width: "18%", margin: "0 auto" }}
                  />
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
                      return (
                        <div
                          className="aui-flex-item-6"
                          style={{ position: "relative", padding: "3px" }}
                          key={collection.id}
                        >
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
                          <h5 className="aui-text-default aui-ellipsis-2 aui-font-size-12 aui-padded-t-5 aui-padded-l-10 aui-padded-r-10  aui-bg-white">
                            {collection.goods_info.name}
                          </h5>
                          <p className="aui-padded-b-5 aui-padded-t-5 aui-padded-l-10 aui-padded-r-10  aui-bg-white">
                            <span
                              className="aui-text-price"
                              style={{ fontSize: "0.5rem" }}
                            >
                              $
                            </span>
                            <span className="aui-text-price aui-font-size-14">
                              {collection.goods_info.sell_price}
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
            const { selectAddress = false } = params ? {} : params;
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
                  <img
                    loading="lazy"
                    src={require("../../assets/img/no_content.png")}
                    style={{ width: "18%", margin: "0 auto" }}
                  />
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
          return list.postApiGoodsGoodsLists.map((item) => {
            return (
              <Link
                to={`/goodsDetails?id=${item.id}`}
                key={item.id}
                className="aui-flex-item-6"
                style={{ position: "relative", padding: "3px" }}
              >
                <img loading="lazy" src={item.thum} /> {/**/}
                <h5
                  className="aui-text-default aui-ellipsis-2 aui-font-size-12 aui-padded-t-5 aui-padded-l-5 aui-padded-r-5 aui-bg-white"
                  style={{ height: "2rem", marginBottom: 0 }}
                >
                  {item.name}
                </h5>
                <p
                  style={{ marginBottom: 0 }}
                  className="aui-padded-b-5 aui-padded-t-5 aui-padded-l-10 aui-padded-r-10 aui-bg-white "
                >
                  <span className="aui-text-price aui-font-size-10">$</span>{" "}
                  <span className="aui-text-price ">{item.sell_price}</span>
                </p>
              </Link>
            );
          });
        }
        case AllList.postApiOrdersLists: {
          const orderStatus = (order: OrdersListItem): string => {
            var str = "";
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
                    <img
                      loading="lazy"
                      src={require("../../assets/img/no_content.png")}
                      style={{ width: "18%", margin: "0 auto" }}
                    />
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
                                <Link
                                  className="aui-list-item-media aui-col-4"
                                  to={`/goodsDetails?id=${goods.goods_id}`}
                                >
                                  <img loading="lazy" src={goods.thum} />
                                </Link>

                                <div className="aui-list-item-inner aui-col-8">
                                  <div className="aui-list-item-text aui-col-xs-12">
                                    <div
                                      className="aui-list-item-title aui-ellipsis-2 aui-font-size-14"
                                      style={{ width: "70%" }}
                                    >
                                      {goods.name}
                                    </div>
                                    <div className="aui-list-item-righ aui-text-price">
                                      <span style={{ fontSize: "0.5rem" }}>
                                        $
                                      </span>
                                      <span className="aui-font-size-14">
                                        {goods.real_price}
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
                                        <span style={{ fontSize: "0.4rem" }}>
                                          $
                                        </span>
                                        <span className="aui-font-size-12 ">
                                          {goods.sell_price}
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
                      <span
                        className="aui-text-price "
                        style={{ fontSize: "0.5rem" }}
                      >
                        $
                      </span>
                      <span className="aui-text-price aui-font-size-14 ">
                        {order.total_money}
                      </span>
                      <span>
                        {" "}
                        ( Flete incluido $<span>{order.freight_money}</span> )
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
          style={{ top: top ? top : "0", bottom: bottom ? bottom : "0" }}
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
