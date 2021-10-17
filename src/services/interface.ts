import {
  postAddressLists,
  postApiOrdersLists,
  postCommentsLists,
  postUserFootLists,
} from '@/services/api';

export enum AllList {
  postApiGoodsGoodsLists,
  postApiOrdersLists,
  postAddressLists,
  postFavorite,
  postCommentsLists,
  postUserFootLists,
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
    standard: '';
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

export interface AddressListResponse extends BaseResponse {
  page: { page_num: string; page_limit: string; data_count: number };
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

export interface ListResponse extends BaseResponse {
  page: { page_num: string; page_limit: string; data_count: number };
  data: Details[];
}

export interface OrderListResponse extends BaseResponse {
  page: { page_num: string; page_limit: string; data_count: number };
  data: Details[];
}

export type DetailsAttrInfo = {
  name: string;
  options: string[];
  // value: string;
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
