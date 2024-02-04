import {
  useSuspenseInfiniteQuery,
  UseSuspenseInfiniteQueryResult,
} from '@tanstack/react-query';

import { Page, SortType } from '@/interfaces/common';
import { ComboItem } from '@/interfaces/home';

import PROFILE_API_KEY from './consts';
import { _http } from '../_http';

interface Props {
  category: SortType;
  page: number;
}

const getSavedItems = async ({
  category,
  page,
}: Props): Promise<Page<ComboItem>> => {
  const loginToken: string = localStorage.getItem('loginToken') as string;
  const token = JSON.parse(loginToken);

  const response: Page<ComboItem> = await _http.get(
    `/user/bookmark?category=${category}&page=${page}&size=10`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response;
};

const useGetSavedItems = ({
  category,
}: Pick<Props, 'category'>): UseSuspenseInfiniteQueryResult<Page<ComboItem>> =>
  useSuspenseInfiniteQuery({
    queryKey: [PROFILE_API_KEY.SAVED_ITEMS, category],
    queryFn: ({ pageParam = 1 }) =>
      getSavedItems({ page: pageParam, category }),
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

export default useGetSavedItems;
