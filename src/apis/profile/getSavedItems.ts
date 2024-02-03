import {
  useSuspenseInfiniteQuery,
  UseSuspenseInfiniteQueryResult,
} from '@tanstack/react-query';

import { Page } from '@/interfaces/common';
import { ComboItem } from '@/interfaces/home';

import PROFILE_API_KEY from './consts';
import { _http } from '../_http';

interface Props {
  // comboItemId: number;
  page: number;
}

const getSavedItems = async ({ page }: Props): Promise<Page<ComboItem>> => {
  const response: Page<ComboItem> = await _http.get(
    `/user/bookmark?page=${page}&size=10`,
    {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('loginToken') ?? '')}`,
      },
    },
  );

  return response;
};

const useGetSavedItems = (): UseSuspenseInfiniteQueryResult<Page<ComboItem>> =>
  // const useGetComments = ({
  //   page,
  // }: Props): UseSuspenseInfiniteQueryResult<Page<Comment>> =>
  useSuspenseInfiniteQuery({
    queryKey: [PROFILE_API_KEY.SAVED_ITEMS],
    queryFn: ({ pageParam = 1 }) => getSavedItems({ page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const nextPage = (lastPage?.pageInfo.page ?? 0) + 1;
      return lastPage?.pageInfo.page === lastPage?.pageInfo.totalPage
        ? undefined
        : nextPage;
    },
    // select: (data) => ({
    //   pages: data?.pages.flatMap((page) => page.data),
    //   pageParams: data.pageParams,
    // }),
  });

export default useGetSavedItems;
