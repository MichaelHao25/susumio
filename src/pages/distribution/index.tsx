import "./index.less";
import { history, useSelector } from "umi";
import { useEffect, useState } from "react";
import { postDistributorInfo, postGetParams } from "@/services/api";
import { UserinfoState } from "@/pages/login/model";
import MoneyValueUnitRender from "@/component/MoneyValueUnitRender";

export default () => {
  const { user } = useSelector(({ userinfo }: { userinfo: UserinfoState }) => {
    return userinfo;
  });
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
  const [params, setParams] = useState<{
    distribution_centre_head_img: string;
  }>({
    distribution_centre_head_img: "",
  });
  useEffect(() => {
    postGetParams("user_bg").then((res) => {
      console.log(res);
      if (res) {
        setParams(res.data);
      }
    });
    postDistributorInfo().then((res) => {
      console.log(res);
      if (res) {
        setDistributor(res.data);
      }
    });
  }, []);
  return (
    <div className={"distribution"}>
      <div style={{ position: "relative" }}>
        {/* 返回按钮 */}
        <i
          className="aui-iconfont aui-icon-left returni"
          style={{ color: "#fff!important" }}
          onClick={() => {
            history.goBack();
          }}
        />
        <img
          loading="lazy"
          src={params.distribution_centre_head_img}
          className="distribution-bg"
        />
        {/* 中间页 */}
        <div className="aui-content aui-text-center aui-text-white">
          <img
            loading="lazy"
            src={user.avatar}
            className="aui-img-round"
            id="avatar"
          />
          <div>{user.nick_name || "Usuario anónimo"}</div>
          <div className="aui-font-size-14">{distributor.level_name}</div>
          <div className="aui-font-size-12">
            {distributor.become_distributor_time}
          </div>
          {/* 操作 */}
          <div
            className="aui-bg-white aui-margin-15 aui-text-default aui-clearfix aui-padded-10"
            style={{ borderRadius: ".3rem", boxShadow: "0 5px 10px 0 #f3fbff" }}
          >
            <div className="aui-col-xs-6 aui-border-r">
              <div className="aui-font-size-20">
                <MoneyValueUnitRender>
                  {distributor.total_money}
                </MoneyValueUnitRender>
              </div>
              <div className="aui-font-size-14 aui-text-pray">
                Comisión acumulada
              </div>
              <div
                className="distribution-button"
                onClick={() => {
                  //"$util.openWindow('distribution_wallet_win')"
                  history.push("/distribution/wallet");
                }}
              >
                Entrar
              </div>
            </div>
            <div className="aui-col-xs-6">
              <div className="aui-font-size-20">
                <MoneyValueUnitRender>
                  {distributor.can_drawcash_money}
                </MoneyValueUnitRender>
              </div>
              <div className="aui-font-size-14 aui-text-pray">
                Camisión disponible
              </div>
              <div
                className="distribution-button"
                onClick={() => {
                  //"$util.openWindow('distribution_withdraw_apply_win')"
                  history.push("/distribution/withdraw");
                }}
              >
                Sacar
              </div>
            </div>
          </div>
          {/* 面板 */}
          <section className="aui-grid" style={{ marginBottom: "2.7rem" }}>
            <div className="aui-row">
              <div
                className="aui-col-xs-4"
                onClick={() => {
                  //"$util.openWindow('distribution_wallet_win')"
                  history.push("/distribution/wallet");
                }}
              >
                <i
                  className="aui-iconfont iconfont icon-qianbao1"
                  style={{ fontSize: "1.4rem", color: "#fe9341" }}
                />
                <div className="aui-bar-tab-label aui-font-size-12 aui-text-default">
                  Comisión
                </div>
                <span className=" aui-font-size-10 aui-text-pray">
                  <MoneyValueUnitRender>
                    {distributor.total_money}
                  </MoneyValueUnitRender>
                </span>
              </div>
              <div
                className="aui-col-xs-4"
                onClick={() => {
                  //"$util.openWindow('distribution_orders_win')"
                  history.push("/distribution/order");
                }}
              >
                <i
                  className="aui-iconfont iconfont icon-chengjiaodingdan"
                  style={{ fontSize: "1.4rem", color: "#fe9341" }}
                />
                <div className="aui-bar-tab-label aui-font-size-12 aui-text-default">
                  Pedidos
                </div>
                <span className=" aui-font-size-10 aui-text-pray">
                  {distributor.order_num}Pedidos
                </span>
              </div>
              <div
                className="aui-col-xs-4"
                onClick={() => {
                  //"$util.openWindow('distribution_detail_win')"
                  history.push("/distribution/list");
                }}
              >
                <i
                  className="aui-iconfont iconfont icon-icon_gongzimingxi"
                  style={{ fontSize: "1.4rem", color: "#fe9341" }}
                />
                <div className="aui-bar-tab-label aui-font-size-12 aui-text-default">
                  Detalles
                </div>
                <span
                  className=" aui-font-size-10 aui-text-pray"
                  style={{ color: "transparent!important" }}
                >
                  Retira
                </span>
              </div>
              <div
                className="aui-col-xs-4"
                onClick={() => {
                  //"$util.openWindow('distribution_custs_win')"
                  history.push("/distribution/custs");
                }}
              >
                <i
                  className="aui-iconfont iconfont icon-huiyuan1"
                  style={{ fontSize: "1.4rem", color: "#257fd6" }}
                />
                <div className="aui-bar-tab-label aui-font-size-12 aui-text-default">
                  Mi cliente
                </div>
                <span className=" aui-font-size-10 aui-text-pray">
                  {distributor.child_user_num}Pedidos
                </span>
              </div>
              <div
                className="aui-col-xs-4"
                onClick={() => {
                  //"$util.openWindow('distribution_team_win')"
                  history.push("/distribution/team");
                }}
              >
                <i
                  className="aui-iconfont iconfont icon-tubiao-"
                  style={{ fontSize: "1.4rem", color: "#257fd6" }}
                />
                <div className="aui-bar-tab-label aui-font-size-12 aui-text-default">
                  Mi grupo
                </div>
                <span className=" aui-font-size-10 aui-text-pray">
                  {distributor.team_user_num}grupos
                </span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
