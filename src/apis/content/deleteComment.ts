/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMutation, useQueryClient } from '@tanstack/react-query';

import CONTENT_API_KEY from './consts';
import { _http } from '../_http';

interface Props {
  comboItemId: number;
  replyId: number;
}

const deleteComment = async ({
  replyId,
  comboItemId,
}: Props): Promise<string> => {
  const loginToken: string = localStorage.getItem('loginToken') as string;
  const token = JSON.parse(loginToken);

  const response: string = await _http.delete(
    `/combo-item/${comboItemId}/${replyId}`,
    undefined,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response;
};

const useDeleteComment = ({ comboItemId }: Pick<Props, 'comboItemId'>) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [CONTENT_API_KEY.COMMENTS, comboItemId],
      });
    },
  });
};

export default useDeleteComment;
