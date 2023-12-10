import { ShareOffCanvas } from '@/components/custom';
import { ChosePostEmotion, EmotionType } from '@/components/shared/choose-emotion';
import { Card } from 'react-bootstrap';
import { CommentList } from '../comment/comment-list';
import { CreateComment } from '../comment/create-comment';
import { TotalComment } from '../total-comment';
import { TotalLike } from '../total-like';
import { Content } from './content';
import { Header } from './header';
import { usePostDetailContext } from '../../contexts';
import { IUser } from '@/models/user';

export const PostDetailContent = () => {
  // state
  const { like_counts_by_emotion, like, total_comments, comments, post } = usePostDetailContext();
  // func
  const handleChangeEmotion = (emotion: EmotionType) => {
    console.log('emotion', emotion);
    // nếu đã like rồi thì bỏ like
    // nếu chưa like thì like
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

                <TotalLike totalLike={like_counts_by_emotion?.total_likes as number} listUserLike={like as IUser[]} />
              </div>

              <TotalComment totalComments={total_comments} comments={comments} />
            </div>

            <ShareOffCanvas />
          </div>
          <hr />
          <CommentList comments={comments} />
          <CreateComment postId={post.id} />
        </div>
      </Card.Body>
    </Card>
  );
};
