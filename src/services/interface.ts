import {
  postAddressLists,
  postApiOrdersLists,
  postApplyList,
  postAssetLogsList,
  postCommentsLists,
  postOrdersList,
  postTeamChildUsers,
  postUserFootLists,
} from "@/services/api";
import {
  DropOrdersListItem_AutoGender,
  IOrder_goods_info,
} from "@/services/autoGenderIterface";

export enum AllList {
  postApiGoodsGoodsLists,
  postApiOrdersLists,
  postAddressLists,
  postFavorite,
  postCommentsLists,
  postUserFootLists,
  postAssetLogsList,
  postApplyList,
  postOrdersList,
  postTeamChildUsers,
  postTeamUsers,
  // 店中店和订单公用一个列表
  postApiOrdersListsForStorehouse,
  // 论坛列表
  postForumList,
  postForumListFromMy,
}

export interface IPostForumComment {
  bbs_id: number;
  content: string;
  create_time: string;
  id: number;
  update_time: string;
  user_id: number;
  user: {
    avatar: string;
    nick_name: string;
  };
}
export interface IPostForumCommentResponse extends BaseResponse {
  data: IPostForumComment[];
}
export interface IPostForumList {
  content: string;
  create_time: string;
  id: number;
  thums: string[];
  title: string;
  update_time: string;
  user_id: number;
  comments: number;
  approval: {
    [key: string]: number;
  };
  user: {
    avatar: string;
    nick_name: string;
  };
}

export interface IPostForumDetailsResponse extends BaseResponse {
  data: IPostForumList;
}
export interface IPostForumListResponse extends BaseResponse {
  data: IPostForumList[];
}

export interface FBAPPID extends BaseResponse {
  data: {
    appId: string;
    cookie: boolean;
    version: string;
    xfbml: boolean;
  };
}
export interface LogItem {
  id: number;
  user_id: number;
  asset_type: string;
  change_type: string;
  change_money: number;
  intro: string;
  desc: string;
  create_time: string;
  update_time: string;
  symbol: string;
  user_info: {
    id: number;
    mobile: string;
    nick_name: string;
    avatar: string;
  };
}

export interface CommentItem {
  id: number;
  user_id: number;
  order_id: number;
  goods_id: number;
  content: string;
  imgs: string[];
  score: string;
  status: number;
  create_time: string;
  update_time: string;
  order_goods_info: {
    id: number;
    order_id: number;
    goods_id: number;
    user_id: number;
    name: string;
    thum: string;
    intro: string;
    standard: "";
    spec_group_id_str: string;
    spec_group_info: string;
    sell_price: number;
    score: number;
    real_price: number;
    weight: number;
    num: number;
    is_comment: number;
    return_goods_status: number;
    is_return_goods: number;
    is_return_money: number;
    create_time: string;
    update_time: string;
  };
  user_info: {
    id: number;
    mobile: string;
    nick_name: string;
    avatar: string;
  };
}

export interface AddressListResponse extends BaseResponse, Page {
  data: AddressItem[];
}

export interface AddressItem {
  address: string;
  address_info: string;
  area: string;
  area_code: string;
  city: string;
  city_code: string;
  consignee_name: string;
  create_time: string;
  express_type: string;
  id: number;
  is_default: 0 | 1;
  latitude: number;
  longitude: number;
  mobile: string;
  province: string;
  province_code: string;
  sort: number;
  update_time: string;
  user_id: number;
  zip_code: string;
}

export interface OrderListItemGoodsInfo {
  id: number;
  order_id: number;
  goods_id: number;
  user_id: number;
  name: string;
  thum: string;
  intro: string;
  standard: string;
  spec_group_id: number;
  spec_group_id_str: string;
  spec_group_info: string;
  sell_price: number;
  score: number;
  real_price: number;
  weight: number;
  num: number;
  is_comment: number;
  return_goods_status: number;
  is_return_goods: number;
  is_return_money: number;
  create_time: string;
  update_time: string;
  commission_info: {
    id: number;
    user_id: number;
    order_id: number;
    goods_id: number;
    order_goods_id: number;
    level: number;
    expect_money: number;
    real_commisson_money: null;
    real_commission_rate: number;
    real_money: null;
    already_drawcash_money: number;
    source_user_id: number;
    order_status: number;
    status: number;
    commission_apply_id: null;
    apply_no: null;
    create_time: string;
    update_time: string;
    user_info: {
      id: number;
      mobile: string;
      nick_name: string;
      avatar: string;
    };
  }[];
  bonus_info: [];
}

