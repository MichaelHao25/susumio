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
    custom_tag_id?: string;
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
        top={`${2.2 + 2.25}rem`}
        type={AllList.postApiGoodsGoodsLists}
        params={params}
      />
      {/*<div className="aui-flex-col aui-flex-center ">*/}
      {/*  <div className="aui-flex-item-12 ">*/}
      {/*    <div*/}
      {/*      className="aui-flex-col "*/}
      {/*      style={{backgroundColor: 'rgb(244, 244, 244)'}}*/}
      {/*    >*/}
      {/*      <div*/}
      {/*        className="aui-flex-item-6"*/}
      {/*        style={{position: 'relative', padding: '3px'}}*/}
      {/*      >*/}
      {/*        <img loading="lazy"*/}
      {/*          src="https://www.177pinche.com/public/upload/goods_images/20201127/2eefcac0423b88afb8b05caa17277270.jpg"/>{' '}*/}
      {/*        /!**!/*/}
      {/*        <h5*/}
      {/*          className="aui-text-default aui-ellipsis-2 aui-font-size-12 aui-padded-t-5 aui-padded-l-5 aui-padded-r-5 aui-bg-white"*/}
      {/*          style={{height: '2rem', marginBottom: 0}}*/}
      {/*        >*/}
      {/*          Bodega-67632# Disponible en Mexico Chamarra para hombre y dama,*/}
      {/*          para parejas marca SUSUMIO Buena calidad*/}
      {/*        </h5>{' '}*/}
      {/*        <p*/}
      {/*          style={{marginBottom: 0}}*/}
      {/*          className="aui-padded-b-5 aui-padded-t-5 aui-padded-l-10 aui-padded-r-10 aui-bg-white "*/}
      {/*        >*/}
      {/*          <span className="aui-text-price aui-font-size-10">$</span>{' '}*/}
      {/*          <span className="aui-text-price ">11.8</span>*/}
      {/*        </p>*/}
      {/*      </div>*/}
      {/*      <div*/}
      {/*        className="aui-flex-item-6"*/}
      {/*        style={{position: 'relative', padding: '3px'}}*/}
      {/*      >*/}
      {/*        <img loading="lazy"*/}
      {/*          src="https://www.177pinche.com/public/upload/goods_images/20210706/96c6cc95dd2194d7e4ae47792babbb54.jpeg"/>{' '}*/}
      {/*        /!**!/*/}
      {/*        <h5*/}
      {/*          className="aui-text-default aui-ellipsis-2 aui-font-size-12 aui-padded-t-5 aui-padded-l-5 aui-padded-r-5 aui-bg-white"*/}
      {/*          style={{height: '2rem', marginBottom: 0}}*/}
      {/*        >*/}
      {/*          Antes de compra lo que necesita Saber*/}
      {/*        </h5>{' '}*/}
      {/*        <p*/}
      {/*          style={{marginBottom: 0}}*/}
      {/*          className="aui-padded-b-5 aui-padded-t-5 aui-padded-l-10 aui-padded-r-10 aui-bg-white "*/}
      {/*        >*/}
      {/*          <span className="aui-text-price aui-font-size-10">$</span>{' '}*/}
      {/*          <span className="aui-text-price ">0</span>*/}
      {/*        </p>*/}
      {/*      </div>*/}
      {/*      <div*/}
      {/*        className="aui-flex-item-6"*/}
      {/*        style={{position: 'relative', padding: '3px'}}*/}
      {/*      >*/}
      {/*        <img loading="lazy"*/}
      {/*          src="https://www.177pinche.com/public/upload/goods_images/20190722/3b72ee27af86e4d3d36d019c24645f4d.JPG"/>{' '}*/}
      {/*        /!**!/*/}
      {/*        <h5*/}
      {/*          className="aui-text-default aui-ellipsis-2 aui-font-size-12 aui-padded-t-5 aui-padded-l-5 aui-padded-r-5 aui-bg-white"*/}
      {/*          style={{height: '2rem', marginBottom: 0}}*/}
      {/*        >*/}
      {/*          Chamarra Cazadora Abrigo Invierno Dama{' '}*/}
      {/*        </h5>{' '}*/}
      {/*        <p*/}
      {/*          style={{marginBottom: 0}}*/}
      {/*          className="aui-padded-b-5 aui-padded-t-5 aui-padded-l-10 aui-padded-r-10 aui-bg-white "*/}
      {/*        >*/}
      {/*          <span className="aui-text-price aui-font-size-10">$</span>{' '}*/}
      {/*          <span className="aui-text-price ">7.8</span>*/}
      {/*        </p>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</div>*/}
    </div>
  );
};
