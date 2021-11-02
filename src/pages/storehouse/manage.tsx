import Header from "@/component/Header";
import styles from "./index.less";

import { history, NavLink, UserinfoState, useSelector } from "umi";
import React, { useEffect, useState } from "react";
import {
  postApiGoodsGoodsLists,
  postBannerList,
  postGoodsDelete,
} from "@/services/api";
import Tab from "./tab";
import { Details } from "@/services/interface";
import Notiflix, { Confirm, Notify } from "notiflix";

export default () => {
  const [list, setList] = useState<Details[]>([]);
  const { user } = useSelector(({ userinfo }: { userinfo: UserinfoState }) => {
    return userinfo;
  });
  useEffect(() => {
    postApiGoodsGoodsLists({
      shoperId: user.id,
      pageLimit: 100,
      pageNum: 1,
    }).then((res) => {
      if (res) {
        setList(res.data);
      }
    });
  }, []);

  return (
    <div className={styles.storehouse}>
      <Header
        title={"XXX的小店"}
        leftOnClick={() => {
          history.push("/my");
        }}
      />
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
              <div className={styles.item} key={item.id}>
                <img src={item.thum} alt="" className={styles.thumbnail} />
                <div className={styles.content}>
                  <div className={styles.title}>{item.name}</div>

                  <div className={styles.cost}>$ {item.sell_price}</div>
                  <div className={styles.control}>
                    {/* <div className={styles.button}>
                      <img src={require("../../assets/img/up.svg")} alt="" />
                      Subir
                    </div>
                    <div className={styles.button}>
                      <img src={require("../../assets/img/down.svg")} alt="" />
                      Retirar
                    </div> */}
                    <div
                      className={styles.icon}
                      onClick={() => {
                        history.push("/storehouse/add", {
                          id: item.id,
                          thum: [item.thum],
                          img: item.imgs,
                          desc: item.desc,
                          name: item.name,
                          sellPrice: item.sell_price.toString(),
                        });
                      }}
                    >
                      <img src={require("../../assets/img/edit.svg")} alt="" />
                    </div>
                    <div
                      className={styles.icon}
                      onClick={() => {
                        Confirm.show(
                          "是否删除",
                          "是否删除？",
                          "好的",
                          "取消",
                          () => {
                            postGoodsDelete(item.id).then((res) => {
                              if (res) {
                                Notify.success(res.msg);
                                setList((list) => {
                                  return [
                                    ...list.filter(({ id }) => item.id === id),
                                  ];
                                });
                              }
                            });
                          },
                        );
                      }}
                    >
                      <img
                        src={require("../../assets/img/delete.svg")}
                        alt=""
                      />
                    </div>
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