export interface OrdersListItem {
  id: number;
  user_id: number;
  order_no: string;
  content: string;
  type: number;
  shoper_id?: number;
  market_activity_type: string;
  market_activity_id: number;
  market_reduce_money: number;
  zip_code: string;
  goods_money: number;
  freight_money: number;
  total_money: number;
  total_score: number;
  mobile: string;
  consignee_name: number;
  province: string;
  province_code: string;
  city: string;
  city_code: string;
  area: string;
  area_code: string;
  address: string;
  memo: string;
  reply_memo: null;
  is_pay: number;
  pay_type: null;
  pay_time: null;
  is_app_pay: number;
  deliver_tip_num: number;
  last_deliver_tip_time: null;
  deliver_time: null;
  is_open_eorder: number;
  express_type: string;
  express_no: string;
  eorder_express_type: null;
  is_submit_eorder: number;
  confirm_receipt_time: null;
  cancel_reason: null;
  cancel_time: null;
  apply_return_time: boolean;
  return_time: boolean;
  is_comment: number;
  is_has_return_goods: number;
  is_all_return_goods: number;
  is_deal_return_goods: number;
  return_goods_money: number;
  is_group_buy_first: number;
  group_buy_order_pid: number;
  group_buy_time_length: null;
  group_buy_end_timestamp: null;
  group_buy_person_num: null;
  group_buy_goods_id: null;
  group_buy_status: number;
  status: number;
  create_time: string;
  update_time: string;
  return_status: number;
  order_goods_info: OrderListItemGoodsInfo[];
  user_info: {
    id: number;
    mobile: string;
    nick_name: string;
    avatar: string;
  };
}

export interface Page {
  page: { page_num: string; page_limit: string; data_count: number };
}

export interface PostTeamChildUsers {
  team_num: number;
  area: null;
  area_code: string;
  avatar: string;
  become_bonus_time: null;
  become_distributor_time: null;
  bonus_level_id: number;
  city: null;
  city_code: string;
  create_time: string;
  distributor_level_id: number;
  email: null;
  gender: number;
  id: number;
  is_bonus: boolean;
  is_customer: boolean;
  is_distributor: boolean;
  is_shopkeeper: number;
  keep_sign_in_num: number;
  last_sign_in_time: null;
  memo: null;
  mobile: string;
  nick_name: string;
  parent_id: number;
  parent_ids: string;
  province: null;
  province_code: string;
  qq: null;
  role_ids: number[];
  status: number;
  telephone: null;
  total_sign_in_num: number;
  update_time: string;
  user_info: {
    already_drawcash_bonus_money: number;
    already_drawcash_commission_money: number;
    create_time: string;
    order_money: number;
    order_num: number;
    shop_goods: null;
    total_expect_bonus_money: number;
    total_expect_commission_money: number;
    total_real_bonus_money: number;
    total_real_commission_money: number;
    update_time: string;
    user_id: number;
    wait_pay_bonus_money: number;
    wait_pay_commission_money: number;
  };
  user_level: string;
  user_level_id: number;
  user_name: null;
  wechat: null;
}

export interface PostTeamChildUsersList extends BaseResponse, Page {
  data: PostTeamChildUsers[];
}

export interface PostTeamUsers extends BaseResponse, Page {
  data: {
    team_users: PostTeamChildUsers[];
    team_info: {
      level_1_num: number;
      level_2_num: number;
      level_3_num: number;
      total_num: number;
    };
  };
}

export interface DropOrdersListItem extends DropOrdersListItem_AutoGender {}

export interface PostOrdersList extends BaseResponse, Page {
  data: {
    orders: DropOrdersListItem[];
    total_except_money: number;
    total_order_num: number;
  };
}

export interface PostApplyList extends BaseResponse, Page {
  data: {
    applys: string[];
  };
}

export interface ListResponse extends BaseResponse, Page {
  data: Details[];
}

export interface OrderListResponse extends BaseResponse, Page {
  data: Details[];
}

export type DetailsAttrInfo = {
  name: string;
  options: string[];
  value: string;
};
export type DetailsGroupInfo = {
  id: number;
  id_str: string;
  goods_id: number;
  spec_option_group: string;
  thum: string;
  sell_price: number;
  market_price: number;
  cost_price: number;
  red_price: number;
  stock: number;
  weight: number;
  goods_no: string;
  goods_code: string;
  sort: number;
  is_virtual: number;
  create_time: string;
  update_time: string;
};

export interface CartList {
  create_time: string;
  goods_id: number;
  goods_info: Details;
  id: number;
  num: number;
  spec_group_id_str: string;
  spec_group_info: {
    cost_price: number;
    create_time: string;
    goods_code: string;
    goods_id: number;
    goods_no: string;
    id: number;
    id_str: string;
    is_virtual: number;
    market_price: number;
    red_price: number;
    sell_price: number;
    sort: number;
    spec_option_group: string;
    stock: number;
    thum: string;
    update_time: string;
    weight: number;
  };
  status: number;
  update_time: string;
}

export interface Details {
  id: number;
  goods_cate_id: number;
  goods_no: string;
  goods_code: string;
  thums: any[];
  is_virtual: boolean;
  name: string;
  thum: string;
  imgs: string[];
  shoper_id: number;
  intro: string;
  desc: string;
  standard: string;
  free_shipping: boolean;
  minimum: number;
  stock: number;
  weight: number;
  cost_price: number;
  sell_price: number;
  market_price: number;
  red_price: number;
  tags: string[];
  tag_ids: number[];
  sell_num: number;
  click_num: number;
  collect_num: number;
  sort: number;
  is_top: true;
  score: number;
  buy_get_score: number;
  status: number;
  attr_info: DetailsAttrInfo[];
  spec_info: [DetailsAttrInfo, DetailsAttrInfo];
  freight_template_id: number;
  create_time: string;
  update_time: string;
  shared: true;
  share_rate: number;
  goods_cate_name: string;
  spec_group_info: DetailsGroupInfo[];
}

export interface BaseResponse {
  code: 0 | 1;
  msg: string;
  data: any;
}
