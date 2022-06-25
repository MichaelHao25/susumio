import Header from "@/component/Header";
import Paypal from "@/component/Paypal";
import { postPayPaypal, postRecharges } from "@/services/api";
import { Notify } from "notiflix";
import { history } from "@@/core/history";
import React, { LegacyRef, MutableRefObject, useRef, useState } from "react";

export default () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [money, setMoney] = useState<string>("");
  return (
    <div className={"recharge"}>
      <Header title={"Recargar"} />
      <div className="aui-content">
        <div className="bg">
          <div className="money">
            <div>Valor de cartera(Dólar)</div>
            <div style={{ display: "flex", marginTop: "1rem" }}>
              <span>$</span>
              <input
                className="input"
                type="number"
                id="money"
                ref={inputRef}
                value={money}
                onInput={(e) => setMoney(e.target.value)}
              />
            </div>
          </div>
          <div className="paybutton" id="button">
            <Paypal
              style={{
                shape: "rect",
                layout: "horizontal",
                label: "paypal",
              }}
              createOrder={(data: any, actions: any) => {
                if (!inputRef.current) {
                  return;
                }
                if (!inputRef.current.value) {
                  Notify.failure("Introduzca la cantidad correcta");
                  if (inputRef.current) {
                    inputRef.current.focus();
                  }
                  return;
                }
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: inputRef.current.value,
                        currency_code: "USD",
                      },
                    },
                  ],
                });
              }}
              onApprove={(data, actions) => {
                // postRecharges
                // postPayPaypal
                return actions.order.capture().then(function (details: any) {
                  alert(
                    "Transaction completed by " + details.payer.name.given_name,
                  );
                  if (details.status === "COMPLETED") {
                    postRecharges({
                      money: inputRef.current.value,
                      asset_type: "money",
                      type: 1,
                    }).then((res) => {
                      if (res) {
                        postPayPaypal(res.data).then((res) => {
                          if (res) {
                            Notify.success(res.msg);
                            history.push("/my");
                          }
                        });
                      }
                    });
                  } else {
                    Notify.failure("Pago fallido");
                  }
                });
              }}
              onCancel={(data) => {
                //alert(data);
                // todo 返回到我的未支付订单
              }}
              onError={(err) => {
                //   alert(JSON.stringify(err));
                // todo 展示错误页面
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
