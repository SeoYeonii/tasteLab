/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMutation, useQueryClient } from '@tanstack/react-query';

import CONTENT_API_KEY from './consts';
import { _http } from '../_http';

interface Props {
  comboItemId: number;
  content: string;
}

const postComment = async ({
  comboItemId,
  content,
}: Props): Promise<string> => {
  const response: string = await _http.post(
    `/combo-item/${comboItemId}/reply`,
    {
      content,
    },
    {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('loginToken') ?? '')}`,
      },
    },
  );

  return response;
};

const usePostComment = ({ comboItemId }: Pick<Props, 'comboItemId'>) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postComment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [CONTENT_API_KEY.COMMENTS, comboItemId],
      });
    },
  });
};

export default usePostComment;
