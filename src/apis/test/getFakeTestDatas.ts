/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQuery, UseQueryResult } from '@tanstack/react-query';

import makeFakeTestDatas, { FakeData } from '@/mocks/makeFakeTestDatas';

import TEST_API_KEY from './consts';

interface Props {
  num?: number;
  awaitTime?: number;
}

const getFakeTestDatas = async ({
  num = 3,
  awaitTime = 1000,
}: Props): Promise<FakeData[]> => {
  const response = makeFakeTestDatas(num);

  return new Promise((res) => {
    setTimeout(() => res(response), awaitTime);
    // setTimeout(() => rej('testing error boundary'), awaitTime);
  });
};

const useGetFakeTestDatas = ({
  num,
  awaitTime,
}: Props): UseQueryResult<FakeData[]> =>
  useQuery({
    queryKey: [TEST_API_KEY.FAKE, { num, awaitTime }],
    queryFn: () => getFakeTestDatas({ num, awaitTime }),
    suspense: true,
  });

export default useGetFakeTestDatas;
