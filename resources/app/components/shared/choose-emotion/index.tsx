import { CustomToggle } from '@/components/custom';
import { useState } from 'react';
import { Dropdown, OverlayTrigger, Tooltip } from 'react-bootstrap';

//image
import emotion1 from '@/assets/images/emotion/01.png';
import emotion2 from '@/assets/images/emotion/02.png';
import emotion3 from '@/assets/images/emotion/03.png';
import emotion4 from '@/assets/images/emotion/04.png';
import emotion5 from '@/assets/images/emotion/05.png';
import emotion6 from '@/assets/images/emotion/06.png';
import emotion7 from '@/assets/images/emotion/07.png';
import { Link } from 'react-router-dom';

const emotionData = [
  {
    id: 1,
    emotion: emotion1,
    name: 'Thích',
  },
  {
    id: 2,
    emotion: emotion2,
    name: 'Yêu thích',
  },
  {
    id: 3,
    emotion: emotion3,
    name: 'Hihi',
  },
  {
    id: 4,
    emotion: emotion4,
    name: 'HaHa',
  },
  {
    id: 5,
    emotion: emotion5,
    name: 'Wow',
  },
  {
    id: 6,
    emotion: emotion6,
    name: 'Buồn',
  },
  {
    id: 7,
    emotion: emotion7,
    name: 'Thương thương',
  },
];

export type EmotionType = (typeof emotionData)[0];

type ChosePostEmotionProps = {
  onChange: (e: (typeof emotionData)[0]) => void;
};

export const ChosePostEmotion = ({ onChange }: ChosePostEmotionProps) => {
  const [emotionSelected, setEmotionSelected] = useState(emotionData[0]);

  const handleChangeEmotion = (e: EmotionType) => {
    setEmotionSelected(e);
    onChange && onChange(e);
  };
  return (
    <div className="like-data">
      <Dropdown>
        <Dropdown.Toggle as={CustomToggle}>
          <img src={emotionSelected.emotion} className="img-fluid" alt="" />
        </Dropdown.Toggle>
        <Dropdown.Menu className=" py-2">
          {emotionData.map(e => {
            return (
              <OverlayTrigger key={e.id} placement="top" overlay={<Tooltip>{e.name}</Tooltip>}>
                <Link to="#" onClick={() => handleChangeEmotion(e)}>
                  <img src={e.emotion} className="img-fluid me-2" alt="" />
                </Link>
              </OverlayTrigger>
            );
          })}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};
