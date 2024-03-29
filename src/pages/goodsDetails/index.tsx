import LaunchApp from "@/component/LaunchApp";
import MoneyValueUnitRender from "@/component/MoneyValueUnitRender";
import SpecInfoSelect from "@/pages/goodsDetails/SpecInfoSelect";
import {
  postApiGoodsCartsSave,
  postApiGoodsGoodsCollectionsCancel,
  postApiGoodsGoodsCollectionsSave,
  postApiGoodsGoodsComments,
  postApiGoodsGoodsIsCollect,
  postApiGoodsGoodsRead,
  postLong2dwz,
} from "@/services/api";
import { Details } from "@/services/interface";
import { history } from "@@/core/umiExports";
import copy from "copy-to-clipboard";
import { Notify } from "notiflix";
import { useEffect, useState } from "react";
import LazyLoad from "react-lazyload";
import { PhotoConsumer, PhotoProvider } from "react-photo-view";
import "react-photo-view/dist/index.css";
import { Autoplay, Pagination } from "swiper";
import "swiper/modules/autoplay/autoplay.less";
import "swiper/modules/pagination/pagination.less";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react.js";
import "swiper/swiper.less";
import { ConnectProps } from "umi";
import "./index.less";

type Props = ConnectProps<
  {},
  {},
  {
    id: string;
    shareCode: string;
    isDiscountGoods: string;
    addCardShow: string;
  }
