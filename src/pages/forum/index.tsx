import Tab from "./tab";
import { useEffect, useRef, useState } from "react";
import styles from "./index.less";
import {
  IForumList,
  IForumSortType,
  postForumItemApproval,
  postForumItemCancelApproval,
  postForumItemDelete,
} from "@/services/api";
import List from "@/component/List";
import { AllList, IPostForumList } from "@/services/interface";
import {
  ConnectProps,
  history,
  Link,
  ListState,
  useDispatch,
  UserinfoState,
  useSelector,
} from "umi";
import LazyLoad from "react-lazyload";
import { Confirm, Notify } from "notiflix";
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
    sort_by: IForumSortType.UpdateTime,
    sort_type: "desc",
    keyword: "",
  });
  const [columns, setColumns] = useState<ColumnType>(
    ColumnType.MultipleColumns,
  );
  const {
    userinfo: { user },
    list,
  } = useSelector(
    ({ userinfo, list }: { userinfo: UserinfoState; list: ListState }) => {
      return {
        list,
        userinfo,
      };
    },
  );
  const dispatch = useDispatch();
  const {
    location: { query: { type = "" } = {} },
  } = props;
  const handleSortBtnClick = () => {
    setRequestBody((prevState) => {
      if (prevState.sort_by === IForumSortType.CreateTime) {
        return {
          ...prevState,
          sort_by: IForumSortType.UpdateTime,
          sort_type: "desc",
        };
      } else {
        return {
          ...prevState,
          sort_by: IForumSortType.CreateTime,
          sort_type: "desc",
        };
      }
    });
  };
  const handleLike = ({ id, approval }: Partial<IPostForumList>) => {
    if (id) {
      postForumItemApproval({
        id,
      }).then((res) => {
        console.log(res);
        dispatch({
          type: "list/setState",
          payload: {
            key: ["postForumList", { id }],
            value: {
              approval: {
                ...approval,
                [user.id]: 111,
              },
            },
          },
        });
      });
    }
  };
  const handleCancelLike = ({ id, approval }: Partial<IPostForumList>) => {
    if (id) {
      if (approval) {
        const tempApproval: {
          [key: string]: number;
        } = {};
        Object.entries(approval).forEach(([key, value]) => {
          if (key !== user.id.toString()) {
            tempApproval[key] = value;
          }
        });
        postForumItemCancelApproval({
          id,
        }).then((res) => {
          dispatch({
            type: "list/setState",
            payload: {
              key: ["postForumList", { id }],
              value: {
                approval: tempApproval,
              },
            },
          });
        });
      }
    }
  };
  const handleDeleteItem = (params: Pick<IPostForumList, "id">) => {
    const { id } = params;
    Confirm.show(
      "Advertencia de eliminación",
      "Está confirmada la eliminación?",
      "Sí",
      "No",
      () => {
        postForumItemDelete({ id }).then((res) => {
          Notify.success(res.msg);
          if (type === "my") {
            const tempList = list.postForumListFromMy.filter(
              (item) => item.id !== id,
            );
            dispatch({
              type: "list/setState",
              payload: {
                postForumListFromMy: tempList,
              },
            });
          } else {
            const tempList = list.postForumList.filter(
              (item) => item.id !== id,
            );
            dispatch({
              type: "list/setState",
              payload: {
                postForumList: tempList,
              },
            });
          }
        });
      },
    );
  };
  const handleRenderItemTypeForumListFromMy = (item: any) => {
    const { id, thums, title } = item;
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
        <div
          style={{
            paddingTop: "100%",
            position: "relative",
            overflow: "hidden",
          }}
        >
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
            <div className={`${styles.icon} iconFontForum`}>&#xe6ad;</div>

            <div className={`${styles.icon}`} style={{ width: "auto" }}>
              {item.comments}
            </div>
            <div
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleDeleteItem({ id: item.id });
              }}
              className={`${styles.icon} iconFontForum`}
            >
              &#xe68e;
            </div>
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
              className={`${styles.commentLike} ${
                Object.keys(item.approval).includes(user.id.toString())
                  ? styles.commentLikeActive
                  : ""
              } iconFontForum`}
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
            <div className={`${styles.num}`}>
              {Object.keys(item.approval).length}
            </div>
          </div>
        </h5>
      </Link>
    );
  };
  const handleRenderItemTypeForumList = (item: any) => {
    const { id, thums, title } = item;
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
        <div
          style={{
            paddingTop: "100%",
            position: "relative",
            overflow: "hidden",
          }}
        >
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
            <div className={`${styles.icon} iconFontForum`}>&#xe6ad;</div>

            <div className={`${styles.icon}`} style={{ width: "auto" }}>
              {item.comments}
            </div>
            {user.is_bbs && (
              <div
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleDeleteItem({ id: item.id });
                }}
                className={`${styles.icon} iconFontForum`}
              >
                &#xe68e;
              </div>
            )}
            <div
              className={`${styles.commentLike} ${
                Object.keys(item.approval).includes(user.id.toString())
                  ? styles.commentLikeActive
                  : ""
              } iconFontForum`}
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
                  ? `&#xe602;`
                  : `&#xe601;`,
              }}
            ></div>
            <div className={`${styles.num}`}>
              {Object.keys(item.approval).length}
            </div>
          </div>
        </h5>
      </Link>
    );
  };
  if (type === "my") {
    return (
      <div>
        <Header
          handleSortBtnClick={handleSortBtnClick}
          setColumns={setColumns}
          setRequestBody={setRequestBody}
        />
        <div style={{ height: "48px" }}></div>
        <List
          type={AllList.postForumListFromMy}
          params={requestBody}
          renderItem={handleRenderItemTypeForumListFromMy}
        />
        <div style={{ height: "2.5rem" }}></div>
        <Tab />
      </div>
    );
  }
  return (
    <div>
      <Header
        handleSortBtnClick={handleSortBtnClick}
        setColumns={setColumns}
        setRequestBody={setRequestBody}
      />
      <div style={{ height: "48px" }}></div>
      <List
        type={AllList.postForumList}
        params={requestBody}
        renderItem={handleRenderItemTypeForumList}
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
        Comentario <span className="iconFontForum">&#xe6cc;</span>
      </div>
      <div
        className={`${styles.sortBtn} ${tabType ? styles.sortBtnActive : ""}`}
        // onClick={() => {
        //   setTabType(true);
        // }}
      >
        Publicación<span className="iconFontForum">&#xe6cc;</span>
      </div>
    </div>
  );
};
const Header = (props: {
  handleSortBtnClick: () => void;
  setColumns: React.Dispatch<React.SetStateAction<ColumnType>>;
  setRequestBody: React.Dispatch<
    React.SetStateAction<Omit<IForumList, "pageNum" | "pageLimit">>
  >;
}) => {
  const { handleSortBtnClick, setColumns, setRequestBody } = props;
  const [active, setActive] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [keyword, setKeyword] = useState<string>("");

  useEffect(() => {
    if (active) {
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 500);
    }
  }, [active]);
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    // const { code } = e;
    // if (code == "Enter") {
    setRequestBody((res) => {
      return {
        ...res,
        keyword,
      };
    });
    // }
  };
  return (
    <div className={styles.headerContainer}>
      <div className={`${styles.moveContainer} ${active ? styles.active : ""}`}>
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
            <div className="iconFontForum" onClick={() => setActive(true)}>
              &#xe8d6;
            </div>
          </div>
        </div>
        <form className={styles.search} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search"
            className={styles.input}
            ref={inputRef}
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <div
            onClick={() => setActive(false)}
            className={`${styles.close} iconFontForum`}
          >
            &#xeaf2;
          </div>
        </form>
      </div>
    </div>
  );
};
