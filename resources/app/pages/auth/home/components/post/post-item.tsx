import { ShareModal } from '@/components/custom';
import { GetNewPostResponseType } from '@/models/post';

import { ChosePostEmotion } from '@/components/post/choose-emotion';
import { TotalComment } from '@/components/post/total-comment';
import { TotalLike } from '@/components/post/total-like';
import { useChooseEmotionPost, useIncreaseTotalLikePost } from '@/hooks/useLikeQuery';
import { EmotionUnionType, ILiker } from '@/models/like';
import { IUser } from '@/models/user';
import { checkIfReacted, getTopEmotions } from '@/utilities/functions/post';
import { StorageFunc } from '@/utilities/local-storage/storage-func';
import { useRef } from 'react';
import { Card, Col } from 'react-bootstrap';
import { CommentList } from '../../../../../components/post/comment-list';
import { CreateComment } from '../../../../../components/post/create-comment';
import { PostItemContextProvider } from '../../contexts';
import { Content } from './content';
import { Header } from './header';
import { ImageGrid } from './image-grid';
import { Link } from 'react-router-dom';

type PostItemProps = {
  item: GetNewPostResponseType;
};
export const PostItem = ({ item }: PostItemProps) => {
  // state
  const userInfo = StorageFunc.getUser();

  const { mutate } = useChooseEmotionPost();
  const { manuallyIncreaseTotalLikePost } = useIncreaseTotalLikePost();

  const { like_counts_by_emotion, likers, total_comments, comments, post } = item;

  const emotionSelected = checkIfReacted(likers as ILiker[], userInfo as IUser);

  const isIncrease = useRef(Boolean(emotionSelected));

  // lấy ra 3 loại emotion được like nhiều nhất
  const top3Emotion = getTopEmotions(like_counts_by_emotion);

  const handleChangeEmotion = (emotion: EmotionUnionType) => {
    // Kiểm tra xem đã like chưa
    if (!emotionSelected && !isIncrease.current) {
      isIncrease.current = true;
      manuallyIncreaseTotalLikePost(post.id);
    }
    mutate({
      emotion: emotion,
      postId: post.id,
    });
  };

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
            <hr />
            <div className="d-flex justify-content-between align-items-center flex-wrap">
              <div className="d-flex align-items-center">
                <ChosePostEmotion
                  onChange={handleChangeEmotion}
                  defaultValue={emotionSelected}
                  top3Emotion={top3Emotion}
                />
                <TotalLike
                  totalLike={(like_counts_by_emotion && like_counts_by_emotion?.total_likes) || 0}
                  likers={likers as ILiker[]}
                />
              </div>
              <div>
                <TotalComment totalComments={total_comments} comments={comments} />
              </div>
            </div>
            <hr />
            {/* Action  */}
            <div className="comment-area mt-3">
              <div className="d-flex justify-content-between align-items-center flex-wrap">
                <div className="d-flex align-items-center feather-icon mt-2 mt-md-0">
                  <Link to="#" className="d-flex align-items-center">
                    <span className="material-symbols-outlined md-18">thumb_up</span>
                    <span className="ms-1">
                      <strong>Thích</strong>
                    </span>
                  </Link>
                </div>
                <div className="d-flex align-items-center feather-icon mt-2 mt-md-0">
                  <Link to="#" className="d-flex align-items-center">
                    <span className="material-symbols-outlined md-18">mode_comment</span>
                    <span className="ms-1">
                      <strong>Bình luận</strong>
                    </span>
                  </Link>
                </div>
                <ShareModal />
              </div>
              <hr />

              <CommentList comments={comments} />

              <CreateComment postId={post.id} />
            </div>
          </Card.Body>
        </Card>
      </Col>
    </PostItemContextProvider>
  );
};
