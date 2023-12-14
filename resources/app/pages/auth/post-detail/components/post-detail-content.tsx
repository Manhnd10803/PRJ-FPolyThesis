import { ShareModal } from '@/components/custom';
import { ChosePostEmotion } from '@/components/post/choose-emotion';
import { CommentList } from '@/components/post/comment-list';
import { CreateComment } from '@/components/post/create-comment';
import { TotalComment } from '@/components/post/total-comment';
import { TotalLike } from '@/components/post/total-like';
import { EmotionUnionType, ILiker } from '@/models/like';
import { Card } from 'react-bootstrap';
import { usePostDetailContext } from '../contexts';
import { Content } from './content';
import { Header } from './header';
import { useChooseEmotionPost, useIncreaseTotalLikePost } from '@/hooks/useLikeQuery';
import { checkIfReacted, getTopEmotions } from '@/utilities/functions/post';
import { useRef } from 'react';
import { StorageFunc } from '@/utilities/local-storage/storage-func';
import { IUser } from '@/models/user';

export const PostDetailContent = () => {
  // state
  const userInfo = StorageFunc.getUser();

  const { like_counts_by_emotion, likers, total_comments, comments, post } = usePostDetailContext();

  const { mutate } = useChooseEmotionPost();
  const { manuallyIncreaseTotalLikePost } = useIncreaseTotalLikePost();

  // func
  // kiểm tra xem đã like chưa, nếu đã like thì trả về emotion, chưa like thì trả về null
  const emotionSelected = checkIfReacted(likers as ILiker[], userInfo as IUser);

  const isIncrease = useRef(Boolean(emotionSelected));

  // lấy ra 3 loại emotion được like nhiều nhất dựa vào like_counts_by_emotion, sắp xếp theo thứ tự giảm dần
  const top3Emotion = getTopEmotions(like_counts_by_emotion);

  const handleChangeEmotion = (emotion: EmotionUnionType) => {
    // Kiểm tra xem đã like chưa, nếu đã like rồi thì bỏ like, chưa like thì like
    if (!emotionSelected && !isIncrease.current) {
      isIncrease.current = true;
      manuallyIncreaseTotalLikePost(post.id);
    }
    mutate({
      emotion: emotion,
      postId: post.id,
    });
  };

  // render
  return (
    <Card className="card-block card-stretch card-height mt-3">
      <Card.Body style={{ height: '77vh', overflowY: 'scroll' }}>
        <Header />
        <Content />

        <div className="comment-area mt-3">
          <div className="d-flex justify-content-between align-items-center flex-wrap">
            <div className="like-block position-relative d-flex align-items-center">
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

              <TotalComment totalComments={total_comments} comments={comments} />
            </div>

            <ShareModal />
          </div>
          <hr />
          <div>
            <CommentList comments={comments} />
          </div>
        </div>
      </Card.Body>
      <div className="" style={{ marginBottom: '15px' }}>
        <CreateComment postId={post.id} isDetail />
      </div>
    </Card>
  );
};
