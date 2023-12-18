import { CustomToggle, ShareModal } from '@/components/custom';
import { GetNewPostResponseType } from '@/models/post';

import { ChosePostEmotion } from '@/components/post/choose-emotion';
import { TotalComment } from '@/components/post/total-comment';
import { TotalLike } from '@/components/post/total-like';
import { useChooseEmotionPost, useIncreaseTotalLikePost } from '@/hooks/useLikeQuery';
import { EmotionUnionType, ILiker, emotionData, emotionSource, EmotionType } from '@/models/like';
import { IUser } from '@/models/user';
import { checkIfReacted, getTopEmotions } from '@/utilities/functions/post';
import { StorageFunc } from '@/utilities/local-storage/storage-func';
import { useEffect, useRef, useState } from 'react';
import { Card, Col, Dropdown, Image, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import { CommentList } from '@/components/post/comment-list';
import { CreateComment } from '@/components/post/create-comment';
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
  const { manuallyIncreaseTotalLikePost, manuallyDecreaseTotalLikePost } = useIncreaseTotalLikePost('profile');

  const { like_counts_by_emotion, likers, total_comments, comments, post } = item;

  const emotion = checkIfReacted(likers as ILiker[], userInfo as IUser);
  const [emotionSelected, setEmotionSelected] = useState<EmotionUnionType | undefined>(emotion);

  const nameEmotionDefault = emotionData.find(e => e.id === emotionSelected)?.name;

  const [nameEmotion, setNameEmotion] = useState<string | undefined>(nameEmotionDefault);
  const isIncrease = useRef(Boolean(emotionSelected));
  const [top3Emotion, setTop3Emotion] = useState<EmotionUnionType[]>([]);
  // lấy ra 3 loại emotion được like nhiều nhất
  useEffect(() => {
    setTop3Emotion(getTopEmotions(like_counts_by_emotion));
  }, [emotionSelected]);

  // function
  const handleChangeEmotionProfile = (emotion: EmotionUnionType) => {
    console.log(emotionSelected, emotion, post.id);
    const condition = `${emotionSelected === emotion ? 'A' : 'B'}-${isIncrease.current ? '1' : '2'}`;

    switch (condition) {
      case 'A-1':
        setEmotionSelected(undefined);
        setNameEmotion(undefined);
        console.log('giảm like');
        manuallyDecreaseTotalLikePost(post.id);
        isIncrease.current = false;
        break;
      case 'B-1':
      case 'B-2':
        setEmotionSelected(emotion);
        emotionData.forEach(item => {
          if (item.id === emotion) {
            setNameEmotion(item.name);
          }
        });
        isIncrease.current = true;

        if (condition === 'B-2') {
          manuallyIncreaseTotalLikePost(post.id);
        }
        break;
    }

    if (!emotionSelected && !isIncrease.current) {
      isIncrease.current = true;
      console.log('tăng like');

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
            <div className="d-flex justify-content-between align-items-center flex-wrap mt-3 border-top pt-2">
              <div className="d-flex align-items-center">
                <ChosePostEmotion top3Emotion={top3Emotion} />
                <TotalLike
                  totalLike={(like_counts_by_emotion && like_counts_by_emotion?.total_likes) || 0}
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
                  <Dropdown drop="up-centered">
                    <Dropdown.Toggle as={CustomToggle}>
                      <div className="d-flex align-items-center feather-icon mt-2 mt-md-0">
                        <Link to="#" className="d-flex align-items-center">
                          {/* <span className="material-symbols-outlined md-18">thumb_up</span> */}
                          {emotionSelected ? (
                            <Image
                              className="img-fluid rounded-circle avatar-30"
                              src={emotionSource[emotionSelected]}
                              alt=""
                            />
                          ) : (
                            <span className="material-symbols-outlined md-18">thumb_up</span>
                          )}
                          <span className={`ms-1 ${isIncrease.current !== true ? '' : 'text-primary'}`}>
                            <strong>{nameEmotion || 'Thích'}</strong>
                          </span>
                        </Link>
                      </div>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="dropdown-menu-top-like">
                      {emotionData.map(e => {
                        return (
                          <OverlayTrigger key={e.id} placement="top" overlay={<Tooltip>{e.name}</Tooltip>}>
                            <span className="hover-span" onClick={() => handleChangeEmotionProfile(e.id)}>
                              <Image
                                className="img-fluid rounded-circle avatar-30 me-2 hover-image"
                                src={e.emotion}
                                alt=""
                              />
                            </span>
                          </OverlayTrigger>
                        );
                      })}
                    </Dropdown.Menu>
                  </Dropdown>
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
