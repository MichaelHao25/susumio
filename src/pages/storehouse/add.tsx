import Header from "@/component/Header";
import styles from "./index.less";

import {
  ConnectProps,
  ListState,
  UserinfoState,
} from "@/.umi/plugin-dva/connect";
import MoneyValueUnitRender from "@/component/MoneyValueUnitRender";
import Upload from "@/component/Upload";
import { postApiGoodsSave, postApiGoodsUpdate } from "@/services/api";
import Notiflix, { Confirm, Notify } from "notiflix";
import Quill from "quill";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import { useEffect, useRef, useState } from "react";
import { history, useSelector } from "umi";
const Clipboard = Quill.import("modules/clipboard");
const Delta = Quill.import("delta");
type Props = ConnectProps<
  Record<string, string>,
  {
    id: number;
    thum: [string];
    img: string[];
    desc: string;
    name: string;
    sellPrice: string;
    minimum: string;
  },
  Record<string, string>
>;

export default (props: Props) => {
  const refEditorElement = useRef<HTMLDivElement>(null);
  const refQuillHandler = useRef<Quill>(null);
  const refUpload = useRef<() => void>(null);
  const [id, setId] = useState<number>();
  const [thum, setThum] = useState<string[]>([]);
  const [img, setImg] = useState<string[]>([]);
  const [desc, setDesc] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [minimum, setMinimum] = useState<string>("1");

  const [sellPrice, setSellPrice] = useState<string>("");
  const {
    userinfo: { user },
    postApiOrdersLists,
  } = useSelector(
    ({ userinfo, list }: { userinfo: UserinfoState; list: ListState }) => {
      return {
        userinfo,
        postApiOrdersLists: list.postApiOrdersLists,
      };
    },
  );
  useEffect(() => {
    if ((postApiOrdersLists || []).length >= 20) {
      Notiflix.Report.failure(
        "Falló la adición del producto",
        "No se puede añadir más artículos, sólo 20pcs como máximo. Síguelo después de eliminar algunos por favor.",
        "ok",
        () => {
          history.goBack();
        },
      );
    }
  }, [postApiOrdersLists]);
  useEffect(() => {
    if (props.location.state) {
      const { id, thum, img, desc, name, sellPrice, minimum } =
        props.location.state;
      setId(id);
      setThum(thum);
      setImg(img);
      setDesc(desc);
      setName(name);
      setSellPrice(sellPrice);
      setMinimum(minimum);
    }
  }, [props.location.state]);
  useEffect(() => {
    if (refEditorElement.current) {
      if (!refQuillHandler.current) {
        class PlainClipboard extends Clipboard {
          convert(html = null) {
            if (typeof html === "string") {
              this.container.innerHTML = html;
              const delta = super.convert();
              this.container.innerHTML = "";
              return delta;
            } else {
              const text = this.container.innerText;

              if (text) {
                try {
                  const html = text
                    .replace(/(http.*?)([ \n]|$)/gi, `<a href="$1">$1</a>$2`)
                    .replace(/\n/g, "<br/>");
                  this.container.innerHTML = html;
                  const delta = super.convert();
                  this.container.innerHTML = "";
                  return delta;
                } catch (error) {
                  console.log("非网址");
                }
              }
              return new Delta().insert(text);
            }
          }
        }

        Quill.register("modules/clipboard", PlainClipboard, true);
        // @ts-ignore
        refQuillHandler.current = new Quill(refEditorElement.current, {
          bounds: refEditorElement.current,
          //   debug: "info",
          modules: {
            toolbar: {
              container: [
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
                  /**
                   * 屏蔽link按钮
                   */
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
              handlers: {
                image(value: boolean) {
                  if (value) {
                    if (refUpload.current) {
                      refUpload.current();
                    }
                  } else {
                    if (refQuillHandler.current) {
                      refQuillHandler.current.format("image", false);
                    }
                  }
                },
              },
            },
            history: {
              delay: 2000,
              maxStack: 500,
              userOnly: true,
            },
          },
          placeholder: "Por favor ingrese una descripción del artículo--",
          //   readOnly: false,
          theme: "snow",
        });
        // refQuillHandler.current.on("text-change", (...props) => {
        //     const [, , source] = props;
        //     console.log("3333");
        //     if (source === "user") {
        //       console.log(refQuillHandler.current?.root.innerHTML || "")
        //       let html = refQuillHandler.current?.root.innerHTML || "";
        //       html = html.replace(/<a.*?>(.*?)<\/a>/g, "$1");
        //       const links = html.match(/www\..*?(?=(<|"))/g);
        //       if (links) {
        //         const linkSet = new Set(links);
        //         for (const link of linkSet) {
        //           const aTag = `<a href="${link}" rel="noopener noreferrer" target="_blank">${link}</a>`;
        //           const regx = new RegExp(link, "g");
        //           html = html.replace(regx, aTag);
        //         }
        //       }
        //       setDesc(html);
        //     }
        //   }
        // );
      }
    }
  }, [refEditorElement]);
  useEffect(() => {
    if (refQuillHandler.current && desc) {
      try {
        // const json = JSON.parse(desc);
        refQuillHandler.current.clipboard.dangerouslyPasteHTML(desc);
        // refQuillHandler.current.setContents(json);
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
      sellPrice !== "" &&
      minimum
    ) {
      const desc: string = refQuillHandler.current?.root.innerHTML || "";
      const money = MoneyValueUnitRender.getMoney(sellPrice);
      if (money.value === "0") {
        return;
      }
      // desc = desc.replace(/<a.*?>(.*?)<\/a>/g, "$1");
      // const links = desc.match(/www\..*?(?=(<|"))/g);
      // if (links) {
      //   const linkSet = new Set(links);
      //   for (const link of linkSet) {
      //     if (!link.includes("api.susumio.com")) {
      //       const aTag = `<a href="https://${link}" rel="noopener noreferrer" target="_blank">${link}</a>`;
      //       const regx = new RegExp(link, "g");
      //       desc = desc.replace(regx, aTag);
      //     }
      //   }
      // }
      if (id) {
        postApiGoodsUpdate({
          id,
          thum,
          img,
          desc,
          shoperId: user.id,
          name,
          sellPrice: money.value,
          minimum,
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
          sellPrice: money.value,
          minimum,
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
      Notify.failure("Información incompleta");
    }
  };
  return (
    <div className={styles.storehouse}>
      <Header title={"Subir producto"} />
      <Upload
        onUpload={refUpload}
        uploadSuccessCallback={(res) => {
          if (refQuillHandler.current) {
            // 获取光标所在位置
            const length = refQuillHandler.current.getSelection()?.index || 0;
            // 插入图片  res.info为服务器返回的图片地址
            refQuillHandler.current.insertEmbed(
              length,
              "image",
              res.host_file_path,
            );
            // 调整光标到最后
            refQuillHandler.current.setSelection(length + 1, 0);
          }
        }}
      />
      <div className={styles.add_container}>
        <div className={styles.img_title}>Portada</div>
        <div className={styles.img_list}>
          {thum.map((item, index) => {
            return (
              <div
                className={styles.img}
                onClick={() => {
                  Confirm.show(
                    "Cancel de imagen",
                    "Confirmas el cancel de imagen？",
                    "Sí",
                    "No",
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
                    "Cancel de imagen",
                    "Confirmas el cancel de imagen？",
                    "Sí",
                    "No",
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
            Precio <MoneyValueUnitRender />
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
              src={require("../../assets/img/price.png")}
              alt=""
              className={styles.w24}
            />{" "}
            Cantidad mínima
          </div>

          <input
            type="tel"
            className={styles.text}
            placeholder={minimum}
            value={minimum}
            onChange={(e) => {
              const minimum = e.target.value;
              setMinimum(minimum);
            }}
            onBlur={(e) => {
              const minimum = (e.target.value || "").replace(/\D/g, "");
              if (minimum) {
                setMinimum(minimum);
              } else {
                setMinimum("1");
              }
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
