import httpRequest from '../axios-instance';
import { ApiConstants } from '../endpoints';

type CommentResponseType = {
  parent_id: number;
  reply_to: string;
  content: string;
  blog_id: any;
  qa_id: any;
};

const createComment = <T>(data: T) => {
  return httpRequest.post<CommentResponseType>(`${ApiConstants.CREATE_COMMENT}/blog/${data.blog_id}`, data);
};

const createCommentQA = <T>(data: T) => {
  return httpRequest.post<CommentResponseType>(`${ApiConstants.CREATE_COMMENT}/qa/${data.qa_id}`, data);
};
const deleteComment = <T>(id: T) => {
  return httpRequest.delete<CommentResponseType>(`${ApiConstants.DELETE_COMMENT}/${id}`);
};
const editComment = <T>(data: T) => {
  return httpRequest.put<CommentResponseType>(`${ApiConstants.EDIT_COMMENT}/${data.id}`, data);
};

export const CommentService = { createComment, deleteComment, editComment, createCommentQA };
