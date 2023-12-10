import { IPost } from '@/models/post';
import httpRequest from '../axios-instance';
import { ApiConstants } from '../endpoints';
type LikeBlogResponseType = {
  user_id: number;
  blog_id: number;
  content: string;
  parent_id: number;
};
type LikeQandAResponseType = {
  user_id: number;
  qa_id: number;
  content: string;
  parent_id: number;
};
type LikePostResponseType = {
  user_id: number;
  post_id: number;
  content: string;
  parent_id: number;
};
const postLike = <T>(data: T) => {
  return httpRequest.post<LikeBlogResponseType>(`${ApiConstants.CREATE_LIKE_BLOG}/${data.blog_id}/${data.emotion}`);
};

const postLikeQA = <T>(data: T) => {
  return httpRequest.post<LikeQandAResponseType>(`${ApiConstants.CREATE_LIKE_QANDA}/${data.qa_id}/${data.emotion}`);
};

const postLikePost = (postId: IPost['id'], emotion: string) => {
  return httpRequest.post<LikePostResponseType>(`${ApiConstants.CREATE_LIKE_POST}/${postId}/${emotion}`);
};

export const LikeService = { postLike, postLikeQA, postLikePost };
