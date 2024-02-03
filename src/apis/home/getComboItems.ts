import {
  useSuspenseQuery,
  UseSuspenseQueryResult,
} from '@tanstack/react-query';

import { ComboItem } from '@/interfaces/home';

import HOME_API_KEY from './consts';
import { _http } from '../_http';

const getComboItems = async (): Promise<ComboItem[]> => {
  const response: ComboItem[] = await _http.get('/combo-item/random');

  return response;
};

const useGetComboItems = (): UseSuspenseQueryResult<ComboItem[]> =>
  useSuspenseQuery({
    queryKey: [HOME_API_KEY.COMBO_ITEMS],
    queryFn: () => getComboItems(),
  });

export default useGetComboItems;
