import { useMutation } from '@tanstack/react-query';

import { LoginPostResponse } from '@/interfaces/login';

import { _http } from '../_http';

interface Props {
  name: string;
  email: string;
  picture: string;
}

const postKakaoLoginInfo = async ({
  name,
  email,
  picture,
}: Props): Promise<LoginPostResponse> => {
  const response: LoginPostResponse = await _http.post('/login', {
    name,
    email,
    picture,
  });

  return response;
};

const usePostKakaoLoginInfo = () =>
  useMutation({ mutationFn: postKakaoLoginInfo });

export default usePostKakaoLoginInfo;
