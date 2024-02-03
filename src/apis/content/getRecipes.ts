import {
  useSuspenseQuery,
  UseSuspenseQueryResult,
} from '@tanstack/react-query';

import { RecipeInfo } from '@/interfaces/content';

import CONTENT_API_KEY from './consts';
import { _http } from '../_http';

interface Props {
  comboItemId: number;
}

const getRecipes = async ({ comboItemId }: Props): Promise<RecipeInfo[]> => {
  const response: RecipeInfo[] = await _http.get(`/combo-item/${comboItemId}`);

  return response;
};

const useGetComboItems = ({
  comboItemId,
}: Props): UseSuspenseQueryResult<RecipeInfo[]> =>
  useSuspenseQuery({
    queryKey: [CONTENT_API_KEY.RECIPES, comboItemId],
    queryFn: () => getRecipes({ comboItemId }),
  });

export default useGetComboItems;
