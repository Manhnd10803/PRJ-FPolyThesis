import { ShareOffCanvas } from '@/components/custom';
import { GetNewPostResponseType } from '@/models/post';

import { Card, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { CommentList } from '../comment/comment-list';
import { CreateComment } from '../comment/create-comment';
import { MoreActionDropdown } from './post-more-action-dropdown';
import { TotalCommentPost } from './post-total-comment';
import { TotalLikePost } from './post-total-like';
import { PostDetailContextProvider, usePostDetailContext } from '../../contexts';
import { ChosePostEmotion, EmotionType } from '@/components/shared/choose-emotion';
//@ts-ignore
import moment from 'moment/min/moment-with-locales';
import 'moment/locale/vi';
moment.locale('vi');

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
              <p className="mb-0 text-primary">
                {moment(post?.updated_at)
                  .locale('vi')
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

const ContentImages = () => {
  const { post } = usePostDetailContext();

  const { newImages, originalImages } = formatImagesToRender(post?.image);

  if (newImages.length === 0) return null;

  return (
    <div onClick={() => {}}>
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
  const { post } = usePostDetailContext();

  // render
  return (
    <>
      <div className="my-3">{post?.content}</div>

      <ContentImages />
    </>
  );
};

const getClassImages = (length: number) => {
  if (length >= 3) return 'grid-cols-2 grid-rows-2 grid-flow-col gap-3';
  return 'grid-cols-2 grid-flow-col gap-3';
};

const formatImagesToRender = (imagesJson: string) => {
  const images: string | string[] = JSON.parse(imagesJson);

  const imageList = Array.isArray(images) ? images : [images];

  return {
    originalImages: imageList,
    newImages: imageList.length > 4 ? imageList.slice(0, 4) : imageList,
  };
};
