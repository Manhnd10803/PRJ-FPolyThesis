import { CommentService } from '@/apis/services/comment.service';
import { GetNewPostResponseType } from '@/models/post';
import { TCommentSchema } from '@/validation/zod/comment';
import { InfiniteData, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeyPosts } from './usePostQuery';
import { Paginate } from '@/models/pagination';
import { produce } from 'immer';
import { IComment } from '@/models/comment';

type TCreateComment = { bodyData: TCommentSchema; id: number };

export const useCreateComment = () => {
  const { mutate, ...rest } = useMutation({
    mutationFn: async ({ bodyData, id }: TCreateComment) => {
      return await CommentService.createCommentPost<TCommentSchema>(bodyData, id);
    },
  });

  return {
    createComment: mutate,
    ...rest,
  };
};

type TAddCommentPost = {
  newComment: IComment;
  postId: number;
};

export const useAddCommentPost = () => {
  const queryClient = useQueryClient();

  const manuallyAddCommentPostItem = async ({ newComment, postId }: TAddCommentPost) => {
    queryClient.setQueryData(queryKeyPosts, (oldData: InfiniteData<Paginate<GetNewPostResponseType>> | undefined) => {
      if (!oldData) return oldData;

      return produce(oldData, draft => {
        draft.pages.forEach(page => {
          page.data.forEach(postItem => {
            if (postItem.post.id === postId) {
              postItem.comments?.unshift(newComment);
            }
          });
        });
      });
    });
  };

  return {
    manuallyAddCommentPostItem,
  };
};
