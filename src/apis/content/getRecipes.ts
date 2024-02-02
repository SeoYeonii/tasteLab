import {
  useSuspenseQuery,
  UseSuspenseQueryResult,
} from '@tanstack/react-query';

import { RecipeInfo } from '@/interfaces/content';

import CONTENT_API_KEY from './consts';
import { _http } from '../_http';

// interface Props {
//     comboItemId: number;
// }

const getRecipes = async (): Promise<RecipeInfo[]> => {
  const response: RecipeInfo[] = await _http.get(`/combo-item/${5}`);

  return response;
};

const useGetComboItems = (): UseSuspenseQueryResult<RecipeInfo[]> =>
  useSuspenseQuery({
    queryKey: [CONTENT_API_KEY.RECIPES],
    queryFn: () => getRecipes(),
  });

export default useGetComboItems;
