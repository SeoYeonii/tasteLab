import {
  useSuspenseQuery,
  UseSuspenseQueryResult,
} from '@tanstack/react-query';

import { RecommendItem } from '@/interfaces/home';

import HOME_API_KEY from './consts';
import { _http } from '../_http';

const getRecommendItem = async (): Promise<RecommendItem> => {
  const response: RecommendItem = await _http.get('/combo-item/recommend');

  return response;
};

const useGetRecommendItem = (): UseSuspenseQueryResult<RecommendItem> =>
  useSuspenseQuery({
    queryKey: [HOME_API_KEY.RECOMMEND_ITEM],
    queryFn: getRecommendItem,
  });

export default useGetRecommendItem;
