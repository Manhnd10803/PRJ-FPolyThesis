import { PostService } from '@/apis/services/post.service';
import { Paginate } from '@/models/pagination';
import { GetNewPostResponseType, IPost } from '@/models/post';
import { InfiniteData, useInfiniteQuery, useQueryClient } from '@tanstack/react-query';

export const queryKeyPosts = ['posts'];

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

export const useAddPost = () => {
  const queryClient = useQueryClient();

  const manuallyAddPost = async (newPost: GetNewPostResponseType) => {
    queryClient.setQueryData(queryKeyPosts, (oldData: InfiniteData<Paginate<GetNewPostResponseType>> | undefined) => {
      if (!oldData) return oldData;

      const [firstPage, ...rest] = oldData?.pages;
      firstPage.data.unshift(newPost);

      return {
        ...oldData,
        pages: [{ ...firstPage }, ...rest],
      };
    });
  };

  return {
    manuallyAddPost,
  };
};
