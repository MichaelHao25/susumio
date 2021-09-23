import React, { useEffect, useState } from 'react';
import { Details, DetailsAttrInfo } from '@/services/interface';

interface Props {
  goods?: Details;
}

interface GoodsItem extends List {
  id: number;
  stock: number;
}

interface List {
  type: string;
  name: string;
  children: GoodsItem[];
}

export default (props: Props) => {
  const { goods } = props;
  const { thum = '', sell_price = 0, stock = 0 } = goods || {};
  const [data, setData] = useState<List[]>([]);
  const [typeOneIndex, setTypeOneIndex] = useState<number>(0);
  const [selectList, setSelectList] = useState<{
    [ke: string]: {
      id: number;
      num: string;
      stock: number;
    }[];
  }>({});
  // <Map<number, {
  //   id: number,
  //   num: string,
  // }Object>>
  useEffect(() => {
    const { spec_info = [], spec_group_info = [] } = goods || {};
    if (spec_info.length === 0) {
      return;
    }
    if (spec_group_info.length === 0) {
      return;
    }
    const list: List[] = [];
    spec_info[0].options.map((type) => {
      list.push({
        type: spec_info[0].name,
        name: type,
        children: spec_info[1].options.map((cType) => {
          // spec_option_group: "Roja clara #1_S"
          const res = spec_group_info.find(
            (item) => item.spec_option_group === `${type}_${cType}`,
          );
          const { id = 0, stock = 0 } = res || {};
          return {
            id,
            stock,
            type: spec_info[1].name,
            name: cType,
            children: [],
          };
        }),
      });
    });

    setData(list);
  }, [goods]);

  function getValue(id: number): string {
    const res = (selectList[typeOneIndex] || []).find((item) => item.id === id);
    return res ? res.num : '';
  }

  function getCount(index: number): React.ReactNode {
    const total = (selectList[index] || []).reduce((a, b) => {
      return a + parseInt(b.num);
    }, 0);
    if (total) {
      return <div className="num-icon">{total}</div>;
    } else {
      return <></>;
    }
  }

  function handleChangeNum(
    id: number,
    action: {
      type: 'add' | 'remove' | 'set';
      num?: string;
      stock: number;
    },
  ) {
    const { type, num, stock } = action;
    let value = parseInt(num ? num : '0');
    if (value < 0 || value > stock) {
      return;
    }
    let res = selectList[typeOneIndex] || [];
    const index = res.findIndex((item) => {
      if (item.id === id) {
        const numberNUm = parseInt(item.num);
        if (type === 'add') {
          if (numberNUm + 1 >= stock) {
            item.num = stock.toString();
          } else {
            item.num = (numberNUm + 1).toString();
          }
        }
        if (type === 'remove') {
          if (numberNUm > 0) {
            item.num = (numberNUm - 1).toString();
          }
        }
        if (type === 'set') {
          item.num = value.toString();
        }
        return true;
      }
    });
    if (index === -1) {
      if (type === 'remove' || type === 'add') {
        res.push({
          id,
          num: '1',
          stock: stock,
        });
      } else {
        res.push({
          id,
          num,
          stock,
        });
      }

      selectList[typeOneIndex] = res;
    }
    setSelectList({ ...selectList });
  }

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 11,
        background: '#fff',
        maxHeight: '70vh',
        overflow: 'scroll',
      }}
    >
      <header
        className="aui-bar aui-bar-nav aui-bar-light"
        style={{ position: 'sticky' }}
      >
        <a className="aui-pull-left aui-btn" style={{ color: '#333' }}>
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

      <div className="aui-content">
        <div className="aui-row aui-padded-5">
          <h3 className="aui-font-size-12">{data?.[0]?.type}</h3>
          {data.map((item, index) => {
            const { type, name } = item;
            return (
              <div key={index} className="aui-col-xs-3">
                {getCount(index)}
                <div
                  className={`
                  aui-padded-t-5
                  aui-padded-b-5
                  aui-margin-t-10
                  aui-font-size-12
                  aui-text-center
                  aui-border
                  aui-margin-r-10
                  ${
                    typeOneIndex === index ? 'aui-bg-info aui-text-white' : ''
                  }`}
                  onClick={() => {
                    setTypeOneIndex(index);
                  }}
                >
                  {name}
                </div>
              </div>
            );
          })}
        </div>

        <div className="aui-row aui-padded-5">
          <h3 className="aui-font-size-12">
            {data?.[typeOneIndex]?.children?.[0].type}
          </h3>

          {/* 规格项、库存、熟练 */}
          {data?.[typeOneIndex]?.children?.map((item, index) => {
            const { name, stock, id } = item;
            return (
              <div
                className="aui-list-item-text aui-margin-t-5 is-flex"
                key={index}
              >
                <div className="flex-2">
                  <div className="spec-btn aui-font-size-12">{name}</div>
                </div>
                <div className="aui-list-item-title aui-font-size-12 aui-padded-l-10 aui-padded-r-10 spec-middle flex-2">
                  Existencias:{stock}
                </div>
                <div className="aui-list-item-right aui-text-price is-flex aui-padded-l-15 flex-2">
                  <i
                    onClick={() =>
                      handleChangeNum(id, { type: 'remove', stock })
                    }
                    className="aui-iconfont iconfont icon-jian aui-font-size-20 aui-text-info"
                  />
                  <input
                    className="aui-padded-l-5 aui-padded-r-5 aui-font-size-14 aui-text-center"
                    type="text"
                    style={{ marginTop: '-0.25rem' }}
                    pattern="[0-9]*"
                    onChange={(e) => {
                      const {
                        target: { value },
                      } = e;
                      handleChangeNum(id, {
                        type: 'set',
                        num: value,
                        stock,
                      });
                    }}
                    value={getValue(id)}
                  />

                  <i
                    onClick={() =>
                      handleChangeNum(id, {
                        type: 'add',
                        stock,
                      })
                    }
                    className="aui-iconfont iconfont icon-jia aui-font-size-20 aui-text-info"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <footer
        className="aui-bar aui-bar-tab"
        style={{ position: 'sticky', bottom: 0 }}
      >
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
    </div>
  );
};
