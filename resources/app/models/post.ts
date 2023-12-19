import { IComment } from './comment';
import { EmotionUnionType, ILiker } from './like';
import { IUser } from './user';

export interface GetNewPostResponseType {
  post: IPost;
  like_counts_by_emotion: number;
  likers?: ILiker[];
  total_comments?: number;
  comments?: Array<IComment>;
  top_emotions: EmotionUnionType[];
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
