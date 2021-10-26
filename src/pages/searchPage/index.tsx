import Header from "@/component/Header";
import { history, Link, useSelector } from "umi";
import { UserinfoState } from "@/pages/login/model";
import React, { useEffect, useRef, useState } from "react";
import {
  postGoodsKeyword,
  postUserKeyword,
  postUserKeywordDelete,
} from "@/services/api";
import "./index.less";

interface GoodsKeywordItem {
  create_time: string;
  id: number;
  keyword: string;
  search_num: number;
  update_time: string;
}

export default () => {
  const { user } = useSelector(({ userinfo }: { userinfo: UserinfoState }) => {
    return userinfo;
  });
  const inputRef = useRef<HTMLInputElement>(null);
  const [goodsKeyword, setGoodsKeyword] = useState<GoodsKeywordItem[]>([]);
  const [userKeyword, setUserKeyword] = useState<string[]>([]);
  const [keyword, setKeyword] = useState<string>("");
  const [buttonText, setButtonText] = useState<"Búsqueda" | "Cancelar">(
    "Cancelar",
  );
  useEffect(() => {
    postGoodsKeyword().then((res) => {
      if (res) {
        setGoodsKeyword(res.data);
      }
    });
    postUserKeyword().then((res) => {
      if (res) {
        setUserKeyword(res?.data?.keywords || []);
      }
    });
  }, []);
  const deleteKeywords = () => {
    postUserKeywordDelete().then((res) => {
      if (res) {
        setUserKeyword((user) => {
          return {
            ...user,
            keywords: [],
          };
        });
      }
    });
  };

  function searchKeyup(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      if (keyword !== "") {
        // $util.openWindow('goods_list_model_win', {
        //   keyword: keywords
        // })
        history.push(`/goodsListModel?keyword=${keyword}&title=${keyword}`);
      }
      if (inputRef.current) {
        inputRef.current.blur();
      }
    }
  }

  return (
    <div className={"searchPage"}>
      <Header
        title={
          <div className="aui-searchbar aui-bg-white" id="search">
            <div className="aui-searchbar-input aui-border-radius aui-bg-default">
              <i className="aui-iconfont aui-icon-search" />
              <input
                type="text"
                placeholder="Buscar productos"
                id="search-input"
                ref={inputRef}
                value={keyword}
                onChange={(e) => {
                  setKeyword(e.target.value);
                  if (e.target.value) {
                    setButtonText("Búsqueda");
                  } else {
                    setButtonText("Cancelar");
                  }
                }}
                onKeyUp={(event) => searchKeyup(event)}
                // onKeyUp="searchKeyup(event)"
              />
              <div className="aui-searchbar-clear-btn">
                <i className="aui-iconfont aui-icon-close" />
              </div>
            </div>
            <div
              className="aui-searchbar-btn"
              onClick={() => {
                if (keyword) {
                  // $util.openWindow('goods_list_model_win', {
                  //   keyword: keywords
                  // })
                  history.push(
                    `/goodsListModel?keyword=${keyword}&title=${keyword}`,
                  );
                }
              }}
              style={{
                transform:
                  keyword === "" ? "translateX(100%)" : "translateX(0)",
              }}
            >
              {buttonText}
            </div>
          </div>
        }
        titleStyle={{ left: "1.5rem", right: "0rem" }}
      />
      <div
        className="aui-content aui-bg-white aui-padded-t-10"
        style={{ padding: "0 1.5rem" }}
      >
        {user.mobile ? (
          <>
            <div className="aui-text-pray">
              <span className="aui-font-size-14">Búsqueda histórica</span>
              <i
                className="iconfont icon-shanchu aui-pull-right"
                onClick={deleteKeywords}
              />
            </div>
            <div className="search-div">
              {userKeyword.map((item, index) => {
                return (
                  <Link
                    to={`/goodsListModel?keyword=${item}&title=${item}`}
                    className="search-key aui-font-size-12"
                    key={index}
                    // data-click="search(keyword)"
                  >
                    {item}
                  </Link>
                );
              })}
            </div>
          </>
        ) : (
          ""
        )}
        <div className="aui-text-pray aui-padded-t-10">
          <span className="aui-font-size-14">Búsqueda avanzada</span>
        </div>
        <div className="search-div">
          {goodsKeyword.map((item, index) => {
            return (
              <Link
                className="search-key aui-font-size-12"
                key={item.id}
                to={`/goodsListModel?keyword=${item.keyword}&title=${item.keyword}`}
                // data-click="search(keyword)"
              >
                {item.keyword}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};
