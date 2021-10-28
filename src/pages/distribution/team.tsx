import Header from "@/component/Header";
import React, { useEffect, useState } from "react";
import List from "../../component/List";
import { AllList } from "@/services/interface";
import { useSelector } from "umi";
import { ListState } from "@/models/list";
import { postRuleIndex } from "@/services/api";

const HeaderByThisPage = (props: {
  activeStatus: number;
  setActiveStatus: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [level, setLevel] = useState<number>(1);
  useEffect(() => {
    postRuleIndex().then((res) => {
      if (res) {
        setLevel(res.data.level);
      }
    });
  }, []);
  const { postTeamUsersHeaderInfo } = useSelector(
    ({ list }: { list: ListState }) => {
      return list;
    },
  );
  const { activeStatus, setActiveStatus } = props;
  return (
    <>
      <Header
        left={`Mi equipo(${postTeamUsersHeaderInfo.totalNum})`}
        title={""}
      />
      <div className="aui-tab" id="tab">
        <div
          className={`aui-tab-item ${activeStatus == 1 ? "aui-active" : ""}`}
          onClick={() => setActiveStatus(1)}
        >
          Nivel I({postTeamUsersHeaderInfo.level1Num})
        </div>
        {level > 1 ? (
          <div
            className={`aui-tab-item ${activeStatus == 2 ? "aui-active" : ""}`}
            onClick={() => setActiveStatus(2)}
          >
            Nivel II({postTeamUsersHeaderInfo.level2Num})
          </div>
        ) : (
          ""
        )}
        {level > 2 ? (
          <div
            className={`aui-tab-item ${activeStatus == 3 ? "aui-active" : ""}`}
            onClick={() => setActiveStatus(3)}
          >
            Nivel 3({postTeamUsersHeaderInfo.level3Num})
          </div>
        ) : (
          ""
        )}
      </div>
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
  const [activeStatus, setActiveStatus] = useState<number>(1);
  return (
    <List
      header={
        <HeaderByThisPage
          activeStatus={activeStatus}
          setActiveStatus={setActiveStatus}
        />
      }
      params={{
        status: activeStatus,
      }}
      type={AllList.postTeamUsers}
    />
  );
};
