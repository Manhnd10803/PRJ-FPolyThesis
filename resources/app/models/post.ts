import { IComment } from './comment';
import { ILiker } from './like';
import { IUser } from './user';

export interface GetNewPostResponseType {
  post: IPost;
  like_counts_by_emotion: LikeCountsByEmotion;
  likers?: ILiker[];
  total_comments?: number;
  comments?: Array<IComment>;
}

export interface LikeCountsByEmotion {
  total_likes: number;
  like?: number;
  love?: number;
  haha?: number;
  wow?: number;
  sad?: number;
  angry?: number;
}

export interface IPost {
  id: number;
  user_id: number;
  content: string;
  feeling: string;
  image: string;
  hashtag: string;
  status: number;
  views: number;
  created_at: Date;
  updated_at: Date;
  user: IUser;
  likes: any[];
}
