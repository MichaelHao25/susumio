import Header from '@/component/Header';
import './index.less';
import { AllList } from '@/services/interface';
import List from '@/component/List';
import React from 'react';
import { ConnectProps } from 'umi';

interface Props
  extends ConnectProps<
    {},
    {},
    { customTag: string; title: string; id: string; keyword: string }
  > {}

export default (props: Props) => {
  const {
    location: {
      query: { customTag = '', title = '', id = '', keyword = '' },
    },
  } = props;
  let params: {
    customTag?: string;
    id?: string;
    keyword?: string;
  } = {};
  if (customTag) {
    params.customTag = customTag;
  }
  if (id) {
    params.id = id;
  }
  if (keyword) {
    params.keyword = keyword;
  }
  return (
    <div className="goodsListModel">
      <>
        <Header title={title} />
        <section>
          <div id="tab" className="aui-tab">
            <div className="aui-tab-item">General</div>
            <div className="aui-tab-item aui-active">
              Precio
              <span className="aui-font-size-12 aui-margin-l-5 aui-iconfont aui-icon-down" />
            </div>
            <div className="aui-tab-item">
              Ventas
              <span className="aui-font-size-12 aui-margin-l-5 aui-iconfont aui-icon-top" />
            </div>
            <div className="aui-tab-item">
              Nuevo
              <span className="aui-font-size-12 aui-margin-l-5 aui-iconfont aui-icon-top" />
            </div>
          </div>
        </section>
      </>
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
