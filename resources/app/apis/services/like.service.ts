import httpRequest from '../axios-instance';
import { ApiConstants } from '../endpoints';
type LikeBlogResponseType = {
  user_id: number;
  blog_id: number;
  content: string;
  parent_id: number;
};
const postLike = <T>(data: T) => {
  return httpRequest.post<LikeBlogResponseType>(`${ApiConstants.CREATE_LIKE_BLOG}/${data.blog_id}/${data.emotion}`);
};

export const LikeService = { postLike };
