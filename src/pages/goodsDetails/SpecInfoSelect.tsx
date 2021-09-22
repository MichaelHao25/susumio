import React, { useEffect, useState } from 'react';
import { Details, DetailsAttrInfo } from '@/services/interface';

interface Props {
  goods?: Details;
}

export default (props: Props) => {
  const { goods } = props;
  const { thum = '', sell_price = 0, stock = 0 } = goods || {};
  const [data, setData] = useState<
    | {
        spec_info_0: DetailsAttrInfo;
        spec_info_1: DetailsAttrInfo;
        new_spec_info: any[];
      }
    | undefined
  >();
  useEffect(() => {
    const { spec_info = [], spec_group_info = [] } = goods || {};
    if (spec_info.length === 0) {
      return;
    }
    const spec_info_0 = spec_info[0];
    const spec_info_1 = spec_info[1];
    const new_spec_info = spec_info_0.options.map(function (item, index) {
      if (index == 0) {
        debugger;
        item.isSelected = true;
      }
      item.options = spec_info_1.options;
      item.total_count = 0;
      item.total_money = 0;
      return item;
    });
    new_spec_info.map(function (item) {
      var options_info = [];
      item.options.forEach(function (item_1) {
        var spec_info_item = spec_group_info.filter(function (item_2) {
          let spec_option_group = item_2.spec_option_group.split(',');
          var is_incloud = true;
          if (spec_option_group.indexOf(item.option) < 0) {
            return false;
          }
          if (spec_option_group.indexOf(item_1.option) < 0) {
            return false;
          }
          return is_incloud;
        });
        var objectinfo = {
          option: item_1.option,
          num: 0,
          name: spec_info_item[0].name,
          id: spec_info_item[0].id,
          thum: spec_info_item[0].thum,
          id_str: spec_info_item[0].id_str,
          goods_id: spec_info_item[0].goods_id,
          spec_option_group: spec_info_item[0].spec_option_group,
          sell_price: spec_info_item[0].sell_price,
          stock: spec_info_item[0].stock,
        };
        options_info.push(objectinfo);
      });
      item.options = options_info;
    });
    setData({
      spec_info_0,
      spec_info_1,
      new_spec_info,
    });
  }, [goods]);
  // data
  // setData
  const {
    spec_info_0: { name: spec_info_0_name = '' } = {},
    spec_info_1: { name: spec_info_1_name = '' } = {},
    new_spec_info = [],
  } = data || {};
  return (
    <>
      <header
        className="aui-bar aui-bar-nav aui-bar-light"
        style={{ backgroundImage: 'none', position: 'fixed' }}
      >
        <a
          className="aui-pull-left aui-btn"
          style={{ color: '#333 !important' }}
        >
          Seleccionar especificaciones
        </a>
        <div className="aui-title" />
        <a
          className="aui-pull-right aui-btn"
          // onClick={close}
        >
          <span className="aui-iconfont aui-icon-close" />
        </a>
      </header>
      <div style={{ height: '40px' }} />
      {/* 中间页 */}
      <div className="aui-row aui-padded-10">
        {/* 缩略图 */}
        <div className="aui-col-xs-6">
          <img src={thum} className="aui-padded-15" />
        </div>
        {/* 价格和库存 */}
        <div className="aui-col-xs-6 aui-padded-10">
          <h2 className="aui-text-price">
            <span style={{ fontSize: '0.6rem' }}>$</span>
            <span
              className="aui-font-size-20"
              style={{ letterSpacing: '.1rem' }}
            >
              {sell_price}
            </span>
          </h2>
          <h4 className="aui-text-default">Existencias: {stock}</h4>
        </div>
      </div>
      {/* 规格选项 */}

      <div className="aui-content" style={{ marginBottom: '2.6rem' }}>
        <div className="aui-row aui-padded-5">
          <h3 className="aui-font-size-12">{spec_info_0_name}</h3>
          {new_spec_info.map((item, index) => {
            const {
              total_count = 0,
              option: { option = '', isSelected = false } = {},
            } = item;
            return (
              <div key={index} className="aui-col-xs-3">
                {/*@click="selectSpec(option, new_spec_info, optionKey)"*/}
                <div className="num-icon">{total_count}</div>
                <div
                  className={` aui-padded-t-5 aui-padded-b-5 aui-margin-t-10 aui-font-size-12 aui-text-center aui-border aui-margin-r-10 ${
                    isSelected ? 'aui-bg-info aui-text-white' : ''
                  }`}
                >
                  {option}
                </div>
              </div>
            );
          })}
        </div>

        <div className="aui-row aui-padded-5">
          <h3 className="aui-font-size-12">{spec_info_1_name}</h3>

          {/* 规格项、库存、熟练 */}
          {new_spec_info.map((itemT, itemKeyT) => {
            const { isSelected = false, options } = itemT;
            if (isSelected) {
              return (
                <div>
                  {options.map((item: any, itemKey: any) => {
                    return (
                      <div
                        className="aui-list-item-text aui-margin-t-5 is-flex"
                        key={itemKey}
                      >
                        <div className="flex-2">
                          <div className="spec-btn aui-font-size-12">
                            {item.option}
                          </div>
                        </div>
                        <div className="aui-list-item-title aui-font-size-12 aui-padded-l-10 aui-padded-r-10 spec-middle flex-2">
                          Existencias:{item.stock}
                        </div>
                        <div className="aui-list-item-right aui-text-price is-flex aui-padded-l-15 flex-2">
                          <i className="aui-iconfont iconfont icon-jian aui-font-size-20 aui-text-info" />
                          {/*@click="changeNum(itemT,itemKey,-1,item.stock)"*/}
                          <input
                            className="aui-padded-l-5 aui-padded-r-5 aui-font-size-14 aui-text-center"
                            type="text"
                            style={{ marginTop: '-0.25rem' }}
                            pattern="[0-9]*"
                            value={item.num}
                          />
                          {/*@change="numberChagne(itemT,item,item.num)"*/}
                          <i className="aui-iconfont iconfont icon-jia aui-font-size-20 aui-text-info" />
                          {/*@click="changeNum(itemT,itemKey,1,item.stock)"*/}
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            } else {
              return <></>;
            }
          })}
        </div>
      </div>

      <footer className="aui-bar aui-bar-tab">
        <div
          className="aui-bar-tab-item aui-padded-l-15 aui-padded-r-15 aui-font-size-12"
          style={{ minWidth: '8rem' }}
        >
          Total:
          <span className="aui-font-size-14 aui-text-danger">
            {'{'}
            {'{'}total_count{'}'}
            {'}'}
          </span>{' '}
          Importe：
          <span className="aui-font-size-14 aui-text-danger">
            ${'{'}
            {'{'}total_money{'}'}
            {'}'}
          </span>
        </div>
        <div
          className="aui-bar-tab-item aui-padded-l-15 aui-padded-r-15"
          data-click="submit"
        >
          <div className="aui-btn aui-btn-block aui-btn-sm aui-btn-info">
            Confirmar
          </div>
        </div>
      </footer>
    </>
  );
};
