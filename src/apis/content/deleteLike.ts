/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMutation, useQueryClient } from '@tanstack/react-query';

import CONTENT_API_KEY from './consts';
import { _http } from '../_http';
import PROFILE_API_KEY from '../profile/consts';

interface Props {
  comboItemId: number;
}

const deleteLike = async ({ comboItemId }: Props): Promise<string> => {
  const loginToken: string = localStorage.getItem('loginToken') as string;
  const token = JSON.parse(loginToken);

  const response: string = await _http.delete(
    `/user/bookmark/${comboItemId}`,
    undefined,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response;
};

const useDeleteLike = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteLike,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [PROFILE_API_KEY.SAVED_ITEMS],
      });
      queryClient.invalidateQueries({
        queryKey: [CONTENT_API_KEY.IS_LIKED],
      });
    },
  });
};

export default useDeleteLike;
