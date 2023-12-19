import { ShareModal } from '@/components/custom';
import { GetNewPostResponseType } from '@/models/post';

import { ChooseEmotion } from '@/components/post/choose-emotion';
import { Top3Emotions } from '@/components/post/top3emotion';
import { TotalComment } from '@/components/post/total-comment';
import { TotalLike } from '@/components/post/total-like';
import { EmotionUnionType, ILiker } from '@/models/like';
import { Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { CommentList } from '../../../../../components/post/comment-list';
import { CreateComment } from '../../../../../components/post/create-comment';
import { PostItemContextProvider } from '../../contexts';
import { Content } from './content';
import { Header } from './header';
import { ImageGrid } from './image-grid';
import { useState } from 'react';

type PostItemProps = {
  item: GetNewPostResponseType;
};
export const PostItem = ({ item }: PostItemProps) => {
  if (item.post.status === 2) return null;

  // state
  const { like_counts_by_emotion, likers, total_comments, comments, post, top_emotions } = item;

  const [top3Emotion, setTop3Emotion] = useState<EmotionUnionType[]>([...top_emotions]);

  //render
  return (
    <PostItemContextProvider
      value={{
        item: item,
        post: item.post,
        like_counts_by_emotion: item.like_counts_by_emotion,
        total_comments: item.total_comments,
        comments: item.comments,
        likers: item.likers,
      }}
    >
      <Col sm={12}>
        <Card className=" card-block card-stretch card-height">
          <Card.Body>
            <Header />

            <Content />

            <ImageGrid />

            {/* Render top 3 emotion ,total emotion and total comment */}
            <div className="d-flex justify-content-between align-items-center flex-wrap mt-3 border-top pt-2">
              <div className="d-flex align-items-center">
                <Top3Emotions top3Emotion={top3Emotion} />
                <TotalLike
                  totalLike={(like_counts_by_emotion && like_counts_by_emotion) || 0}
                  likers={likers as ILiker[]}
                />
              </div>
              <div>
                <TotalComment totalComments={total_comments} comments={comments} />
              </div>
            </div>
            <div className="comment-area">
              <Row className="d-flex justify-content-between align-items-center mb-5 border-top border-bottom py-2">
                <Col sm={4} className="d-flex justify-content-center align-items-center">
                  <ChooseEmotion setTop3Emotion={setTop3Emotion} />
                </Col>

                <Col sm={4} className="d-flex justify-content-center align-items-center">
                  <div className="d-flex align-items-center feather-icon mt-2 mt-md-0">
                    <Link to="#" className="d-flex align-items-center">
                      <span className="material-symbols-outlined md-18">mode_comment</span>
                      <span className="ms-1">
                        <strong>Bình luận</strong>
                      </span>
                    </Link>
                  </div>
                </Col>
                <Col sm={4} className="d-flex justify-content-center align-items-center">
                  <ShareModal />
                </Col>
              </Row>

              <CommentList comments={comments} />

              <CreateComment postId={post.id} />
            </div>
          </Card.Body>
        </Card>
      </Col>
    </PostItemContextProvider>
  );
};
