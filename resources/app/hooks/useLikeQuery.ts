import { LikeService } from '@/apis/services/like.service';
import { EmotionUnionType } from '@/models/like';
import { Paginate } from '@/models/pagination';
import { GetNewPostResponseType } from '@/models/post';
import { InfiniteData, useMutation, useQueryClient } from '@tanstack/react-query';
import { produce } from 'immer';
import { queryKeyPosts } from './usePostQuery';

export const useChooseEmotionPost = () => {
  const { mutate, ...rest } = useMutation({
    mutationFn: async ({ postId, emotion }: { postId: number; emotion: EmotionUnionType }) => {
      await LikeService.postLikePost(postId, emotion);
    },
  });

  return {
    mutate,
    ...rest,
  };
};

export const useIncreaseTotalLikePost = () => {
  const queryClient = useQueryClient();

  const manuallyIncreaseTotalLikePost = (postId: number) => {
    queryClient.setQueryData(queryKeyPosts, (oldData: InfiniteData<Paginate<GetNewPostResponseType>> | undefined) => {
      if (!oldData) return oldData;

      return produce(oldData, draft => {
        draft.pages.forEach(page => {
          page.data.forEach(postItem => {
            if (postItem.post.id === postId) {
              postItem.like_counts_by_emotion.total_likes += 1;
            }
          });
        });
      });
    });
  };

  const manuallyDecreaseTotalLikePost = (postId: number) => {
    queryClient.setQueryData(queryKeyPosts, (oldData: InfiniteData<Paginate<GetNewPostResponseType>> | undefined) => {
      if (!oldData) return oldData;

      return produce(oldData, draft => {
        draft.pages.forEach(page => {
          page.data.forEach(postItem => {
            if (postItem.post.id === postId) {
              postItem.like_counts_by_emotion.total_likes -= 1;
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
