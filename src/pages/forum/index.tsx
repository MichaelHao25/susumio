import Tab from "./tab";
import { useEffect, useState } from "react";
import styles from "./index.less";
import { IForumList, IForumSortType } from "@/services/api";
import List from "@/component/List";
import { AllList } from "@/services/interface";
import { ConnectProps, history } from "umi";
interface IProps
  extends ConnectProps<
    {},
    {},
    {
      type?: "my";
    }
  > {}
{
}
export default (props: IProps) => {
  const [requestBody, setRequestBody] = useState<
    Omit<IForumList, "pageNum" | "pageLimit">
  >({
    sort_by: IForumSortType.CreateTime,
    sort_type: "desc",
  });
  const {
    location: { query: { type = "" } = {} },
  } = props;
  const handleSortBtnClick = () => {
    setRequestBody((prevState) => {
      if (prevState.sort_by === IForumSortType.CreateTime) {
        return {
          sort_by: IForumSortType.UpdateTime,
          sort_type: "desc",
        };
      } else {
        return {
          sort_by: IForumSortType.CreateTime,
          sort_type: "desc",
        };
      }
    });
  };
  return (
    <div>
      <Header handleSortBtnClick={handleSortBtnClick} />
      <div style={{ height: "48px" }}></div>
      <List
        type={
          type === "my" ? AllList.postForumListFromMy : AllList.postForumList
        }
        params={requestBody}
      />
      <div style={{ height: "2.5rem" }}></div>
      <Tab />
    </div>
  );
};

const SortBtn = (props: { handleClick: () => void }) => {
  const { handleClick } = props;
  const [tabType, setTabType] = useState<boolean>(false);
  return (
    <div
      className={`${styles.sortContainer} ${
        tabType ? styles.sortContainerActive : ""
      }`}
      onClick={() => {
        setTabType((prev) => !prev);
        handleClick();
      }}
    >
      <div
        className={`${styles.sortBtn} ${!tabType ? styles.sortBtnActive : ""}`}
        // onClick={() => {
        //   setTabType(false);
        // }}
      >
        发布
      </div>
      <div
        className={`${styles.sortBtn} ${tabType ? styles.sortBtnActive : ""}`}
        // onClick={() => {
        //   setTabType(true);
        // }}
      >
        回复
      </div>
    </div>
  );
};
const Header = (props: { handleSortBtnClick: () => void }) => {
  const { handleSortBtnClick } = props;
  return (
    <div className={styles.header}>
      <h3
        className={styles.title}
        onClick={() => {
          history.push("/");
        }}
      >
        论坛
      </h3>
      <div className={styles.control}>
        <SortBtn handleClick={handleSortBtnClick} />
        {/* 单列 */}
        <div className="iconFontForum">&#xe600;</div>
        {/* 多列 */}
        <div className="iconFontForum">&#xe6e5;</div>
        {/* 搜索 */}
        <div className="iconFontForum">&#xe8d6;</div>
      </div>
    </div>
  );
};
