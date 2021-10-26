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
  return (
    <div className={styles.storehouse}>
      <Header title={"订单列表"} noBack={true} />
      <div className={styles.order_tab}>
        <div className={`${styles.item} ${styles.active}`}>
          <span>全部</span>
        </div>
        <div className={`${styles.item}`}>
          <span>未完成</span>
        </div>
        <div className={`${styles.item}`}>
          <span>已完成</span>
        </div>
      </div>
      <div className={styles.order_list}>
        <div className={styles.item}>
          <div className={styles.header}>
            <div className={styles.sn}>订单号：23847563928174</div>
            <div className={styles.status}>待发货</div>
          </div>
          <div className={styles.content}>
            <div className={styles.df_ai}>
              <div className={styles.name}>1元代金券</div>
              <div className={styles.time}>2019-01-08 09:05</div>
            </div>
            <div className={styles.form}>付款人：Momo</div>
            <div className={styles.df_ai}>
              <div className={styles.money}>¥1*100件=¥100</div>
              <div className={styles.button}>去发货</div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ height: "2.5rem" }} />
      <Tab />
    </div>
  );
};
