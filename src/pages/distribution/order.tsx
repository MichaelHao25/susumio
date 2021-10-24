import List from "../../component/List";
import Header from "@/component/Header";
import { AllList } from "@/services/interface";
import React, { useState } from "react";
import { postOrdersList } from "@/services/api";
import { useSelector } from "umi";
import { UserinfoState } from "@/pages/login/model";
import { ListState } from "@/models/list";

const HeaderCurrent = (props: {
  activeStatus: number;
  setActiveStatus: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const { postOrdersListHeaderInfo } = useSelector(
    ({ list }: { list: ListState }) => {
      return list;
    },
  );
  const { activeStatus, setActiveStatus } = props;
  return (
    <>
      <Header
        left={`Pedidos(${postOrdersListHeaderInfo.totalOrderNum})`}
        title={""}
        titleStyle={{ display: "none" }}
        right={
          <a className="aui-pull-right aui-btn">
            <span
              className="aui-iconfont"
              style={{ fontSize: ".7rem", color: "#2a8ee8" }}
            >
              Importe:{postOrdersListHeaderInfo.totalExceptMoney}
            </span>
          </a>
        }
      />
      <div className="aui-tab" id="tab">
        <div
          className={`aui-tab-item ${activeStatus == 0 ? "aui-active" : ""}`}
          onClick={() => setActiveStatus(0)}
        >
          Todo
        </div>
        <div
          className={`aui-tab-item ${activeStatus == 1 ? "aui-active" : ""}`}
          onClick={() => setActiveStatus(1)}
        >
          Pendiente
        </div>
        <div
          className={`aui-tab-item ${activeStatus == 2 ? "aui-active" : ""}`}
          onClick={() => setActiveStatus(2)}
        >
          aprobado
        </div>
        <div
          className={`aui-tab-item ${activeStatus == 3 ? "aui-active" : ""}`}
          onClick={() => setActiveStatus(3)}
        >
          Realizado
        </div>
      </div>
    </>
  );
};
export default () => {
  const [activeStatus, setActiveStatus] = useState<number>(0);
  return (
    <List
      params={{
        status: activeStatus,
      }}
      header={
        <HeaderCurrent
          activeStatus={activeStatus}
          setActiveStatus={setActiveStatus}
        />
      }
      type={AllList.postOrdersList}
    />
  );
};
