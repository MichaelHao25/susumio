import Header from "@/component/Header";
import styles from "./index.less";

import React, { useEffect, useState } from "react";
import Tab from "@/component/Tab";

export default () => {
  return (
    <div className={styles.storehouse}>
      <Header title={"添加商品"} />

      <div className={styles.add_container}>
        <div className={styles.img_list}>
          <div className={styles.img}>
            <img
              src="https://www.177pinche.com/public/upload/article_images/20210527/d68369529cf278c20117f0d5f86b5709.png"
              alt=""
            />
          </div>
          <div className={styles.img}>
            <img
              src="https://www.177pinche.com/public/upload/article_images/20210527/d68369529cf278c20117f0d5f86b5709.png"
              alt=""
            />
          </div>
          <div className={styles.img}>
            <img
              src="https://www.177pinche.com/public/upload/article_images/20210527/d68369529cf278c20117f0d5f86b5709.png"
              alt=""
            />
          </div>
          <div className={`${styles.img} ${styles.add}`}>
            <div className={styles.text}>+ Añadir imagen del artículo</div>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.title}>
            <img
              src={require("../../assets/img/product.svg")}
              alt=""
              className={styles.w24}
            />{" "}
            Título del producto
          </div>
          <input
            type="text"
            className={styles.text}
            placeholder={"Por favor introduzca un título"}
          />
          <div className={styles.title}>
            <img
              src={require("../../assets/img/price.png")}
              alt=""
              className={styles.w24}
            />{" "}
            Precio
          </div>

          <input
            type="text"
            className={styles.text}
            placeholder={"Por favor precio"}
          />
          <div className={styles.title}>
            <img
              src={require("../../assets/img/de.svg")}
              alt=""
              className={styles.w24}
            />{" "}
            Descripción de mercancías
          </div>

          <div className={styles.textarea}>
            <textarea
              placeholder={"Por favor ingrese una descripción del artículo"}
            />
            <div className={styles.text}>1/200</div>
          </div>
          <div className={styles.button}>Guardar</div>
        </div>
      </div>

      <div style={{ height: "2.5rem" }} />
      <Tab />
    </div>
  );
};
