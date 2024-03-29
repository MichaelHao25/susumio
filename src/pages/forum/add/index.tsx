import Upload from "@/component/Upload";
import {
  IForumPublishParams,
  postForumDetails,
  postForumPublish,
  postForumUpdate,
} from "@/services/api";
import { IPostForumDetailsResponse } from "@/services/interface";
import { Confirm, Notify } from "notiflix";
import Quill from "quill";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";

import { useEffect, useRef, useState } from "react";
import { ConnectProps } from "umi";
import styles from "./index.less";
const Clipboard = Quill.import("modules/clipboard");
const Delta = Quill.import("delta");

type IProps = ConnectProps<
  Record<string, string>,
  Record<string, string>,
  {
    id?: string;
  }
>;
const index = (props: IProps) => {
  const {
    location: {
      query: { id },
    },
  } = props;
  const refEditorElement = useRef<HTMLDivElement>(null);
  const refQuillHandler = useRef<Quill>(null);
  const refUpload = useRef<() => void>(null);
  const [requestBody, setRequestBody] = useState<IForumPublishParams>({
    title: "",
    content: "",
    thums: [],
  });
  useEffect(() => {
    if (id) {
      postForumDetails({ id: parseInt(id) }).then(
        (res: IPostForumDetailsResponse) => {
          const {
            data: { title, thums, content },
          } = res;
          setRequestBody({
            title,
            thums,
            content,
          });
          if (refQuillHandler.current) {
            refQuillHandler.current.clipboard.dangerouslyPasteHTML(content);
          }
        },
      );
    }
  }, [id]);
  // useEffect(() => {
  //   if (refQuillHandler.current) {
  //     if (requestBody.content !== "") {
  //       try {
  //         refQuillHandler.current.clipboard.dangerouslyPasteHTML(
  //           requestBody.content,
  //         );
  //       } catch (error) {
  //         refQuillHandler.current.setText(requestBody.content);
  //       }
  //     }
  //   }
  // }, [requestBody]);
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
          // debug: "info",
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
          placeholder:
            "Por favor, introduzca lo que desea especificar y si quiere puede copiar y pegar un enlace, por ejemplo link de página web 、WhatsApp...",
          theme: "snow",
        });
      }
    }
  }, [refEditorElement]);
  const updateRequestBody = (updateState: Partial<IForumPublishParams>) => {
    setRequestBody((state) => {
      return {
        ...state,
        ...updateState,
      };
    });
  };
  const handlePublish = () => {
    const content: string = refQuillHandler.current?.root.innerHTML || "";
    const { title, thums } = requestBody;
    if (!title) {
      Notify.failure("Introduzca el título");
      return;
    }
    if (thums.length < 1) {
      Notify.failure("Suba una imagen");
      return;
    }
    if (id) {
      postForumUpdate({
        thums,
        title,
        content,
        id,
      }).then((res) => {
        Notify.success(res.msg);
        history.back();
      });
    } else {
      postForumPublish({
        thums,
        title,
        content,
      }).then((res) => {
        Notify.success(res.msg);
        history.back();
      });
    }
  };
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div
          className={`${styles.back} iconFontForum`}
          onClick={() => {
            history.back();
          }}
        >
          &#xe84f;
        </div>
      </div>
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
      <div className={styles.imgList}>
        {requestBody.thums.map((item, index) => {
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
                    requestBody.thums.splice(index, 1);
                    updateRequestBody({
                      thums: requestBody.thums,
                    });
                  },
                );
              }}
              key={index}
            >
              <img src={item} alt="" className={styles.img} />
            </div>
          );
        })}
        <Upload
          uploadSuccessCallback={(res) => {
            requestBody.thums.push(res.host_file_path);
            updateRequestBody({
              thums: requestBody.thums,
            });
          }}
        >
          <div className={`${styles.add} iconFontForum`}>&#xe620;</div>
        </Upload>
      </div>
      <input
        type="text"
        placeholder="Escriba un buen título para obtener más elogios"
        className={styles.inputTitle}
        value={requestBody.title}
        onChange={(e) => {
          updateRequestBody({
            title: e.target.value,
          });
        }}
      />
      <div className={styles.textEditorContainer}>
        <div className={styles.textEditor} ref={refEditorElement}></div>
      </div>
      <div className={styles.footer}>
        <span className={styles.button} onClick={handlePublish}>
          publish now
        </span>
      </div>
    </div>
  );
};
index.wrappers = ["@/wrappers/auth"];
export default index;
