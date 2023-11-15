import { IUser } from './user';

export interface GetNewPostResponseType {
  post: IPost;
  like_counts_by_emotion: LikeCountsByEmotion;
  like: any[];
  total_comments: number;
  comments: any[];
}

export interface LikeCountsByEmotion {
  total_likes: number;
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
