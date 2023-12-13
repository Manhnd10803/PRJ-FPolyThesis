import { ShareOffCanvas } from '@/components/custom';
import { GetNewPostResponseType } from '@/models/post';

import { ChosePostEmotion } from '@/components/post/choose-emotion';
import { MoreActionDropdown } from '@/components/post/more-action';
import { TotalComment } from '@/components/post/total-comment';
import { TotalLike } from '@/components/post/total-like';
import { useChooseEmotionPost, useIncreaseTotalLikePost } from '@/hooks/useLikeQuery';
import { EmotionUnionType, ILiker } from '@/models/like';
import { IUser } from '@/models/user';
import { formatFullName } from '@/utilities/functions';
import { momentVi } from '@/utilities/functions/moment-locale';
import { Card, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { CommentList } from '../../../../../components/post/comment-list';
import { CreateComment } from '../../../../../components/post/create-comment';
import { formatImagesToRender, getClassImages } from '../../constants';
import { PostItemContextProvider, usePostContext, usePostItemContext } from '../../contexts';
import { StorageFunc } from '@/utilities/local-storage/storage-func';
import { useRef } from 'react';
import { checkIfReacted, getTopEmotions } from '@/utilities/functions/post';

type PostItemProps = {
  item: GetNewPostResponseType;
};
export const PostItem = ({ item }: PostItemProps) => {
  // state
  const userInfo = StorageFunc.getUser();

  const { mutate } = useChooseEmotionPost();
  const { manuallyIncreaseTotalLikePost } = useIncreaseTotalLikePost();

  const { like_counts_by_emotion, likers, total_comments, comments, post } = item;

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
                <ShareOffCanvas />
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
//======================== Component PostItemHeader ========================//
const Header = () => {
  const { post } = usePostItemContext();
  const actionType = 'đã thêm một bài viết';

  return (
    <div className="user-post-data">
      <div className="d-flex justify-content-between">
        <div className="me-3">
          <img className="avatar-50 rounded-circle" src={post?.user?.avatar} alt="avatar" loading="lazy" />
        </div>
        <div className="w-100">
          <div className="d-flex justify-content-between">
            <div>
              <h5 className="mb-0 d-inline-block">{formatFullName(post?.user)}</h5>
              <span className="mb-0 ps-1 d-inline-block">{actionType}</span>
              <p className="mb-0 text-primary">{momentVi(post?.updated_at).fromNow()}</p>
            </div>
            <MoreActionDropdown friendId={post?.user?.id} postId={post?.id} username={post?.user?.username} />
          </div>
        </div>
      </div>
    </div>
  );
};

const ContentImages = () => {
  const { post, item } = usePostItemContext();

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
                  loading="lazy"
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
              <img src={newImages[0]} alt="post1" className="img-fluid rounded w-100 mt-3" loading="lazy" />
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
