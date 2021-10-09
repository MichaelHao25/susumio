export enum AllList {
  postApiGoodsGoodsLists,
  postApiGoodsGoodsListsFreeShipping,
}

export interface ListResponse extends BaseResponse {
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
