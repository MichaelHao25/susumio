import sha256 from "crypto-js/sha256";
interface IProps {
  /**
   * 自定义标签
   */
  customTag?: string;
  /**
   * 商品id
   */
  id?: string;
  /**
   * 搜索关键字
   */
  keyword?: string;
  /**
   * 店中店所有者id
   */
  shoperId?: string;
  /**
   * 自定义标签id
   * 暂时不知道是个啥
   */
  customTagId?: string;
}
export default (props: IProps = {}) => {
  const {
    customTag = "",
    shoperId = "",
    id = "",
    keyword = "",
    customTagId = "",
  } = props;
  return sha256(
    `customTag_${customTag}id_${id}keyword_${keyword}shoperId_${shoperId}customTagId_${customTagId}`,
  );
};
