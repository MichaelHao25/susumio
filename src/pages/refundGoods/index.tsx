import Header from "@/component/Header";
import { ConnectProps } from "@@/plugin-dva/connect";
import { OrderListItemGoodsInfo } from "@/services/interface";
import { useState } from "react";
import { Confirm, Notify } from "notiflix";
import { postReturnGoods } from "@/services/api";
import { history } from "umi";
import Upload from "@/component/Upload";
import MoneyValueUnitRender from "@/component/MoneyValueUnitRender";

interface Props
  extends ConnectProps<{}, { goods: OrderListItemGoodsInfo }, {}> {}

export default (props: Props) => {
  const {
    location: {
      state: { goods },
    },
  } = props;
  if (!goods) {
    history.goBack();
  }
  const [desc, setDesc] = useState<string>("");
  const [imgs, setImgs] = useState<string[]>([]);
  function submit() {
    if (!desc) {
      Notify.failure("Por favor rellene el reembolso");
      return;
    }
    postReturnGoods({
      order_id: goods.order_id,
      order_goods_id: goods.id,
      return_type: 1,
      return_reason: desc,
      imgs: imgs,
    }).then((res) => {
      if (res) {
        Notify.success(res.msg);
        history.goBack();
      }
    });
  }

  return (
    <div className={"refundGoods"}>
      <Header title={"Reembolso"} />
      <div id="app">
        {/* 中间页 */}
        <div className="aui-content aui-padded-5 aui-bg-white aui-margin-t-10">
          <div className="aui-margin-b-15">
            <ul
              className="aui-list aui-form-list"
              style={{ backgroundImage: "none" }}
            >
              <li className="aui-list-item" style={{ backgroundImage: "none" }}>
                <div className="aui-list-item-inner">
                  <div className="aui-list-item-label">Importe</div>
                  <div className="aui-list-item-input">
                    <div className="aui-border aui-text-price aui-font-weight aui-padded-5">
                      <MoneyValueUnitRender>
                        {goods.real_price}
                      </MoneyValueUnitRender>
                    </div>
                  </div>
                </div>
              </li>
              <li className="aui-list-item" style={{ backgroundImage: "none" }}>
                <div className="aui-list-item-inner">
                  <div className="aui-list-item-label">Explicación</div>
                  <div className="aui-list-item-input">
                    <textarea
                      className="aui-border aui-padded-5"
                      placeholder="Notas"
                      value={desc}
                      onChange={(e) => setDesc(e.target.value)}
                    />
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div className="aui-row aui-row-padded aui-margin-b-10">
            {imgs.map((url, index) => {
              return (
                <div
                  className="aui-col-xs-3"
                  key={index}
                  onClick={() => {
                    Confirm.show(
                      "Cancel de imagen",
                      "Confirmas el cancel de imagen？",
                      "Sí",
                      "No",
                      () => {
                        setImgs((img) => {
                          img.splice(index, 1);
                          return [...img];
                        });
                      },
                    );
                  }}
                >
                  <img loading="lazy" src={url} style={{ height: "4.4rem" }} />
                  {/* <i
                    className="aui-iconfont aui-icon-close closeicon"
                    data-click="deleteImg(imgKey)"
                  /> */}
                </div>
              );
            })}
            <Upload
              uploadSuccessCallback={(e) => {
                setImgs((img) => [...img, e.host_file_path]);
              }}
            >
              <div className="aui-col-xs-3">
                <img
                  loading="lazy"
                  src={require("../../assets/img/add_photo.png")}
                />
              </div>
            </Upload>
          </div>
          <div className="area">
            <div className="submit" onClick={submit}>
              Presentación de solicitudes
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
