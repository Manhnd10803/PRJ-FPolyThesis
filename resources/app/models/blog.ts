export interface IBlogs {
  id: number;
  user_id: string;
  status: number;
  title: string;
  content: string;
  thumbnail: string;
  majors_id: number;
  hastag: string;
  comments: CommentType;
  likes: {
    emotion: string;
  };
  views: number;
  created_at: string;
  updated_at: string;
}
export interface CommentType {
  id: number;
  user: {
    avatar: string;
    username: string;
    major: {
      majors_name: string;
    };
  };
  user_id: number;
  reply_to: string;
  content: string;
  parent_id: number;
  post_id: number;
  blog_id: number;
  qa_id: number;
  created_at: string;
  updated_at: string;
}

export interface IBlogResponse {
  data: IBlogs[];
}
