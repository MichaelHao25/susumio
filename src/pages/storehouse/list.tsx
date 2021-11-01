import Header from "@/component/Header";
import styles from "./index.less";

import { history, UserinfoState, useSelector } from "umi";
import React, { useEffect, useState } from "react";
import { OrdersData, postBannerList } from "@/services/api";
import Tab from "@/component/Tab";
import List from "@/component/List";
import { AllList } from "@/services/interface";

export default () => {
  const { user } = useSelector(({ userinfo }: { userinfo: UserinfoState }) => {
    return userinfo;
  });
  const [activeStatus, setActiveStatus] = useState<number>(0);
  const [params, setParams] = useState<OrdersData & { shoper_id: number }>({
    shoper_id: user.id,
  });
  useEffect(() => {
    if (activeStatus == 1 || activeStatus == 2 || activeStatus == 3) {
      // 待付款 待发货 待签收
      setParams({
        status: activeStatus,
        shoper_id: user.id,
      });
    } else if (activeStatus == -1) {
      // 售后订单
      setParams({
        is_has_return_goods: 1,
        shoper_id: user.id,
      });
    } else if (activeStatus == 4) {
      // 待评价订单
      setParams({
        status: 4,
        is_comment: 0,
        shoper_id: user.id,
      });
    } else {
      setParams({
        shoper_id: user.id,
      });
    }
  }, [activeStatus]);

  const header = (
    <div>
      <Header title={"订单列表"} noBack={true} />
      <div className="aui-tab" id="tab">
        <div
          className={`aui-tab-item ${activeStatus == 0 ? "aui-active" : ""}`}
          onClick={() => setActiveStatus(0)}
        >
          Total
        </div>
        <div
          className={`aui-tab-item ${activeStatus == 1 ? "aui-active" : ""}`}
          onClick={() => setActiveStatus(1)}
        >
          pagará
        </div>
        <div
          className={`aui-tab-item ${activeStatus == 2 ? "aui-active" : ""}`}
          onClick={() => setActiveStatus(2)}
        >
          Despachará
        </div>
        <div
          className={`aui-tab-item ${activeStatus == 3 ? "aui-active" : ""}`}
          onClick={() => setActiveStatus(3)}
        >
          Recibirá
        </div>
        <div
          className={`aui-tab-item ${activeStatus == 4 ? "aui-active" : ""}`}
          onClick={() => setActiveStatus(4)}
        >
          Comentará
        </div>
        <div
          className={`aui-tab-item ${activeStatus == -1 ? "aui-active" : ""}`}
          onClick={() => setActiveStatus(-1)}
        >
          售后
        </div>
      </div>
    </div>
  );
  console.log("params", params);
  return (
    <div className={styles.storehouse}>
      <List
        bottom={"2.5rem"}
        params={params}
        type={AllList.postApiOrdersListsForStorehouse}
        header={header}
      />
      <div style={{ height: "2.5rem" }} />
      <Tab />
    </div>
  );
};
