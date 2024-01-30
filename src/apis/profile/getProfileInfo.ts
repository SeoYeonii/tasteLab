import {
  useSuspenseQuery,
  UseSuspenseQueryResult,
} from '@tanstack/react-query';

import { KakaoAuthInfo } from '@/interfaces/login';
import { ProfileInfo } from '@/interfaces/profile';

import PROFILE_API_KEY from './consts';

interface Props {
  id: string;
}

const getProfileInfo = async ({ id }: Props): Promise<ProfileInfo> => {
  /** @TODO 실제 api 연동 필요 */
  const loginInfo: KakaoAuthInfo = JSON.parse(
    localStorage.getItem('kakaoLoginInfo') ?? '',
  );

  const response = {
    userId: id,
    nickname: loginInfo.profile.nickname,
    email: loginInfo.kakao_account.email,
    profileImageUrl: loginInfo.profile.thumbnail_image_url,
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
