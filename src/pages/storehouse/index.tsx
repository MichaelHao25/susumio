import Header from "@/component/Header";
import styles from "./index.less";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.less";
import "swiper/components/pagination/pagination.less";
import { history } from "umi";
import React, { useEffect, useState } from "react";
import { postApiGoodsGoodsLists, postBannerList } from "@/services/api";
import Tab from "@/component/Tab";
import { Details } from "@/services/interface";
import { BannerItem } from "../index";

export default () => {
  const [bannerList, setBannerList] = useState<BannerItem[]>([]);
  const [list, setList] = useState<Details[]>([]);
  useEffect(() => {
    postBannerList().then((res) => {
      if (res) {
        setBannerList(res.data || []);
      }
    });
    postApiGoodsGoodsLists({
      shoperId: 59,
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
      <Header title={"XXX的小店"} noBack={true} />
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
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
                  history.push(`/goodsDetails?id=${item.id}`);
                }}
              >
                <img src={item.thum} alt="" className={styles.thumbnail} />
                <div className={styles.content}>
                  <div className={styles.title}>{item.name}</div>
                  <div className={styles.cost}>¥ {item.sell_price}</div>
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
