import Header from '@/component/Header';
import React, { useEffect, useState } from 'react';
import { ConnectProps, history, Link } from 'umi';
import { OrderListItemGoodsInfo, OrdersListItem } from '@/services/interface';
import { Confirm, Notify } from 'notiflix';
import {
  postCancelOrders,
  postOrderFinish,
  postPayPrepay,
  postTipDeliver,
} from '@/services/api';

interface Props extends ConnectProps<{}, { order: OrdersListItem }, {}> {}

export default (props: Props) => {
  const {
    location: {
      state: { order: propsOrder },
    },
  } = props;
  const [order, setOrder] = useState<OrdersListItem>(() => {
    return propsOrder;
  });
  const orderStatus = (order: OrdersListItem): string => {
    var str = '';
    if (order.status == 1) {
      str += 'Pagará';
    } else if (order.status == 2) {
      str += 'Esperando la entrega';
    } else if (order.status == 3) {
      str += 'Mercancías entregadas';
    } else if (order.status == 4) {
      str += 'El pedido está realizado';
    } else if (order.status == 9) {
      str += 'Orden cancelada';
    }
    return str;
  };
  const orderStatusSecond = (order: OrdersListItem): string => {
    if (order.return_status == 1) {
      return '';
    } else if (order.return_status == 2) {
      return '';
    } else if (order.return_status == 3) {
    } else if (order.return_status == 0) {
      if (order.status == 1) {
        return '';
      } else if (order.status == 2) {
        return 'El Jefe del almacén estáen camino.Por favor,espere.';
      } else if (order.status == 3) {
        return '';
      } else if (order.status == 4 || order.status == 9) {
        return '';
      }
    }
    return '';
  };
  const orderStatusIconObject = (order: OrdersListItem): string => {
    if (order.status == 1) {
      return 'icon-daifukuan';
    } else if (order.status == 2) {
      return 'icon-daifahuo';
    } else if (order.status == 3) {
      return 'icon-yifahuo';
    } else if (order.status == 4 || order.status == 9) {
      return 'icon-iconwxz';
    }
    return '';
  };
  const cancelOrder: React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
    Confirm.show(
      'Confirm',
      'Por favor,seleccione la causa de la cancelación?',
      'Confirmar',
      'Cancelar',
      function () {
        postCancelOrders({
          order_id: order.id,
          cancel_reason: 'Confirmar',
        }).then((res) => {
          if (res) {
            Notify.success(res.msg);
            setOrder((order) => {
              return {
                ...order,
                status: 9,
              };
            });
          }
        });
      },
      function () {},
    );
  };
  const orderPay: React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
    postPayPrepay({
      order_id: order.id,
    }).then((res) => {
      if (res) {
        history.push('/paySelect', {
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
    history.push('/refundGoods', {
      goods: goods,
    });
  };
  const goComment = (
    e: React.MouseEvent<HTMLDivElement>,
    goods: OrderListItemGoodsInfo,
  ) => {
    e.stopPropagation();
    history.push('/commentAdd', {
      goods: goods,
    });
  };
  const goLogistics: React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
    history.push('/logistics', {
      order,
    });
  };
  const remind: React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
    postTipDeliver({
      order_id: order.id,
    }).then((res) => {
      if (res) {
        Notify.success(res.msg);
      }
    });
  };
  const finish: React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
    Confirm.show(
      'Confirm',
      'Confirmen la recepción?',
      'Confirmar',
      'Cancelar',
      function () {
        postOrderFinish({
          order_id: order.id,
        }).then((res) => {
          if (res) {
            Notify.success(res.msg);

            setOrder((order) => {
              return {
                ...order,
                status: 4,
              };
            });
          }
        });
      },
      function () {},
    );
  };
  return (
    <>
      <Header title={'Detalles del pedido'} />

      <div className="aui-content">
        <div className="order-status aui-b aui-bg-info">
          <ul
            className="aui-list aui-media-list"
            id="order-status"
            style={{ backgroundImage: 'none' }}
          >
            <li className="aui-list-item" style={{ backgroundImage: 'none' }}>
              <div className="aui-media-list-item-inner">
                <div className="aui-list-item-media">
                  <span
                    className={`aui-iconfont iconfont aui-text-white ${orderStatusIconObject(
                      order,
                    )}`}
                    style={{ fontSize: '2.2rem' }}
                  />
                </div>
                <div className="aui-list-item-inner">
                  <div
                    className="aui-list-item-text aui-text-white aui-font-size-12"
                    style={{ lineHeight: '2.3rem' }}
                  >
                    <h2>{orderStatus(order)}</h2>
                  </div>
                  <div className="aui-list-item-text aui-text-white">
                    <h3 className="aui-font-size-14">
                      {orderStatusSecond(order)}
                    </h3>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <ul
          className="aui-list aui-media-list aui-margin-t-5"
          style={{ backgroundImage: 'none' }}
        >
          <li className="aui-list-item" style={{ backgroundImage: 'none' }}>
            <div className="aui-media-list-item-inner">
              <div className="aui-list-item-label-icon">
                <i className="aui-iconfont iconfont icon-dizhi1 aui-font-size-20 aui-text-info" />
              </div>
              <div className="aui-list-item-inner">
                <div className="aui-list-item-text">
                  <div className="aui-list-item-title aui-font-weight">
                    {order.address}
                  </div>
                </div>
                <div
                  className="aui-info aui-margin-t-10"
                  style={{ padding: 0 }}
                >
                  <div className="aui-info-item">
                    <span>{order.consignee_name}</span>
                  </div>
                  <div className="aui-info-item">{order.mobile}</div>
                </div>
              </div>
            </div>
          </li>
        </ul>

        <div className=" aui-padded-l-5 aui-padded-r-5 aui-margin-t-5 aui-bg-white">
          {/* 订单时间和状态 */}
          <div className="aui-padded-5 aui-font-size-12">
            <span>{order.create_time}</span>
            <span className="aui-pull-right aui-text-info">
              {orderStatus(order)}
            </span>
          </div>

          {/* 商品列表 */}
          <ul
            className="aui-list aui-media-list"
            style={{ backgroundImage: 'none' }}
          >
            {order.order_goods_info.map((goods) => {
              return (
                <li
                  className="aui-list-item aui-margin-b-5 aui-bg-default"
                  style={{ backgroundImage: 'none' }}
                  key={goods.id}
                >
                  <div className="aui-media-list-item-inner">
                    {/* 商品缩略图 */}
                    <Link
                      className="aui-list-item-media"
                      to={`/goodsDetails?id=${goods.goods_id}`}
                    >
                      <img loading="lazy" src={goods.thum} />
                    </Link>
                    <div className="aui-list-item-inner">
                      {/* 商品名称 */}
                      <div className="aui-list-item-text">
                        <div
                          className="aui-list-item-title aui-ellipsis-2 aui-font-size-14"
                          style={{ width: '70%' }}
                        >
                          {goods.name}
                        </div>
                        <div className="aui-list-item-righ aui-text-price">
                          <span style={{ fontSize: '0.5rem' }}>$</span>
                          <span className="aui-font-size-14 ">
                            {goods.real_price}
                          </span>
                        </div>
                      </div>
                      {/* 原价 */}
                      {order.market_activity_id != 0 ? (
                        <div className="aui-list-item-text">
                          <div
                            className="aui-list-item-title aui-ellipsis-2 aui-font-size-14"
                            style={{ width: '70%' }}
                          />
                          <div
                            className="aui-list-item-righ"
                            style={{ textDecoration: 'line-through' }}
                          >
                            <span style={{ fontSize: '0.4rem' }}>$</span>
                            <span className="aui-font-size-12 ">
                              goods.sell_price
                            </span>
                          </div>
                        </div>
                      ) : (
                        <></>
                      )}
                      {/* 规格加数量 */}
                      <div className="aui-list-item-text aui-text-pray aui-margin-t-5">
                        <div
                          className="aui-list-item-title aui-font-size-12 aui-text-pray"
                          style={{ width: '70%' }}
                        >
                          {goods.spec_group_id != 0 ? (
                            <span>
                              Especificaciones: {goods.spec_group_info}
                            </span>
                          ) : (
                            <></>
                          )}
                        </div>
                        <div className="aui-list-item-righ aui-text-pray">
                          <span className="aui-padded-5">x{goods.num}</span>
                        </div>
                      </div>
                      {/* 评价 */}
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
                            <div
                              className="order-buttons aui-text-right"
                              onClick={(e) => goComment(e, goods)}
                            >
                              <div className="mini-button aui-font-size-10">
                                Comentar
                              </div>
                            </div>
                          </div>
                        ) : (
                          <></>
                        )}
                      </div>
                      {/* 退款 针对已付款和已发货的订单 */}
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
                            onClick={(e) => refund(e, goods)}
                          >
                            <div className="order-buttons aui-text-right">
                              <div
                                className="mini-button aui-font-size-10"
                                style={{ width: '5rem' }}
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
                            className="aui-list-item-right aui-text-right"
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

          <ul className="aui-list aui-list-in">
            <li className="aui-list-item">
              <div className="aui-list-item-inner">
                <div className="aui-list-item-title aui-font-size-14">
                  Flete
                </div>
                <div className="aui-list-item-right">
                  ${order.freight_money}
                </div>
              </div>
            </li>
            {order.market_activity_id != 0 ? (
              <li className="aui-list-item">
                <div className="aui-list-item-inner">
                  <div className="aui-list-item-title aui-font-size-14">
                    Preferencias operacionales
                  </div>
                  <div className="aui-list-item-right">
                    ${order.market_reduce_money}
                  </div>
                </div>
              </li>
            ) : (
              <></>
            )}
            {order.market_activity_id != 0 ? (
              <li className="aui-list-item">
                <div className="aui-list-item-inner">
                  <div className="aui-list-item-title aui-font-size-14">
                    Precio total(Flete incluido)
                  </div>
                  <div className="aui-list-item-right aui-text-price">
                    <span className="aui-font-size-12">$</span>
                    <span className="aui-font-size-16">
                      {order.total_money}
                    </span>
                  </div>
                </div>
              </li>
            ) : (
              <></>
            )}
          </ul>
        </div>

        <div
          className="aui-padded-10 aui-bg-white aui-margin-t-5"
          style={{ paddingBottom: '1.8rem !important' }}
        >
          <h5 className="aui-padded-t-5 aui-font-size-12">{order.order_no}</h5>
          <h5 className="aui-padded-t-5 aui-font-size-12">
            {order.create_time}
          </h5>
          {order.pay_time ? (
            <h5 className="aui-padded-t-5 aui-font-size-12">
              Tiempo de pago: {order.pay_time}
            </h5>
          ) : (
            <></>
          )}
          {order.deliver_time ? (
            <h5 className="aui-padded-t-5 aui-font-size-12">
              Tiempo de entrega: {order.deliver_time}
            </h5>
          ) : (
            <></>
          )}
          {order.confirm_receipt_time ? (
            <h5 className="aui-padded-t-5 aui-font-size-12">
              Tiempo de recepción confirmado: {order.confirm_receipt_time}
            </h5>
          ) : (
            <></>
          )}
          {order.cancel_time ? (
            <h5 className="aui-padded-t-5 aui-font-size-12">
              Tiempo de cancelación: {order.cancel_time}
            </h5>
          ) : (
            <></>
          )}
          {order.apply_return_time ? (
            <h5 className="aui-padded-t-5 aui-font-size-12">
              Solicitud de reembolso: {order.apply_return_time}
            </h5>
          ) : (
            <></>
          )}
          {order.return_time ? (
            <h5 className="aui-padded-t-5 aui-font-size-12">
              Plazo de aceptación/rechazo del reembolso: {order.return_time}
            </h5>
          ) : (
            <></>
          )}
          {order.memo ? (
            <h5 className="aui-padded-t-5 aui-font-size-12">
              Mi mensaje: {order.memo}
            </h5>
          ) : (
            <></>
          )}
          {order.reply_memo ? (
            <h5 className="aui-padded-t-5 aui-font-size-12">
              Respuesta comercial: {order.reply_memo}
            </h5>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div style={{ minHeight: '2.25rem' }} />
      <footer className="aui-bar aui-bar-tab" id="footer">
        <div className="order-buttons aui-padded-b-5 ">
          {order.status == 1 ? (
            <div className="button active" onClick={orderPay}>
              Pagar
            </div>
          ) : (
            <></>
          )}
          {order.status == 1 ? (
            <div className="button " onClick={cancelOrder}>
              Cancelar
            </div>
          ) : (
            <></>
          )}
          {order.status == 2 ? (
            <div className="button " onClick={remind}>
              Recordatorio
            </div>
          ) : (
            <></>
          )}
          {order.status == 3 ? (
            <div className="button active " onClick={finish}>
              Confirmar
            </div>
          ) : (
            <></>
          )}
          {order.status == 3 || order.status == 4 ? (
            <div className="button" onClick={goLogistics}>
              Logística
            </div>
          ) : (
            <></>
          )}
        </div>
      </footer>
    </>
  );
};
