import { useQuery } from '@tanstack/react-query';
import { PostItem } from './post-item';

import { PostService } from '@/apis/services/post.service';

const fetchPostNewFeed = async () => {
  const { data } = await PostService.getPostNewFeed();
  return data;
};

export const PostList = () => {
  //state
  const { isLoading, error, isError, data } = useQuery({
    queryKey: ['postNewFeeds'],
    queryFn: fetchPostNewFeed,
  });

  if (isLoading) return <div>Loading...</div>;

  console.log('data', data);

  //render
  return (
    <>
      {data &&
        data.map(item => {
          return (
            <PostItem
              key={item.post.id}
              avatar={item.post.user.avatar}
              authorName={item.post.user.username}
              content={item.post.content}
              createdAt={item.post.created_at}
              updatedAt={item.post.updated_at}
              images={item.post.image}
              // actionType={item.actionType}
              commentList={item.comments}
              totalLike={item.like_counts_by_emotion.total_likes}
            />
          );
        })}
    </>
  );
};
