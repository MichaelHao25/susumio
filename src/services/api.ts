import { request } from "./core";
import { RequestOptionsInit } from "umi-request";
import { AddressItem } from "@/services/interface";
import { CurrencyType } from "@/hooks/useCurrencyManage";

interface PostArticles {
  type: string;
  id: string;
}
/**
 * 获取文章详情
 * @returns
 */
export const postArticles = (props: PostArticles) => {
  const { type, id } = props;
  return request.post(`/api_articles/${type}/read`, {
    data: {
      id,
    },
  });
};
/**
 * fb登陆
 */
export const postFreightTemplate = () => {
  return request.post("/api_goods/freight_templates/lists");
};
interface ExchangeRate {
  amount?: number;
  from?: CurrencyType;
  to?: CurrencyType;
}
/**
 * 汇率调整
 */
export const postExchangeRate = (req: ExchangeRate) => {
  const mergeReq = {
    amount: 1,
    from: CurrencyType.USD,
    to: CurrencyType.EUR,
    ...req,
  };
  return request.post("/api_articles/banners/exchange_rate", {
    data: mergeReq,
  });
};
/**
 * fb登陆
 */
export const postFacebookLogin = (code: string) => {
  return request.post("/api_users/user_accounts/facebook_login", {
    data: { code },
  });
};
/**
 * fb登陆基础信息获取
 */
export const postFacebookLoginBaseInfoGet = () => {
  return request.post("/api_users/user_accounts/facebook");
};
/**
 * 从购物车添加收藏
 * @param id
 * @returns
 */
export const postCollectionsBatchDelete = (id: number[]) => {
  return request.post("/api_goods/goods_collections/batch_save", {
    data: {
      goods_ids: id,
    },
  });
};
/**
 * 从购物车删除商品
 */
export const postCartsBatchDelete = (id: number[]) => {
  return request.post("/api_goods/carts/batch_delete", {
    data: {
      id,
    },
  });
};
/**
 * 店中店发货
 */
export const postGoodsSend = (orderId: number) => {
  return request.post("/api_orders/sign_orders/shoper_sign", {
    data: {
      order_id: orderId,
    },
  });
};

/**
 * 店中店删除商品
 */
export const postGoodsDelete = (id: number) => {
  return request.post("/api_goods/goods/deletebyshoper", {
    data: {
      id,
    },
  });
};

interface PostApiGoodsSave {
  thum: string[];
  img: string[];
  desc: string;
  name: string;
  sellPrice: string;
  shoperId: number;
  id?: number;
}
/**
 * 店中店更新商品
 * @param data
 * @returns
 */
export const postApiGoodsUpdate = (data: PostApiGoodsSave) => {
  const { thum, img, desc, name, sellPrice, shoperId, id } = data;
  return request.post(`/api_goods/goods/update`, {
    data: {
      id,
      name: name,
      status: 1,
      goods_cate_id: 83,
      sell_price: sellPrice,
      shoper_id: shoperId,
      stock: "9999",
      weight: 0,
      sell_num: 0,
      minimum: 1,
      buy_get_score: 0,
      click_num: 0,
      collect_num: 0,
      sort: 0,
      free_shipping: true,
      is_top: false,
      is_virtual: true,
      shared: false,
      share_rate: "0",
      tags: [],
      tag_ids: [],
      thum: thum[0],
      imgs: img,
      thums: [],
      attr_info: [],
      spec_info: [],
      spec_group_info: [],
      freight_template_id: 0,
      desc: desc,
    },
  });
};

/**
 * 店中店添加商品
 */
export const postApiGoodsSave = (data: PostApiGoodsSave) => {
  const { thum, img, desc, name, sellPrice, shoperId } = data;
  return request.post(`/api_goods/goods/save`, {
    data: {
      name: name,
      status: 1,
      goods_cate_id: 83,
      sell_price: sellPrice,
      shoper_id: shoperId,
      stock: "9999",
      weight: 0,
      sell_num: 0,
      minimum: 1,
      buy_get_score: 0,
      click_num: 0,
      collect_num: 0,
      sort: 0,
      free_shipping: true,
      is_top: false,
      is_virtual: true,
      shared: false,
      share_rate: "0",
      tags: [],
      tag_ids: [],
      thum: thum[0],
      imgs: img,
      thums: [],
      attr_info: [],
      spec_info: [],
      spec_group_info: [],
      freight_template_id: 0,
      desc: desc,
    },
  });
};

export interface PostUploadFile {
  save_path: string;
  is_rename: 1;
  file: File;
}

/**
 * 上传文件
 */
export const postUploadFile = (req: PostUploadFile) => {
  const formData = new FormData();
  Object.entries(req).forEach(([key, value]) => {
    formData.append(key, value);
  });
  return request.post("/api_systems/helper/upload_file", {
    //   headers: {
    //     "content-type": "multipart/form-data;",
    //   },
    requestType: "form",
    data: formData,
  });
};
export interface PostOrdersList {
  status: number;
  pageLimit: number;
  pageNum: number;
}

