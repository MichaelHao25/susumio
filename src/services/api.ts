import { request } from './core';
import { ListRequest, Details } from '@/services/interface';

export const postApiGoodsGoodsLists = (data: ListRequest) => {
  const { pageLimit = 10, pageNum = 1 } = data;
  return request.post(`/api_goods/goods/lists`, {
    // @ts-ignore
    headers: {
      'page-limit': pageLimit,
      'page-num': pageNum,
    },
  });
};
