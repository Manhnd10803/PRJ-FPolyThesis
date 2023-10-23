import { FeedService } from '@/apis/services/feed.service';
import { useQuery } from '@tanstack/react-query';
import { FeedItem } from './feed-item';

import { dataFake } from '../../data/data';

// fake api
const fetchMockApi = (response: any): Promise<any> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(response);
    }, 1000);
  });
};
const getFeeds = () => {
  return fetchMockApi(dataFake).then(res => res.data);
};

type FeedItem = any;

export const FeedList = () => {
  //state
  const { isLoading, error, isError, data } = useQuery({
    queryKey: ['feeds'],
    queryFn: getFeeds,
  });

  if (isLoading) return <div>Loading...</div>;

  if (isError) return 'An error has occurred: ' + error.message;

  console.log('data', data);

  //render
  return (
    <>
      {data.map((item: FeedItem) => {
        return (
          <FeedItem
            key={item.id}
            avatar={item.user.avatar}
            authorName={item.user.name}
            content={item.content}
            createdAt={item.createdAt}
            images={item.images}
            actionType={item.actionType}
            commentList={item.comments}
            totalLike={item.totalLike}
          />
        );
      })}
    </>
  );
};
