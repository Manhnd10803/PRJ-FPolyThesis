import { CustomToggle } from '@/components/custom';
import { Dropdown, Image } from 'react-bootstrap';

//image
import like from '@/assets/images/emotion/like.png';

import { EmotionUnionType, emotionSource } from '@/models/like';

type Top3EmotionsProps = {
  top3Emotion: EmotionUnionType[];
};

export const Top3Emotions = ({ top3Emotion }: Top3EmotionsProps) => {
  if (!top3Emotion || top3Emotion.length === 0) {
    return (
      <span className="iq-media">
        <Image className="img-fluid rounded-circle avatar-30" src={like} alt="" />
      </span>
    );
  }
  return (
    <div className="like-data">
      <Dropdown>
        <Dropdown.Toggle as={CustomToggle}>
          <div className="iq-media-group">
            {top3Emotion.map(emotion => {
              return (
                <span className="iq-media" key={emotion}>
                  <Image className="img-fluid rounded-circle avatar-25" src={emotionSource[emotion]} alt="" />
                </span>
              );
            })}
          </div>
        </Dropdown.Toggle>
      </Dropdown>
    </div>
  );
};
