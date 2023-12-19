import { CommentService } from '@/apis/services/comment.service';
import { GetNewPostResponseType } from '@/models/post';
import { TCommentSchema } from '@/validation/zod/comment';
import { InfiniteData, useMutation, useQueryClient } from '@tanstack/react-query';
import { getQueryKeyPostProfile, queryKeyPosts } from './usePostQuery';
import { Paginate } from '@/models/pagination';
import { produce } from 'immer';
import { IComment } from '@/models/comment';
import { StorageFunc } from '@/utilities/local-storage/storage-func';

type TCreateComment = { bodyData: TCommentSchema; id: number };

const localUserId = StorageFunc.getUserId();

export const useCreateCommentPost = () => {
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

export const useAddCommentPost = (typeQueryKey: 'profile' | 'posts' = 'posts') => {
  const queryClient = useQueryClient();
  const queryKey =
    typeQueryKey === 'profile' ? getQueryKeyPostProfile({ userId: localUserId!, type: 'post' }) : queryKeyPosts;

  const manuallyAddCommentPostItem = async ({ newComment, postId }: TAddCommentPost) => {
    queryClient.setQueryData(queryKey, (oldData: InfiniteData<Paginate<GetNewPostResponseType>> | undefined) => {
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

export const useAddCommentPostDetail = (typeQueryKey: 'profile' | 'posts' = 'posts') => {
  const queryClient = useQueryClient();

  const manuallyAddCommentPostDetail = async ({ newComment, postId }: TAddCommentPost) => {
    const queryKey =
      typeQueryKey === 'profile'
        ? getQueryKeyPostProfile({ userId: localUserId!, type: 'post' })
        : ['post', postId.toString()];
    queryClient.setQueryData(queryKey, (oldData: GetNewPostResponseType | undefined) => {
      if (!oldData) {
        return oldData;
      }

      return produce(oldData, draft => {
        draft.comments?.unshift(newComment);
      });
    });
  };

  return {
    manuallyAddCommentPostDetail,
  };
};
