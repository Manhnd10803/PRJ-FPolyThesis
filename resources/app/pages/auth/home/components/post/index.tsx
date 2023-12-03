import useInfinitePosts from '@/hooks/usePostQuery';
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { PostContextProvider } from '../../contexts';
import { GetNewPostResponseType } from '@/models/post';
import { PostDetailModal } from '../post-detail';
import { PostItem } from './post-item';

const imageUrlLoading = 'https://i.gifer.com/ZKZg.gif';

export const PostContainer = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isError, isLoading } = useInfinitePosts();

  const [showDetail, setShowDetail] = useState(false);

  const { ref: endRef, inView: endInView } = useInView();

  const dataDetailRef = useRef<GetNewPostResponseType | null>(null);

  // func
  const handleClose = () => setShowDetail(false);

  const handleShowDetail = (post: GetNewPostResponseType) => {
    dataDetailRef.current = post;

    setShowDetail(true);
  };

  // effect
  useEffect(() => {
    if (endInView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [endInView, isFetchingNextPage, hasNextPage, fetchNextPage]);

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

        {/* //=========  modal detail post=========// */}
        <PostDetailModal show={showDetail} onClose={handleClose} data={dataDetailRef.current} />
      </PostContextProvider>
    </>
  );
};
