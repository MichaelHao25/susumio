import "./index.less";
import { history, useSelector } from "umi";
import { useEffect, useState } from "react";
import {
  postCommissionInfo,
  postDistributorInfo,
  postGetParams,
} from "@/services/api";
import { UserinfoState } from "@/pages/login/model";
import Header from "@/component/Header";
import MoneyValueUnitRender from "@/component/MoneyValueUnitRender";

export default () => {
  const { user } = useSelector(({ userinfo }: { userinfo: UserinfoState }) => {
    return userinfo;
  });
  const [params, setParams] = useState<{
    already_apply_money: number;
    can_drawcash_money: number;
    total_money: number;
    wait_pay_money: number;
  }>({
    already_apply_money: 0,
    can_drawcash_money: 0,
    total_money: 0,
    wait_pay_money: 0,
  });
  useEffect(() => {
    postCommissionInfo().then((res) => {
      console.log(res);
      if (res) {
        setParams(res.data);
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
          src={require("../../assets/img/distribution_bg.png")}
          className="distribution-bg"
        />

        {/* 中间页 */}
        <div className="aui-content aui-text-center aui-text-white">
          <div className="aui-font-size-14" style={{ marginTop: "2.5rem" }}>
            Comisión disponibl
          </div>
          <div
            style={{
              fontSize: "1.7rem",
              marginTop: "1rem",
              marginBottom: "1.5rem",
            }}
          >
            {params.can_drawcash_money}
          </div>
          {/* 操作 */}
          <div
            className="aui-bg-white aui-margin-15 aui-text-default aui-clearfix aui-padded-15"
            style={{ borderRadius: ".3rem", boxShadow: "0 5px 10px 0 #f3fbff" }}
          >
            <div className="aui-col-xs-4 aui-border-r">
              <div className="aui-font-size-20">
                <MoneyValueUnitRender>
                  {params.total_money}
                </MoneyValueUnitRender>
              </div>
              <div className="aui-font-size-14  aui-text-pray aui-padded-t-5">
                Acumulada
              </div>
            </div>
            <div className="aui-col-xs-4 aui-border-r">
              <div className="aui-font-size-20">
                <MoneyValueUnitRender>
                  {params.can_drawcash_money}
                </MoneyValueUnitRender>
              </div>
              <div className="aui-font-size-14 aui-text-pray aui-padded-t-5">
                Disponible
              </div>
            </div>
            <div className="aui-col-xs-4">
              <div className="aui-font-size-20">
                <MoneyValueUnitRender>
                  {params.wait_pay_money}
                </MoneyValueUnitRender>
              </div>
              <div className="aui-font-size-14 aui-text-pray aui-padded-t-5">
                Pendiente
              </div>
            </div>
          </div>
          {/* 面板 */}
          <ul className="aui-list aui-list-in">
            <li
              className="aui-list-item aui-list-item-arrow"
              onClick={() => {
                history.push("/distribution/withdraw");
              }}
            >
              <div className="aui-list-item-label-icon">
                <i
                  className="iconfont icon-tixian aui-font-size-20 "
                  style={{ color: "#56abef" }}
                />
              </div>
              <div className="aui-list-item-inner">Sacar dinero</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
