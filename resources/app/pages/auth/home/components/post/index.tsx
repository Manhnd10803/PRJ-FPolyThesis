import useInfinitePosts from '@/hooks/usePostQuery';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { PostContextProvider } from '../../contexts';
import { PostList } from './post-list';

const imageUrlLoading = 'https://i.gifer.com/ZKZg.gif';

export const PostContainer = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isError, isLoading } = useInfinitePosts();

  const { ref: endRef, inView: endInView } = useInView();

  // effect
  useEffect(() => {
    if (endInView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [endInView, isFetchingNextPage, hasNextPage, fetchNextPage]);

  if (isError) {
    return <span>Error...</span>;
  }

  if (!data) return null;

  if (isLoading)
    return (
      <div className="col-sm-12 text-center">
        <img src={imageUrlLoading} alt="loader" style={{ height: '50px' }} />
      </div>
    );

  return (
    <>
      <PostContextProvider
        value={{
          postList: data,
        }}
      >
        <PostList />
        {/*=========  loading more icon=========*/}

        {isFetchingNextPage ? (
          <div className="col-sm-12 text-center">
            <img src={imageUrlLoading} alt="loader" style={{ height: '50px' }} />
          </div>
        ) : (
          <div className="col-sm-12 text-center p-2 pb-4">
            <h4>Không còn bài viết cũ hơn</h4>
          </div>
        )}
        <div ref={endRef}></div>
      </PostContextProvider>
    </>
  );
};
