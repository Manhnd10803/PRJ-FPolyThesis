import { ShareOffCanvas } from '@/components/custom';
import { Card, Col } from 'react-bootstrap';
import { CommentItemProps } from '../comment/comment-item';
import { CommentList } from '../comment/comment-list';
import { CreateComment } from '../comment/create-comment';
import { FeedEmotion } from './feed-emotion';
import { FeedMoreActionDropdown } from './feed-more-action-dropdown';
import { FeedTotalComment } from './feed-total-comment';
import { FeedTotalLike } from './feed-total-like';
import { Link } from 'react-router-dom';

type FeedItemProps = {
  avatar: string;
  content: string;
  authorName: string;
  createdAt: string;
  actionType: string;
  images: string[];
  commentList: CommentItemProps[];
  totalLike: number;
};

//image
const imageUrl = 'https://picsum.photos/20';

export const FeedItem = ({
  avatar,
  content,
  authorName,
  createdAt,
  actionType,
  images,
  commentList,
  totalLike,
}: FeedItemProps) => {
  //func
  const renderContent = () => {
    return (
      <>
        <div className="mt-3">{content}</div>

        {images.length > 0 ? (
          <div className="user-post">
            {images.length > 1 ? (
              <div className=" d-grid grid-rows-2 grid-flow-col gap-3">
                {/* Image list */}
                {images.map((imageUrl: string, index: number) => (
                  <div key={imageUrl} className="row-span-1">
                    <img src={imageUrl} alt={`post${index}`} className="img-fluid rounded w-100" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="user-post text-center">
                <Link to="#">
                  <img src={imageUrl} alt="post1" className="img-fluid rounded w-100 mt-3" />
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
                <img className="rounded-circle img-fluid" src={avatar} alt="avatar" />
              </div>
              <div className="w-100">
                <div className="d-flex justify-content-between">
                  <div>
                    <h5 className="mb-0 d-inline-block">{authorName}</h5>
                    <span className="mb-0 ps-1 d-inline-block">{actionType}</span>
                    <p className="mb-0 text-primary">{createdAt}</p>
                  </div>
                  <FeedMoreActionDropdown />
                </div>
              </div>
            </div>
          </div>
          {renderContent()}
          <div className="comment-area mt-3">
            <div className="d-flex justify-content-between align-items-center flex-wrap">
              <div className="like-block position-relative d-flex align-items-center">
                <div className="d-flex align-items-center">
                  <FeedEmotion />
                  <FeedTotalLike totalLike={totalLike} />
                </div>
                <FeedTotalComment />
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
