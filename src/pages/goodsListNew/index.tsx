import Header from "@/component/Header";
import "./index.less";
import Tab from "@/component/Tab";
import React, { useEffect, useState } from "react";
import {
  getApiGoodsGoodsCatesListsTree,
  postApiGoodsGoodsLists,
} from "@/services/api";
import { history } from "umi";
import LazyLoad from "react-lazyload";

interface CategoryList {
  id: number;
  name: string;
  _child: Child[];
}

interface Child {
  id: number;
  name: string;
  thum: string;
}

export default () => {
  const [categoryList, setCategoryList] = useState<CategoryList[]>([]);
  const [child, setChildList] = useState<Child[]>([]);

  const [id, setId] = useState<number>(0);
  const [name, setName] = useState<string>("");
  useEffect(() => {
    getApiGoodsGoodsCatesListsTree().then((res) => {
      if (res) {
        const {
          data,
        }: {
          data: CategoryList[];
        } = res;
        setCategoryList(data);
        setId(data[0].id);
        setName(data[0].name);
        setChildList(data[0]._child);
      }
    });
  }, []);
  return (
    <div className="goodsListNew">
      <Header title={"Categorías"} noBack={true} />
      <div style={{ height: "2.25rem" }} />
      <div
        className="aui-title"
        style={{ left: "0rem", right: "0rem" }}
        onClick={() => {
          history.push("/searchPage");
        }}
      >
        {/*onClick="$util.openWindow('search_page_win')"*/}
        <div className="aui-searchbar aui-bg-white" id="search">
          <div className="aui-searchbar-input aui-border-radius aui-bg-default">
            <i className="aui-iconfont aui-icon-search" />
            <div>Buscar lo que quieres</div>
            {/*<input*/}
            {/*  type="search"*/}
            {/*  placeholder="Buscar lo que quieres"*/}
            {/*  id="search-input"*/}
            {/*  disabled*/}
            {/*/>*/}
            <div className="aui-searchbar-clear-btn">
              <i className="aui-iconfont aui-icon-close" />
            </div>
          </div>
          {/*<div className="aui-searchbar-btn">Cancelar</div>*/}
        </div>
      </div>

      {/* 类目 */}
      <div className="aui-clearfix categ">
        {/* 左侧一级类目 */}
        <ul className="aui-col-xs-3 inner">
          {categoryList.map((item) => {
            return (
              <li
                key={item.id}
                className={item.id === id ? "active" : ""}
                onClick={() => {
                  setId(item.id);
                  setName(item.name);
                  setChildList(item._child);
                }}
              >
                {item.name}
              </li>
            );
          })}
        </ul>
        {/* 右侧二级类目 */}
        <div className="aui-col-xs-9 aui_grid">
          <div>
            <LazyLoad once>
              <img
                loading="lazy"
                src="https://www.177pinche.com/public/upload/article_images/20190726/f9b6991c87826650c32f1047e72273b8.png"
              />
            </LazyLoad>
            {/*@click="goModel(cate_ad)"*/}
          </div>
          <div>
            <h1 className="aui-font-size-16 aui-padded-t-15">{name}</h1>

            <ul className="category">
              {child.map((item) => {
                return (
                  <li
                    key={item.id}
                    onClick={() => {
                      history.push(
                        `/goodsListModel?id=${item.id}&title=Categorías`,
                      );
                    }}
                  >
                    <LazyLoad once>
                      <img
                        loading="lazy"
                        src={item.thum}
                        style={{ width: "80%", height: "3.5rem" }}
                      />
                    </LazyLoad>
                    <div className="aui-grid-label aui-padded-t-5">
                      {item.name}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
      <div style={{ height: "2.5rem" }}></div>
      <Tab />
    </div>
  );
};
