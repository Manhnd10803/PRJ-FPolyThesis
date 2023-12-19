import { LikeService } from '@/apis/services/like.service';
import { EmotionUnionType } from '@/models/like';
import { Paginate } from '@/models/pagination';
import { GetNewPostResponseType } from '@/models/post';
import { InfiniteData, useMutation, useQueryClient } from '@tanstack/react-query';
import { produce } from 'immer';
import { getQueryKeyPostProfile, queryKeyPosts } from './usePostQuery';
import { StorageFunc } from '@/utilities/local-storage/storage-func';

const localUserId = StorageFunc.getUserId();

type PostLikeMutationType = { postId: number; emotion: EmotionUnionType };

export const useChooseEmotionPost = () => {
  const { mutate, ...rest } = useMutation({
    mutationFn: async ({ postId, emotion }: PostLikeMutationType) => {
      await LikeService.postLikePost(postId, emotion);
    },
  });

  return {
    mutate,
    ...rest,
  };
};

export type typeQueryKey = 'profile' | 'posts';

export const useChangeTotalLikePost = (typeQueryKey: typeQueryKey = 'posts') => {
  const queryClient = useQueryClient();
  const queryKey =
    typeQueryKey === 'profile' ? getQueryKeyPostProfile({ userId: localUserId!, type: 'post' }) : queryKeyPosts;

  const manuallyIncreaseTotalLikePost = (postId: number) => {
    queryClient.setQueryData(queryKey, (oldData: InfiniteData<Paginate<GetNewPostResponseType>> | undefined) => {
      if (!oldData) return oldData;

      return produce(oldData, draft => {
        draft.pages.forEach(page => {
          page.data.forEach(postItem => {
            if (postItem.post.id === postId) {
              postItem.like_counts_by_emotion += 1;
            }
          });
        });
      });
    });
  };

  const manuallyDecreaseTotalLikePost = (postId: number) => {
    queryClient.setQueryData(queryKey, (oldData: InfiniteData<Paginate<GetNewPostResponseType>> | undefined) => {
      if (!oldData) return oldData;

      return produce(oldData, draft => {
        draft.pages.forEach(page => {
          page.data.forEach(postItem => {
            if (postItem.post.id === postId) {
              postItem.like_counts_by_emotion -= 1;
            }
          });
        });
      });
    });
  };

  return {
    manuallyIncreaseTotalLikePost,
    manuallyDecreaseTotalLikePost,
  };
};
