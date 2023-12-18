import { PostService } from '@/apis/services/post.service';
import { Paginate } from '@/models/pagination';
import { GetNewPostResponseType, IPost } from '@/models/post';
import { StorageFunc } from '@/utilities/local-storage/storage-func';
import { InfiniteData, useInfiniteQuery, useQuery, useQueryClient } from '@tanstack/react-query';
import { produce } from 'immer';

export const queryKeyPosts = ['posts'];
const localUserId = StorageFunc.getUserId();

type PostProfileType = {
  userId: number;
  type: string;
  status?: string;
};

export const getQueryKeyPostProfile = ({ userId, type, status = '' }: PostProfileType) => {
  return ['profile', type, status, userId];
};

const fetchPosts = async ({ quantity = 5, pageParam = 1 }) => {
  const { data } = await PostService.getPostsNewFeed(quantity, pageParam);
  return data;
};

export default function useInfinitePosts() {
  const { data, ...rest } = useInfiniteQuery({
    queryKey: queryKeyPosts,
    queryFn: fetchPosts,
    getNextPageParam: (lastPage, _) => {
      if (lastPage.current_page === lastPage.last_page) {
        return undefined;
      }
      return lastPage.current_page + 1;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return {
    data: data?.pages.flatMap(page => page.data),
    ...rest,
  };
}

export const usePost = (typeQueryKey: 'profile' | 'posts' = 'posts') => {
  const queryClient = useQueryClient();
  const queryKey =
    typeQueryKey === 'profile' ? getQueryKeyPostProfile({ userId: localUserId!, type: 'post' }) : queryKeyPosts;

  const manuallyAddPost = async (newPost: GetNewPostResponseType) => {
    queryClient.setQueryData(queryKey, (oldData: InfiniteData<Paginate<GetNewPostResponseType>> | undefined) => {
      if (!oldData) return oldData;
      return produce(oldData, draft => {
        draft.pages[0].data.unshift(newPost);
      });
    });
  };

  const manuallyChangeStatusPost = async (postId: number, newStatus: number) => {
    queryClient.setQueryData(queryKey, (oldData: InfiniteData<Paginate<GetNewPostResponseType>> | undefined) => {
      if (!oldData) return oldData;
      return produce(oldData, draft => {
        draft.pages.forEach(page => {
          page.data = page.data.map(postItem => {
            if (postItem.post.id === postId) {
              return {
                ...postItem,
                post: {
                  ...postItem.post,
                  status: newStatus,
                },
              };
            }
            return postItem;
          });
        });
      });
    });
  };

  return {
    manuallyAddPost,
    manuallyChangeStatusPost,
  };
};
