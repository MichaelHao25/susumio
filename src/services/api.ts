import { request } from './core';
import { ListRequest, Details } from '@/services/interface';

/**
 * 根据他的id进行切换调用列表接口查询
 */
export const postApiUsersUserAccountsLogin = ({
  mobile,
  password,
}: {
  mobile: string;
  password: string;
}) => {
  return request.post(`/api_users/user_accounts/login`, {
    data: {
      mobile,
      password,
    },
  });
};

/**
 * 根据他的id进行切换调用列表接口查询
 */
export const getApiGoodsGoodsCatesListsTree = () => {
  return request.get(`/api_goods/goods_cates/lists_tree`);
};

/**
 * 列表接口可以使用标签查询和id查询
 * @param data
 */
export const postApiGoodsGoodsLists = (data: ListRequest) => {
  const { pageLimit = 10, pageNum = 1, customTag = '', id = '' } = data;
  const res = {
    headers: {
      'page-limit': pageLimit,
      'page-num': pageNum,
    },
    data: {
      custom_tag: customTag,
      goods_cate_id: id,
    },
  };
  // @ts-ignore
  return request.post(`/api_goods/goods/lists`, res);
};
