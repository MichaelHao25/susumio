import styles from "./index.less";
import Header from "@/component/Header";

import React, { useEffect, useState } from "react";
import Tab from "./tab";
import Upload from "@/component/Upload";
import { postApiGoodsSave, postApiGoodsUpdate } from "@/services/api";
import { Confirm, Notify } from "notiflix";
import { ConnectProps, UserinfoState } from "@/.umi/plugin-dva/connect";
import { history, useSelector } from "umi";
import Quill from "quill";
import { useRef } from "react";
import "quill/dist/quill.snow.css";

interface Props
  extends ConnectProps<
    {},
    {
      id: number;
      thum: [string];
      img: string[];
      desc: string;
      name: string;
      sellPrice: string;
    },
    {}
  > {}
export default (props: Props) => {
  const refEditorElement = useRef<HTMLDivElement>(null);
  const refQuillHandler = useRef<any>(null);
  const [id, setId] = useState<number>();
  const [thum, setThum] = useState<string[]>([]);
  const [img, setImg] = useState<string[]>([]);
  const [desc, setDesc] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [sellPrice, setSellPrice] = useState<string>("");
  const { user } = useSelector(({ userinfo }: { userinfo: UserinfoState }) => {
    return userinfo;
  });
  useEffect(() => {
    if (props.location.state) {
      const { id, thum, img, desc, name, sellPrice } = props.location.state;
      setId(id);
      setThum(thum);
      setImg(img);
      setDesc(desc);
      setName(name);
      setSellPrice(sellPrice);
    }
  }, [props.location.state]);
  useEffect(() => {
    if (refEditorElement.current) {
      refQuillHandler.current = new Quill(refEditorElement.current, {
        debug: "info",
        modules: {
          toolbar: [
            [
              { font: [] },
              { header: [1, 2, 3, 4, 5, 6, false] },
              { align: [] },
              "clean",
            ],
            [
              "bold",
              "italic",
              "underline",
              "strike",
              "link",
              "blockquote",
              "image",
              "video",
              { list: "ordered" },
              { list: "bullet" },
              "code-block",
            ],
            [{ script: "sub" }, { script: "super" }], // superscript/subscript
            [{ indent: "-1" }, { indent: "+1" }], // outdent/indent

            [{ color: [] }, { background: [] }], // dropdown with defaults from theme
            [{ direction: "rtl" }], // text direction
          ],
          history: {
            delay: 2000,
            maxStack: 500,
            userOnly: true,
          },
        },
        placeholder: "Por favor ingrese una descripción del artículo",
        readOnly: false,
        theme: "snow",
      });
    }
  }, [refEditorElement]);
  useEffect(() => {
    if (refQuillHandler.current && desc) {
      try {
        const json = JSON.parse(desc);
        refQuillHandler.current.setContents(json);
      } catch (error) {
        refQuillHandler.current.setText(desc);
      }
    }
  }, [desc, refQuillHandler]);
  //   name  名称
  // sell_price 价格
  // thum 封面图
  // img 多图
  // desc 描述
  const handleSubmit = () => {
    if (
      thum.length === 1 &&
      img.length >= 1 &&
      name !== "" &&
      sellPrice !== ""
    ) {
      const desc = JSON.stringify(refQuillHandler.current.getContents());
      if (id) {
        postApiGoodsUpdate({
          id,
          thum,
          img,
          desc,
          shoperId: user.id,
          name,
          sellPrice,
        }).then((res) => {
          console.log(res);
          if (res) {
            Notify.success(res.msg);
            setThum([]);
            setImg([]);
            setDesc("");
            setName("");
            setSellPrice("");
            history.goBack();
          }
        });
      } else {
        postApiGoodsSave({
          thum,
          img,
          desc,
          shoperId: user.id,
          name,
          sellPrice,
        }).then((res) => {
          console.log(res);
          if (res) {
            Notify.success(res.msg);
            setThum([]);
            setImg([]);
            setDesc("");
            setName("");
            setSellPrice("");
            history.goBack();
          }
        });
      }
    } else {
      Notify.failure("请完整填写");
    }
  };
  return (
    <div className={styles.storehouse}>
      <Header title={"Subir producto"} />

      <div className={styles.add_container}>
        <div className={styles.img_title}>Portada</div>
        <div className={styles.img_list}>
          {thum.map((item, index) => {
            return (
              <div
                className={styles.img}
                onClick={() => {
                  Confirm.show(
                    "删除图片",
                    "确定是否删除图片？",
                    "删除",
                    "取消",
                    () => {
                      setThum([]);
                    },
                  );
                }}
                key={index}
              >
                <img src={item} alt="" />
              </div>
            );
          })}
          {thum.length >= 1 ? (
            ""
          ) : (
            <Upload
              uploadSuccessCallback={(res) => {
                setThum(() => {
                  return [res.host_file_path];
                });
              }}
            >
              <div className={`${styles.img} ${styles.add}`}>
                <div className={styles.text}>+ Añadir imagen del artículo</div>
              </div>
            </Upload>
          )}
        </div>
        <div className={styles.img_title}>Fotos</div>
        <div className={styles.img_list}>
          {img.map((item, index) => {
            return (
              <div
                className={styles.img}
                key={index}
                onClick={() => {
                  Confirm.show(
                    "删除图片",
                    "确定是否删除图片？",
                    "删除",
                    "取消",
                    () => {
                      setImg((img) => {
                        img.splice(index, 1);
                        return [...img];
                      });
                    },
                  );
                }}
              >
                <img src={item} alt="" />
              </div>
            );
          })}

          <Upload
            uploadSuccessCallback={(res) => {
              setImg((imgs) => {
                return [...imgs, res.host_file_path];
              });
            }}
          >
            <div className={`${styles.img} ${styles.add}`}>
              <div className={styles.text}>+ Añadir imagen del artículo</div>
            </div>
          </Upload>
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
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
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
            type="number"
            className={styles.text}
            placeholder={"Por favor precio"}
            value={sellPrice}
            onChange={(e) => {
              setSellPrice(e.target.value);
            }}
          />
          <div className={styles.title}>
            <img
              src={require("../../assets/img/de.svg")}
              alt=""
              className={styles.w24}
            />{" "}
            Descripción de mercancías
          </div>

          <div
            className={styles.textarea}
            ref={refEditorElement}
            // style={{
            //   borderColor:
            //     desc.length > 200 ? "rgba(229 ,28 ,111 , .16)" : "none",
            // }}
          >
            {/* <textarea
              placeholder={"Por favor ingrese una descripción del artículo"}
              value={desc}
              onChange={(e) => {
                setDesc(e.target.value);
              }}
            />
            <div className={styles.text}>{desc.length}/200</div> */}
          </div>
          <div className={styles.button} onClick={handleSubmit}>
            Guardar
          </div>
        </div>
      </div>

      {/* <div style={{ height: "3.5rem" }} />
      <Tab /> */}
    </div>
  );
};
