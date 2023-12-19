import { EmotionUnionType, ILiker } from '@/models/like';
import { GetNewPostResponseType } from '@/models/post';
import { IUser } from '@/models/user';

// function check if reacted, return emotion depending on likers and userInfo
export const checkIfReacted = (likers: ILiker[], userInfo: IUser) => {
  const userReacted = likers?.find(liker => liker.user_id === userInfo.id);
  return userReacted?.emotion;
};
