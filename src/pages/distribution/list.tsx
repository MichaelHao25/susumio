import Header from "@/component/Header";
import { AllList } from "@/services/interface";
import generateListKey, {
  IGenerateKeyPostApplyList,
} from "@/utils/generateListKey";
import { useState } from "react";
import { ListState, useSelector } from "umi";
import List from "../../component/List";
export default () => {
  const [activeStatus, setActiveStatus] = useState<number>(0);
  const money = useSelector(({ list }: { list: ListState }) => {
    const key = generateListKey({
      type: AllList.postApplyList,
      params: {
        status: activeStatus,
      } as IGenerateKeyPostApplyList,
    });
    return list?.["postApplyList"]?.[key]?.money;
  });
  console.log("postApplyList", money);

  const header = (
    <>
      <Header
        left={"Detalles de retiro"}
        title={""}
        right={
          <a className="aui-pull-right aui-btn">
            <span
              className="aui-iconfont"
              style={{ fontSize: ".7rem", color: "#2a8ee8" }}
            >
              {/* money */}
              Importe:{money}
            </span>
          </a>
        }
      />
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
          Pendiente
        </div>
        <div
          className={`aui-tab-item ${activeStatus == 2 ? "aui-active" : ""}`}
          onClick={() => setActiveStatus(2)}
        >
          Verificará
        </div>
        <div
          className={`aui-tab-item ${activeStatus == 3 ? "aui-active" : ""}`}
          onClick={() => setActiveStatus(3)}
        >
          Fondos
        </div>
      </div>
    </>
  );
  return (
    <List
      params={{
        status: activeStatus,
      }}
      header={header}
      type={AllList.postApplyList}
    />
  );
};