>;

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
      query: { id = "", addCardShow = "" },
      // isDiscountGoods: urlIsDiscountGoods = ''
    },
  } = props;
  // 商品详情
  const [goods, setGoods] = useState<Details>();
  const [commentsList, setCommentsList] = useState<Comment[]>([]);
  const [tab, setTab] = useState<Tab>(Tab.Details);
  const [isShare, setIsShare] = useState<boolean>(false);
  const [shareAddress, setShareAddress] = useState<string>("");
  const [openShareLayout, setOpenShareLayout] = useState<boolean>(false);
  const [isCollect, setIsCollect] = useState<0 | 1>(0);
  const [showLayout, setShowLayout] = useState<LayoutType>(LayoutType.None);
  const [showAttr, setShowAttr] = useState<boolean>(false);
  //   const refEditorElement = useRef<HTMLDivElement>(null);
  //   const refQuillHandler = useRef<any>(null);
  // // 是否是折扣商品
  // const [isDiscountGoods, setIsDiscountGoods] = useState<string>('')
  // useEffect(() => {
  //   setIsDiscountGoods(isDiscountGoods)
  // }, [urlIsDiscountGoods])

  useEffect(() => {
    if (window.FB) {
      FB.XFBML.parse();
    }
  }, [window.FB]);
  useEffect(() => {
    const {
      location: {
        query: { id = "", shareCode = "" },
      },
    } = props;
    if (id && shareCode) {
      localStorage.setItem(
        "global_shareInfo",
        JSON.stringify({
          id,
          shareCode,
        }),
      );
    }
  }, []);

  //   useEffect(() => {
  //     if (refEditorElement.current) {
  //       if (!refQuillHandler.current) {
  //         refQuillHandler.current = new Quill(refEditorElement.current, {
  //           readOnly: true,
  //           //   theme: "snow",
  //           modules: {
  //             toolbar: false,
  //           },
  //         });
  //       }
  //     }

  //     if (goods && refQuillHandler.current) {
  //       refQuillHandler.current.setContents(JSON.parse(goods.desc));
  //     }
  //   }, [goods, refEditorElement.current]);
  useEffect(() => {
    postApiGoodsGoodsRead({
      id,
    }).then((res) => {
      if (res) {
        const { data } = res;
        const { shareCode = "", id = "" } = data || {};
        if (shareCode) {
          setIsShare(true);
          const goodsShareLink = new URL(window.location.href);
          goodsShareLink.searchParams.set("id", id);
          goodsShareLink.searchParams.set("shareCode", shareCode);
          // const launchLink = new URL(window.location.href);
          // launchLink.pathname = "gotoApp";
          // for (const key of launchLink.searchParams.keys()) {
          //   launchLink.searchParams.delete(key);
          // }
          // launchLink.searchParams.set(
          //   "link",
          //   decodeURIComponent(goodsShareLink.toString()),
          // );
          /**
           * 启动地址转换完毕，开始转换短链接
           */
          postLong2dwz({
            url: goodsShareLink.toString(),
          })
            .then((res) => {
              console.log(res);
              if (res?.data?.short) {
                setShareAddress(res?.data?.short);
              } else {
                setShareAddress(goodsShareLink.toString());
              }
            })
            .catch((err) => {
              console.log(err);
              /**
               * 如果失败的话就显示原始链接
               */
              setShareAddress(goodsShareLink.toString());
            });
        }
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
    shoper_id = 0,
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
              <LazyLoad once>
                <img
                  loading="lazy"
                  src={require("../../assets/img/no_content.png")}
                  style={{ width: "18%", margin: "0 auto" }}
                />
              </LazyLoad>
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
                        <LazyLoad once>
                          <img
                            loading="lazy"
                            src={
                              item.user_info.avatar ||
                              require("../../assets/img/logo2.png")
                            }
                            style={{ maxWidth: "100%" }}
                          />
                        </LazyLoad>
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
                    <PhotoProvider>
                      {(item.imgs || []).map((item, index) => (
                        <PhotoConsumer key={index} src={item} intro={false}>
                          <div
                            className="aui-col-xs-3"
                            key={index}
                            style={{ height: "5rem" }}
                          >
                            <LazyLoad once>
                              <img
                                loading="lazy"
                                style={{ width: "100%", height: "100%" }}
                                src={item}
                              />
                            </LazyLoad>
                          </div>
                        </PhotoConsumer>
                      ))}
                    </PhotoProvider>
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
      //   if (shoper_id !== 0) {
      //     return <div ref={refEditorElement}></div>;
      //   } else {
      return (
        <div className="aui-padded-5 ql-snow" id="detail">
          <div
            dangerouslySetInnerHTML={{ __html: desc }}
            className="ql-editor"
          />
          {thums.map((item, index) => {
            return (
              <div key={index}>
                <LazyLoad once>
                  <img loading="lazy" src={item} />
                </LazyLoad>
              </div>
            );
          })}
        </div>
      );
      //   }
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
      window.localStorage.setItem(
        "loginSuccessBack",
        window.location.pathname + window.location.search,
      );
      history.replace("/login");
      return;
    }
    if (goods) {
      if (goods.spec_info.length > 0) {
        setShowLayout(type);
      } else {
        // 因为店中店没有规格肯定是在这个里面，所以在这里面加上店中店需要带的额外的id
        history.push("/orderConfirm", {
          shoperId: goods.shoper_id,
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
  function toggleShareLayout() {
    setOpenShareLayout((prev) => !prev);
  }

  return (
    <>
      <LaunchApp />
      <div className="goodsDetail">
        {/*返回按钮*/}
        <i
          className="aui-iconfont aui-icon-left returni"
          onClick={() => {
            if (window.location.search.includes("shareCode")) {
              history.push("/");
            } else {
              history.goBack();
            }
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
                <LazyLoad once>
                  <img loading="lazy" src={src} alt="" />
                </LazyLoad>
              </SwiperSlide>
            );
          })}
        </Swiper>

        {/*商品信息*/}
        <div className="aui-content aui-padded-10 aui-bg-white">
          <h1 className="aui-text-price">
            {/* <span className="aui-font-size-14">$</span> */}
            <span>
              <MoneyValueUnitRender>{sell_price}</MoneyValueUnitRender>
            </span>
            {isShare && (
              <div
                style={{ float: "right", fontSize: "24px" }}
                onClick={toggleShareLayout}
              >
                Compartir
              </div>
            )}
            {/*facebook share*/}
            {isShare && (
              <div
                className="fb-share-button"
                data-href={shareAddress}
                data-layout="button_count"
                data-size="small"
              >
                <a
                  target="_blank"
                  href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&src=sdkpreparse"
                  className="fb-xfbml-parse-ignore"
                  rel="noreferrer"
                />
              </div>
            )}
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
            className={`aui-tab-item ${
              tab === Tab.Details ? "aui-active" : ""
            }`}
            onClick={() => {
              setTab(Tab.Details);
            }}
          >
            Detalles
          </div>
          <div
            className={`aui-tab-item ${
              tab === Tab.Comment ? "aui-active" : ""
            }`}
            onClick={() => {
              setTab(Tab.Comment);
            }}
          >
            Comentarios
          </div>
        </div>
        {/*详情*/}
        <LazyLoad once>{getTabDetails()}</LazyLoad>

        {/* 评价 */}
        {getTabComment()}

        {openShareLayout && (
          <div className="layout">
            <div className="layoutContainer">
              <h3 className="layout-tc">
                Para copiar este sitio web, mantener el enlace presionado
              </h3>
              <p
                className="layout-tc layout-url"
                onClick={() => {
                  copy(shareAddress);
                  Notify.success("La copia está completada!");
                  // if (navigator.clipboard) {
                  //   navigator.clipboard.writeText(shareAddress).then(() => {
                  //   });
                  // }
                }}
              >
                {shareAddress}
              </p>
              <div
                className="layout-tc"
                style={{ marginTop: "10px" }}
                onClick={toggleShareLayout}
              >
                Cerrar
              </div>
            </div>
          </div>
        )}

        <div style={{ height: "2.25rem" }} />
        <footer className="aui-bar aui-bar-tab aui-margin-t-15" id="footer">
          {shoper_id === 0 && (
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
          {(shoper_id === 0 || addCardShow === "false") && (
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
    </>
  );
};

// index.wrappers = ['@/wrappers/auth'];
export default index;
