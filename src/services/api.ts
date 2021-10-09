import { request } from './core';
import { RequestOptionsInit } from 'umi-request';

/**
 * 获取购物车
 */
export const postCartsLists = () => {
  return request.post(`/api_goods/carts/lists`);
};
export interface PostLoginAsEmail {
  email: string;
  password: string;
}

/**
 * 使用邮箱注册
 */
export const postLoginAsEmail = (data: PostLoginAsEmail) => {
  return request.post(`/api_users/user_accounts/login_email`, {
    data,
  });
};

export interface PostRegisterAsEmail {
  email: string;
  password: string;
}

/**
 * 使用邮箱注册
 */
export const postRegisterAsEmail = (data: PostRegisterAsEmail) => {
  return request.post(`/api_users/user_accounts/register_email`, {
    data,
  });
};

export interface PostUserAccountsRegister {
  mobile: string;
  password: string;
}

/**
 * 使用手机号注册
 */
export const postUserAccountsRegister = (data: PostUserAccountsRegister) => {
  return request.post(`/api_users/user_accounts/register`, {
    data,
  });
};
interface PostPayssionPay {
  order_no: string;
  pm_id: string;
}
/**
 * paypal支付
 */
export const postPayssionPay = (data: PostPayssionPay) => {
  return request.post(`/api_payssion/payssion/pay`, {
    data,
  });
};

interface PostPayPaypal {
  order_no: string;
}
/**
 * paypal支付
 */
export const postPayPaypal = (data: PostPayPaypal) => {
  return request.post(`/api_orders/pay/paypal`, {
    data,
  });
};
interface PayMoney {
  order_no: string;
  pay_password: string;
}
/**
 * 用余额支付
 */
export const postPayMoney = (data: PayMoney) => {
  return request.post(`/api_orders/pay/money`, {
    data,
  });
};

export interface PostQuerySave {
  address_id: number;
  goods_info: { goods_id: number; num: number; spec_group_id_str: string }[];
  /*优惠相关*/
  market_activity_type: number;
  /*优惠相关*/
  market_activity_id: number;
  memo: string;
}

/**
 * 校验订单金额和物品的
 */
export const postQuerySave = (data: PostQuerySave) => {
  return request.post(`/api_orders/orders/save`, {
    data,
  });
};

export interface PostQueryMarketUser {
  money: number;
  goods_ids: number[];
}

/**
 * 校验订单金额和物品的
 */
export const postQueryMarketUser = (data: PostQueryMarketUser) => {
  return request.post(`/api_query/market/user`, {
    data,
  });
};

export interface PostOrdersView {
  address_id: number;
  goods_info: {
    goods_id: number;
    num: number;
    spec_group_id_str: string;
  }[];
}

/**
 * 查询订单金额
 */
export const postOrdersView = (data: PostOrdersView) => {
  return request.post(`/api_orders/orders/view`, {
    data,
  });
};
/**
 * 查询默认地址
 */
export const postQueryUsersDefaultAddress = () => {
  return request.post(`/api_query/users/default_address`);
};
/**
 * 获取用户对等级和余额
 */
export const postDrpDbStatus = () => {
  return request.post(`/api_query/systems/info`);
};
/**
 * 获取用户对等级和余额
 */
export const postUsersAsset = () => {
  return request.post(`/api_query/users/asset`);
};

/**
 * 查询是否设置了支付密码
 */
export const postQueryPayPassword = () => {
  return request.post(`/api_query/users/is_set_pay_password`);
};

/**
 * 加载用户信息
 */
export const postUsersInfoRead = (id: string) => {
  return request.post(`/api_users/users/read`, {
    data: {
      id,
    },
  });
};

/**
 * 加载订单数量
 */
export const postQueryOrdersCount = () => {
  return request.post(`/api_query/orders/count`);
};

export interface CartInfo {
  goods_id: number;
  spec_group_id_str: string;
  num: number;
}

interface PostApiGoodsCartsBatchSave {
  cart_info: CartInfo[];
}

/**
 * 批量添加购物车
 */
export const postApiGoodsCartsBatchSave = (
  data: PostApiGoodsCartsBatchSave,
) => {
  const { cart_info } = data;
  return request.post(`/api_goods/carts/batch_save`, {
    data: {
      cart_info,
    },
  });
};

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
