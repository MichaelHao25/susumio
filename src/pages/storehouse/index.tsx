import Header from "@/component/Header";
import React, { useEffect, useState } from "react";
import styles from "./index.less";
import { Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react.js";
import "swiper/swiper.less";
import "swiper/modules/pagination/pagination.less";
import "swiper/modules/autoplay/autoplay.less";
import { ConnectProps, history, UserinfoState, useSelector } from "umi";
import { postApiGoodsGoodsLists, postBannerList } from "@/services/api";
import Tab from "@/component/Tab";
import { Details } from "@/services/interface";
import { BannerItem } from "../index";
import MoneyValueUnitRender from "@/component/MoneyValueUnitRender";

interface Props extends ConnectProps<{}, {}, { id: string }> {}
export default (props: Props) => {
  const [bannerList, setBannerList] = useState<BannerItem[]>([]);
  const [list, setList] = useState<Details[]>([]);
  const { user } = useSelector(({ userinfo }: { userinfo: UserinfoState }) => {
    return userinfo;
  });
  useEffect(() => {
    const { id } = props.location.query;
    if (parseInt(id) === user.id) {
      history.replace("/storehouse/manage");
    } else if (!id) {
      history.replace("/");
    }
  }, [props.location.query]);
  useEffect(() => {
    const { id } = props.location.query;
    if (!id) {
      history.replace("/");
    }
    postBannerList().then((res) => {
      if (res) {
        setBannerList(res.data || []);
      }
    });
    postApiGoodsGoodsLists({
      shoperId: parseInt(id),
      pageLimit: 100,
      pageNum: 1,
    }).then((res) => {
      console.log(res);
      if (res) {
        setList(res.data);
      }
    });
  }, []);

  return (
    <div className={styles.storehouse}>
      <Header
        title={`Tienda de MIO+${props.location.query.id}`}
        noBack={true}
      />
      <Swiper
        modules={[Pagination, Autoplay]}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        pagination={{ clickable: true }}
        style={{ width: "100%" }}
      >
        {bannerList.map((item) => {
          return (
            <SwiperSlide key={item.id}>
              <img loading="lazy" src={item.img} alt="" />
            </SwiperSlide>
          );
        })}
      </Swiper>
      <div className={styles.list}>
        <div className={styles.left}>
          <div className={`${styles.item} ${styles.active}`}>人气Top</div>
          <div className={`${styles.item}`}>人气Top</div>
        </div>
        <div className={styles.right}>
          <div className={styles.right_title}>
            <span>人气Top</span>
          </div>
          {list.map((item) => {
            return (
              <div
                className={styles.item}
                key={item.id}
                onClick={() => {
                  history.push(
                    `/goodsDetails?id=${item.id}&shoperId=${user.id}`,
                  );
                }}
              >
                <img src={item.thum} alt="" className={styles.thumbnail} />
                <div className={styles.content}>
                  <div className={styles.title}>{item.name}</div>
                  <div className={styles.cost}>
                    <MoneyValueUnitRender>
                      {item.sell_price}
                    </MoneyValueUnitRender>
                  </div>
                  <div
                    className={styles.add}
                    onClick={() => {
                      console.log("item.id", item.id);
                    }}
                  >
                    <img src={require("../../assets/img/add.svg")} alt="" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div style={{ height: "2.5rem" }} />
      <Tab />
    </div>
  );
};