/**
 * 热门关键词
 */
export const postOrdersList = (req: PostOrdersList) => {
  const { status, pageLimit, pageNum } = req;
  const data: {
    order_status?: number;
  } = {
    order_status: status,
  };
  if (status === 0) {
    delete data.order_status;
  }
  return request.post("/api_drp/drp_orders/lists", {
    headers: {
      "page-limit": pageLimit.toString(),
      "page-num": pageNum.toString(),
    },
    data,
  });
};
/**
 * 热门关键词
 */
export const postGoodsKeyword = () => {
  return request.post("/api_goods/goods_keywords/lists");
};

/**
 * 清楚用户搜索的关键词
 */
export const postUserKeywordDelete = () => {
  return request.post("/api_users/user_goods_keywords/delete");
};
/**
 * 获取用户搜过的关键词
 */
export const postUserKeyword = () => {
  return request.post("/api_users/user_goods_keywords/read");
};

/**
 * 获取bannerlist
 */
export const postBannerList = () => {
  return request.post("/api_articles/banners/lists", {
    data: {
      type_id: 11,
    },
  });
};
/**
 * 加载标签
 */
export const postGoodsTag = () => {
  return request.post("/api_goods/goods_tags/index");
};

/**
 * 获取分销登记
 */
export const postRuleIndex = () => {
  return request.post("/api_drp/rules/index");
};

export interface PostTeamUsers {
  pageLimit: number;
  pageNum: number;
  status: number;
}

/**
 * 我的下级1级2级3级
 */
export const postTeamUsers = (req: PostTeamUsers) => {
  const { pageLimit, pageNum, status } = req;
  return request.post("/api_drp/team/team_users", {
    headers: {
      "page-limit": pageLimit.toString(),
      "page-num": pageNum.toString(),
    },
    data: {
      team_type: status,
    },
  });
};

export interface PostTeamChildUsers {
  pageLimit: number;
  pageNum: number;
}

/**
 * 我的下级
 */
export const postTeamChildUsers = (req: PostTeamChildUsers) => {
  const { pageLimit, pageNum } = req;
  return request.post("/api_drp/team/child_users", {
    headers: {
      "page-limit": pageLimit.toString(),
      "page-num": pageNum.toString(),
    },
  });
};

export interface PostApplyList {
  status: number;
  pageLimit: number;
  pageNum: number;
}

/**
 * 分销相关接口
 */
export const postApplyList = (req: PostApplyList) => {
  const { status, pageLimit, pageNum } = req;
  return request.post("/api_drp/commission_applys/lists", {
    headers: {
      "page-limit": pageLimit.toString(),
      "page-num": pageNum.toString(),
    },
    data: {
      status,
    },
  });
};

export interface PostReturnGoods {
  order_id: number;
  order_goods_id: number;
  return_type: 1;
  return_reason: string;
  imgs: string[];
}

/**
 * 订单评价
 */
export const postReturnGoods = (req: PostReturnGoods) => {
  return request.post("/api_orders/return_goods/save", {
    data: req,
  });
};

export interface PostUpdatePasswordByEmail {
  type: number;
  email: string;
  code: string;
  password?: string;
  pay_password?: string;
}

/**
 * 通过邮件更新用户密码/支付密码
 */
export const postUpdatePasswordByEmail = (req: PostUpdatePasswordByEmail) => {
  const { type } = req;
  const url =
    type == 2
      ? "/api_users/user_accounts/reset_password_email"
      : "/api_users/user_accounts/reset_pay_password_email";
  return request.post(url, {
    data: req,
  });
};

export interface PostSendEmailCode {
  type: number;
  email: string;
}

/**
 * 更新用户密码/支付密码
 */
export const postSendEmailCode = (req: PostSendEmailCode) => {
  return request.post("/api_systems/helper/send_email_code", {
    data: req,
  });
};

export interface PostUpdatePassword {
  type: number;
  mobile: string;
  password?: string;
  password_confirm?: string;
  pay_password_confirm?: string;
  pay_password?: string;
}

/**
 * 更新用户密码/支付密码
 */
export const postUpdatePassword = (req: PostUpdatePassword) => {
  const { type } = req;
  const url =
    type === 1
      ? "/api_users/user_accounts/reset_password"
      : "/api_users/user_accounts/reset_pay_password";
  return request.post(url, {
    data: req,
  });
};

export interface PostUpdateMobile {
  old_mobile: string;
  new_mobile: string;
}

/**
 * 更新用户邮箱
 */
export const postUpdateMobile = (req: PostUpdateMobile) => {
  return request.post(`/api_users/user_accounts/change_mobile`, {
    data: req,
  });
};

