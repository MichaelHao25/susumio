import Header from "@/component/Header";
import "./index.less";
import { AllList } from "@/services/interface";
import List from "@/component/List";
import React from "react";
import { ConnectProps, useDispatch, useSelector } from "umi";
import { ListState, SortKey, SortType } from "../../models/list";

interface Props
  extends ConnectProps<
    {},
    {},
    {
      customTag: string;
      title: string;
      id: string;
      keyword: string;
      customTagId: string;
    }
  > {}

const SortHeader = (props: { title: string }) => {
  const { title } = props;
  const list: ListState = useSelector(({ list }: { list: ListState }) => list);
  const dispatch = useDispatch();
  const { sortKey = "", sortType = "" } = list;
  const handleChangeSort = (newKey: SortKey) => {
    const payload: {
      sortKey: SortKey;
      sortType: SortType;
    } = {
      sortKey: SortKey.Id,
      sortType: SortType.Asc,
    };
    if (newKey === sortKey) {
      payload.sortKey = newKey;
      if (sortType === SortType.Asc) {
        payload.sortType = SortType.Desc;
      } else {
        payload.sortType = SortType.Asc;
      }
    } else {
      payload.sortKey = newKey;
      payload.sortType = SortType.Desc;
    }
    dispatch({
      type: "list/sortList",
      payload,
    });
    dispatch({
      type: "list/setState",
      payload,
    });
  };
  return (
    <>
      <Header title={title} />
      <section>
        <div id="tab" className="aui-tab">
          {/* aui-active */}
          <div
            className={`aui-tab-item ${
              sortKey === SortKey.Id || sortKey === "" ? "aui-active" : ""
            }`}
            onClick={() => handleChangeSort(SortKey.Id)}
          >
            General
            <span
              className={`aui-font-size-12 aui-margin-l-5 aui-iconfont ${
                sortKey === SortKey.Id && sortType === SortType.Asc
                  ? "aui-icon-top"
                  : "aui-icon-down"
              }`}
            />
          </div>
          <div
            className={`aui-tab-item ${
              sortKey === SortKey.sellPrice ? "aui-active" : ""
            }`}
            onClick={() => handleChangeSort(SortKey.sellPrice)}
          >
            Precio
            <span
              className={`aui-font-size-12 aui-margin-l-5 aui-iconfont ${
                sortKey === SortKey.sellPrice && sortType === SortType.Asc
                  ? "aui-icon-top"
                  : "aui-icon-down"
              }`}
            />
          </div>
          <div
            className={`aui-tab-item ${
              sortKey === SortKey.sellNum ? "aui-active" : ""
            }`}
            onClick={() => handleChangeSort(SortKey.sellNum)}
          >
            Ventas
            <span
              className={`aui-font-size-12 aui-margin-l-5 aui-iconfont ${
                sortKey === SortKey.sellNum && sortType === SortType.Asc
                  ? "aui-icon-top"
                  : "aui-icon-down"
              }`}
            />
          </div>
          <div
            className={`aui-tab-item ${
              sortKey === SortKey.newGoods ? "aui-active" : ""
            }`}
            onClick={() => handleChangeSort(SortKey.newGoods)}
          >
            Nuevo
            <span
              className={`aui-font-size-12 aui-margin-l-5 aui-iconfont ${
                sortKey === SortKey.newGoods && sortType === SortType.Asc
                  ? "aui-icon-top"
                  : "aui-icon-down"
              }`}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default (props: Props) => {
  const {
    location: {
      query: {
        customTag = "",
        title = "",
        id = "",
        keyword = "",
        customTagId = "",
      },
    },
  } = props;

  const params: {
    customTag?: string;
    id?: string;
    keyword?: string;
    customTagId?: string;
  } = {};
  if (customTag) {
    params.customTag = customTag;
  }
  if (id) {
    params.id = id;
  }
  if (customTagId) {
    params.customTagId = customTagId;
  }
  if (keyword) {
    params.keyword = keyword;
  }

  return (
    <div className="goodsListModel">
      <SortHeader title={title} />
      <List
        // top={`${2.2 + 2.25}rem`}
        type={AllList.postApiGoodsGoodsLists}
        params={params}
      />
      <div style={{ height: "4.45rem" }} />
    </div>
  );
};
