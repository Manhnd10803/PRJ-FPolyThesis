import httpRequest from '../axios-instance';
import { ApiConstants } from '../endpoints';

type CommentResponseType = {
  parent_id: number;
  reply_to: string;
  content: any;
  blog_id: any;
};

const createComment = <T>(data: T) => {
  return httpRequest.post<CommentResponseType>(`${ApiConstants.CREAT_COMMENT}/blog/${data.blog_id}`, data);
};

export const CommentService = { createComment };