export interface PostUpdateEmail {
  email: string;
}

/**
 * 更新用户邮箱
 */
export const postUpdateEmail = (req: PostUpdateEmail) => {
  return request.post(`/api_users/user_accounts/change_email`, {
    data: req,
  });
};

export interface PostUsersUpdate {
  nick_name?: string;
  avatar?: string;
}

/**
 * 更新用户信息
 */
export const postUsersUpdate = (req: PostUsersUpdate) => {
  return request.post(`/api_users/users/update`, {
    data: req,
  });
};

export interface PostCommissionApply {
  receipt_type: string;
  pay_password: string;
}

/**
 * 提现
 */
export const postCommissionApply = (req: PostCommissionApply) => {
  return request.post(`/api_drp/commission_applys/save`, {
    data: req,
  });
};
/**
 * 分销相关
 */
export const postRulesIndex = () => {
  return request.post(`/api_drp/rules/index`);
};
/**
 * 分销相关
 */
export const postCommissionInfo = () => {
  return request.post(`/api_query/drp/commission_info`);
};

/**
 * 分销首页基础信息获取
 */
export const postDistributorInfo = () => {
  return request.post(`/api_query/drp/distributor_info`);
};

export interface PostAssetLogsList {
  pageLimit: number;
  pageNum: number;
}

/**
 * 足迹功能
 */
export const postAssetLogsList = (req: PostAssetLogsList) => {
  const { pageLimit = 10, pageNum = 1 } = req;
  return request.post(`/api_users/user_asset_logs/lists`, {
    headers: {
      "page-limit": pageLimit.toString(),
      "page-num": pageNum.toString(),
    },
  });
};

export interface PostWithdraw {
  asset_type: "money";
  bank_card_id: 0;
  money: string;
  bank_name: string;
  bank_no: string;
  user_name: string;
  pay_password: string;
  type: "withdrawToBankCard";
}

/**
 * 提现
 */
export const postWithdraw = (req: PostWithdraw) => {
  return request.post(`/api_users/user_drawcashs/save`, {
    data: req,
  });
};

export interface PostRecharges {
  money: string;
  asset_type: "money";
  type: 1;
}

/**
 * 充值
 */
export const postRecharges = (req: PostRecharges) => {
  return request.post(`/api_users/user_recharges/save`, {
    data: req,
  });
};

export interface PostSetPayPasswordFirst {
  mobile: string;
  pay_password: string;
  pay_password_confirm: string;
}

/**
 * 第一次设置密码
 */
export const postSetPayPasswordFirst = (req: PostSetPayPasswordFirst) => {
  return request.post(`/api_users/user_accounts/reset_pay_password_first`, {
    data: req,
  });
};

export interface PostUserFootLists {
  pageLimit: number;
  pageNum: number;
}

/**
 * 足迹功能
 */
export const postUserFootLists = (req: PostUserFootLists) => {
  const { pageLimit = 10, pageNum = 1 } = req;
  return request.post(`/api_users/user_foot/lists`, {
    headers: {
      "page-limit": pageLimit.toString(),
      "page-num": pageNum.toString(),
    },
  });
};
/**
 * 删除收藏
 */
export const postCommentsDelete = (commentId: number) => {
  return request.post(`/api_goods/goods_comments/delete`, {
    data: {
      id: commentId,
    },
  });
};

export interface PostCommentsLists {
  pageLimit: number;
  pageNum: number;
}

/**
 * 获取评论列表
 */
export const postCommentsLists = (req: PostCommentsLists) => {
  const { pageLimit = 10, pageNum = 1 } = req;
  return request.post(`/api_goods/goods_comments/lists`, {
    headers: {
      "page-limit": pageLimit.toString(),
      "page-num": pageNum.toString(),
    },
  });
};

/**
 * 删除收藏
 */
export const postFavoriteDelete = (favoriteId: number) => {
  return request.post(`/api_goods/goods_collections/delete`, {
    data: {
      id: favoriteId,
    },
  });
};

export interface PostFavorite {
  pageLimit: number;
  pageNum: number;
}

/**
 * 获取收藏列表
 */
export const postFavorite = (req: PostFavorite) => {
  const { pageLimit = 10, pageNum = 1 } = req;
  return request.post(`/api_goods/goods_collections/lists`, {
    headers: {
      "page-limit": pageLimit.toString(),
      "page-num": pageNum.toString(),
    },
  });
};

/**
 * 获取版本信息等
 */
export const postGetParams = (type: string = "basic") => {
  return request.post(`/api_systems/Params/getParams`, {
    data: {
      type: type,
    },
  });
};
/**
 * 新建或者更新地址
 */
export const postAddressesCreate = (req: AddressItem) => {
  const url =
    req.id !== 0 ? `/api_users/addresses/update` : "/api_users/addresses/save";

  return request.post(url, {
    data: req,
  });
};

