import { useEffect, useState } from "react";
import {
  postCommissionApply,
  postDistributorInfo,
  postQueryPayPassword,
  postRulesIndex,
  postWithdraw,
} from "@/services/api";
import Header from "@/component/Header";
import Notiflix, { Notify } from "notiflix";
import { history } from "@@/core/history";
import MoneyValueUnitRender from "@/component/MoneyValueUnitRender";

export default () => {
  const [distributor, setDistributor] = useState<{
    become_distributor_time: string;
    can_drawcash_money: number;
    child_user_num: number;
    commission_money: number;
    is_distributor: number;
    level_name: string;
    order_num: number;
    team_user_num: number;
    total_money: number;
  }>({
    become_distributor_time: "",
    can_drawcash_money: 0,
    child_user_num: 0,
    commission_money: 0,
    is_distributor: 0,
    level_name: "",
    order_num: 0,
    team_user_num: 0,
    total_money: 0,
  });
  const [min_drawcash_money, setMin_drawcash_money] = useState<string>("");
  useEffect(() => {
    postDistributorInfo().then((res) => {
      if (res) {
        setDistributor(res.data);
      }
    });
    postRulesIndex().then((res) => {
      if (res) {
        setMin_drawcash_money(res.data.min_drawcash_money);
      }
    });
  }, []);

  function handleSubmit() {
    postQueryPayPassword().then((res) => {
      if (res.data.is_set_pay_password === 0) {
        Notify.failure("Establezca la contraseña de pago");
        // todo 需要修改密码等
        // history.push('/reset_password_win')
        return;
      }

      Notiflix.Confirm.show(
        "Introduzca el Código de transacción.",
        `<input type="password" class="confirm_password"/>`,
        "Confirmar",
        "Cancelar",
        function () {
          const input: HTMLInputElement | null =
            document.querySelector(".confirm_password");
          if (input) {
            const value = input.value;
            if (value !== "") {
              postCommissionApply({
                pay_password: value,
                receipt_type: "money",
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
  }

  return (
    <div className={"withdraw"}>
      <Header
        title={"Sacar comisión"}
        right={
          <a
            className="aui-pull-right aui-btn"
            // onClick="$util.openWindow('distribution_detail_win')"
            onClick={() => {
              history.push("/distribution/list");
            }}
          >
            <span className="aui-iconfont">Detalle</span>
          </a>
        }
      />
      <div className="aui-content">
        <div
          className="aui-bg-white aui-margin-15 aui-padded-10"
          style={{ borderRadius: ".3rem" }}
        >
          <div>Importe disponible</div>
          <div
            style={{ borderBottom: "1px solid #f4f4f4" }}
            className="aui-padded-b-5 aui-margin-b-15 aui-margin-t-10"
          >
            {/* <span>$</span> */}
            <span className="aui-padded-l-10" style={{ fontSize: "1.5rem" }}>
              <MoneyValueUnitRender>
                {distributor.can_drawcash_money}
              </MoneyValueUnitRender>
            </span>
            {/* <input type="number" style="letter-spacing: 1px;width: 90%; display: inline;"> */}
          </div>
          <div className="aui-text-pray aui-font-size-12">
            Importe minimo para sscar:{" "}
            <MoneyValueUnitRender>{min_drawcash_money}</MoneyValueUnitRender>
            {/* $ */}
          </div>
        </div>

        <div className="aui-margin-10">
          <div className="distribution-buttons wallet" onClick={handleSubmit}>
            A la billetera
          </div>
        </div>
      </div>
    </div>
  );
};
