import { ShareOffCanvas } from '@/components/custom';
import { Card, Col } from 'react-bootstrap';
import { CommentItemProps } from '../comment/comment-item';
import { CommentList } from '../comment/comment-list';
import { CreateComment } from '../comment/create-comment';
import { ChosePostEmotion } from './post-emotion';
import { MoreActionDropdown } from './post-more-action-dropdown';
import { TotalCommentPost } from './post-total-comment';
import { TotalLikePost } from './post-total-like';
import { Link } from 'react-router-dom';
import moment from 'moment';

type PostItemProps = {
  avatar?: string;
  content: string;
  authorName: string;
  createdAt: Date;
  updatedAt: Date;
  actionType?: string;
  images: string;
  commentList: CommentItemProps[];
  totalLike: number;
};

//image

export const PostItem = ({
  avatar,
  content,
  authorName,
  createdAt,
  actionType = 'Add new post',
  images: imagesEncoded,
  commentList,
  totalLike,
}: PostItemProps) => {
  //func
  const renderContent = () => {
    const images = JSON.parse(imagesEncoded);

    const imageList = Array.isArray(images) ? images : [images];

    return (
      <>
        <div className="my-3">{content}</div>

        {imageList && imageList.length > 0 ? (
          <div className="user-post">
            {imageList.length > 1 ? (
              <div className=" d-grid grid-cols-2 grid-flow-col gap-3">
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
      </>
    );
  };
  //render
  return (
    <Col sm={12}>
      <Card className=" card-block card-stretch card-height">
        <Card.Body>
          <div className="user-post-data">
            <div className="d-flex justify-content-between">
              <div className="me-3">
                <img className="avatar-50 rounded-circle" src={avatar} alt="avatar" />
              </div>
              <div className="w-100">
                <div className="d-flex justify-content-between">
                  <div>
                    <h5 className="mb-0 d-inline-block">{authorName}</h5>
                    <span className="mb-0 ps-1 d-inline-block">{actionType}</span>
                    <p className="mb-0 text-primary">{moment(createdAt).startOf('day').fromNow()}</p>
                  </div>
                  <MoreActionDropdown />
                </div>
              </div>
            </div>
          </div>
          {renderContent()}
          <div className="comment-area mt-3">
            <div className="d-flex justify-content-between align-items-center flex-wrap">
              <div className="like-block position-relative d-flex align-items-center">
                <div className="d-flex align-items-center">
                  <ChosePostEmotion />
                  <TotalLikePost totalLike={totalLike} />
                </div>
                <TotalCommentPost />
              </div>
              <ShareOffCanvas />
            </div>
            <hr />
            <CommentList commentList={commentList} />
            <CreateComment />
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};
