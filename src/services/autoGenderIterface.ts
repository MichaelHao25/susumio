export interface DropOrdersListItem_AutoGender {
  order_id: number;
  order_status: number;
  order_goods_id: number;
  user_id: number;
  source_user_id: number;
  level: number;
  source_user_info: ISource_user_info;
  order_info: IOrder_info;
  order_goods_info: IOrder_goods_info[];
}

/* 自动生成的 Interface */

export interface IOrder_goods_info {
  id: number;
  user_id: number;
  order_id: number;
  goods_id: number;
  order_goods_id: number;
  level: number;
  expect_money: number;
  real_commisson_money: void /* 未知类型 */;
  real_commission_rate: number;
  real_money: void /* 未知类型 */;
  already_drawcash_money: number;
  source_user_id: number;
  order_status: number;
  status: number;
  commission_apply_id: void /* 未知类型 */;
  apply_no: void /* 未知类型 */;
  create_time: string;
  update_time: string;
  order_info: IOrder_info_1;
  source_user_info: ISource_user_info_1;
  order_goods_info: IOrder_goods_info_1;
}

interface IOrder_goods_info_1 {
  name: string;
  thum: string;
  num: number;
  real_price: number;
}

interface ISource_user_info_1 {
  id: number;
  mobile: string;
  nick_name: string;
  avatar: string;
}

interface IOrder_info_1 {
  order_no: string;
  create_time: string;
  total_money: number;
}

interface IOrder_info {
  order_no: string;
  create_time: string;
  total_money: number;
}

interface ISource_user_info {
  id: number;
  mobile: string;
  nick_name: string;
  avatar: string;
}
