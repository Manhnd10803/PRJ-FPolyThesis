import { ShareOffCanvas } from '@/components/custom';
import { GetNewPostResponseType } from '@/models/post';

import { Card, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { CommentList } from '../comment/comment-list';
import { CreateComment } from '../comment/create-comment';
import { MoreActionDropdown } from '../more-action-dropdown';
import { TotalCommentPost } from './post-total-comment';
import { TotalLikePost } from './post-total-like';
import { PostItemContextProvider, usePostContext, usePostItemContext } from '../../contexts';
import { ChosePostEmotion, EmotionType } from '@/components/shared/choose-emotion';
import { momentVi } from '@/utilities/functions/moment-locale';
import { formatImagesToRender, getClassImages } from '../../constants';

type PostItemProps = {
  item: GetNewPostResponseType;
};
export const PostItem = ({ item }: PostItemProps) => {
  // state

  const handleChangeEmotion = (emotion: EmotionType) => {
    console.log('emotion', emotion);
  };
  //render
  return (
    <PostItemContextProvider
      value={{
        item: item,
        post: item.post,
        like_counts_by_emotion: item.like_counts_by_emotion,
        comments: item.comments,
      }}
    >
      <Col sm={12}>
        <Card className=" card-block card-stretch card-height">
          <Card.Body>
            <Header />
            <Content />

            <div className="comment-area mt-3">
              <div className="d-flex justify-content-between align-items-center flex-wrap">
                <div className="like-block position-relative d-flex align-items-center">
                  <div className="d-flex align-items-center">
                    <ChosePostEmotion onChange={handleChangeEmotion} />

                    <TotalLikePost />
                  </div>
                  <TotalCommentPost />
                </div>
                <ShareOffCanvas />
              </div>
              <hr />
              <CommentList />
              <CreateComment />
            </div>
          </Card.Body>
        </Card>
      </Col>
    </PostItemContextProvider>
  );
};
//======================== Component PostItemHeader ========================//
const Header = () => {
  const { post } = usePostItemContext();
  const actionType = 'đã thêm một bài viết';

  return (
    <div className="user-post-data">
      <div className="d-flex justify-content-between">
        <div className="me-3">
          <img className="avatar-50 rounded-circle" src={post?.user?.avatar} alt="avatar" />
        </div>
        <div className="w-100">
          <div className="d-flex justify-content-between">
            <div>
              <h5 className="mb-0 d-inline-block">{post?.user?.username}</h5>
              <span className="mb-0 ps-1 d-inline-block">{actionType}</span>
              <p className="mb-0 text-primary">{momentVi(post?.updated_at).fromNow()}</p>
            </div>
            <MoreActionDropdown friendId={post?.user?.id} postId={post?.id} />
          </div>
        </div>
      </div>
    </div>
  );
};

const ContentImages = () => {
  const { post: post, item } = usePostItemContext();

  const { handleShowDetail } = usePostContext();

  const { newImages, originalImages } = formatImagesToRender(post?.image);

  if (newImages.length === 0) return null;

  return (
    <div onClick={() => handleShowDetail(item)} style={{ cursor: 'pointer' }}>
      <div className="user-post">
        {newImages.length > 1 ? (
          <div className={`d-grid gap-3 ${getClassImages(newImages.length)}`}>
            {/* Image list */}
            {newImages?.map((imageUrl: string, index: number) => (
              <div
                key={imageUrl}
                className="col-span-1 rounded"
                style={{ position: 'relative', border: '1px  #ececec', borderStyle: 'dotted' }}
              >
                <img
                  style={{ objectFit: 'cover', aspectRatio: '1/1' }}
                  src={imageUrl}
                  alt={`post${index}`}
                  className="img-fluid rounded w-100"
                />
                {/* last image */}
                {originalImages.length > 4 && index === 3 && (
                  <div
                    className="d-flex flex-column align-items-center justify-content-center h-100"
                    style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backdropFilter: 'blur(10px)' }}
                  >
                    <span style={{ fontSize: '40px', color: 'white' }} className="material-symbols-outlined">
                      add
                    </span>
                    <span style={{ fontSize: '20px' }}>Xem thêm...</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="user-post text-center">
            <Link to="#">
              <img src={newImages[0]} alt="post1" className="img-fluid rounded w-100 mt-3" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

const Content = () => {
  const { post } = usePostItemContext();
  // render
  return (
    <>
      <div className="my-3">{post?.content}</div>

      <ContentImages />
    </>
  );
};
