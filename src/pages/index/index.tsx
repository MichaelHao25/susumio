import List from "@/component/List";
import Tab from "@/component/Tab";
import useCurrencyManage from "@/hooks/useCurrencyManage";
import {
  postBannerList,
  postGoodsTag,
  postUsersBindParent,
} from "@/services/api";
import { AllList } from "@/services/interface";
import { Loading } from "notiflix";
import React, { useEffect, useState } from "react";
import { Autoplay, Pagination } from "swiper";
import "swiper/modules/autoplay/autoplay.less";
import "swiper/modules/pagination/pagination.less";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react.js";
import "swiper/swiper.less";
import {
  ConnectProps,
  Dispatch,
  Link,
  UserinfoState,
  connect,
  history,
  useSelector,
} from "umi";
import "./index.less";

interface PageProps
  extends ConnectProps<
    Record<string, string>,
    Record<string, string>,
    {
      parent_mobile: string;
    }
  > {
  dispatch: Dispatch;
}

export interface BannerItem {
  alt: string;
  applet_href: string;
  create_time: string;
  href: string;
  id: number;
  img: string;
  is_open_model: boolean;
  memo: string;
  model: "goods" | "article" | "goods_cate" | "tag";
  model_id: number;
  name: string;
  position: string;
  status: number;
  type_id: number;
  type_name: string;
  update_time: string;
}

