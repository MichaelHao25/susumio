import './index.less';
import React, { useEffect, useState } from 'react';
import {
  postDrpDbStatus,
  postQueryOrdersCount,
  postQueryPayPassword,
  postUsersAsset,
  postUsersInfoRead,
} from '@/services/api';
import Tab from '@/component/Tab';
import { history } from '@@/core/history';

interface OrdersCount {
  return_goods_num: number;
  wait_comment_num: number;
  wait_finish_num: number;
  wait_pay_num: number;
  wait_ship_num: number;
}

interface UsersAsset {
  level: string;
  score: number;
  money: number;
}

interface UserInfo {
  mobile: string;
  avatar: string;
  is_bonus: boolean;
  is_customer: boolean;
  is_distributor: boolean;
  nick_name: string;
}

interface DrpDbStatus {
  is_open_bonus: boolean;
  is_open_drp: boolean;
}
const index = () => {
  const [ordersCount, setOrderCount] = useState<OrdersCount>({
    return_goods_num: 0,
    wait_comment_num: 0,
    wait_finish_num: 0,
    wait_pay_num: 0,
    wait_ship_num: 0,
  });
  const [usersAsset, setUsersAsset] = useState<UsersAsset>({
    level: '',
    score: 0,
    money: 0,
  });
  const [isPassword, setIsPassword] = useState<0 | 1>(0);
  const [drpDbStatus, setDrpDbStatus] = useState<DrpDbStatus>({
    is_open_bonus: false,
    is_open_drp: false,
  });
  const [userInfo, setUserInfo] = useState<UserInfo>({
    mobile: '',
    avatar: '',
    is_bonus: false,
    is_customer: false,
    is_distributor: false,
    nick_name: '',
  });
  useEffect(() => {
    postQueryPayPassword().then((res) => {
      console.log(res);
      if (res) {
        const {
          data: { is_set_pay_password },
        } = res;
        setIsPassword(is_set_pay_password);
      }
    });
    postUsersInfoRead('5314').then((res) => {
      console.log(res);
      if (res) {
        const { data } = res;
        setUserInfo(data);
      }
    });
    postDrpDbStatus().then((res) => {
      if (res) {
        const {
          data: { is_open_bonus, is_open_drp },
        } = res;
        setDrpDbStatus({
          is_open_bonus,
          is_open_drp,
        });
      }
    });
    postUsersAsset().then((res) => {
      if (res) {
        const {
          data: { level, score, money },
        } = res;
        setUsersAsset({
          level,
          score,
          money,
        });
      }
    });
    postQueryOrdersCount().then((res) => {
      console.log(res);
      if (res) {
        const { data }: { data: OrdersCount } = res;
        setOrderCount(data);
      }
    });
  }, []);
  return (
    <div className="my">
      <section id="header" className="aui-content aui-bg-white">
        <div
          id="top"
          style={{
            background:
              'url("https://www.177pinche.com/public/upload/user_images/20190407/feb8ba2fbeb8cb431c137f8d49be252b.png") center center no-repeat',
          }}
        >
          <img
            src={
              userInfo.avatar
                ? userInfo.avatar
                : require('../../assets/img/avatar.png')
            }
            id="avatar"
            className="aui-img-round"
            style={{ height: '80px' }}
          />
          <div
            className="aui-text-white aui-margin-l-15"
            style={{ marginTop: '-1.5rem' }}
          >
            <div
              className="aui-margin-b-5"
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <div className="aui-font-size-18 aui-margin-r-10">
                {userInfo.nick_name ? userInfo.nick_name : 'Usuario anónimo'}
              </div>
              <div className="level aui-font-size-12">{usersAsset.level}</div>
            </div>
            <div className="aui-font-size-12">
              <i className="aui-iconfont aui-icon-mobile aui-font-size-12" />
              <span>{userInfo.mobile}</span>
            </div>
            <div className="aui-margin-t-5">
              <span data-onclick="$util.openWindow('level_win')">
                <span className="aui-font-size-12">
                  Integral:
                  <span>{usersAsset.score}</span>
                </span>{' '}
                <i className="aui-iconfont aui-icon-right aui-font-size-10" />
              </span>
            </div>
          </div>
          <i
            id="setting"
            data-onclick="$util.openWindow('setting_win')"
            className="iconfont icon-shezhishedingpeizhichilun aui-text-white"
          />
        </div>
      </section>
      <div className="warper">
        <div className="order">
          <div
            style={{
              borderBottom: '0.025rem solid rgb(238, 238, 238)',
              height: '2.4rem',
              lineHeight: '2.4rem',
            }}
          >
            <ul className="aui-list" style={{ backgroundImage: 'none' }}>
              <li
                className="aui-list-item"
                onClick={() => {
                  history.push('/orderList', {
                    status: 0,
                  });
                }}
              >
                <div className="aui-list-item-inner aui-list-item-arrow">
                  <div className="aui-list-item-title">Mi pedido</div>
                  <div className="aui-list-item-right">
                    <div style={{ fontSize: '0.7rem' }}>Total</div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <section className="aui-grid aui-margin-b-10">
            <div className="aui-row">
              <div
                onClick={() => {
                  history.push('/orderList', {
                    status: 1,
                  });
                }}
                className="aui-col-5"
              >
                <i
                  className="aui-iconfont iconfont icon-daifukuan"
                  style={{ fontSize: '1.4rem' }}
                />
                <div className="aui-bar-tab-label aui-font-size-12 aui-text-default">
                  Pagará
                </div>
                {ordersCount.wait_pay_num !== 0 ? (
                  <div className="aui-badge">{ordersCount.wait_pay_num}</div>
                ) : (
                  <></>
                )}
              </div>
              <div
                // data-onclick="$util.openWindow('order_list_win', {status: 2})"
                onClick={() => {
                  history.push('/orderList', {
                    status: 2,
                  });
                }}
                className="aui-col-5"
              >
                <i
                  className="aui-iconfont iconfont icon-daifahuo"
                  style={{ fontSize: '1.4rem' }}
                />
                <div className="aui-bar-tab-label aui-font-size-12 aui-text-default">
                  Despachará
                </div>
                {ordersCount.wait_ship_num !== 0 ? (
                  <div className="aui-badge">{ordersCount.wait_ship_num}</div>
                ) : (
                  <></>
                )}
              </div>
              <div
                // data-onclick="$util.openWindow('order_list_win', {status: 3})"
                onClick={() => {
                  history.push('/orderList', {
                    status: 3,
                  });
                }}
                className="aui-col-5"
              >
                <i
                  className="aui-iconfont iconfont icon-yifahuo"
                  style={{ fontSize: '1.4rem' }}
                />
                <div className="aui-bar-tab-label aui-font-size-12 aui-text-default">
                  Recibirá
                </div>
                {ordersCount.wait_finish_num !== 0 ? (
                  <div className="aui-badge">{ordersCount.wait_finish_num}</div>
                ) : (
                  <></>
                )}
              </div>
              <div
                // data-onclick="$util.openWindow('order_list_win', {status: 4})"
                onClick={() => {
                  history.push('/orderList', {
                    status: 4,
                  });
                }}
                className="aui-col-5"
              >
                <i
                  className="aui-iconfont iconfont icon-daipingjia"
                  style={{ fontSize: '1.4rem' }}
                />
                <div className="aui-bar-tab-label aui-font-size-12 aui-text-default">
                  Comentará
                </div>
                {ordersCount.wait_comment_num !== 0 ? (
                  <div className="aui-badge">
                    {ordersCount.wait_comment_num}
                  </div>
                ) : (
                  <></>
                )}
              </div>
              <div
                data-onclick="$util.openWindow('order_refund_list_win')"
                className="aui-col-5"
              >
                <i
                  className="aui-iconfont iconfont icon-shouhou"
                  style={{ fontSize: '1.4rem' }}
                />
                <div className="aui-bar-tab-label aui-font-size-12 aui-text-default">
                  Posventa
                </div>
                {ordersCount.return_goods_num !== 0 ? (
                  <div className="aui-badge">
                    {ordersCount.return_goods_num}
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
      {isPassword ? (
        <div className="wallet1">
          <div className="wallet-into">
            <div className="aui-font-weight aui-margin-l-15">Mi cartera</div>
            <div
              className="aui-margin-r-15"
              data-onClick="$util.openWindow('wallet_frm')"
            >
              <p>
                Entrar a mi cartera
                <i className="aui-iconfont aui-icon-right" />
              </p>
            </div>
          </div>
          <div className="wallet-price">
            <div
              style={{ display: 'flex', alignItems: 'center', width: '50%' }}
              className="aui-margin-l-15"
            >
              <p>Saldo:</p>
              <div
                className="aui-font-size-20 aui-font-weight"
                style={{ color: '#f03b3b', marginTop: '-0.2rem' }}
              >
                ${usersAsset.money}
              </div>
            </div>
            <div
              className="recharge"
              data-onClick="$util.openWindow('recharge_win')"
            >
              Recargar
            </div>
            <div
              className="recharge aui-margin-r-5"
              data-onClick="$util.openWindow('withdraw_win')"
              style={{ marginLeft: '3rem', width: '7rem' }}
            >
              Sacar dinero
            </div>
          </div>
        </div>
      ) : (
        <div className="wallet">
          <div className="wallet-wancll aui-font-weight aui-font-size-18">
            Billetera
          </div>
          <div className="goOpen">Activar</div>
        </div>
      )}

      <div className="common_block">
        <div className="title aui-font-weight aui-margin-l-15 aui-margin-r-15">
          Administración
        </div>
        <section className="aui-grid" style={{ marginTop: '0.5rem' }}>
          <div className="aui-row">
            <div
              data-onclick="$util.openWindow('cart_list_win')"
              className="aui-col-xs-3"
            >
              <i
                className="aui-iconfont iconfont icon-gouwuche2"
                style={{ fontSize: '1.4rem', color: 'rgb(67, 67, 67)' }}
              />
              <div className="aui-bar-tab-label aui-font-size-12 aui-text-default">
                Carro
              </div>
            </div>
            <div
              data-onclick="$util.openWindow('collection_list_win')"
              className="aui-col-xs-3"
            >
              <i
                className="aui-iconfont iconfont icon-star"
                style={{ fontSize: '1.4rem', color: 'rgb(67, 67, 67)' }}
              />
              <div className="aui-bar-tab-label aui-font-size-12 aui-text-default">
                Mi favorito
              </div>
            </div>
            <div
              data-onclick="$util.openWindow('address_list_win')"
              className="aui-col-xs-3"
            >
              <i
                className="aui-iconfont iconfont icon-dizhi-01"
                style={{ fontSize: '1.4rem', color: 'rgb(67, 67, 67)' }}
              />
              <div className="aui-bar-tab-label aui-font-size-12 aui-text-default">
                Mi dirección
              </div>
            </div>
            <div
              data-onclick="$util.openWindow('comment_list_win')"
              className="aui-col-xs-3"
            >
              <i
                className="aui-iconfont iconfont icon-dingdan1"
                style={{ fontSize: '1.4rem', color: 'rgb(67, 67, 67)' }}
              />
              <div className="aui-bar-tab-label aui-font-size-12 aui-text-default">
                Mi comentario
              </div>
            </div>
            <div
              data-onclick="$util.openWindow('coupon_list_win')"
              className="aui-col-xs-3"
            >
              <i
                className="aui-iconfont iconfont icon-youhuiquan"
                style={{ fontSize: '1.4rem', color: 'rgb(67, 67, 67)' }}
              />
              <div className="aui-bar-tab-label aui-font-size-12 aui-text-default">
                Mi cupón
              </div>
            </div>
            <div
              data-onclick="$util.openWindow('trace_list_win')"
              className="aui-col-xs-3"
            >
              <i
                className="aui-iconfont iconfont icon-zuji1"
                style={{ fontSize: '1.4rem', color: 'rgb(67, 67, 67)' }}
              />
              <div className="aui-bar-tab-label aui-font-size-12 aui-text-default">
                Mis huellas
              </div>
            </div>
            <div
              data-onclick="$util.openWindow('mess_list_win')"
              className="aui-col-xs-3"
            >
              <i
                className="aui-iconfont iconfont icon-custom-service"
                style={{ fontSize: '1.4rem', color: 'rgb(67, 67, 67)' }}
              />
              <div className="aui-bar-tab-label aui-font-size-12 aui-text-default">
                Servicios
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="common_block">
        <div className="title aui-font-weight aui-margin-l-15 aui-margin-r-15">
          Integral/Grupal
        </div>
        <section className="aui-grid" style={{ marginTop: '0.5rem' }}>
          <div className="aui-row">
            <div
              data-onclick="$util.openWindow('score_shop_win')"
              className="aui-col-xs-3"
            >
              <i
                className="aui-iconfont iconfont icon-jifenshangcheng"
                style={{ fontSize: '1.4rem', color: 'rgb(67, 67, 67)' }}
              />
              <div className="aui-bar-tab-label aui-font-size-12 aui-text-default">
                Integral
              </div>
            </div>
            <div
              data-onclick="$util.openWindow('group_shop_win')"
              className="aui-col-xs-3"
            >
              <i
                className="aui-iconfont iconfont icon-tuandui"
                style={{ fontSize: '1.4rem', color: 'rgb(67, 67, 67)' }}
              />
              <div className="aui-bar-tab-label aui-font-size-12 aui-text-default">
                Grupal
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="common_block">
        <div className="title aui-font-weight aui-margin-l-15 aui-margin-r-15">
          Distribución
        </div>
        <section
          className="aui-grid"
          style={{ marginTop: '0.5rem', marginBottom: '0.8rem' }}
        >
          <div className="aui-row">
            {drpDbStatus.is_open_drp ? (
              <div className="aui-col-xs-3">
                <i
                  className="aui-iconfont iconfont icon-daifahuo"
                  style={{ fontSize: '1.4rem', color: 'rgb(67, 67, 67)' }}
                />
                <div className="aui-bar-tab-label aui-font-size-12 aui-text-default">
                  Centro de distribución
                </div>
              </div>
            ) : (
              <></>
            )}
            {(userInfo.is_bonus || userInfo.is_distributor) &&
            (drpDbStatus.is_open_drp || drpDbStatus.is_open_bonus) ? (
              <div
                data-onclick="$util.openWindow('my_qrcode_win')"
                className="aui-col-xs-3"
              >
                <i
                  className="aui-iconfont iconfont icon-qr-code"
                  style={{ fontSize: '1.4rem', color: 'rgb(67, 67, 67)' }}
                />
                <div className="aui-bar-tab-label aui-font-size-12 aui-text-default">
                  Invitación a código binario
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
        </section>
      </div>
      <div style={{ height: '2.5rem' }}></div>
      <Tab />
    </div>
  );
};

index.wrappers = ['@/wrappers/auth'];
export default index;
