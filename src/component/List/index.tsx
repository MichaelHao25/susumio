import React, { useCallback, useEffect, useRef } from 'react';
import { connect, Dispatch, Link } from 'umi';
import styles from './index.less';
// @ts-ignore
import MiniRefreshTools from 'minirefresh';
import 'minirefresh/dist/debug/minirefresh.css';
import { AllList, OrdersListItem } from '@/services/interface';
import { ListState } from '@/models/list';

interface PageProps {
  dispatch: Dispatch;
  header?: React.ReactNode;
  top?: string;
  bottom?: string;
  params: {
    [key: string]: string | number;
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
      header = '',
      top = '',
      bottom = '',
      dispatch,
      type,
      list,
      params,
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
      console.log('global.params', global.params);
      switch (type) {
        case AllList.postApiGoodsGoodsLists: {
          dispatch({
            type: 'list/postApiGoodsGoodsLists',
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
            type: 'list/postApiOrdersLists',
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
    }, [params]);

    function getList() {
      switch (type) {
        case AllList.postApiGoodsGoodsLists: {
          return list.postApiGoodsGoodsLists.map((item) => {
            return (
              <Link
                to={`/goodsDetails?id=${item.id}`}
                key={item.id}
                className="aui-flex-item-6"
                style={{ position: 'relative', padding: '3px' }}
              >
                <img src={item.thum} /> {/**/}
                <h5
                  className="aui-text-default aui-ellipsis-2 aui-font-size-12 aui-padded-t-5 aui-padded-l-5 aui-padded-r-5 aui-bg-white"
                  style={{ height: '2rem', marginBottom: 0 }}
                >
                  {item.name}
                </h5>
                <p
                  style={{ marginBottom: 0 }}
                  className="aui-padded-b-5 aui-padded-t-5 aui-padded-l-10 aui-padded-r-10 aui-bg-white "
                >
                  <span className="aui-text-price aui-font-size-10">$</span>{' '}
                  <span className="aui-text-price ">{item.sell_price}</span>
                </p>
              </Link>
            );
          });
        }
        case AllList.postApiOrdersLists: {
          const orderStatus = (order: OrdersListItem): string => {
            var str = '';
            if (order.status == 1) {
              str += 'Esperando el pago';
            } else if (order.status == 2) {
              str += 'Esperando la entrega';
            } else if (order.status == 3) {
              str += 'Mercancías entregadas';
            } else if (order.status == 4) {
              str += 'Realizado';
            } else if (order.status == 9) {
              str += 'Orden cancelada';
            }
            return str;
          };
          return (
            <div className="aui-content" style={{ width: '100%' }}>
              {/*什么都没有*/}
              {/*{*/}
              {/*  list.postApiOrdersLists.length === 0 ? <div style={{display:"flex",justifyContent:'center'}}><div*/}
              {/*    className="aui-col-xs-12 aui-text-center"*/}
              {/*    style={{marginTop: "30%"}}>*/}

              {/*    <img src={require('../../assets/img/no_content.png')}*/}
              {/*         style={{width: '18%', margin: '0 auto'}}/>*/}
              {/*    <h5 style={{marginTop: '1rem'}}*/}
              {/*        className="aui-font-size-14">Oh. Aquí no hay nada.</h5>*/}
              {/*  </div></div> : <></>*/}
              {/*}*/}
              {list.postApiOrdersLists.map((order) => {
                return (
                  <div
                    className="aui-padded-5 aui-bg-white aui-margin-t-10"
                    key={order.id}
                    // onClick={()=>goOrderDetail(order)}
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
                                style={{ width: '100%' }}
                              >
                                <div className="aui-list-item-media aui-col-4">
                                  {/*@click.stop="goGoodsDetail(goods);"*/}
                                  <img src={goods.thum} />
                                </div>

                                <div className="aui-list-item-inner aui-col-8">
                                  <div className="aui-list-item-text aui-col-xs-12">
                                    <div
                                      className="aui-list-item-title aui-ellipsis-2 aui-font-size-14"
                                      style={{ width: '70%' }}
                                    >
                                      {goods.name}
                                    </div>
                                    <div className="aui-list-item-righ aui-text-price">
                                      <span style={{ fontSize: '0.5rem' }}>
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
                                        style={{ width: '70%' }}
                                      ></div>
                                      <div
                                        className="aui-list-item-righ"
                                        style={{
                                          textDecoration: 'line-through',
                                        }}
                                      >
                                        <span style={{ fontSize: '0.4rem' }}>
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
                                      style={{ width: '70%' }}
                                    >
                                      {goods.spec_group_id != 0 ? (
                                        <span>
                                          Especificaciones:{' '}
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
                                      style={{ width: '70%' }}
                                    />
                                    {order.status == 4 &&
                                    goods.is_comment == 0 &&
                                    goods.return_goods_status != 3 &&
                                    goods.return_goods_status != 1 ? (
                                      <div
                                        className="aui-list-item-right "
                                        style={{ width: '30%' }}
                                      >
                                        {/*@click.stop="goComment(goods)"*/}
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
                                      style={{ width: '70%' }}
                                    />
                                    {(order.status == 2 || order.status == 3) &&
                                    goods.return_goods_status == 0 ? (
                                      <div
                                        className="aui-list-item-right"
                                        style={{ width: '30%' }}
                                        // @click.stop="refund(goods)""
                                      >
                                        <div className="order-buttons aui-text-right">
                                          <div
                                            className="mini-button aui-font-size-10"
                                            style={{ width: '4rem' }}
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
                                        style={{ width: '30%' }}
                                        // @click.stop="refund(goods)"
                                      >
                                        Solicitud de reembolso
                                      </div>
                                    ) : (
                                      <></>
                                    )}
                                    {goods.return_goods_status == 2 ? (
                                      <div
                                        className="aui-list-item-right aui-text-right"
                                        style={{ width: '30%' }}
                                      >
                                        Reembolso denegado
                                      </div>
                                    ) : (
                                      <></>
                                    )}

                                    {goods.return_goods_status == 3 &&
                                    goods.is_return_money == 0 ? (
                                      <div
                                        className="aui-list-item-right <aui-text-ri>m</aui-text-ri>ght"
                                        style={{ width: '30%' }}
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
                                        style={{ width: '30%' }}
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
                      style={{ width: '100%' }}
                    >
                      Total
                      <span>{order.order_goods_info.length}</span> Productos
                      Total:
                      <span
                        className="aui-text-price "
                        style={{ fontSize: '0.5rem' }}
                      >
                        $
                      </span>
                      <span className="aui-text-price aui-font-size-14 ">
                        {order.total_money}
                      </span>
                      <span>
                        {' '}
                        ( Flete incluido $<span>{order.freight_money}</span> )
                      </span>
                    </div>
                    {/* 按钮组 */}
                    <div className="order-buttons aui-padded-b-5 ">
                      {
                        order.status == 1 ? (
                          <div className="button active ">Pagar</div>
                        ) : (
                          <></>
                        )
                        // @click.stop="pay(order)"
                      }
                      {
                        order.status == 1 ? (
                          <div className="button ">Cancelar</div>
                        ) : (
                          <></>
                        )
                        // @click.stop="cancel(order)"
                      }
                      {order.status == 2 ? (
                        <div className="button ">Recordatorio</div>
                      ) : (
                        <></>
                      )}
                      {/*@click.stop="remind(order)"*/}
                      {
                        order.status == 3 ? (
                          <div
                            className="button active "
                            style={{ width: '7rem' }}
                          >
                            Confirmar
                          </div>
                        ) : (
                          <></>
                        )
                        // @click.stop="finish(order)"
                      }
                      {
                        order.status >= 3 && order.status != 9 ? (
                          <div className="button ">Logística</div>
                        ) : (
                          <></>
                        )
                        // @click.stop="goLogistics(order)"
                      }
                      {order.status == 3 ? (
                        <div className="button " style={{ width: '6rem' }}>
                          Detalles
                        </div>
                      ) : (
                        <></>
                      )}
                      {/*@click.stop="view_details(order)"*/}
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
          style={{ top: top ? top : '0', bottom: bottom ? bottom : '0' }}
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
