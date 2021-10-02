import './index.less';
import Header from '@/component/Header';
import { ConnectProps } from '@@/plugin-dva/connect';
import { GoodsList } from '@/pages/goodsDetails/SpecInfoSelect';
import { useEffect, useState } from 'react';
import {
  postOrdersView,
  postQueryMarketUser,
  postQuerySave,
  postQueryUsersDefaultAddress,
} from '@/services/api';
import Notiflix, { Notify } from 'notiflix';
import { history } from 'umi';

interface Props extends ConnectProps<{}, { goodsList: GoodsList[] }, {}> {}

interface Address {
  address: string;
  mobile: string;
  province: string;
  consignee_name: string;
  id: number;
}

interface Cost {
  freight_money: number;
  goods_money: number;
  total_money: number;
}

export default (props: Props) => {
  const {
    location: {
      state: { goodsList },
    },
  } = props;
  const [address, setAddress] = useState<Address>({
    address: '',
    mobile: '',
    province: '',
    id: 0,
    consignee_name: '',
  });
  const [cost, setCost] = useState<Cost>({
    freight_money: 0,
    goods_money: 0,
    total_money: 0,
  });
  const [memo, setMemo] = useState<string>('');
  useEffect(() => {
    console.log(goodsList);
    postQueryUsersDefaultAddress().then((res) => {
      console.log(',,', res);
      if (res) {
        setAddress(res.data);
        const req = {
          address_id: res.data.id,
          goods_info: goodsList.map((item) => {
            return {
              goods_id: item.goods_id,
              num: parseInt(item.num),
              spec_group_id_str: item.goods_id_str,
            };
          }),
        };

        postOrdersView(req).then((res2) => {
          console.log(res2);
          if (res2) {
            setCost(res2.data);
            const req2 = {
              money: res2.data.total_money,
              goods_ids: req.goods_info.map((item) => item.goods_id),
            };
            postQueryMarketUser(req2).then((res3) => {
              console.log(res3);
            });
          }
        });
      }
    });
  }, []);

  function handleSubmit() {
    const req = {
      address_id: address.id,
      goods_info: goodsList.map((item) => {
        return {
          goods_id: item.goods_id,
          num: parseInt(item.num),
          spec_group_id_str: item.goods_id_str,
        };
      }),
      market_activity_type: 0,
      market_activity_id: 0,
      memo,
    };
    postQuerySave(req).then((res) => {
      console.log(res);
      if (res) {
        Notify.success(res.msg);
        const { order_no, total_money } = res.data;
        // 跳转到支付页面带入订单号和支付金额
        history.push('/paySelect', {
          order_no,
          total_money,
        });
      }
    });
  }

  return (
    <div className={'orderConfirm'}>
      <Header title={'Hacer el pedido'} />
      <div className="aui-content aui-margin-b-10 aui-margin-t-10">
        <ul
          className="aui-list aui-media-list"
          style={{ backgroundImage: 'none' }}
        >
          <li
            data-onClick="app.selectAddress()"
            className="aui-list-item aui-list-item-arrow"
            style={{ backgroundImage: 'none' }}
          >
            <div className="aui-media-list-item-inner">
              <div className="aui-list-item-label-icon">
                <i className="aui-iconfont iconfont icon-dizhi1 aui-font-size-20 aui-text-info" />
              </div>
              <div className="aui-list-item-inner">
                <div className="aui-list-item-text">
                  <div className="aui-list-item-title aui-font-weight">
                    {address.province} {address.address}
                  </div>
                </div>
                <div
                  className="aui-info aui-margin-t-10"
                  style={{ padding: '0px' }}
                >
                  <div className="aui-info-item">
                    <span>{address.consignee_name}</span>
                  </div>
                  <div className="aui-info-item">{address.mobile}</div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div
        className="aui-content aui-padded-l-5 aui-padded-r-5 aui-padded-t-5 aui-bg-white"
        style={{ backgroundImage: 'none' }}
      >
        <ul className="aui-list aui-media-list">
          {goodsList.map((item) => {
            const {
              id,
              thum,
              name,
              sell_price,
              spec_option_group,
              intro,
              num,
            } = item;
            return (
              <li
                className="aui-list-item aui-margin-b-5 aui-bg-default"
                key={id}
                style={{ backgroundImage: 'none' }}
              >
                <div className="aui-media-list-item-inner">
                  <div className="aui-list-item-media">
                    <img src={thum} />
                  </div>
                  <div className="aui-list-item-inner">
                    <div className="aui-list-item-text">
                      <div className="aui-list-item-title aui-ellipsis-2 aui-font-size-14">
                        {name}
                      </div>
                    </div>
                    <div className="aui-list-item-text">
                      <div className="aui-list-item-title aui-ellipsis-2 aui-text-pray  aui-font-size-12 aui-padded-t-5">
                        la
                        {intro}
                      </div>
                    </div>
                    <div className="aui-list-item-text">
                      <div className="aui-list-item-title aui-text-pray aui-font-size-12 aui-padded-t-5">
                        Especificaciones:
                        {spec_option_group}
                      </div>
                    </div>
                    <div className="aui-list-item-text aui-margin-t-5">
                      <div className="aui-list-item-title aui-text-price aui-font-size-14">
                        <span style={{ fontSize: '0.5rem' }}>$</span>{' '}
                        <span className="aui-font-size-14">{sell_price}</span>
                      </div>
                      <div
                        className="aui-list-item-right aui-text-price aui-margin-t-5"
                        style={{ display: 'flex', paddingLeft: '20px' }}
                      >
                        <i className="aui-iconfont iconfont icon-jian aui-font-size-20 aui-text-info" />{' '}
                        <input
                          type="text"
                          pattern="[0-9]*"
                          value={num}
                          className="aui-padded-l-5 aui-padded-r-5 aui-font-size-14 aui-text-center"
                        />
                        <i className="aui-iconfont iconfont icon-jia aui-font-size-20 aui-text-info" />
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <ul className="aui-list aui-list-in">
        <li className="aui-list-item">
          <div className="aui-list-item-inner">
            <div className="aui-list-item-title aui-font-size-14">Flete</div>
            <div className="aui-list-item-right aui-font-size-14">
              <span className="aui-font-size-12">$</span>
              <span>{cost.freight_money}</span>
            </div>
          </div>
        </li>
      </ul>
      <div className="aui-padded-l-5 aui-padded-r-5 aui-bg-white aui-padded-b-5">
        <div className="line">
          <div className="left">Notas del comprador:</div>
          <div>
            <textarea
              rows={18}
              cols={80}
              value={memo}
              onChange={(e) => {
                setMemo(e.target.value);
              }}
              placeholder="Dejar un mensaje"
              className="aui-padded-5"
              style={{
                border: '1px solid rgb(247, 247, 247)',
                height: '5rem',
                resize: 'none',
              }}
            />
          </div>
        </div>
      </div>
      <div style={{ minHeight: '2.25rem' }} />
      <footer
        className="aui-bar aui-bar-tab"
        id="footer"
        style={{ paddingBottom: '0px' }}
      >
        <div className="price" style={{ backgroundColor: '#a0a0a0' }}>
          <span style={{ color: '#dedddd' }}>
            Total:
            <span className="aui-text-white aui-font-size-12">$</span>
            <span className="aui-text-white aui-font-size-18" id="totalPrice">
              {cost.total_money}
            </span>
          </span>
        </div>
        <div className="submit" onClick={handleSubmit}>
          Listo
        </div>
      </footer>
    </div>
  );
};
