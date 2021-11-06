import Header from "@/component/Header";
import { useState } from "react";
import Notiflix, { Notify } from "notiflix";
import {
  postPayMoney,
  postQueryPayPassword,
  postWithdraw,
} from "@/services/api";
import { history } from "umi";
import MoneyValueUnitRender from "@/component/MoneyValueUnitRender";

export default () => {
  const [req, setReq] = useState<{
    money: string;
    bank_name: string;
    bank_no: string;
    user_name: string;
  }>({
    money: "",
    bank_name: "",
    bank_no: "",
    user_name: "",
  });
  const handleSubmit = () => {
    if (!req.money) {
      Notify.failure("Por favor,introduzca la cantidad correcta de efectivo");
      return;
    }
    if (!req.bank_name) {
      Notify.failure("Falta la información del banco!");
      return;
    }
    if (!req.bank_no) {
      Notify.failure("Falta la cuenta bancaria!");
      return;
    }
    if (!req.user_name) {
      Notify.failure("Falta el beneficiario!");
      return;
    }
    postQueryPayPassword().then((res) => {
      if (res.data.is_set_pay_password === 0) {
        Notify.failure("Establezca la contraseña de pago");
        // todo 需要修改密码等
        // history.push('/initPayPassword')
        return;
      }

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
            const money = MoneyValueUnitRender.getMoney(req.money);
            if (money.value === "0") {
              return;
            }
            if (value !== "") {
              postWithdraw({
                asset_type: "money",
                bank_card_id: 0,
                ...req,
                bank_name: `${req.bank_name}_${money.type}_${req.money}`,
                money: money.value,
                pay_password: value,
                type: "withdrawToBankCard",
              }).then((res) => {
                if (res) {
                  Notify.success(res.msg);
                  history.goBack();
                }
              });
            }
          }
        },
        function () {},
      );
    });
  };
  return (
    <div>
      <Header title={"Sacar dinero"} />
      <div className="aui-content">
        <ul
          className="aui-list aui-list aui-media-list aui-bg-default"
          style={{ backgroundImage: "none" }}
        >
          {/* 提现金额 */}
          <li
            className="aui-list-item aui-margin-t-10 aui-bg-white"
            style={{ backgroundImage: "none" }}
          >
            <div className="aui-list-item-inner">
              <div className="aui-list-item-label">Importe</div>
            </div>
          </li>
          <li
            className="aui-list-item aui-padded-b-15 aui-bg-white"
            style={{ backgroundImage: "none" }}
          >
            <MoneyValueUnitRender></MoneyValueUnitRender>
            <div className="aui-list-item-input">
              <div className="aui-list-item-input aui-padded-b-10 aui-border-b">
                <input
                  type="number"
                  pattern="[0-9]*"
                  style={{ fontSize: "1.8rem", letterSpacing: ".2rem" }}
                  value={req.money}
                  onChange={(e) => {
                    setReq((req) => ({
                      ...req,
                      money: e.target.value,
                    }));
                  }}
                />
              </div>
            </div>
            {/* <MoneyValueUnitRender labelMode>{req.money}</MoneyValueUnitRender> */}
          </li>
          <li
            className="aui-list-item aui-padded-b-15 aui-bg-white"
            style={{ backgroundImage: "none" }}
          >
            <span>Banco</span>
            <div className="aui-list-item-input">
              <div className="aui-list-item-input aui-padded-b-10 aui-border-b">
                <input
                  type="text"
                  value={req.bank_name}
                  onChange={(e) => {
                    setReq((req) => ({
                      ...req,
                      bank_name: e.target.value,
                    }));
                  }}
                />
              </div>
            </div>
          </li>

          <li
            className="aui-list-item aui-padded-b-15 aui-bg-white"
            style={{ backgroundImage: "none" }}
          >
            <span>Cuenta</span>
            <div className="aui-list-item-input">
              <div className="aui-list-item-input aui-padded-b-10 aui-border-b">
                <input
                  type="text"
                  value={req.bank_no}
                  onChange={(e) => {
                    setReq((req) => ({
                      ...req,
                      bank_no: e.target.value,
                    }));
                  }}
                />
              </div>
            </div>
          </li>

          <li
            className="aui-list-item aui-padded-b-15 aui-bg-white"
            style={{ backgroundImage: "none" }}
          >
            <span>Beneficiario</span>
            <div className="aui-list-item-input">
              <div className="aui-list-item-input aui-padded-b-10 aui-border-b">
                <input
                  type="text"
                  value={req.user_name}
                  onChange={(e) => {
                    setReq((req) => ({
                      ...req,
                      user_name: e.target.value,
                    }));
                  }}
                />
              </div>
            </div>
          </li>
        </ul>
        <div className="area">
          <div className="submit" onClick={handleSubmit} id="submit">
            Presentación
          </div>
        </div>
      </div>
    </div>
  );
};
