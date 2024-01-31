import { useMutation } from '@tanstack/react-query';

import { KakaoAuthInfo } from '@interfaces/login';

import { _http } from '../_http';

interface Props {
  kakaoAccessToken: string;
}

const getKakaoLoginInfo = async ({
  kakaoAccessToken,
}: Props): Promise<KakaoAuthInfo> => {
  const response: KakaoAuthInfo = await _http.externalGet(
    'https://kapi.kakao.com/v2/user/me',

    {
      headers: {
        Authorization: `Bearer ${kakaoAccessToken}`, // 카카오 토큰 api로 얻은 accesstoken 보내기
      },
      baseURL: '',
    },
  );

  return response;
};

const useGetKakaoLoginInfo = () =>
  useMutation({ mutationFn: getKakaoLoginInfo });

export default useGetKakaoLoginInfo;
