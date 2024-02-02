import {
  useSuspenseQuery,
  UseSuspenseQueryResult,
} from '@tanstack/react-query';

import { ProfileInfo } from '@/interfaces/profile';

import PROFILE_API_KEY from './consts';
import { _http } from '../_http';

const getProfileInfo = async (): Promise<ProfileInfo> => {
  const response: ProfileInfo = await _http.get('/user/profile', {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('loginToken') ?? '')}`,
    },
  });

  return response;
};

const useGetProfileInfo = (): UseSuspenseQueryResult<ProfileInfo> =>
  useSuspenseQuery({
    queryKey: [PROFILE_API_KEY.PROFILE],
    queryFn: getProfileInfo,
  });

export default useGetProfileInfo;
