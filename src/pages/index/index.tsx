import Tab from "@/component/Tab";
import "./index.less";
import React, { useEffect, useState } from "react";
import { Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react.js";
import "swiper/swiper.less";
import "swiper/modules/pagination/pagination.less";
import "swiper/modules/autoplay/autoplay.less";
import { connect, ConnectProps, Dispatch, history, Link } from "umi";
import List from "@/component/List";
import { AllList } from "@/services/interface";
import { postBannerList, postGoodsTag } from "@/services/api";
import useCurrencyManage from "@/hooks/useCurrencyManage";
import LazyLoad from "react-lazyload";

interface PageProps extends ConnectProps {
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

const Header = () => {
  const [bannerList, setBannerList] = useState<BannerItem[]>([]);
  const [tags, setTags] = useState<TagItem[]>([]);
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
          setBannerList(res.data || []);
        }
      });
    }
    if (tags.length === 0) {
      postGoodsTag().then((res) => {
        if (res) {
          setTags(res.data || []);
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
                  setChangeCurrencyType(true);
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
        <Swiper
          modules={[Pagination, Autoplay]}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop={true}
          pagination={{ clickable: true }}
        >
          {bannerList.map((item) => {
            return (
              <SwiperSlide key={item.id}>
                <LazyLoad once>
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
                </LazyLoad>
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
              {tags.map((item) => {
                return (
                  <Link
                    to={`/goodsListModel?customTag=${item.name}&title=${item.name}`}
                    key={item.id}
                    className="aui-col-xs-3"
                  >
                    <LazyLoad once>
                      <img
                        loading="lazy"
                        src={item.thum}
                        className="aui-padded-5"
                        style={{ margin: "0px auto", width: "55%" }}
                      />
                    </LazyLoad>
                    <div className="aui-grid-label">{item.name}</div>
                  </Link>
                );
              })}
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
export default connect(({}: {}) => ({}))(
  React.memo((props: PageProps) => {
    return (
      <div className="indexPage">
        <List
          header={<Header />}
          //   bottom={"2.5rem"}
          type={AllList.postApiGoodsGoodsLists}
        />
        <div style={{ height: "2.5rem" }}></div>
        <Tab />
      </div>
    );
  }),
);
