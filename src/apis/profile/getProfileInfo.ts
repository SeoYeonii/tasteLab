import {
  useSuspenseQuery,
  UseSuspenseQueryResult,
} from '@tanstack/react-query';

import { ProfileInfo } from '@/interfaces/profile';

import PROFILE_API_KEY from './consts';

interface Props {
  id: number;
}

const getProfileInfo = async ({ id }: Props): Promise<ProfileInfo> => {
  /** @TODO 실제 api 연동 필요 */

  const response = {
    userId: id,
    nickname: '임시 static nickname',
    email: '임시 static email',
    profileImageUrl: '',
  };

  return new Promise((res) => {
    setTimeout(() => res(response), 3000);
  });
};

const useGetProfileInfo = ({
  id,
}: Props): UseSuspenseQueryResult<ProfileInfo> =>
  useSuspenseQuery({
    queryKey: [PROFILE_API_KEY.PROFILE],
    queryFn: () => getProfileInfo({ id }),
  });

export default useGetProfileInfo;
