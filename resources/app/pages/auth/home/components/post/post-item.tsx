import { ShareOffCanvas } from '@/components/custom';
import { GetNewPostResponseType } from '@/models/post';
import moment from 'moment';
import { Card, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { CommentList } from '../comment/comment-list';
import { CreateComment } from '../comment/create-comment';
import { MoreActionDropdown } from './post-more-action-dropdown';
import { TotalCommentPost } from './post-total-comment';
import { TotalLikePost } from './post-total-like';
import { PostDetailContextProvider, usePostDetailContext } from '../../contexts';
import { ChosePostEmotion, EmotionType } from '@/components/shared/choose-emotion';

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
    <PostDetailContextProvider
      value={{
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
    </PostDetailContextProvider>
  );
};
//======================== Component PostItemHeader ========================//
const Header = () => {
  const { post } = usePostDetailContext();
  const actionType = 'Add new post';

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
              <p className="mb-0 text-primary">
                {moment(post?.created_at)
                  .startOf('day')
                  .fromNow()}
              </p>
            </div>
            <MoreActionDropdown />
          </div>
        </div>
      </div>
    </div>
  );
};

const Content = () => {
  const { post } = usePostDetailContext();

  const images = JSON.parse(post.image);

  const imageList = Array.isArray(images) ? images : [images];

  return (
    <>
      <div className="my-3">{post?.content}</div>

      <div
        onClick={() => {
          console.log('open detail');
        }}
      >
        {imageList && imageList.length > 0 ? (
          <div className="user-post">
            {imageList.length > 1 ? (
              <div className="d-grid grid-cols-2 grid-flow-col gap-3">
                {/* Image list */}
                {imageList?.map((imageUrl: string, index: number) => (
                  <div key={imageUrl} className="col-span-1">
                    <img src={imageUrl} alt={`post${index}`} className="img-fluid rounded w-100" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="user-post text-center">
                <Link to="#">
                  <img src={imageList[0]} alt="post1" className="img-fluid rounded w-100 mt-3" />
                </Link>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </>
  );
};
