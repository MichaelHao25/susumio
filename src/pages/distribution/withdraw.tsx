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
  const [req, setReq] = useState<{
    bank_name: string;
    bank_no: string;
    user_name: string;
  }>({
    bank_name: "",
    bank_no: "",
    user_name: "",
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
    if (!req.bank_name) {
      Notify.failure("银行名称不能为空!");
      return;
    }
    if (!req.bank_no) {
      Notify.failure("银行卡号不能为空!");
      return;
    }
    if (!req.user_name) {
      Notify.failure("用户名称不能为空!");
      return;
    }
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
                ...req,
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
            <span>$</span>
            <span className="aui-padded-l-10" style={{ fontSize: "1.5rem" }}>
              {distributor.can_drawcash_money}
            </span>
            {/* <input type="number" style="letter-spacing: 1px;width: 90%; display: inline;"> */}
          </div>
          <div className="aui-text-pray aui-font-size-12">
            Importe minimo para sscar: ${min_drawcash_money}
          </div>
        </div>
        <div
          className="aui-bg-white aui-margin-l-15 aui-margin-r-15 aui-padded-l-10 aui-padded-r-10"
          style={{ borderRadius: ".3rem" }}
        >
          <div>请输入银行名称</div>
          <div
            style={{ borderBottom: "1px solid #f4f4f4" }}
            className="aui-margin-b-15"
          >
            {/*bank_name*/}
            {/*bank_no*/}
            {/*user_name*/}
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
        <div
          className="aui-bg-white aui-margin-l-15 aui-margin-r-15 aui-padded-l-10 aui-padded-r-10"
          style={{ borderRadius: ".3rem" }}
        >
          <div>请输入银行账号</div>
          <div
            style={{ borderBottom: "1px solid #f4f4f4" }}
            className="aui-margin-b-15"
          >
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
        <div
          className="aui-bg-white aui-margin-l-15 aui-margin-r-15 aui-padded-l-10 aui-padded-r-10"
          style={{ borderRadius: ".3rem" }}
        >
          <div>请输入姓名</div>
          <div
            style={{ borderBottom: "1px solid #f4f4f4" }}
            className="aui-margin-b-15"
          >
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
        <div className="aui-margin-10">
          <div className="distribution-buttons wallet" onClick={handleSubmit}>
            A la billetera
          </div>
        </div>
      </div>
    </div>
  );
};
