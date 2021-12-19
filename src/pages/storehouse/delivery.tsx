import React, { useEffect, useRef, useState } from "react";
import Quill from "quill";
import styles from "@/pages/storehouse/index.less";
import Header from "@/component/Header";
import Upload from "@/component/Upload";
import Notiflix, { Confirm, Notify } from "notiflix";
import { ConnectProps, history } from "umi";
import { postDelivery } from "@/services/api";

export default (
  props: ConnectProps<
    Record<string, never>,
    Record<string, never>,
    { id: string }
  >,
) => {
  const refEditorElement = useRef<HTMLDivElement>(null);
  const refQuillHandler = useRef<Quill>(null);
  const refUpload = useRef<() => void>(null);

  useEffect(() => {
    const id = props.location.query?.id;
    if (!id) {
      Notiflix.Report.failure("发货失败", "必要参数缺失", "好的", () => {
        history.goBack();
      });
    }
  }, []);
  useEffect(() => {
    if (refEditorElement.current) {
      if (!refQuillHandler.current) {
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
      }
    }
  }, [refEditorElement]);

  const handleSubmit = () => {
    const desc: string = refQuillHandler.current?.root.innerHTML || "";
    // desc = desc.replace(/<a.*?>(.*?)<\/a>/g, "$1");
    // const links = desc.match(/www\..*?(?=(<|"))/g);
    // if (links) {
    //   const linkSet = new Set(links);
    //   for (const link of linkSet) {
    //     if (!window.location.href.includes(link)) {
    //       const aTag = `<a href="https://${link}" rel="noopener noreferrer" target="_blank">${link}</a>`;
    //       const regx = new RegExp(link, "g");
    //       desc = desc.replace(regx, aTag);
    //     }
    //   }
    // }

    postDelivery({
      order_id: parseInt(props.location.query.id, 10),
      content: desc,
      is_open_eorder: 0,
      express_type: "",
      express_no: "",
    }).then((res) => {
      console.log(res);
      Notiflix.Report.success("", res.msg, "ok", () => {
        history.goBack();
      });
    });
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

      <div className={styles.content}>
        <div
          className={styles.textarea}
          style={{ height: "500px" }}
          ref={refEditorElement}
        />
        <div className={styles.button} onClick={handleSubmit}>
          Delivery
        </div>
      </div>
    </div>
  );
};