interface TagItem {
  create_time: string;
  id: number;
  name: string;
  sort: number;
  thum: string;
  update_time: string;
}
const cache = {
  banner: [],
  brandList: [],
};
const Header = () => {
  const [bannerList, setBannerList] = useState<BannerItem[]>(cache.banner);
  const [tags, setTags] = useState<TagItem[]>(cache.brandList);
  const {
    CurrencyType,
    currentCurrency,
    setCurrentCurrency,
    changeCurrencyType,
    setChangeCurrencyType,
  } = useCurrencyManage();
  useEffect(() => {
    if (bannerList.length === 0) {
      postBannerList().then((res) => {
        if (res) {
          cache.banner = res.data || [];
          setBannerList(cache.banner);
        }
      });
    }
    if (tags.length === 0) {
      postGoodsTag().then((res) => {
        if (res) {
          cache.brandList = res.data || [];
          setTags(cache.brandList);
        }
      });
    }
  }, []);
  return (
    <>
      <div id="top">
        <div
          className="aui-list aui-media-list aui-list-noborder"
          style={{ backgroundColor: "rgba(0,0,0,0)" }}
        >
          <div className="aui-list-item aui-list-item-middle aui-padded-l-5 aui-padded-r-5">
            <div className="aui-media-list-item-inner">
              <div className="aui-list-item-inner aui-text-center">
                <div
                  className="aui-searchbar"
                  onClick={() => {
                    history.push("/searchPage");
                  }}
                  id="search"
                >
                  <div
                    className="aui-searchbar-input aui-border-radius "
                    id="search-header"
                  >
                    <i
                      className="aui-iconfont aui-icon-search"
                      style={{
                        color: "#666666!important",
                        marginRight: "-11.5rem",
                      }}
                    />
                    <input
                      type="search"
                      placeholder="Búsqueda"
                      className="aui-text-center"
                      id="search-input"
                      style={{
                        color: "#666666!important",
                        backgroundColor: "#fafafa!important: #fff!important",
                        width: "100%",
                      }}
                      readOnly
                    />
                  </div>
                </div>
              </div>
              <img
                onClick={() => {
                  setChangeCurrencyType((prev) => !prev);
                }}
                src={require("../../assets/img/money.svg")}
                alt=""
                style={{ width: "30px", height: "30px" }}
              />
            </div>
          </div>
        </div>
      </div>
      {changeCurrencyType && (
        <div className={"money_every"}>
          {Object.keys(CurrencyType).map((item) => {
            return (
              <div
                className={`item ${currentCurrency === item && "active"}`}
                key={item}
                onClick={() => {
                  // @ts-ignore
                  setCurrentCurrency(item);
                  setChangeCurrencyType(false);
                }}
              >
                {(() => {
                  switch (item) {
                    case CurrencyType.USD: {
                      return `🇺🇸  ${item}`;
                    }
                    case CurrencyType.EUR: {
                      return `🇪🇺  ${item}`;
                    }
                    case CurrencyType.MXN: {
                      return `🇲🇽  ${item}`;
                    }
                    case CurrencyType.PEN: {
                      return `🇵🇪  ${item}`;
                    }
                    case CurrencyType.CLP: {
                      return `🇨🇱  ${item}`;
                    }
                    case CurrencyType.COP: {
                      return `🇨🇴  ${item}`;
                    }
                  }
                })()}
              </div>
            );
          })}
        </div>
      )}
      <div className="aui-content">
        {bannerList.length === 0 && <div style={{ paddingTop: "50%" }} />}
        <Swiper
          modules={[Pagination, Autoplay]}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop={true}
          style={{ height: "100%" }}
          pagination={{ clickable: true }}
        >
          {bannerList.map((item) => {
            return (
              <SwiperSlide key={item.id}>
                <img
                  loading="lazy"
                  src={item.img}
                  alt=""
                  onClick={() => {
                    if (item.is_open_model) {
                      if (item.model === "goods") {
                        history.push(`/goodsDetails?id=${item.model_id}`);
                      }
                      if (item.model === "goods_cate") {
                        history.push(
                          `/goodsListModel?id=${item.model_id}&title=Categorías`,
                        );
                      }

                      if (item.model === "tag") {
                        history.push(
                          `/goodsListModel?customTagId=${item.model_id}&title=Categorías`,
                        );
                      }
                    } else {
                      if (item.href) {
                        window.location.href = item.href;
                      }
                    }
                  }}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
        <div className="product-tag aui-padded-t-15 ">
          <section className="aui-grid  aui-margin-l-5 aui-margin-r-5 aui-padded-t-15 aui-padded-b-15">
            <div
              className="aui-row aui-padded-t-15 "
              style={{ display: "flex", flexWrap: "wrap" }}
            >
              {tags.length === 0 && (
                <div style={{ paddingTop: "25%", marginTop: "52px" }} />
              )}
              {tags.map((item) => {
                let to = `/goodsListModel?customTag=${item.name}&title=${item.name}`;
                if (item.name === "Toktok") {
                  to = "/forum";
                }
                return (
                  <Link to={to} key={item.id} className="aui-col-xs-3">
                    <div style={{ position: "relative" }}>
                      <div style={{ paddingTop: "55%" }} />
                      <div style={{ position: "absolute", top: 0 }}>
                        <img
                          loading="lazy"
                          src={item.thum}
                          className="aui-padded-5"
                          style={{ margin: "0px auto", width: "55%" }}
                        />
                      </div>
                    </div>
                    <div className="aui-grid-label">{item.name}</div>
                  </Link>
                );
              })}
              {/* <Link to={"/forum"} className="aui-col-xs-3">
                <div style={{ position: "relative" }}>
                  <div style={{ paddingTop: "55%" }} />
                  <div style={{ position: "absolute", top: 0 }}>
                    <img
                      loading="lazy"
                      src={
                        "https://api.susumio.com/public/upload/goods_images/20211101/35d813e64126e235b277c63b30116445.png"
                      }
                      className="aui-padded-5"
                      style={{ margin: "0px auto", width: "55%" }}
                    />
                  </div>
                </div>
                <div className="aui-grid-label">{"Foro"}</div>
              </Link> */}
            </div>
          </section>
        </div>

        <div className="aui-flex-col aui-flex-center ">
          <div className="aui-flex-item-12 ">
            <img
              loading="lazy"
              src={require("../../assets/img/wntj-1.png")}
              className="aui-margin-t-10 aui-margin-b-10"
              style={{ width: "50%", margin: "0px auto" }}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default connect(() => ({}))(
  React.memo((props: PageProps) => {
    const { user, notLogin } = useSelector(
      ({ userinfo }: { userinfo: UserinfoState }) => {
        return userinfo;
      },
    );
    const {
      location: {
        query: { parent_mobile = "" },
      },
    } = props;
    useEffect(() => {
      if (parent_mobile) {
        Loading.dots("Está enlazando...");
        if (user.id !== 0) {
          postUsersBindParent({
            parent_mobile,
          }).finally(() => {
            history.push("/");
          });
        }
        if (notLogin) {
          history.push("/login?parent_mobile=" + parent_mobile);
        }
      }
      return () => {
        Loading.remove();
      };
    }, [parent_mobile, user, notLogin]);
    return (
      <div className="indexPage">
        <List
          header={<Header />}
          //   bottom={"2.5rem"}
          type={AllList.postApiGoodsGoodsLists}
        />
        <div style={{ height: "2.5rem" }} />
        <Tab />
      </div>
    );
  }),
);
