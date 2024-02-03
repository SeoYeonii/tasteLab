import {
  useSuspenseInfiniteQuery,
  UseSuspenseInfiniteQueryResult,
} from '@tanstack/react-query';

import { OrderType, Page, SortType } from '@/interfaces/common';
import { ComboItem } from '@/interfaces/home';

import LIST_API_KEY from './consts';
import { _http } from '../_http';

interface Props {
  sortType: SortType;
  orderType: OrderType;
  page: number;
}

const getList = async ({
  sortType,
  orderType,
  page,
}: Props): Promise<Page<ComboItem>> => {
  const response = await _http.get<Page<ComboItem>>(
    `/combo-item/list?category=${sortType}&sortBy=${orderType}&page=${page}&size=10`,
  );

  return response;
};

const useGetList = ({
  sortType,
  orderType,
}: Omit<Props, 'page'>): UseSuspenseInfiniteQueryResult<Page<ComboItem>> =>
  useSuspenseInfiniteQuery({
    queryKey: [LIST_API_KEY.LIST, sortType, orderType],
    queryFn: ({ pageParam = 1 }) =>
      getList({ sortType, orderType, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const nextPage = (lastPage?.pageInfo.page ?? 0) + 1;
      return lastPage?.pageInfo.page === lastPage?.pageInfo.totalPage
        ? undefined
        : nextPage;
    },
    select: (data) => ({
      result: data?.pages
        .flatMap((page) => page.result)
        .filter((c) => c !== null),
      pageInfo: data.pages[data.pages.length - 1].pageInfo,
    }),
  });

export default useGetList;
