import { history } from "umi";
interface Props {
  /**
   * fb分享检测
   * 没有分享码的时候执行的函数
   * 默认是直接跳转到首页
   */
  normalCallBack?: () => void;
}
export default (props: Props): void => {
  const {
    normalCallBack = () => {
      history.push("/");
    },
  } = props;
  const global_shareInfo = localStorage.getItem("global_shareInfo");
  // 登陆成功后如果有分享信息的话就直接跳转到详情页面
  if (global_shareInfo) {
    // localStorage.removeItem('global_shareInfo')
    const parse_global_shareInfo = JSON.parse(global_shareInfo);
    history.push(
      `/goodsDetails?id=${parse_global_shareInfo.id}&shareCode=${parse_global_shareInfo.shareCode}&addCardShow=false`,
    );
  } else {
    normalCallBack();
  }
};
