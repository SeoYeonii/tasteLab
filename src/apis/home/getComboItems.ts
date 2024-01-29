import {
  useSuspenseQuery,
  UseSuspenseQueryResult,
} from '@tanstack/react-query';

import { ComboItem } from '@/interfaces/home';
import makeFakeComboItems from '@/mocks/makeFakeComboItems';

import HOME_API_KEY from './consts';

const getComboItems = async (): Promise<ComboItem[]> => {
  /** @TODO 실제 api 연동 필요 */
  const response = makeFakeComboItems();

  return new Promise((res) => {
    setTimeout(() => res(response), 3000);
    // setTimeout(() => rej('testing error boundary'), awaitTime);
  });
};

const useGetComboItems = (): UseSuspenseQueryResult<ComboItem[]> =>
  useSuspenseQuery({
    queryKey: [HOME_API_KEY.COMBO_ITEMS],
    queryFn: () => getComboItems(),
  });

export default useGetComboItems;
