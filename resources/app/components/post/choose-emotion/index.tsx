import { CustomToggle } from '@/components/custom';
import { useChooseEmotionPost, useChangeTotalLikePost, typeQueryKey } from '@/hooks/useLikeQuery';
import { EmotionUnionType, ILiker, emotionData, emotionName, emotionSource } from '@/models/like';
import { IUser } from '@/models/user';
import { usePostItemContext as usePostItemContextHome } from '@/pages/auth/home/contexts';
import { usePostItemContext as usePostItemContextProfile } from '@/pages/auth/profile/timeline/post/contexts';
import { checkIfReacted } from '@/utilities/functions/post';
import { StorageFunc } from '@/utilities/local-storage/storage-func';
import React, { useRef, useState } from 'react';
import { Dropdown, Image, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';

type ChooseEmotionProps = {
  setTop3Emotion: React.Dispatch<React.SetStateAction<EmotionUnionType[]>>;
  dropDownMenuClassName?: 'dropdown-menu-top-like' | 'dropdown-menu-top-like-profile';
  type: typeQueryKey;
};
export const ChooseEmotion = ({
  setTop3Emotion,
  dropDownMenuClassName = 'dropdown-menu-top-like',
  type,
}: ChooseEmotionProps) => {
  const userInfo = StorageFunc.getUser();

  const { likers, post } = type === 'profile' ? usePostItemContextProfile() : usePostItemContextHome();

  const isReacted = useRef(checkIfReacted(likers as ILiker[], userInfo as IUser));

  const [emotionSelected, setEmotionSelected] = useState<EmotionUnionType | undefined>(isReacted.current);

  const { mutate } = useChooseEmotionPost();

  const { manuallyIncreaseTotalLikePost, manuallyDecreaseTotalLikePost } = useChangeTotalLikePost(
    type === 'profile' ? 'profile' : 'posts',
  );

  // function
  const handleChangeEmotion = (emotion: EmotionUnionType) => {
    let emotionClone: EmotionUnionType | undefined = emotion;

    // đã like rồi thì có 2 trường hợp
    if (isReacted.current) {
      // 1. click vào emotion đã like -> bỏ like
      if (emotion === isReacted.current) {
        emotionClone = undefined;

        manuallyDecreaseTotalLikePost(post.id);

        setTop3Emotion(prev => {
          const newTop3Emotion = prev.filter(e => e !== emotion);
          return newTop3Emotion;
        });

        isReacted.current = undefined;
      } else {
        // 2. click vào emotion khác -> thay đổi emotion

        setTop3Emotion(prev => {
          const clone = [...prev];
          const index = prev.findIndex(e => e === emotion);

          if (index === -1) {
            clone.splice(index, 1, emotion);
            return clone;
          }
          return prev;
        });

        isReacted.current = emotion;
      }
    } else {
      // chưa like thì like
      manuallyIncreaseTotalLikePost(post.id);

      setTop3Emotion(prev => {
        if (prev.length === 3) {
          prev.pop();
        }
        return [...prev, emotion];
      });

      isReacted.current = emotion;
    }
    setEmotionSelected(emotionClone);

    mutate({
      emotion: emotion,
      postId: post.id,
    });
  };

  return (
    <Dropdown drop="up-centered">
      <Dropdown.Toggle as={CustomToggle}>
        <div className="d-flex align-items-center feather-icon mt-2 mt-md-0">
          <Link to="#" className="d-flex align-items-center">
            {/* <span className="material-symbols-outlined md-18">thumb_up</span> */}
            {emotionSelected ? (
              <Image className="img-fluid rounded-circle avatar-30" src={emotionSource[emotionSelected]} alt="" />
            ) : (
              <span className="material-symbols-outlined md-18">thumb_up</span>
            )}
            <span className={`ms-1 ${Boolean(emotionSelected) ? '' : 'text-primary'}`}>
              <strong>{emotionSelected ? emotionName[emotionSelected] : emotionName.like}</strong>
            </span>
          </Link>
        </div>
      </Dropdown.Toggle>
      <Dropdown.Menu className={dropDownMenuClassName}>
        {emotionData.map(e => {
          return (
            <OverlayTrigger key={e.id} placement="top" overlay={<Tooltip>{e.name}</Tooltip>}>
              <span className="hover-span" onClick={() => handleChangeEmotion(e.id)}>
                <Image className="img-fluid rounded-circle avatar-30 me-2 hover-image" src={e.emotion} alt="" />
              </span>
            </OverlayTrigger>
          );
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
};
