import { UserinfoState, useSelector, history } from "umi";
import Tab from "../tab";
import styles from "./index.less";
const index = () => {
  const { user } = useSelector(({ userinfo }: { userinfo: UserinfoState }) => {
    return userinfo;
  });
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
      </div>
      <div className={styles.userInfo}>
        <img src={user.avatar} alt="" className={styles.pic} />
        <div className={styles.nikeName}>{user.nick_name}</div>
      </div>
      <ul className={styles.list}>
        <li
          onClick={() => {
            history.push("/forum?type=my");
          }}
        >
          <span>我发布的帖子</span>
          <span className="iconFontForum">&#xe65f;</span>
        </li>
      </ul>
      <div style={{ height: "2.5rem" }}></div>
      <Tab />
    </div>
  );
};

index.wrappers = ["@/wrappers/auth"];
export default index;
