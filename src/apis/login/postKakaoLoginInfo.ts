import { useMutation } from '@tanstack/react-query';

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
}: Props): Promise<string> => {
  const response: string = await _http.post('/user/login', {
    name,
    email,
    picture,
  });

  return response;
};

const usePostKakaoLoginInfo = () =>
  useMutation({ mutationFn: postKakaoLoginInfo });

export default usePostKakaoLoginInfo;
