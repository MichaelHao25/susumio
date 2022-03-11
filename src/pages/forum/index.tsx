import Tab from "./tab";
import { useEffect, useState } from "react";
import styles from "./index.less";
import { IForumList, IForumSortType } from "@/services/api";
import List from "@/component/List";
import { AllList } from "@/services/interface";
import { ConnectProps, history, Link } from "umi";
import LazyLoad from "react-lazyload";
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
enum ColumnType {
  MultipleColumns,
  SingleColumns,
}
export default (props: IProps) => {
  const [requestBody, setRequestBody] = useState<
    Omit<IForumList, "pageNum" | "pageLimit">
  >({
    sort_by: IForumSortType.CreateTime,
    sort_type: "desc",
  });
  const [columns, setColumns] = useState<ColumnType>(
    ColumnType.MultipleColumns,
  );
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
  const handleRenderItemTypeForumListFromMy = (item: any) => {
    const { id, thums, title, handleCancelLike, handleLike, user } = item;
    return (
      <Link
        to={`/forum/details?id=${id}`}
        key={id}
        className={
          columns === ColumnType.MultipleColumns
            ? "aui-flex-item-6"
            : "aui-flex-item-12"
        }
        style={{ position: "relative", padding: "3px" }}
      >
        {/* aspect-ratio : 1 */}
        <div style={{ paddingTop: "100%", position: "relative" }}>
          <LazyLoad once>
            <img
              loading="lazy"
              src={thums[0]}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                objectFit: "cover",
              }}
            />
          </LazyLoad>
        </div>{" "}
        {/**/}
        <h5
          className="aui-text-default aui-ellipsis-2 aui-font-size-12 aui-padded-t-5 aui-padded-l-5 aui-padded-r-5 aui-bg-white"
          style={{
            height: "2rem",
            marginBottom: 0,
            position: "relative",
          }}
        >
          {title}
          <div className={styles.controlBtn}>
            <div
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                history.push(`/forum/add?id=${item.id}`);
              }}
              className={`${styles.icon} iconFontForum`}
            >
              &#xe6b0;
            </div>
            <div
              className={`${styles.commentLike} iconFontForum`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (Object.keys(item.approval).includes(user.id.toString())) {
                  handleCancelLike({
                    id: item.id,
                    approval: item.approval,
                  });
                } else {
                  handleLike({ id: item.id });
                }
              }}
              dangerouslySetInnerHTML={{
                __html: Object.keys(item.approval).includes(user.id.toString())
                  ? "&#xe602;"
                  : "&#xe601;",
              }}
            ></div>
          </div>
        </h5>
      </Link>
    );
  };
  const handleRenderItemTypeForumList = (item: any) => {
    const { id, thums, title, handleCancelLike, handleLike, user } = item;
    return (
      <Link
        to={`/forum/details?id=${id}`}
        key={id}
        className={
          columns === ColumnType.MultipleColumns
            ? "aui-flex-item-6"
            : "aui-flex-item-12"
        }
        style={{ position: "relative", padding: "3px" }}
      >
        {/* aspect-ratio : 1 */}
        <div style={{ paddingTop: "100%", position: "relative" }}>
          <LazyLoad once>
            <img
              loading="lazy"
              src={thums[0]}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                objectFit: "cover",
              }}
            />
          </LazyLoad>
        </div>{" "}
        {/**/}
        <h5
          className="aui-text-default aui-ellipsis-2 aui-font-size-12 aui-padded-t-5 aui-padded-l-5 aui-padded-r-5 aui-bg-white"
          style={{ height: "2rem", marginBottom: 0 }}
        >
          {title}
          <div className={styles.controlBtn}>
            <div
              className={`${styles.commentLike} iconFontForum`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (Object.keys(item.approval).includes(user.id.toString())) {
                  handleCancelLike({
                    id: item.id,
                    approval: item.approval,
                  });
                } else {
                  handleLike({ id: item.id });
                }
              }}
              dangerouslySetInnerHTML={{
                __html: Object.keys(item.approval).includes(user.id.toString())
                  ? "&#xe602;"
                  : "&#xe601;",
              }}
            ></div>
          </div>
        </h5>
      </Link>
    );
  };
  return (
    <div>
      <Header handleSortBtnClick={handleSortBtnClick} setColumns={setColumns} />
      <div style={{ height: "48px" }}></div>
      <List
        type={
          type === "my" ? AllList.postForumListFromMy : AllList.postForumList
        }
        params={requestBody}
        renderItem={
          type === "my"
            ? handleRenderItemTypeForumListFromMy
            : handleRenderItemTypeForumList
        }
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
        Publicar
      </div>
      <div
        className={`${styles.sortBtn} ${tabType ? styles.sortBtnActive : ""}`}
        // onClick={() => {
        //   setTabType(true);
        // }}
      >
        Responder
      </div>
    </div>
  );
};
const Header = (props: {
  handleSortBtnClick: () => void;
  setColumns: React.Dispatch<React.SetStateAction<ColumnType>>;
}) => {
  const { handleSortBtnClick, setColumns } = props;
  return (
    <div className={styles.header}>
      <h3
        className={styles.title}
        onClick={() => {
          history.push("/");
        }}
      >
        Foro
      </h3>
      <div className={styles.control}>
        <SortBtn handleClick={handleSortBtnClick} />
        {/* 单列 */}
        <div
          className="iconFontForum"
          onClick={() => setColumns(ColumnType.SingleColumns)}
        >
          &#xe600;
        </div>
        {/* 多列 */}
        <div
          className="iconFontForum"
          onClick={() => setColumns(ColumnType.MultipleColumns)}
        >
          &#xe6e5;
        </div>
        {/* 搜索 */}
        <div className="iconFontForum">&#xe8d6;</div>
      </div>
    </div>
  );
};
