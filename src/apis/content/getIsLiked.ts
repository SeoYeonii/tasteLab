import { useQuery, UseQueryResult } from '@tanstack/react-query';

import CONTENT_API_KEY from './consts';
import { _http } from '../_http';

interface Props {
  comboItemId: number;
  enabled?: boolean;
}

const getIsLiked = async ({ comboItemId }: Props): Promise<boolean> => {
  const loginToken: string = localStorage.getItem('loginToken') as string;
  const token = JSON.parse(loginToken);

  const response: boolean = await _http.get(`/user/bookmark/${comboItemId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
};

const useGetIsLiked = ({
  comboItemId,
  enabled = false,
}: Props): UseQueryResult<boolean> =>
  useQuery({
    queryKey: [CONTENT_API_KEY.IS_LIKED, comboItemId],
    queryFn: () => getIsLiked({ comboItemId }),
    enabled,
  });

export default useGetIsLiked;
