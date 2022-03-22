import {
  postForumCommentAdd,
  postForumCommentDetails,
  postForumDetails,
  postForumItemDeleteComment,
} from "@/services/api";
import { useEffect, useRef, useState } from "react";
import { ConnectProps, UserinfoState, useSelector, history } from "umi";
import { Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react.js";
import styles from "./index.less";
import LazyLoad from "react-lazyload";
import { IPostForumComment, IPostForumList } from "@/services/interface";
import "swiper/swiper.less";
import "swiper/modules/pagination/pagination.less";
import "swiper/modules/autoplay/autoplay.less";
import moment from "moment";
import Upload from "@/component/Upload";
import Quill from "quill";
import { Confirm, Notify } from "notiflix";
import useAuth, { LoginStatusQuery } from "@/hooks/useAuth";

const Clipboard = Quill.import("modules/clipboard");
const Delta = Quill.import("delta");

interface IProps
  extends ConnectProps<
    {},
    {},
    {
      id: string;
    }
  > {}
{
}
export default (props: IProps) => {
  const {
    location: {
      query: { id },
    },
  } = props;
  const { user } = useSelector(({ userinfo }: { userinfo: UserinfoState }) => {
    return userinfo;
  });
  const refEditorElement = useRef<HTMLDivElement>(null);
  const refQuillHandler = useRef<Quill>(null);
  const refUpload = useRef<() => void>(null);
  const [details, setDetails] = useState<IPostForumList>();
  const [commentList, setCommentList] = useState<IPostForumComment[]>([]);
  const [newComment, setNewComment] = useState<string>("");
  const { isLogin } = useAuth();
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
              this.container.innerHTML = "";
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
            toolbar: [],
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
    // return () => {
    //   if (refQuillHandler.current) {
    //     refQuillHandler.current. .destroy();
    //   }
    // }
  }, [refEditorElement]);
  useEffect(() => {
    postForumDetails({ id: parseInt(id) }).then((res) => {
      setDetails(res.data);
    });
    handleFetchComment();
  }, [id]);
  const handleFetchComment = () => {
    postForumCommentDetails({ id: parseInt(id) }).then((res) => {
      setCommentList(res.data);
    });
  };
  const handleComment: React.MouseEventHandler<HTMLDivElement> = (e) => {
    // if (e.key === "Enter") {
    if (isLogin !== LoginStatusQuery.isLogin) {
      history.push("/login");
      return;
    }
    if (refQuillHandler.current) {
      const content: string = refQuillHandler.current?.root.innerHTML || "";

      if (refQuillHandler.current.getText() !== "\n") {
        postForumCommentAdd({
          id: parseInt(id),
          content,
        }).then(() => {
          handleFetchComment();
          setNewComment("");
          if (refQuillHandler.current) {
            refQuillHandler.current.clipboard.dangerouslyPasteHTML("");
          }
        });
      } else {
        Notify.failure("Dar un comentario es un placer");
      }
    }
    // }
  };
  const handleDeleteComment = (id: number) => {
    if (user.is_bbs) {
      Confirm.show(
        "Advertencia de eliminación",
        "Está confirmada la eliminación?",
        "Sí",
        "No",
        () => {
          postForumItemDeleteComment({
            id,
          }).then((res) => {
            Notify.success(res.msg);
            const tempList = commentList.filter((item) => item.id !== id);
            setCommentList(tempList);
          });
        },
      );
    }
  };
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div
          className={`${styles.back} iconFontForum`}
          onClick={() => {
            history.goBack();
          }}
        >
          &#xe84f;
        </div>
        <div className={styles.userInfo}>
          <img
            src={details?.user.avatar || require("@/assets/img/logo2.png")}
            alt=""
            className={styles.pic}
          />
          <div className={styles.div}>
            <div className={styles.name}>{details?.user.nick_name}</div>
            {/* <div className={styles.address}>
              <span className={`iconFontForum`}>&#xe652;</span>
              万科松花湖度假村
            </div> */}
          </div>
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
      <div className={styles.swiper}>
        <Swiper
          modules={[Pagination, Autoplay]}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop={true}
          pagination={{ clickable: true }}
        >
          {(details?.thums || []).map((src, index) => {
            return (
              <SwiperSlide key={index}>
                <LazyLoad once>
                  <img loading="lazy" src={src} alt="" />
                </LazyLoad>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
      <div
        className={styles.htmlContent}
        dangerouslySetInnerHTML={{ __html: details?.content || "" }}
      ></div>
      <div className={`${styles.evaluate}`}>
        <div className={`${styles.total}`}>
          Total （ {commentList.length}）comentarios
        </div>

        <div className={`${styles.add}`}>
          {/* <img
              src={user.avatar || require("@/assets/img/logo2.png")}
              alt=""
              className={`${styles.img}`}
            /> */}
          <div className={styles.inputInfo}>
            <div className={styles.inputContainer}>
              <div className={styles.textEditor} ref={refEditorElement}></div>
              {/* <textarea
                  className={`${styles.input}`}
                  placeholder="爱评论的人运气都不会差"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                // onKeyPress={handleComment}
                /> */}
            </div>
            <div className={styles.btn} onClick={handleComment}>
              Publicar
            </div>
          </div>
        </div>
        <div className={`${styles.list}`}>
          {commentList.map((item) => {
            const {
              id,
              content,
              create_time,
              user: {
                avatar = "https://api.susumio.com/public/upload/goods_images/20220211/a0430b5edfacca65df05f752851d245d.jpg",
                nick_name,
              } = {},
              user_id,
            } = item;
            return (
              <div
                key={id}
                className={`${styles.row}`}
                onClick={() => handleDeleteComment(item.id)}
              >
                <div className={`${styles.imgContainer}`}>
                  <img src={avatar} alt="" className={`${styles.img}`} />
                </div>
                <div className={`${styles.commentContainer}`}>
                  <div className={`${styles.name}`}>
                    {nick_name ? nick_name : user_id}
                    {/* <span className={styles.author}>作者</span> */}
                  </div>
                  <div className={`${styles.comment}`}>
                    <span dangerouslySetInnerHTML={{ __html: content }}></span>
                    <span className={`${styles.time}`}>
                      {moment(create_time).format("MM-DD")}
                    </span>
                  </div>
                </div>
                {/* <div className={`${styles.like}`}>
                  <span className={`${styles.icon} iconFontForum`}>
                    &#xe601;
                  </span>
                  <span className={`${styles.num}`}>11</span>
                </div> */}
              </div>
            );
          })}

          {/* <div className={`${styles.row}`}>
            <div className={`${styles.imgContainer}`}>
              <img
                src="https://api.susumio.com/public/upload/goods_images/20220211/a0430b5edfacca65df05f752851d245d.jpg"
                alt=""
                className={`${styles.img}`}
              />
            </div>
            <div className={`${styles.commentContainer}`}>
              <div className={`${styles.name}`}>
                阿玉 <span className={styles.author}>作者</span>
              </div>
              <div className={`${styles.comment}`}>
                你好，我们是怎么去的？
                <span className={`${styles.time}`}>06-29</span>
              </div>
            </div>
            <div className={`${styles.like}`}>
              <span className={`${styles.icon} iconFontForum`}>&#xe601;</span>
              <span className={`${styles.num}`}>11</span>
            </div>
          </div>
          <div className={`${styles.row} ${styles.pl_20}`}>
            <div className={`${styles.imgContainer}`}>
              <img
                src="https://api.susumio.com/public/upload/goods_images/20220211/a0430b5edfacca65df05f752851d245d.jpg"
                alt=""
                className={`${styles.img}`}
              />
            </div>
            <div className={`${styles.commentContainer}`}>
              <div className={`${styles.name}`}>阿玉</div>
              <div className={`${styles.comment}`}>
                你好，我们是怎么去的？
                <span className={`${styles.time}`}>06-29</span>
                <div className={`${styles.openReplay}`}>展开一条回复</div>
              </div>
            </div>
            <div className={`${styles.like}`}>
              <span className={`${styles.icon} iconFontForum`}>&#xe601;</span>
              <span className={`${styles.num}`}>11</span>
            </div>
          </div>
          <div className={`${styles.row}`}>
            <div className={`${styles.imgContainer}`}>
              <img
                src="https://api.susumio.com/public/upload/goods_images/20220211/a0430b5edfacca65df05f752851d245d.jpg"
                alt=""
                className={`${styles.img}`}
              />
            </div>
            <div className={`${styles.commentContainer}`}>
              <div className={`${styles.name}`}>ayu</div>
              <div className={`${styles.comment}`}>
                ayu <span className={`${styles.time}`}>06-29</span>
              </div>
            </div>
            <div className={`${styles.like}`}>
              <span className={`${styles.icon} iconFontForum`}>&#xe601;</span>
              <span className={`${styles.num}`}>11</span>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};
