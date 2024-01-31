import {
  useSuspenseQuery,
  UseSuspenseQueryResult,
} from '@tanstack/react-query';

import { ListItem } from '@/interfaces/home';
import makeFakeListItems from '@/mocks/makeFakeListItems';

import HOME_API_KEY from './consts';

const getListItems = async (): Promise<ListItem[]> => {
  /** @TODO 실제 api 연동 필요 */
  const response = makeFakeListItems();

  return new Promise((res) => {
    setTimeout(() => res(response), 300000);
    // setTimeout(() => rej('testing error boundary'), awaitTime);
  });
};

const useGetListItems = (): UseSuspenseQueryResult<ListItem[]> =>
  useSuspenseQuery({
    queryKey: [HOME_API_KEY.LIST_ITEMS],
    queryFn: () => getListItems(),
  });

export default useGetListItems;
