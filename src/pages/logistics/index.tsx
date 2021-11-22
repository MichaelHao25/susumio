import Header from "@/component/Header";
import { ConnectProps } from "umi";
import { OrdersListItem } from "@/services/interface";
import { useEffect } from "react";
import LazyLoad from "react-lazyload";

interface Props
  extends ConnectProps<
    {},
    {
      order: OrdersListItem;
    },
    {}
  > {}

export default (props: Props) => {
  const {
    location: {
      state: { order },
    },
  } = props;
  useEffect(() => {
    YQV5.trackSingle({
      //必须，指定承载内容的容器ID。
      YQ_ContainerId: "YQContainer",
      //可选，指定查询结果高度，最大为800px，默认为560px。
      YQ_Height: 560,
      //可选，指定运输商，默认为自动识别。
      YQ_Fc: "0",
      //可选，指定UI语言，默认根据浏览器自动识别。
      YQ_Lang: "en",
      //必须，指定要查询的单号。
      YQ_Num: order.express_no,
    });
  });
  const logisticsMap = {
    HTKY: "Megatone universal",
    EMS: "EMS",
    STO: "Correo urgente",
    SF: "Otros Express",
    HHTT: "Entrega diaria",
    YTO: "¡Otros!",
    YD: "¡Merda!",
    ZTO: "Mensajería",
    ZJS: "Mansión",
    YZPY: "Correo urgente",
    AJ: "Entrega rápida",
  };
  const expressTypeFilter = (str: any) => {
    if (str) {
      // @ts-ignore
      str = (logisticsMap[str] || "Otros envíos").concat(
        ": ",
        order.express_no,
      );
      return str;
    } else {
      return "";
    }
    return "";
  };
  return (
    <>
      <Header title={"Información logística"} />
      <div id="app">
        {/* 中间页 */}
        {/* 商品信息 */}
        <div className="goods">
          {order.order_goods_info.map((goods) => {
            return (
              <div className="thum">
                <LazyLoad once>
                  <img loading="lazy" src={goods.thum} />
                </LazyLoad>
              </div>
            );
          })}
          <div className="content">
            {/*<div className="status aui-font-size-18" v-text="logisticsStatus[info.State]"/>*/}
            <div className="logistics-info aui-font-size-14">
              {expressTypeFilter(order.express_type)}
            </div>
            {/* <div class="telephone aui-font-size-14" tapmode onclick="call()">官方电话：{{info.comcontact}}</div> */}
          </div>
        </div>
        <div id="YQContainer" />
        {/* 物流信息 */}
        {/*<section className="aui-content"*/}
        {/*         style={{backgroundColor: '#fff'}}>*/}
        {/*  <div data-lick="check()"*/}
        {/*       className="check aui-padded-15 aui-text-center">Información logística*/}
        {/*  </div>*/}
        {/*</section>*/}
      </div>
    </>
  );
};
