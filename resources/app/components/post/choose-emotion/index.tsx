import { CustomToggle } from '@/components/custom';
import { Dropdown, Image, OverlayTrigger, Tooltip } from 'react-bootstrap';

//image
import like from '@/assets/images/emotion/like.png';

import { EmotionUnionType, emotionData, emotionSource } from '@/models/like';

type ChosePostEmotionProps = {
  top3Emotion?: EmotionUnionType[];
};

export const ChosePostEmotion = ({ top3Emotion }: ChosePostEmotionProps) => {
  return (
    <div className="like-data">
      <Dropdown>
        <Dropdown.Toggle as={CustomToggle}>
          <div className="iq-media-group">
            {top3Emotion && top3Emotion.length > 0 ? (
              top3Emotion.map(emotion => {
                return (
                  <span className="iq-media" key={emotion}>
                    <Image className="img-fluid rounded-circle avatar-25" src={emotionSource[emotion]} alt="" />
                  </span>
                );
              })
            ) : (
              <span className="iq-media">
                <Image className="img-fluid rounded-circle avatar-30" src={like} alt="" />
              </span>
            )}
          </div>
        </Dropdown.Toggle>
      </Dropdown>
    </div>
  );
};
