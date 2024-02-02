import {
  useSuspenseQuery,
  UseSuspenseQueryResult,
} from '@tanstack/react-query';

import { RecommendItem } from '@/interfaces/home';
import makeFakeRecommendItems from '@/mocks/makeFakeRecommendItem';

import HOME_API_KEY from './consts';

const getRecommendItems = async (): Promise<RecommendItem[]> => {
  /** @TODO 실제 api 연동 필요 */
  const response = makeFakeRecommendItems(5);

  return new Promise((res) => {
    setTimeout(() => res(response), 3000);
    // setTimeout(() => rej('testing error boundary'), awaitTime);
  });
};

const useGetRecommendItems = (): UseSuspenseQueryResult<RecommendItem[]> =>
  useSuspenseQuery({
    queryKey: [HOME_API_KEY.RECCOMMEND_ITEMS],
    queryFn: () => getRecommendItems(),
  });

export default useGetRecommendItems;
