import httpRequest from '../axios-instance';
import { ApiConstants } from '../endpoints';
type CommentBlogResponseType = {
  user_id: number;
  blog_id: number;
  content: string;
  parent_id: number;
};
const postComment = <T>(data: T) => {
  return httpRequest.post<CommentBlogResponseType>(ApiConstants.POST_COMMENT, data);
};

export const CommentService = { postComment };
