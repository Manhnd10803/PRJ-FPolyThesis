import { useQuery } from '@tanstack/react-query';
import { FeedItem } from './feed-item';

import { dataFake } from '../../data/data';
import { PostService } from '@/apis/services/post.service';

// fake api
// const fetchMockApi = (response: any): Promise<any> => {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       resolve(response);
//     }, 1000);
//   });
// };

const fetchFeeds = async () => {
  const { data } = await PostService.getNewFeed();
  return data;
};

export const FeedList = () => {
  //state
  const { isLoading, error, isError, data } = useQuery({
    queryKey: ['newFeeds'],
    queryFn: fetchFeeds,
  });

  if (isLoading) return <div>Loading...</div>;

  if (isError) return 'An error has occurred: ' + error.message;

  console.log('data', data);

  //render
  return (
    <>
      {data.map(item => {
        return (
          <FeedItem
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
