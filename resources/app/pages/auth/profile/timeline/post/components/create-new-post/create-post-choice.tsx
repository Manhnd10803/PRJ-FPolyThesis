import { useMemo } from 'react';

import addImageUrl from '@/assets/images/add-image.png';
import checkinUrl from '@/assets/images/check-in.png';
import feelingUrl from '@/assets/images/feeling.png';
import tagFriendUrl from '@/assets/images/tag-friend.png';

import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';

type CreateNewPostChoiceProps = {
  onClickAddPhoto: () => void;
};

export const CreateNewPostChoice = ({ onClickAddPhoto }: CreateNewPostChoiceProps) => {
  const choiceConfig = useMemo(() => {
    return [
      {
        icon: addImageUrl,
        title: 'Photo/Video',
        onClick: onClickAddPhoto,
      },
      {
        icon: feelingUrl,
        title: 'Feeling/Activity',
      },
      {
        icon: tagFriendUrl,
        title: 'Tag Friend',
      },
      {
        icon: checkinUrl,
        title: 'Check in',
      },
    ];
  }, []);

  return (
    <ul className="d-flex flex-wrap align-items-center list-inline m-0 p-0">
      {choiceConfig.map(item => (
        <li className="ms-3 pointer" key={item.title}>
          <OverlayTrigger placement="top" overlay={<Tooltip>{item.title}</Tooltip>}>
            <Link to="#" onClick={item.onClick} className="bg-soft-primary rounded p-2 pointer">
              <img src={item.icon} alt="icon" className="img-fluid" />
            </Link>
          </OverlayTrigger>
        </li>
      ))}
    </ul>
  );
};
