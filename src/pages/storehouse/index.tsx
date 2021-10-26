import Header from "@/component/Header";
import styles from "./index.less";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.less";
import "swiper/components/pagination/pagination.less";
import { history } from "umi";
import React, { useEffect, useState } from "react";
import { postBannerList } from "@/services/api";
import Tab from "@/component/Tab";

export default () => {
  const [bannerList, setBannerList] = useState<any[]>([]);
  useEffect(() => {
    postBannerList().then((res) => {
      if (res) {
        setBannerList(res.data || []);
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
          <div className={styles.item}>
            <img
              src="https://www.177pinche.com/public/upload/article_images/20210527/d68369529cf278c20117f0d5f86b5709.png"
              alt=""
            />
            <div className={styles.content}>
              <div className={styles.title}>1元代金券</div>
              <div className={styles.cost}>¥ 1</div>
              <div className={styles.add}>
                <img src={require("../../assets/img/add.svg")} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ height: "2.5rem" }} />
      <Tab />
    </div>
  );
};
