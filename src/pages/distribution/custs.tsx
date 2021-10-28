import Header from "@/component/Header";
import React from "react";
import List from "../../component/List";
import { AllList } from "@/services/interface";
import { useSelector } from "umi";
import { ListState } from "@/models/list";

const HeaderByThisPage = () => {
  const { postTeamChildUsersHeaderInfo } = useSelector(
    ({ list }: { list: ListState }) => {
      return list;
    },
  );
  return (
    <>
      <Header
        left={`Mi cliente(${postTeamChildUsersHeaderInfo.dataCount})`}
        title={""}
      />
      <div
        className="aui-clearfix aui-margin-10"
        style={{ display: "flex", boxSizing: "border-box" }}
      >
        <i className="iconfont icon-huiyuan1" style={{ color: "#2a8ee8" }} />
        <span
          className="aui-margin-l-10 aui-font-size-14"
          style={{ boxSizing: "border-box" }}
        >
          Información del miembro
        </span>
        <span
          className="aui-pull-right aui-font-size-14 aui-text-pray"
          style={{ boxSizing: "border-box" }}
        >
          Importe/Pedido
        </span>
      </div>
    </>
  );
};
export default () => {
  return (
    <List header={<HeaderByThisPage />} type={AllList.postTeamChildUsers} />
  );
};
