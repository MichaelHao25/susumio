import {
  postForumCommentAdd,
  postForumCommentDetails,
  postForumDetails,
} from "@/services/api";
import { useEffect, useState } from "react";
import { ConnectProps, UserinfoState, useSelector } from "umi";
import { Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react.js";
import styles from "./index.less";
import LazyLoad from "react-lazyload";
import { IPostForumComment, IPostForumList } from "@/services/interface";
import "swiper/swiper.less";
import "swiper/modules/pagination/pagination.less";
import "swiper/modules/autoplay/autoplay.less";
import moment from "moment";

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

  const [details, setDetails] = useState<IPostForumList>();
  const [commentList, setCommentList] = useState<IPostForumComment[]>([]);
  const [newComment, setNewComment] = useState<string>("");
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
    postForumCommentAdd({
      id: parseInt(id),
      content: newComment,
    }).then(() => {
      handleFetchComment();
      setNewComment("");
    });
    // }
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
        <div className={styles.userInfo}>
          <img
            src={details?.user.avatar || require("@/assets/img/logo2.png")}
            alt=""
            className={styles.pic}
          />
          <div className={styles.div}>
            <div className={styles.name}>Christmas</div>
            {/* <div className={styles.address}>
              <span className={`iconFontForum`}>&#xe652;</span>
              万科松花湖度假村
            </div> */}
          </div>
        </div>
      </div>
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
        <div className={`${styles.total}`}>共{commentList.length}条评论</div>
        {user.id !== 0 && (
          <div className={`${styles.add}`}>
            <img
              src={user.avatar || require("@/assets/img/logo2.png")}
              alt=""
              className={`${styles.img}`}
            />
            <div className={styles.inputInfo}>
              <div className={styles.inputContainer}>
                <textarea
                  className={`${styles.input}`}
                  placeholder="爱评论的人运气都不会差"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  // onKeyPress={handleComment}
                />
              </div>
              <div className={styles.btn} onClick={handleComment}>
                提交
              </div>
            </div>
          </div>
        )}
        <div className={`${styles.list}`}>
          {commentList.map((item) => {
            const {
              id,
              content,
              create_time,
              user: {
                avatar = "https://api.susumio.com/public/upload/goods_images/20220211/a0430b5edfacca65df05f752851d245d.jpg",
                nick_name = "",
              } = {},
            } = item;
            return (
              <div key={id} className={`${styles.row}`}>
                <div className={`${styles.imgContainer}`}>
                  <img src={avatar} alt="" className={`${styles.img}`} />
                </div>
                <div className={`${styles.commentContainer}`}>
                  <div className={`${styles.name}`}>
                    {nick_name}
                    {/* <span className={styles.author}>作者</span> */}
                  </div>
                  <div className={`${styles.comment}`}>
                    {content}
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
