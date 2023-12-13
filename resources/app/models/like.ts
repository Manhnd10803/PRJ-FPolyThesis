import like from '@/assets/images/emotion/like.png';
import love from '@/assets/images/emotion/love.png';
import haha from '@/assets/images/emotion/haha.png';
import wow from '@/assets/images/emotion/wow.png';
import sad from '@/assets/images/emotion/sad.png';
import angry from '@/assets/images/emotion/angry.png';
import { IUser } from './user';

const emotionType = {
  LIKE: 'like',
  LOVE: 'love',
  HAHA: 'haha',
  WOW: 'wow',
  SAD: 'sad',
  ANGRY: 'angry',
} as const;

export const emotionSource = {
  like: like,
  love: love,
  haha: haha,
  wow: wow,
  sad: sad,
  angry: angry,
} as const;

export const emotionData = [
  {
    id: emotionType.LIKE,
    emotion: like,
    name: 'Thích',
  },
  {
    id: emotionType.LOVE,
    emotion: love,
    name: 'Yêu thích',
  },
  {
    id: emotionType.HAHA,
    emotion: haha,
    name: 'HaHa',
  },
  {
    id: emotionType.WOW,
    emotion: wow,
    name: 'Wow',
  },
  {
    id: emotionType.SAD,
    emotion: sad,
    name: 'Buồn',
  },
  {
    id: emotionType.ANGRY,
    emotion: angry,
    name: 'Phẫn nộ',
  },
];

export type EmotionType = (typeof emotionData)[0];

export type EmotionUnionType = (typeof emotionType)[keyof typeof emotionType];

export interface ILiker {
  emotion: EmotionUnionType;
  user: IUser;
  user_id: IUser['id'];
}
