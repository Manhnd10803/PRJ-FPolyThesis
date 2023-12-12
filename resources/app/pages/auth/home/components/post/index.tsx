import useInfinitePosts from '@/hooks/usePostQuery';
import { GetNewPostResponseType } from '@/models/post';
import { pathName } from '@/routes/path-name';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';
import { PostContextProvider } from '../../contexts';
import { PostItem } from './post-item';

const imageUrlLoading = 'https://i.gifer.com/ZKZg.gif';

export const PostContainer = () => {
  const navigate = useNavigate();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isError, isLoading } = useInfinitePosts();

  const { ref: endRef, inView: endInView } = useInView();

  // func
  const handleShowDetail = (postItem: GetNewPostResponseType) => {
    navigate(`${pathName.POST}/${postItem.post.id}`, { state: { data: postItem } });
  };

  // effect
  useEffect(() => {
    if (endInView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [endInView, isFetchingNextPage, hasNextPage, fetchNextPage]);

  // render
  if (isError) {
    return <span>Error...</span>;
  }

  if (isLoading)
    return (
      <div className="col-sm-12 text-center">
        <img src={imageUrlLoading} alt="loader" style={{ height: '50px' }} />
      </div>
    );

  if (!data) return null;

  return (
    <>
      <PostContextProvider
        value={{
          postList: data,
          handleShowDetail,
        }}
      >
        <>
          {data.map(item => {
            return <PostItem key={item.post.id} item={item} />;
          })}
        </>
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
