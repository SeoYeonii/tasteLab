import {
  useSuspenseQuery,
  UseSuspenseQueryResult,
} from '@tanstack/react-query';

import { ListItem } from '@/interfaces/home';

import HOME_API_KEY from './consts';
import { _http } from '../_http';

const getListItems = async (): Promise<ListItem[]> => {
  const response: ListItem[] = await _http.get('/product/top3');

  return response;
};

const useGetListItems = (): UseSuspenseQueryResult<ListItem[]> =>
  useSuspenseQuery({
    queryKey: [HOME_API_KEY.LIST_ITEMS],
    queryFn: () => getListItems(),
  });

export default useGetListItems;
