import { useMutation } from '@tanstack/react-query';

import { PostForAccessTokenResponse } from '@/interfaces/login';

import { _http } from '../_http';

const KAKAO_LOGIN_REST_API_KEY = import.meta.env.VITE_KAKAO_LOGIN_REST_API_KEY;
const KAKAO_LOGIN_REDIRECT_URI = import.meta.env.VITE_KAKAO_LOGIN_REDIRECT_URI;
const KAKAO_LOGIN_CLIENT_SECRET = import.meta.env
  .VITE_KAKAO_LOGIN_CLIENT_SECRET;

interface Props {
  code: string;
}

const postKakaoAccessToken = async ({
  code,
}: Props): Promise<PostForAccessTokenResponse> => {
  const response: PostForAccessTokenResponse = await _http.externalPost(
    'https://kauth.kakao.com/oauth/token',
    {
      grant_type: 'authorization_code',
      client_id: KAKAO_LOGIN_REST_API_KEY,
      redirect_uri: KAKAO_LOGIN_REDIRECT_URI,
      code,
      client_secret: KAKAO_LOGIN_CLIENT_SECRET,
    },
    {
      headers: {
        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
      baseURL: '',
    },
  );

  return response;
};

const usePostKakaoAccessToken = () =>
  useMutation({ mutationFn: postKakaoAccessToken });

export default usePostKakaoAccessToken;
