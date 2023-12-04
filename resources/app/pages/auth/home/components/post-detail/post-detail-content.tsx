import { ShareOffCanvas } from '@/components/custom';
import { ChosePostEmotion, EmotionType } from '@/components/shared/choose-emotion';
import { Card } from 'react-bootstrap';
import { CommentList } from '../comment/comment-list';
import { CreateComment } from '../comment/create-comment';
import { TotalCommentPost } from '../post/post-total-comment';
import { TotalLikePost } from '../post/post-total-like';
import { Content } from './content';
import { Header } from './header';

export const PostDetailContent = () => {
  // state

  // func
  const handleChangeEmotion = (emotion: EmotionType) => {
    console.log('emotion', emotion);
  };

  // render
  return (
    <Card className="card-block card-stretch card-height mt-3">
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
  );
};