/**
 * 根据地址id查询地址
 */
export const postQueryAddressById = (addressId: number) => {
  return request.post(`/api_users/addresses/read`, {
    data: {
      id: addressId,
    },
  });
};

/**
 * 地区下拉获取
 */
export const postRegions = () => {
  return request.post(`/api_systems/regions/index`);
};

export interface PostAddressLists {
  pageLimit: number;
  pageNum: number;
}

/**
 * 获取地址列表
 */
export const postAddressLists = (req: PostAddressLists) => {
  const { pageLimit = 10, pageNum = 1 } = req;
  return request.post(`/api_users/addresses/lists`, {
    headers: {
      "page-limit": pageLimit.toString(),
      "page-num": pageNum.toString(),
    },
  });
};

export interface PostAddressDelete {
  addressId: number;
}

/**
 * 删除地址
 */
export const postAddressDelete = (req: PostAddressDelete) => {
  const { addressId } = req;
  return request.post(`/api_users/addresses/delete`, {
    data: {
      id: addressId,
    },
  });
};

export interface PostAddressSetDefault {
  addressId: number;
}

/**
 * 设置默认地址
 */
export const postAddressSetDefault = (req: PostAddressSetDefault) => {
  const { addressId } = req;
  return request.post(`/api_users/addresses/set_default`, {
    data: {
      is_default: 1,
      id: addressId,
    },
  });
};

export interface PostOrderCommentsSave {
  score: number;
  imgs: string[];
  goods_id: number;
  order_id: number;
  content: string;
  status: number;
}

/**
 * 确认收货
 */
export const postOrderCommentsSave = (req: PostOrderCommentsSave) => {
  return request.post(`/api_goods/goods_comments/save`, {
    data: req,
  });
};

export interface PostOrderFinish {
  order_id: number;
}

/**
 * 确认收货
 */
export const postOrderFinish = (req: PostOrderFinish) => {
  const { order_id } = req;
  return request.post(`/api_orders/sign_orders/user_sign`, {
    data: {
      order_id,
    },
  });
};

export interface PostTipDeliver {
  order_id: number;
}

/**
 * 提醒
 */
export const postTipDeliver = (req: PostTipDeliver) => {
  const { order_id } = req;
  return request.post(`/api_orders/tip_deliver/tip`, {
    data: {
      order_id,
    },
  });
};

export interface PostPayPrepay {
  order_id: number;
}

/**
 * 支付
 */
export const postPayPrepay = (req: PostPayPrepay) => {
  const { order_id } = req;
  return request.post(`/api_orders/pay/pre_pay`, {
    data: {
      order_id,
    },
  });
};

export interface PostCancelOrders {
  order_id: number;
  cancel_reason: string;
}

/**
 * 取消订单
 */
export const postCancelOrders = (req: PostCancelOrders) => {
  const { order_id, cancel_reason } = req;
  return request.post(`/api_orders/cancel_orders/user_cancel`, {
    data: {
      order_id,
      cancel_reason,
    },
  });
};
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
 * 使用邮箱登陆
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
  shareCode?: string;
  shoper_id: string;
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
export const postUsersInfoRead = () => {
  return request.post(`/api_users/users/read`, {
    // data: {
    //   id,
    // },
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
    "page-limit": string;
    "page-num": string;
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
      "page-limit": "100",
      "page-num": "1",
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
  keyword?: string;
  shoperId?: number;
  customTagId?: string;
}

/**
 * 列表接口可以使用标签查询和id查询
 * @param data
 */
export const postApiGoodsGoodsLists = (data: ListRequest) => {
  const {
    pageLimit = 10,
    pageNum = 1,
    customTag = "",
    id = "",
    shoperId = "",
    keyword = "",
    customTagId = "",
  } = data;

  const res: CustomHeader = {
    headers: {
      "page-limit": pageLimit.toString(),
      "page-num": pageNum.toString(),
    },
    data: {
      custom_tag: customTag,
      goods_cate_id: id,
      keyword,
      shoper_id: shoperId,
      custom_tag_id: customTagId,
    },
  };
  return request.post(`/api_goods/goods/lists`, res);
};

export interface OrdersData {
  status?: number;
  is_has_return_goods?: number;
  is_comment?: number;
}

export interface OrdersLists extends OrdersData {
  pageLimit: number;
  pageNum: number;
}

/**
 * 我的订单
 * @param data
 */
export const postApiOrdersLists = (data: OrdersLists) => {
  const { pageLimit = 10, pageNum = 1, ...req } = data;

  const res: CustomHeader = {
    headers: {
      "page-limit": pageLimit.toString(),
      "page-num": pageNum.toString(),
    },
    data: req,
  };
  return request.post(`/api_orders/orders/lists`, res);
};
