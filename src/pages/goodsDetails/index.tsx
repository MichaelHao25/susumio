import "./index.less";
import React, { useEffect, useState } from "react";
import { ConnectProps } from "umi";
import {
  postApiGoodsCartsSave,
  postApiGoodsGoodsCollectionsCancel,
  postApiGoodsGoodsCollectionsSave,
  postApiGoodsGoodsComments,
  postApiGoodsGoodsIsCollect,
  postApiGoodsGoodsRead,
} from "@/services/api";
import { Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react.js";
import "swiper/swiper.less";
import "swiper/modules/pagination/pagination.less";
import "swiper/modules/autoplay/autoplay.less";
import { Details } from "@/services/interface";
import { history } from "@@/core/umiExports";
import Notiflix, { Notify } from "notiflix";
import SpecInfoSelect from "@/pages/goodsDetails/SpecInfoSelect";

interface Props
  extends ConnectProps<
    {},
    {},
    { id: string; isDiscountGoods: string; shoperId?: string }
  > {}

enum Tab {
  Details,
  Comment,
}

interface Comment {
  id: number;
  user_id: number;
  order_id: number;
  goods_id: number;
  content: string;
  imgs: string[];
  score: string;
  status: number;
  create_time: string;
  update_time: string;
  order_goods_info: {
    id: number;
    order_id: number;
    goods_id: number;
    user_id: number;
    name: string;
    thum: string;
    intro: string;
    standard: string;
    spec_group_id_str: string;
    spec_group_info: string;
    sell_price: number;
    score: number;
    real_price: number;
    weight: number;
    num: number;
    is_comment: number;
    return_goods_status: number;
    is_return_goods: number;
    is_return_money: number;
    create_time: string;
    update_time: string;
  };
  user_info: {
    id: number;
    mobile: string;
    nick_name: string;
    avatar: string;
  };
}

export enum LayoutType {
  None,
  Shop,
  AddCart,
}

const index = (props: Props) => {
  const {
    location: {
      query: { id = "", shoperId = "" },
      // isDiscountGoods: urlIsDiscountGoods = ''
    },
  } = props;
  // 商品详情
  const [goods, setGoods] = useState<Details>();
  const [commentsList, setCommentsList] = useState<Comment[]>([]);
  const [tab, setTab] = useState<Tab>(Tab.Details);
  const [isCollect, setIsCollect] = useState<0 | 1>(0);
  const [showLayout, setShowLayout] = useState<LayoutType>(LayoutType.None);
  const [showAttr, setShowAttr] = useState<boolean>(false);
  // // 是否是折扣商品
  // const [isDiscountGoods, setIsDiscountGoods] = useState<string>('')
  // useEffect(() => {
  //   setIsDiscountGoods(isDiscountGoods)
  // }, [urlIsDiscountGoods])
  useEffect(() => {
    postApiGoodsGoodsRead({
      id,
    }).then((res) => {
      if (res) {
        const { data } = res;
        setGoods(data);
      }
    });
    postApiGoodsGoodsComments({
      id,
    }).then((res) => {
      if (res) {
        const { data } = res;
        setCommentsList(data);
      }
    });
    postApiGoodsGoodsIsCollect({
      id,
    }).then((res) => {
      if (res) {
        const {
          data: { is_collect },
        } = res;
        setIsCollect(is_collect);
      }
    });
  }, [id]);
  const {
    imgs = [],
    sell_price = 0,
    name = "",
    intro = "",
    stock = 0,
    sell_num = 0,
    attr_info = [],
    desc = "",
    thums = [],
    thum = "",
  } = goods || {};

  function getTabComment() {
    if (Tab.Comment === tab) {
      return (
        <div className="aui-bg-white">
          {commentsList.length === 0 ? (
            <div
              className="aui-col-xs-12 aui-text-center"
              style={{
                marginTop: "20%",
                marginBottom: "4rem",
              }}
            >
              <img
                loading="lazy"
                src={require("../../assets/img/no_content.png")}
                style={{ width: "18%", margin: "0 auto" }}
              />
              <h5 style={{ marginTop: "1rem" }} className="aui-font-size-14">
                Oh. Aquí no hay nada.
              </h5>
            </div>
          ) : (
            <></>
          )}
          <div className="aui-list aui-media-list">
            {commentsList.map((item, index) => {
              return (
                <div className="aui-list-item aui-padded-b-5" key={item.id}>
                  <div className="aui-info">
                    <div className="aui-info-item">
                      <div
                        className="aui-img-round"
                        style={{
                          overflow: "hidden",
                          width: "1.5rem",
                          height: "1.5rem",
                          borderRadius: "1.5rem",
                        }}
                      >
                        <img
                          loading="lazy"
                          src={
                            item.user_info.avatar ||
                            require("../../assets/img/avatar.png")
                          }
                          style={{ maxWidth: "100%" }}
                        />
                      </div>
                      <span className="aui-margin-l-5">
                        {item.user_info.nick_name || item.user_info.mobile}
                      </span>
                    </div>
                    <div className="aui-info-item aui-padded-r-10">
                      {item.create_time}
                    </div>
                  </div>
                  <div>
                    {"1"
                      .repeat(5)
                      .split("")
                      .map((_, index) => (
                        <i
                          className="aui-iconfont iconfont icon-shoucang aui-margin-5"
                          key={index}
                          style={{
                            color:
                              index + 1 <= ~~item.score ? "#ffc640" : "#ccc",
                          }}
                        />
                      ))}
                    <span style={{ marginLeft: "6rem", color: "#757575" }}>
                      {~~item.score >= 4
                        ? "Bien"
                        : ~~item.score === 3
                        ? "Evaluación central"
                        : "Evaluación diferencial"}
                    </span>
                  </div>
                  <div
                    className="aui-list-item-text aui-padded-t-5 aui-padded-b-5"
                    style={{ wordBreak: "break-all" }}
                  >
                    {item.content}
                  </div>
                  <div className="aui-row aui-row-padded">
                    {(item.imgs || []).map((item, index) => {
                      return (
                        <div
                          className="aui-col-xs-3"
                          key={index}
                          style={{ height: "5rem" }}
                        >
                          <img
                            loading="lazy"
                            style={{ width: "100%", height: "100%" }}
                            src={item}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    } else {
      return <></>;
    }
  }

  function getTabDetails() {
    if (Tab.Details === tab) {
      return (
        <div className="aui-padded-5" id="detail">
          <div dangerouslySetInnerHTML={{ __html: desc }} />
          {thums.map((item, index) => {
            return (
              <div key={index}>
                <img loading="lazy" src={item} />
              </div>
            );
          })}
        </div>
      );
    } else {
      return <></>;
    }
  }

  function toggleCollect() {
    if (isCollect) {
      postApiGoodsGoodsCollectionsCancel({
        id,
      }).then((res) => {
        if (res) {
          setIsCollect(0);
        }
      });
    } else {
      postApiGoodsGoodsCollectionsSave({
        id,
      }).then((res) => {
        if (res) {
          setIsCollect(1);
        }
      });
    }
  }

  function addCart(type: LayoutType) {
    const { free_shipping = false, spec_info = [], id = 0 } = goods || {};
    if (free_shipping) {
      Notify.failure("Package items cannot be added to shopping cart");
      return;
    }
    // 如果没有分类信息的话
    if (spec_info.length === 0) {
      postApiGoodsCartsSave({
        id,
        specGroupIdStr: 0,
        num: 1,
        status: 1,
      }).then((res) => {
        if (res) {
          Notify.success(res.msg);
        }
      });
    } else {
      setShowLayout(type);
    }
  }

  function buy(type: LayoutType) {
    const token = window.localStorage.getItem("token");
    if (!token) {
      history.replace("/login");
      return;
    }
    if (goods) {
      if (goods.spec_info.length > 0) {
        setShowLayout(type);
      } else {
        // 因为店中店没有规格肯定是在这个里面，所以在这里面加上店中店需要带的额外的id
        history.push("/orderConfirm", {
          shoperId,
          goodsList: [
            {
              thum: goods.thum,
              name: goods.name,
              intro: goods.intro,
              spec_option_group: "",
              sell_price: goods.sell_price,
              num: 1,
              id: goods.id,
              goods_id: goods.id,
              goods_id_str: "",
            },
          ],
        });

        // 不知道有那些没有分类
        // 先搁置
        // Notify.failure("请联系管理员");
        // history.push('/orderConfirm', {
        //   goodsList: {
        //     thum: goods.thum,
        //     name: goods.name,
        //     intro: goods.intro,
        //     spec_option_group: info.spec_option_group,
        //     sell_price: goods.sell_price,
        //     num: 1,
        //     id: goods.id,
        //     goods_id: goods.goods_id,
        //     goods_id_str: goods.spec_group_id_str,
        //   },
        // });
      }
    }
  }

  return (
    <div className="goodsDetail">
      {/*返回按钮*/}
      <i
        className="aui-iconfont aui-icon-left returni"
        onClick={() => {
          history.goBack();
        }}
        id="header"
      />
      {/*轮播*/}
      <Swiper
        modules={[Pagination, Autoplay]}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        pagination={{ clickable: true }}
      >
        {imgs.map((src, index) => {
          return (
            <SwiperSlide key={index}>
              <img loading="lazy" src={src} alt="" />
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/*商品信息*/}
      <div className="aui-content aui-padded-10 aui-bg-white">
        <h1 className="aui-text-price">
          <span className="aui-font-size-14">$</span>
          <span>{sell_price}</span>
          {/*facebook share*/}
          {/*<div style={{float: 'right', fontSize: '24px'}}*/}
          {/*     v-if="isShare"*/}
          {/*     data-click="openLayout()">Compartir*/}
          {/*</div>*/}
          {/*<div className="fb-share-button"*/}
          {/*     v-if="isShare"*/}
          {/*     data-href="shareAddress"*/}
          {/*     data-layout="button_count"*/}
          {/*     data-size="small"><a target="_blank"*/}
          {/*                          href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&src=sdkpreparse"*/}
          {/*                          className="fb-xfbml-parse-ignore"/></div>*/}
        </h1>
        <h3 className="aui-padded-t-5">
          {name}-"{id}"
        </h3>

        {/*<div></div>*/}
        <p className="aui-font-size-12 aui-padded-t-5">{intro}</p>
        <p
          className="aui-font-size-12 aui-padded-t-5"
          style={{ color: "#b3b3b3" }}
        >
          <span className="aui-pull-left">Existencias{stock}</span>

          <span className="aui-pull-right">Ventas{sell_num}</span>
        </p>
      </div>
      {showAttr && (
        <div
          onClick={() => setShowAttr(false)}
          style={{
            position: "fixed",
            bottom: "0",
            top: 0,
            backgroundColor: "rgba(0,0,0,.3)",
            left: "0",
            right: "0",
            zIndex: 100,
          }}
        >
          <ul
            className="aui-list aui-list-in"
            style={{
              position: "fixed",
              bottom: "0",
              left: "0",
              right: "0",
              zIndex: 100,
              marginBottom: 0,
            }}
          >
            {goods &&
              goods.attr_info.map((attr, index) => {
                return (
                  <li className="aui-list-item" key={index}>
                    <div className="aui-list-item-inner">
                      <div className="aui-list-item-title aui-font-size-14">
                        {attr.name}
                      </div>
                      <div className="aui-list-item-right">{attr.value}</div>
                    </div>
                  </li>
                );
              })}
          </ul>
        </div>
      )}
      {attr_info.length > 0 && (
        <div className="aui-content aui-margin-b-10">
          {/* 规格 */}
          <ul className="aui-list aui-list-in">
            {/* 属性 */}
            <li className="aui-list-item" onClick={() => setShowAttr(true)}>
              <div className="aui-list-item-inner aui-list-item-arrow">
                <div className="aui-list-item-title aui-font-size-14">
                  Propiedades
                </div>
              </div>
            </li>
          </ul>
        </div>
      )}
      {/* 选项卡切换 */}

      <div className="aui-tab" id="tab">
        <div
          className={`aui-tab-item ${tab === Tab.Details ? "aui-active" : ""}`}
          onClick={() => {
            setTab(Tab.Details);
          }}
        >
          Detalles
        </div>
        <div
          className={`aui-tab-item ${tab === Tab.Comment ? "aui-active" : ""}`}
          onClick={() => {
            setTab(Tab.Comment);
          }}
        >
          Comentarios
        </div>
      </div>
      {/*详情*/}
      {getTabDetails()}

      {/* 评价 */}
      {getTabComment()}

      {/*<div className="layout"*/}
      {/*     v-if="layout">*/}
      {/*  <div className="layoutContainer">*/}
      {/*    <h3 className="layout-tc">Para copiar este sitio web, mantener el enlace presionado</h3>*/}
      {/*    <p className="layout-tc layout-url"*/}
      {/*       v-text="shareAddress"/>*/}
      {/*    <div className="layout-tc"*/}
      {/*         style={{marginTop: '10px'}}*/}
      {/*         data-click="hideLayout()">Cerrar*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</div>*/}

      <div style={{ height: "2.25rem" }} />
      <footer className="aui-bar aui-bar-tab aui-margin-t-15" id="footer">
        {!shoperId && (
          <div
            className="aui-bar-tab-item"
            style={{ width: "3rem" }}
            onClick={toggleCollect}
          >
            {/*@click="addCollection()"*/}
            <span
              className={`aui-iconfont iconfont icon-shoucang`}
              style={{ color: isCollect ? "#ffc640" : "" }}
            />
            <div className="aui-bar-tab-label" style={{ color: "#777" }}>
              Favorito
            </div>
          </div>
        )}
        {!shoperId && (
          <div
            className="aui-bar-tab-item aui-text-white"
            onClick={() => addCart(LayoutType.AddCart)}
            style={{
              width: "auto",
              backgroundColor: "#6bcfc4",
              fontSize: "0.8rem",
            }}
          >
            Añadir a carro
          </div>
        )}
        <div
          className="aui-bar-tab-item aui-text-white"
          style={{
            width: "auto",
            backgroundColor: "#06a995",
            fontSize: "0.8rem",
          }}
          onClick={() => buy(LayoutType.Shop)}
        >
          Compra
        </div>
      </footer>

      {showLayout !== LayoutType.None ? (
        goods ? (
          <SpecInfoSelect
            goods={goods}
            type={showLayout}
            handleCloseLayout={() => {
              setShowLayout(LayoutType.None);
            }}
          />
        ) : (
          <></>
        )
      ) : (
        <></>
      )}
    </div>
  );
};

// index.wrappers = ['@/wrappers/auth'];
export default index;
