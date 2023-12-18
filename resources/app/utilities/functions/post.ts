import { EmotionUnionType, ILiker } from '@/models/like';
import { GetNewPostResponseType } from '@/models/post';
import { IUser } from '@/models/user';

// function check if reacted, return emotion depending on likers and userInfo
export const checkIfReacted = (likers: ILiker[], userInfo: IUser) => {
  const userReacted = likers?.find(liker => liker.user_id === userInfo.id);
  return userReacted?.emotion;
};

export function getTopEmotions(
  likeCountsByEmotion: GetNewPostResponseType['like_counts_by_emotion'],
): EmotionUnionType[] {
  if (!likeCountsByEmotion) return ['like'];
  // Xóa thuộc tính "total_likes" khỏi đối tượng
  const { total_likes, ...rest } = likeCountsByEmotion;

  // Chuyển đối tượng thành một mảng các cặp key-value
  const emotionArray = Object.entries(rest);

  // Sắp xếp mảng theo giảm dần dựa trên giá trị của emotion
  emotionArray.sort((a, b) => b[1] - a[1]);

  // Chọn 3 emotion có số lượng nhiều nhất
  const topEmotions = emotionArray.slice(0, 3);

  // Trích xuất tên emotion từ mảng kết quả
  const emotionNames = topEmotions.map(emotion => emotion[0]);

  return emotionNames as EmotionUnionType[];
}
