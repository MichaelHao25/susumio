import Upload from "@/component/Upload";
import { IForumPublishParams, postForumPublish } from "@/services/api";
import { Confirm, Notify } from "notiflix";
import Quill from "quill";
import { useEffect, useRef, useState } from "react";
import styles from "./index.less";

export default () => {
  const refEditorElement = useRef<HTMLDivElement>(null);
  const refQuillHandler = useRef<Quill>(null);
  const refUpload = useRef<() => void>(null);
  const [requestBody, setRequestBody] = useState<IForumPublishParams>({
    title: "",
    content: "",
    thums: [],
  });
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
      Notify.failure("请输入标题");
      return;
    }
    if (thums.length < 1) {
      Notify.failure("请至少上传一张图片");
      return;
    }
    postForumPublish({
      thums,
      title,
      content,
    }).then((res) => {
      Notify.success(res.msg);
      history.back();
    });
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
        placeholder="添加标题会有更多赞哦~"
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
          发布笔记
        </span>
      </div>
    </div>
  );
};
