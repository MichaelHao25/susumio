import Header from "@/component/Header";
import React, { useEffect, useState } from "react";
import { AllList } from "@/services/interface";
import List from "@/component/List";
import { OrdersData } from "@/services/api";
import { ConnectProps } from "umi";

interface Props extends ConnectProps<{}, { status: number }, {}> {}

export default (props: Props) => {
  const [activeStatus, setActiveStatus] = useState<number>(() => {
    return props.location.state.status;
  });
  const [params, setParams] = useState<OrdersData>({});
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    if (activeStatus == 1 || activeStatus == 2 || activeStatus == 3) {
      // 待付款 待发货 待签收
      setParams({
        status: activeStatus,
      });
    } else if (activeStatus == -1) {
      // 售后订单
      setParams({
        is_has_return_goods: 1,
      });
    } else if (activeStatus == 4) {
      // 待评价订单
      setParams({
        status: 4,
        is_comment: 0,
      });
    } else {
      setParams({});
    }
    setLoading(false);
  }, [activeStatus]);
  const header = (
    <>
      <Header
        title={activeStatus !== -1 ? "Mi pedido" : "Reembolso/devolución"}
      />
      {activeStatus !== -1 ? (
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
        </div>
      ) : (
        ""
      )}
    </>
  );
  return (
    <div>
      {loading === false && (
        <List
          header={header}
          params={params}
          type={AllList.postApiOrdersLists}
        />
      )}
    </div>
  );
};
