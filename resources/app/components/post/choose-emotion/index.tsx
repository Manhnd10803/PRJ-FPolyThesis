import { CustomToggle } from '@/components/custom';
import { useState } from 'react';
import { Dropdown, Image, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';

//image
import haha from '@/assets/images/emotion/haha.png';
import like from '@/assets/images/emotion/like.png';
import love from '@/assets/images/emotion/love.png';
import wow from '@/assets/images/emotion/wow.png';
import sad from '@/assets/images/emotion/sad.png';
import angry from '@/assets/images/emotion/angry.png';

import { EmotionUnionType, emotionData, emotionSource } from '@/models/like';

type ChosePostEmotionProps = {
  defaultValue?: EmotionUnionType;
  top3Emotion?: EmotionUnionType[];
  onChange: (emotion: EmotionUnionType) => void;
};

export const ChosePostEmotion = ({ defaultValue, top3Emotion, onChange }: ChosePostEmotionProps) => {
  const [emotionSelected, setEmotionSelected] = useState<EmotionUnionType | undefined>(defaultValue);

  const handleChangeEmotion = (emotion: EmotionUnionType) => {
    setEmotionSelected(emotion);
    onChange && onChange(emotion);
  };

  return (
    <div className="like-data me-4">
      <Dropdown>
        <Dropdown.Toggle as={CustomToggle}>
          <div className="iq-media-group">
            {top3Emotion && top3Emotion.length > 0 ? (
              top3Emotion.map(emotion => {
                return (
                  <span className="iq-media" key={emotion}>
                    <Image className="img-fluid rounded-circle avatar-30" src={emotionSource[emotion]} alt="" />
                  </span>
                );
              })
            ) : (
              <span className="iq-media">
                <Image className="img-fluid rounded-circle avatar-30" src={like} alt="" />
              </span>
            )}
            {emotionSelected && (
              <span className="iq-media">
                <Image
                  style={{ transform: 'scale(1.6) translateX(10px)' }}
                  className="img-fluid rounded-circle avatar-30"
                  src={emotionSource[emotionSelected]}
                  alt=""
                />
              </span>
            )}
          </div>
        </Dropdown.Toggle>
        <Dropdown.Menu className="py-2">
          {emotionData.map(e => {
            return (
              <OverlayTrigger key={e.id} placement="top" overlay={<Tooltip>{e.name}</Tooltip>}>
                <span onClick={() => handleChangeEmotion(e.id)}>
                  <Image className="img-fluid rounded-circle avatar-30 me-2" src={e.emotion} alt="" />
                </span>
              </OverlayTrigger>
            );
          })}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};
