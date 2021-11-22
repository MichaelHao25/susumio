import Header from "@/component/Header";
import "./index.less";
import "../../assets/img/payssion/flag.less";
import { ConnectProps } from "@@/plugin-dva/connect";
import { useEffect, useState } from "react";
import {
  postPayMoney,
  postPayPaypal,
  postPayssionPay,
  postQueryPayPassword,
} from "@/services/api";
import Notiflix, { Notify } from "notiflix";
import { history } from "umi";
import Paypal from "@/component/Paypal";
import MoneyValueUnitRender from "@/component/MoneyValueUnitRender";

interface Props
  extends ConnectProps<
    {},
    {
      order_no: string;
      total_money: number;
    },
    {}
  > {}

enum PaySessionType {
  mx,
  co,
  pe,
}

export default (props: Props) => {
  const { location: { state: { order_no, total_money } = {} } = {} } = props;
  if (!order_no) {
    history.replace("/");
  }
  const [isBalance, setIsBalance] = useState<boolean>(false);
  const [paySessionType, setPaySessionType] = useState<PaySessionType>(
    PaySessionType.mx,
  );
  const [isSetPayPassword, setIsSetPayPassword] = useState<0 | 1>(0);

  useEffect(() => {
    postQueryPayPassword().then((res) => {
      if (res) {
        setIsSetPayPassword(res.data.is_set_pay_password);
      }
    });
  }, []);

  function handlePayBalance() {
    setIsBalance(true);

    Notiflix.Confirm.show(
      "Introduzca la contraseña de pago",
      `<input type="password" class="confirm_password"/>`,
      "Confirmar",
      "Cancelar",
      function () {
        const input: HTMLInputElement | null =
          document.querySelector(".confirm_password");
        if (input) {
          const value = input.value;
          if (value !== "") {
            postPayMoney({
              pay_password: value,
              order_no,
            }).then((res) => {
              console.log(res);
              if (res) {
                Notify.success(res.msg);
              }
              history.push("/orderList", {
                status: 0,
              });
            });
          }
        }
      },
      function () {
        history.push("/orderList", {
          status: 0,
        });
      },
    );
  }

  //

  function payByPayssion(pm_id: string) {
    postPayssionPay({
      order_no,
      pm_id,
    }).then((res) => {
      console.log(res);
      if (res) {
        history.push("/payssion", {
          paylink: res.data,
          pm_id,
        });
      }
    });
  }

  return (
    <div className={"paySelect"}>
      <Header title={"Elija el modo de pago"} />
      <div className="aui-content">
        <div className="aui-bg-white aui-padded-15 aui-margin-t-10 aui-margin-b-10">
          <h3>
            Número de pedido:<span>{order_no}</span>
          </h3>
          <h3 className="aui-padded-t-10">
            Importe del pedido：{" "}
            {/* <span className="aui-text-price aui-font-size-12">$</span> */}
            <span className="aui-text-price aui-font-size-18">
              <MoneyValueUnitRender>{total_money}</MoneyValueUnitRender>
            </span>
          </h3>
        </div>
        {isSetPayPassword ? (
          <>
            <div className="aui-margin-b-15">
              <ul
                className="aui-list aui-list-in"
                style={{ backgroundImage: "none" }}
              >
                <li className="aui-list-item" style={{ height: "3rem" }}>
                  <div className="aui-list-item-label-icon">
                    <i
                      className="aui-iconfont iconfont icon-yue"
                      style={{ fontSize: "1.5rem", color: "#eb661b" }}
                    />
                  </div>
                  <div
                    className="aui-list-item-inner"
                    onClick={() => setIsBalance((a) => !a)}
                  >
                    <div className="aui-list-item-title">Pago del saldo</div>
                    <div className="aui-list-item-right">
                      <i
                        className={`aui-iconfont iconfont icon-roundcheckfill aui-margin-r-5 aui-font-size-20 ${
                          isBalance ? "aui-text-info" : ""
                        }`}
                        style={{ color: isBalance ? "#ccc" : "" }}
                      />
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div className="area">
              <div
                className="submit"
                style={{ letterSpacing: "0rem" }}
                onClick={handlePayBalance}
              >
                Confirmar
                <span>
                  {/* $ */}
                  <MoneyValueUnitRender>{total_money}</MoneyValueUnitRender>
                </span>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
        <div id="ali" />
      </div>
      <div id="paypal-button-container" className="aui-margin-t-15">
        <Paypal
          style={{
            shape: "rect",
            layout: "horizontal",
            label: "paypal",
          }}
          createOrder={(data: any, actions: any) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: total_money,
                    currency_code: "USD",
                    invoice_id: order_no,
                  },
                },
              ],
            });
          }}
          onApprove={(data, actions) => {
            return actions.order.capture().then(function (details: any) {
              //   alert(
              //     "Transaction completed by " + details.payer.name.given_name,
              //   );

              if (details.status == "COMPLETED") {
                postPayPaypal({
                  order_no,
                }).then((res) => {
                  if (res) {
                    Notify.success(res.msg);
                  }
                  history.push("/orderList", {
                    status: 0,
                  });
                });
              }
            });
          }}
          onCancel={(data) => {
            //alert(data);
            // todo 返回到我的未支付订单
            history.push("/orderList", {
              status: 0,
            });
          }}
          onError={(err) => {
            //   alert(JSON.stringify(err));
            // todo 展示错误页面
          }}
        />
      </div>
      <div id="payssion-button-container" className="aui-margin-t-15">
        <div>
          <img
            loading="lazy"
            src={require("../../assets/img/payssion/logo.png")}
            className="aui-margin-t-15"
            style={{ height: "2rem", margin: "0 auto" }}
          />
        </div>
        <div className="aui-tab" id="tab">
          <div
            className={`aui-tab-item ${
              paySessionType === PaySessionType.mx ? "aui-active" : ""
            }`}
            onClick={() => setPaySessionType(PaySessionType.mx)}
          >
            <span>
              <i className="mx  flag" />
              Mexico
            </span>
          </div>
          <div
            className={`aui-tab-item ${
              paySessionType === PaySessionType.co ? "aui-active" : ""
            }`}
            onClick={() => setPaySessionType(PaySessionType.co)}
          >
            <span>
              <i className="co  flag" />
              Colombia
            </span>
          </div>
          <div
            className={`aui-tab-item ${
              paySessionType === PaySessionType.pe ? "aui-active" : ""
            }`}
            onClick={() => setPaySessionType(PaySessionType.pe)}
          >
            <span>
              <i className="pe  flag" />
              Peru
            </span>
          </div>
        </div>
        <div id="tab1-con">
          <div
            className={`${
              paySessionType === PaySessionType.mx ? "" : "aui-hide"
            }`}
            id="tab1-con1"
          >
            <section className="aui-grid">
              <div className="aui-row">
                <div
                  className="aui-col-10"
                  onClick={() => payByPayssion("spei_mx")}
                  style={{ padding: "0.4rem 0.6rem" }}
                >
                  <img
                    loading="lazy"
                    src={require("../../assets/img/payssion/spei_mx.png")}
                  />
                </div>
                <div
                  className="aui-col-10"
                  onClick={() => payByPayssion("oxxo_mx")}
                  style={{ padding: "0.4rem 0.6rem" }}
                >
                  <img
                    loading="lazy"
                    src={require("../../assets/img/payssion/oxxo_mx.png")}
                  />
                </div>
              </div>
            </section>
            <section className="aui-grid">
              <div className="aui-row">
                <div
                  className="aui-col-10"
                  onClick={() => payByPayssion("bancomer_mx")}
                  style={{ padding: "0.4rem 0.6rem" }}
                >
                  <img
                    loading="lazy"
                    src={require("../../assets/img/payssion/bancomer_mx.png")}
                    className="aui-margin-t-15"
                  />
                </div>
                <div
                  className="aui-col-10"
                  onClick={() => payByPayssion("santander_mx")}
                  style={{ padding: "0.4rem 0.6rem" }}
                >
                  <img
                    loading="lazy"
                    src={require("../../assets/img/payssion/santander_mx.png")}
                    className="aui-margin-t-15"
                  />
                </div>
              </div>
            </section>
          </div>
          <div
            className={`${
              paySessionType === PaySessionType.co ? "" : "aui-hide"
            }`}
            id="tab1-con2"
          >
            <section className="aui-grid">
              <div className="aui-row">
                <div
                  className="aui-col-10"
                  onClick={() => payByPayssion("efecty_co")}
                  style={{ padding: "0.4rem 2rem" }}
                >
                  <img
                    loading="lazy"
                    src={require("../../assets/img/payssion/efecty_co.png")}
                  />
                </div>
                <div
                  className="aui-col-10"
                  onClick={() => payByPayssion("baloto_co")}
                  style={{ padding: "0.4rem 2rem" }}
                >
                  <img
                    loading="lazy"
                    src={require("../../assets/img/payssion/baloto_co.png")}
                  />
                </div>
              </div>
            </section>
            <section className="aui-grid">
              <div className="aui-row">
                <div
                  className="aui-col-10"
                  onClick={() => payByPayssion("pse_co")}
                  style={{ padding: "0.4rem 2.5rem" }}
                >
                  <img
                    loading="lazy"
                    src={require("../../assets/img/payssion/pse_co.png")}
                    className="aui-margin-t-15"
                  />
                </div>
                <div
                  className="aui-col-10"
                  onClick={() => payByPayssion("exito_co")}
                  style={{ padding: "0.4rem 2.5rem" }}
                >
                  <img
                    loading="lazy"
                    src={require("../../assets/img/payssion/exito_co.png")}
                    className="aui-margin-t-15"
                  />
                </div>
              </div>
            </section>
          </div>
          <div
            className={`${
              paySessionType === PaySessionType.pe ? "" : "aui-hide"
            }`}
            id="tab1-con3"
          >
            <section className="aui-grid">
              <div className="aui-row">
                <div
                  className="aui-col-10"
                  onClick={() => payByPayssion("bcp_pe")}
                  style={{ padding: "0.4rem 0.6rem" }}
                >
                  <img
                    loading="lazy"
                    src={require("../../assets/img/payssion/bcp_pe.png")}
                  />
                </div>
                <div
                  className="aui-col-10"
                  onClick={() => payByPayssion("interbank_pe")}
                  style={{ padding: "0.4rem 0.6rem" }}
                >
                  <img
                    loading="lazy"
                    src={require("../../assets/img/payssion/interbank_pe.png")}
                  />
                </div>
              </div>
            </section>
            <section className="aui-grid">
              <div className="aui-row">
                <div
                  className=" aui-col-10"
                  onClick={() => payByPayssion("bbva_pe")}
                  style={{ padding: "0.4rem 0.6rem" }}
                >
                  <img
                    loading="lazy"
                    src={require("../../assets/img/payssion/bbva_pe.png")}
                    className="aui-margin-t-15"
                  />
                </div>
                <div
                  className="aui-col-10"
                  onClick={() => payByPayssion("pagoefectivo_pe")}
                  style={{ padding: "0.4rem 0.6rem" }}
                >
                  <img
                    loading="lazy"
                    src={require("../../assets/img/payssion/pagoefectivo_pe.png")}
                    className="aui-margin-t-15"
                  />
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
