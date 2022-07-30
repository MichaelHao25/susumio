import { AllList } from "@/services/interface";
import sha256 from "crypto-js/sha256";
export interface IGenerateKeyPostApiGoodsGoodsLists {
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

export interface IGenerateKeyPostForumList {
  sort_by?: string;
  sort_type?: string;
  keyword?: string;
}
export interface IGenerateKeyPostApplyList {
  status: number;
}
interface IProps<T, P> {
  /**
   * type
   */
  type: T;
  params: P;
}
export default (
  props:
    | IProps<AllList.postApiGoodsGoodsLists, IGenerateKeyPostApiGoodsGoodsLists>
    | IProps<AllList.postForumList, IGenerateKeyPostForumList>
    | IProps<AllList.postForumListFromMy, IGenerateKeyPostForumList>
    | IProps<AllList.postApplyList, IGenerateKeyPostApplyList>,
): string => {
  const { type } = props;
  if (type === AllList.postApiGoodsGoodsLists) {
    const {
      params: {
        customTag = "",
        shoperId = "",
        id = "",
        keyword = "",
        customTagId = "",
      } = {},
    } = props;
    return sha256(
      `customTag_${customTag}id_${id}keyword_${keyword}shoperId_${shoperId}customTagId_${customTagId}`,
    ).toString();
  }
  if (type === AllList.postApplyList) {
    const {
      params: { status },
    } = props;
    return sha256(`status_${status}`).toString();
  }

  if ([AllList.postForumList, AllList.postForumListFromMy].includes(type)) {
    const { params: { sort_by = "", sort_type = "", keyword = "" } = {} } =
      props;
    return sha256(
      `sort_by_${sort_by}sort_type_${sort_type}keyword_${keyword}`,
    ).toString();
  }
  return "";
};
