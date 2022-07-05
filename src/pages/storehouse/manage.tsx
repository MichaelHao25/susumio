import Header from "@/component/Header";
import styles from "./index.less";

import MoneyValueUnitRender from "@/component/MoneyValueUnitRender";
import { postApiGoodsGoodsLists, postGoodsDelete } from "@/services/api";
import { Details } from "@/services/interface";
import { Confirm, Notify } from "notiflix";
import { useEffect, useState } from "react";
import { history, UserinfoState, useSelector } from "umi";
import Tab from "./tab";

export default () => {
  const [list, setList] = useState<Details[]>([]);
  const { user } = useSelector(({ userinfo }: { userinfo: UserinfoState }) => {
    return userinfo;
  });
  useEffect(() => {
    if (user.id) {
      postApiGoodsGoodsLists({
        shoperId: user.id,
        pageLimit: 100,
        pageNum: 1,
      }).then((res) => {
        if (res) {
          setList(res.data);
        }
      });
    }
  }, [user]);

  return (
    <div className={styles.storehouse}>
      <Header
        title={`Tienda de MIO+${user.id}`}
        leftOnClick={() => {
          history.push("/my");
        }}
      />
      <div className={styles.list}>
        <div className={styles.left}>
          <div className={`${styles.item} ${styles.active}`}>Top</div>
        </div>
        <div className={styles.right}>
          <div className={styles.right_title}>
            <span>Popularidad Top</span>
          </div>
          {list.length === 0 && (
            <div
              className="aui-col-xs-12 aui-text-center"
              style={{ marginTop: "10%" }}
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
          )}
          {list.map((item) => {
            return (
              <div className={styles.item} key={item.id}>
                <img src={item.thum} alt="" className={styles.thumbnail} />
                <div className={styles.content}>
                  <div className={styles.title}>{item.name}</div>

                  <div className={styles.cost}>
                    <MoneyValueUnitRender>
                      {item.sell_price}
                    </MoneyValueUnitRender>
                  </div>
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
                          minimum: item.minimum,
                        });
                      }}
                    >
                      <img src={require("../../assets/img/edit.svg")} alt="" />
                    </div>
                    <div
                      className={styles.icon}
                      onClick={() => {
                        Confirm.show(
                          "Cancel",
                          "Quieres cancelarlo？",
                          "Ok",
                          "No",
                          () => {
                            postGoodsDelete(item.id).then((res) => {
                              if (res) {
                                Notify.success(res.msg);
                                setList((list) => {
                                  return [
                                    ...list.filter(({ id }) => item.id !== id),
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
