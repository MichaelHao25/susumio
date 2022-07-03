import Header from "@/component/Header";
import MoneyValueUnitRender from "@/component/MoneyValueUnitRender";
import { GoodsList } from "@/pages/goodsDetails/SpecInfoSelect";
import {
  postAddressesCreate,
  postFreightTemplate,
  postOrdersView,
  postQueryMarketUser,
  PostQuerySave,
  postQuerySave,
  postQueryUsersDefaultAddress,
} from "@/services/api";
import { AddressItem } from "@/services/interface";
import { ConnectProps } from "@@/plugin-dva/connect";
import { Notify } from "notiflix";
import { useEffect, useState } from "react";
import { history } from "umi";
import { FreightTemplate } from "../addressEdit";
import "./index.less";

type IProps = ConnectProps<
  Record<string, never>,
  { goodsList: GoodsList[]; shoperId: string },
  Record<string, never>
>;

enum Action {
  Add,
  Remove,
  Set,
}

interface Address {
  address: string;
  mobile: string;
  province: string;
  consignee_name: string;
  id: number;
  express_type: string;
  province_code: string;
}

interface Cost {
  freight_money: number;
  goods_money: number;
  total_money: number;
}

export default (props: IProps) => {
  const { location: { state: { shoperId = "" } = {} } = {} } = props;
  const [freightTemplate, setFreightTemplate] = useState<FreightTemplate[]>([]);
  const [goodsList, setGoodsList] = useState<GoodsList[]>(() => {
    const { location: { state: { goodsList = [] } = {} } = {} } = props;
    if (goodsList.length === 0) {
      history.replace("/");
    }
    return goodsList;
  });
  const [address, setAddress] = useState<Address>({
    address: "",
    mobile: "",
    province: "",
    id: 0,
    consignee_name: "",
    express_type: "",
    province_code: "",
  });
  const [cost, setCost] = useState<Cost>({
    freight_money: 0,
    goods_money: 0,
    total_money: 0,
  });
  const [memo, setMemo] = useState<string>("");
  useEffect(() => {
    postFreightTemplate().then((res) => {
      if (res) {
        setFreightTemplate(res.data);
      }
    });
  }, []);
  useEffect(() => {
    postQueryUsersDefaultAddress().then((res) => {
      if (res) {
        if (!res.data.id) {
          Notify.failure("Añadir la dirección");
          //   selectAddress();
          return;
        }
        const address = sessionStorage.getItem("address");
        let parseAddress: any = {};
        if (address) {
          parseAddress = JSON.parse(address);
          setAddress(parseAddress);
        } else {
          setAddress(res.data);
        }
      }
    });
  }, []);
  useEffect(() => {
    if (address.id === 0) {
      return;
    }
    const req = {
      address_id: address.id,
      goods_info: goodsList.map((item) => {
        return {
          goods_id: item.goods_id,
          num: item.num,
          spec_group_id_str: item.goods_id_str,
        };
      }),
    };

    postOrdersView(req).then((res2) => {
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
  }, [address, goodsList]);

  function handleSubmit() {
    const shareInfoString: string | null =
      window.localStorage.getItem("global_shareInfo");

    const req: PostQuerySave = {
      address_id: address.id,
      goods_info: goodsList.map((item) => {
        return {
          goods_id: item.goods_id,
          num: item.num,
          spec_group_id_str: item.goods_id_str,
        };
      }),
      market_activity_type: 0,
      market_activity_id: 0,
      memo,
      shoper_id: shoperId,
    };
    if (shareInfoString) {
      const shareInfoParsed = JSON.parse(shareInfoString);
      if (
        goodsList.some((item) => item.id === parseInt(shareInfoParsed.id, 10))
      ) {
        req.shareCode = shareInfoParsed.shareCode;
      }
    }
    postQuerySave(req).then((res) => {
      if (res) {
        Notify.success(res.msg);
        const { order_no, total_money } = res.data;
        // 跳转到支付页面带入订单号和支付金额
        history.push("/paySelect", {
          order_no,
          total_money,
        });
        /**
         * 如果有分享码的话就清楚分享信息
         */
        if (req.shareCode) {
          window.localStorage.removeItem("global_shareInfo");
        }
      }
    });
  }

  function selectAddress() {
    history.push("/addressList", {
      selectAddress: true,
    });
  }
  const handleAddOrRemove = (
    type: Action,
    id: number,
    newValue?: number,
  ): void => {
    setGoodsList((goods) => {
      goods.some((item, index) => {
        if (item.id === id) {
          if (type === Action.Add) {
            item.num++;
          } else if (Action.Set === type) {
            if (newValue !== undefined) {
              item.num = newValue;
            }
          } else {
            item.num--;
          }
        }
        /**
         * 更新传过来的参数属性
         */
        const { location: { state: { goodsList = [] } = {} } = {} } = props;
        if (goodsList.length !== 0) {
          goodsList[index].num = item.num;
        }
        if (item.id === id) {
          return true;
        }
        /**
         * 结束
         */
      });
      return [...goods];
    });
  };
  return (
    <div className={"orderConfirm"}>
      <Header title={"Hacer el pedido"} />
      <div className="aui-content aui-margin-b-10 aui-margin-t-10">
        <ul
          className="aui-list aui-media-list"
          style={{ backgroundImage: "none" }}
        >
          <li
            onClick={selectAddress}
            className="aui-list-item aui-list-item-arrow"
            style={{ backgroundImage: "none" }}
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
                  style={{ padding: "0px" }}
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
        style={{ backgroundImage: "none" }}
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
                style={{ backgroundImage: "none" }}
              >
                <div className="aui-media-list-item-inner">
                  <div className="aui-list-item-media">
                    <img loading="lazy" src={thum} />
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
                        {/* <span style={{ fontSize: "0.5rem" }}>$</span> */}
                        <span className="aui-font-size-14">
                          <MoneyValueUnitRender>
                            {sell_price}
                          </MoneyValueUnitRender>
                        </span>
                      </div>
                      <div
                        className="aui-list-item-right aui-text-price aui-margin-t-5"
                        style={{ display: "flex", paddingLeft: "20px" }}
                      >
                        <i
                          className="aui-iconfont iconfont icon-jian aui-font-size-20 aui-text-info"
                          onClick={() => {
                            handleAddOrRemove(Action.Remove, id);
                          }}
                        />
                        <input
                          type="text"
                          pattern="[0-9]*"
                          value={num}
                          onChange={(e) => {
                            handleAddOrRemove(
                              Action.Set,
                              id,
                              parseInt(e.target.value || "0", 10),
                            );
                          }}
                          className="aui-padded-l-5 aui-padded-r-5 aui-font-size-14 aui-text-center"
                        />
                        <i
                          className="aui-iconfont iconfont icon-jia aui-font-size-20 aui-text-info"
                          onClick={() => {
                            handleAddOrRemove(Action.Add, id);
                          }}
                        />
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
              {/* <span className="aui-font-size-12">$</span> */}
              <span>
                <MoneyValueUnitRender>
                  {cost.freight_money}
                </MoneyValueUnitRender>
              </span>
            </div>
          </div>
        </li>
      </ul>
      <div className="aui-padded-l-5 aui-padded-r-5 aui-bg-white aui-padded-b-5">
        <div className="line">
          <div className="left">Envio:</div>
          <div>
            <select
              value={address.express_type}
              onChange={(e) => {
                // setAddress((address) => {
                //   return {
                //     ...address,
                //     express_type: e.target.value,
                //   };
                // });
                /**
                 * 更新地址
                 */
                const express_type = e.target.value;
                postAddressesCreate({
                  ...address,
                  express_type,
                } as AddressItem).then((res) => {
                  if (res) {
                    sessionStorage.setItem(
                      "address",
                      JSON.stringify({ ...address, express_type }),
                    );
                    setAddress((address) => {
                      return {
                        ...address,
                        express_type,
                      };
                    });
                  }
                });
              }}
            >
              <option value="">Seleccione la Envio</option>
              {freightTemplate
                .filter((item) => item.country_code === address.province_code)
                .map((item) => {
                  return (
                    <option key={item.express} value={item.express}>
                      {item.express}
                    </option>
                  );
                })}
            </select>
          </div>
        </div>
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
                border: "1px solid rgb(247, 247, 247)",
                height: "5rem",
                resize: "none",
              }}
            />
          </div>
        </div>
      </div>
      <div style={{ minHeight: "2.25rem" }} />
      <footer
        className="aui-bar aui-bar-tab"
        id="footer"
        style={{ paddingBottom: "0px" }}
      >
        <div className="price" style={{ backgroundColor: "#a0a0a0" }}>
          <span style={{ color: "#dedddd" }}>
            Total:
            {/* <span className="aui-text-white aui-font-size-12">$</span> */}
            <span className="aui-text-white aui-font-size-18" id="totalPrice">
              <MoneyValueUnitRender>{cost.total_money}</MoneyValueUnitRender>
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
