import Header from "@/component/Header";
import { history, Link } from "umi";
import { useEffect, useState } from "react";
import { postGetParams, postUsersAsset } from "@/services/api";
import "./index.less";
import MoneyValueUnitRender from "@/component/MoneyValueUnitRender";

export default () => {
  const [money, setMoney] = useState<number>(0);

  const [bgHeader, setBgHeader] = useState<string>("");
  useEffect(() => {
    postUsersAsset().then((res) => {
      if (res) {
        setMoney(res.data.money);
      }
    });
    postGetParams("user_bg").then((res) => {
      if (res) {
        setBgHeader(res.data.my_wallet_head_img);
      }
    });
  }, []);
  return (
    <div className={"wallet"}>
      <Header
        title={"Mi cartera"}
        right={
          <a
            className="span aui-pull-right aui-btn"
            onClick={() => {
              history.push("walletDetail");
            }}
            style={{ color: "#000" }}
          >
            {" "}
            Detalle
          </a>
        }
      />
      <div className="wrap">
        <div
          className="top"
          style={{ background: `url(${bgHeader}) no-repeat center center` }}
        >
          <div className="wallet-left">
            <div style={{ marginRight: "4.5rem" }}>Saldo de cartera</div>
            <div style={{ marginTop: "0.5rem", marginRight: "4.5rem" }}>
              {/* $ */}
              <span style={{ fontSize: "1.3rem" }}>
                {" "}
                <MoneyValueUnitRender>{money}</MoneyValueUnitRender>{" "}
              </span>
            </div>
          </div>
          <div className="wallet-right">
            <Link
              style={{
                boxSizing: "border-box",
                width: "4rem",
                marginBottom: "0.4rem",
                height: "1.5rem",
                borderRadius: "0.5rem",
                border: "0.025rem solid #fff",
                textAlign: "center",
                lineHeight: "1.5rem",
              }}
              to={"/recharge"}
            >
              Recargar
            </Link>
            <Link
              style={{
                boxSizing: "border-box",
                width: "7rem",
                height: "1.5rem",
                borderRadius: "0.5rem",
                border: "0.025rem solid #fff",
                textAlign: "center",
                lineHeight: "1.5rem",
              }}
              to={"/withdraw"}
            >
              Sacar dinero
            </Link>
          </div>
        </div>
      </div>
      <Link className="cash" to={"withdraw"}>
        <i
          className="aui-iconfont iconfont icon-yinhangqia"
          style={{ color: "#000000", fontSize: "22px", marginRight: "0.6rem" }}
        />
        <div>Tarjeta bancaria</div>
      </Link>
    </div>
  );
};
