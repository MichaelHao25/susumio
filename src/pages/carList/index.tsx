import Header from '@/component/Header';
import './index.less';
import { AllList } from '@/services/interface';
import List from '@/component/List';
import React, { useState } from 'react';
import { ConnectProps } from 'umi';
import Tab from '@/component/Tab';
import res from './res.json';

interface Props extends ConnectProps<{}, {}, {}> {}

export default (props: Props) => {
  const [list, setList] = useState(() => {
    return res.data;
  });
  return (
    <div className="carList">
      <header
        className="aui-bar aui-bar-nav aui-bar-light"
        id="header"
        style={{ backgroundImage: 'none' }}
      >
        <div className="aui-title">Carro</div>
        <a className="aui-pull-right aui-btn" style={{ color: '#358cff' }}>
          Edición Completar
        </a>
      </header>

      <ul className="aui-list aui-media-list">
        <li>
          <div className="aui-list-item">
            <div className="aui-list-item-inner aui-text-right">
              <div className="aui-btn aui-btn-info  aui-btn-outlined aui-font-size-12 aui-margin-r-10">
                Eliminar
              </div>
              <div className="aui-btn aui-btn-info aui-btn-outlined aui-font-size-12">
                Añadir a favorito
              </div>
            </div>
          </div>
        </li>
        {list.map((cart) => {
          const { id } = cart;
          return (
            <li className="aui-list-item" key={cart.id}>
              <div className="aui-media-list-item-inner">
                <div
                  className="aui-list-item-media"
                  style={{
                    width: '1.7rem',
                    alignItems: 'center',
                  }}
                >
                  <i className="aui-iconfont iconfont icon-yuanxingweixuanzhong  aui-font-size-18 aui-text-pray" />
                  <i className="aui-iconfont iconfont icon-roundcheckfill aui-text-info  aui-font-size-18" />
                </div>
                <div
                  className="aui-list-item-media"
                  style={{
                    width: '5rem',
                  }}
                >
                  {/* 规格缩略图 */}
                  <img
                    src={cart.spec_group_info.thum || cart.goods_info.thum}
                    className="aui-list-img-sm"
                    style={{ border: '1px solid #f4f4f4' }}
                  />
                </div>
                {/* 查看购物车详情 */}
                <div
                  className="aui-list-item-inner"
                  style={{
                    alignItems: 'flex-start',
                  }}
                >
                  <div className="aui-list-item-text">
                    <div className="aui-list-item-title aui-font-size-12">
                      {cart.goods_info.name}
                    </div>
                  </div>
                  <div className="aui-list-item-text">
                    <div className="aui-list-item-title aui-font-size-12 aui-padded-t-5 aui-text-pray">
                      {cart.goods_info.intro}
                    </div>
                  </div>
                  <div className="aui-list-item-text">
                    <div className="aui-list-item-title aui-font-size-12 aui-padded-t-5 aui-text-pray">
                      Especificaciones:{cart.spec_group_info.spec_option_group}
                    </div>
                  </div>
                  <div className="aui-list-item-text aui-margin-t-10">
                    <span className="aui-text-price aui-font-size-14">
                      <span
                        className="aui-text-price"
                        style={{ fontSize: '0.5rem' }}
                      >
                        $
                      </span>
                      <span>
                        {/* 规格价格 */}
                        {cart.spec_group_id_str
                          ? cart.spec_group_info.sell_price
                          : cart.spec_group_info.sell_price}
                        {/* 商品价格 */}
                      </span>
                    </span>
                  </div>
                </div>
                {/* 设置购物车信息 */}
                <div
                  className="aui-list-item-inner"
                  style={{
                    alignItems: 'flex-start',
                    margin: '0 0.2rem',
                  }}
                >
                  <div className="aui-list-item-text aui-margin-t-10">
                    <div className="aui-list-item-text setnum">
                      <div className="aui-bar aui-bar-btn" id="demo">
                        <div className="aui-bar-btn-item aui-font-size-14">
                          <i className="aui-iconfont aui-icon-minus" />
                        </div>
                        <div className="aui-bar-btn-item">
                          <input
                            type="number"
                            readOnly
                            className="aui-input aui-text-center"
                            id="count"
                            value={cart.num}
                          />
                        </div>
                        <div className="aui-bar-btn-item aui-font-size-20">
                          <i className="aui-iconfont aui-icon-plus" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="aui-list-item-text aui-margin-t-10"
                    style={{
                      border: '1px solid #dedede',
                      borderRadius: '2px',
                      paddingLeft: '0.5rem',
                    }}
                  >
                    <div className="aui-list-item-title aui-font-size-12 aui-padded-t-5 aui-padded-b-5 aui-text-pray">
                      Especificaciones: {cart.spec_group_info.spec_option_group}
                    </div>
                    <i className="aui-iconfont aui-icon-down aui-pull-right aui-font-size-12 aui-padded-r-5" />
                  </div>
                </div>
                {/* 设置单个购物车编辑状态按钮 */}
                <div
                  className="aui-list-item-media"
                  style={{
                    width: '1.7rem',
                  }}
                >
                  {/*v-show="!cart.isEdit"*/}
                  <a className="aui-pull-right">
                    <span className="aui-iconfont iconfont icon-icon-" />
                  </a>
                  <i
                    className="aui-iconfont aui-icon-close aui-font-size-12"
                    style={{ position: 'absolute', bottom: '0.5rem' }}
                  >
                    {cart.num}
                  </i>
                </div>
                <div
                  className=" aui-wanch"
                  style={{
                    width: '4rem',
                  }}
                >
                  Listo
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <footer className="aui-bar aui-bar-tab" id="checkout">
        <div className="selectall aui-padded-l-15">
          <i
            className="aui-iconfont iconfont icon-yuanxingweixuanzhong aui-font-size-18"
            style={{ color: '#777' }}
          />
          <i className="aui-iconfont iconfont icon-roundcheckfill aui-text-info aui-font-size-18" />
          <span>Todo</span>
        </div>
        <div className="price">
          Total:
          <span className="aui-font-size-14 aui-text-price">$</span>
          <span
            className="aui-text-price aui-font-size-20"
            v-text="totalPrice"
          />
        </div>
        <div className="submit">Pagar</div>
      </footer>
      <div style={{ height: '2.25rem' }}></div>
      <div style={{ height: '2.5rem' }}></div>
      <Tab />
    </div>
  );
};
