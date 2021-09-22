import { request } from './core';
import { RequestOptionsInit } from 'umi-request';

interface PostApiGoodsCartsSave {
  id: number;
  specGroupIdStr: number;
  num: number;
  status: number;
}

/**
 * 查询是否被收藏
 */
export const postApiGoodsCartsSave = (data: PostApiGoodsCartsSave) => {
  const { id, specGroupIdStr, num, status } = data;
  return request.post(`/api_goods/carts/save`, {
    data: {
      goods_id: id,
      spec_group_id_str: specGroupIdStr,
      num,
      status,
    },
  });
};

/**
 * 查询是否被收藏
 */
export const postApiGoodsGoodsIsCollect = (data: PostApiGoodsGoodsRead) => {
  const { id } = data;
  return request.post(`/api_query/goods/is_collect`, {
    data: {
      goods_id: id,
    },
  });
};

/**
 * 取消收藏
 */
export const postApiGoodsGoodsCollectionsCancel = (
  data: PostApiGoodsGoodsRead,
) => {
  const { id } = data;
  return request.post(`/api_goods/goods_collections/cancel`, {
    data: {
      goods_id: id,
    },
  });
};
/**
 * 添加收藏
 */
export const postApiGoodsGoodsCollectionsSave = (
  data: PostApiGoodsGoodsRead,
) => {
  const { id } = data;
  return request.post(`/api_goods/goods_collections/save`, {
    data: {
      goods_id: id,
    },
  });
};

interface CustomHeader extends RequestOptionsInit {
  headers: {
    'page-limit': string;
    'page-num': string;
  };
}

//
interface PostApiGoodsGoodsRead {
  id: string;
}

/**
 * 根据id查询商品评论
 */
export const postApiGoodsGoodsComments = (data: PostApiGoodsGoodsRead) => {
  const { id } = data;
  const req: CustomHeader = {
    headers: {
      'page-limit': '100',
      'page-num': '1',
    },
    data: {
      goods_id: id,
    },
  };
  return request.post(`/api_query/goods/comments`, req);
};

interface PostApiGoodsGoodsRead {
  id: string;
}

/**
 * 根据id查询商品详情
 */
export const postApiGoodsGoodsRead = (data: PostApiGoodsGoodsRead) => {
  const { id } = data;
  return request.post(`/api_goods/goods/read`, {
    data: {
      id,
    },
  });
};

interface PostApiUsersUserAccountsLogin {
  mobile: string;
  password: string;
}

/**
 * 根据他的id进行切换调用列表接口查询
 */
export const postApiUsersUserAccountsLogin = (
  data: PostApiUsersUserAccountsLogin,
) => {
  const { mobile, password } = data;
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

export interface ListRequest {
  pageLimit: number;
  pageNum: number;
  customTag?: string;
  id?: string;
}

/**
 * 列表接口可以使用标签查询和id查询
 * @param data
 */
export const postApiGoodsGoodsLists = (data: ListRequest) => {
  const { pageLimit = 10, pageNum = 1, customTag = '', id = '' } = data;

  const res: CustomHeader = {
    headers: {
      'page-limit': pageLimit.toString(),
      'page-num': pageNum.toString(),
    },
    data: {
      custom_tag: customTag,
      goods_cate_id: id,
    },
  };
  return request.post(`/api_goods/goods/lists`, res);
};
