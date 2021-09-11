import { request } from './core';
import { ListRequest, Details } from '@/services/interface';

export const postApiGoodsGoodsLists = (data: ListRequest) => {
  const { pageLimit = 10, pageNum = 1, customTag = '' } = data;
  const res = {
    headers: {
      'page-limit': pageLimit,
      'page-num': pageNum,
    },
    data: {
      custom_tag: customTag,
    },
  };
  // @ts-ignore
  return request.post(`/api_goods/goods/lists`, res);
};
