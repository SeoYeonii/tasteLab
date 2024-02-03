import {
  useSuspenseInfiniteQuery,
  UseSuspenseInfiniteQueryResult,
} from '@tanstack/react-query';

import { Page } from '@/interfaces/common';
import { Comment } from '@/interfaces/content';

import CONTENT_API_KEY from './consts';
import { _http } from '../_http';

interface Props {
  comboItemId: number;
  page: number;
}

const getComments = async ({
  comboItemId,
  page,
}: Props): Promise<Page<Comment>> => {
  const response: Page<Comment> = await _http.get(
    `/combo-item/${comboItemId}/reply?page=${page}&size=10`,
  );

  return response;
};

const useGetComments = ({
  comboItemId,
}: Pick<Props, 'comboItemId'>): UseSuspenseInfiniteQueryResult<Page<Comment>> =>
  useSuspenseInfiniteQuery({
    queryKey: [CONTENT_API_KEY.COMMENTS, comboItemId],
    queryFn: ({ pageParam = 1 }) =>
      getComments({ comboItemId, page: pageParam }),
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

export default useGetComments;
