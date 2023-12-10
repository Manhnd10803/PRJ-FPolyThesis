import { IUser } from './user';

export interface IComment {
  id: number;
  user_id: number;
  content: string;
  parent_id: null;
  reply_to: null;
  post_id: number;
  blog_id: null;
  qa_id: null;
  created_at: Date;
  updated_at: Date;
  reply: number;
  user: IUser;
}
