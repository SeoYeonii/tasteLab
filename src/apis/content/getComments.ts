import {
  useSuspenseInfiniteQuery,
  UseSuspenseInfiniteQueryResult,
} from '@tanstack/react-query';

import { Page } from '@/interfaces/common';
import { Comment } from '@/interfaces/content';

import CONTENT_API_KEY from './consts';
import { _http } from '../_http';

interface Props {
  // comboItemId: number;
  page: number;
}

const getComments = async ({ page }: Props): Promise<Page<Comment>> => {
  const response: Page<Comment> = await _http.get(
    `/combo-item/${5}/reply?page=${page}&size=10`,
  );

  return response;
};

const useGetComments = (): UseSuspenseInfiniteQueryResult<Page<Comment>> =>
  // const useGetComments = ({
  //   page,
  // }: Props): UseSuspenseInfiniteQueryResult<Page<Comment>> =>
  useSuspenseInfiniteQuery({
    queryKey: [CONTENT_API_KEY.COMMENTS],
    queryFn: ({ pageParam = 1 }) => getComments({ page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const nextPage = (lastPage?.pageInfo.page ?? 0) + 1;
      return lastPage.result.length === 0 ? undefined : nextPage;
    },
    // select: (data) => ({
    //   pages: data?.pages.flatMap((page) => page.data),
    //   pageParams: data.pageParams,
    // }),
  });

export default useGetComments;
