import { PostContextProvider } from '../../contexts';
import { PostList } from './post-list';
import { useQuery } from '@tanstack/react-query';
import { PostService } from '@/apis/services/post.service';

const imageUrlLoading = 'https://i.gifer.com/ZKZg.gif';

const fetchPostNewFeed = async () => {
  const { data } = await PostService.getPostNewFeed();
  return data;
};

export const PostContainer = () => {
  const { isLoading, error, isError, data } = useQuery({
    queryKey: ['postNewFeeds'],
    queryFn: fetchPostNewFeed,
  });

  if (!data) return null;

  return (
    <>
      <PostContextProvider
        value={{
          postList: data,
        }}
      >
        <PostList />
        {/*=========  loading more icon=========*/}
        <div className="col-sm-12 text-center">
          <img src={imageUrlLoading} alt="loader" style={{ height: '50px' }} />
        </div>
      </PostContextProvider>
    </>
  );
};
