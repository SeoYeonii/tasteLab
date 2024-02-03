/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMutation, useQueryClient } from '@tanstack/react-query';

import CONTENT_API_KEY from './consts';
import { _http } from '../_http';

interface Props {
  replyId: number;
  content: string;
}

const putComment = async ({ replyId, content }: Props): Promise<string> => {
  const loginToken: string = localStorage.getItem('loginToken') as string;
  const token = JSON.parse(loginToken);

  const response: string = await _http.put(
    `/combo-item/${replyId}`,
    { content },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response;
};

const usePutComment = ({ comboItemId }: { comboItemId: number }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: putComment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [CONTENT_API_KEY.COMMENTS, comboItemId],
      });
    },
  });
};

export default usePutComment;
