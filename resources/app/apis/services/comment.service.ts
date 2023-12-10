import { IComment } from '@/models/comment';
import httpRequest from '../axios-instance';
import { ApiConstants } from '../endpoints';

type CommentResponseType = {
  message: string;
  comment: IComment;
};

const createComment = <T>(data: T) => {
  return httpRequest.post<CommentResponseType>(`${ApiConstants.COMMENT}/blog/${data.blog_id}`, data);
};

const createCommentQA = <T>(data: T) => {
  return httpRequest.post<CommentResponseType>(`${ApiConstants.COMMENT}/qa/${data.qa_id}`, data);
};

const createCommentPost = <T>(data: T, postId: number) => {
  return httpRequest.post<CommentResponseType>(`${ApiConstants.COMMENT}/post/${postId}`, data);
};

const deleteComment = <T>(id: T) => {
  return httpRequest.delete<CommentResponseType>(`${ApiConstants.COMMENT}/${id}`);
};
const editComment = <T>(data: T) => {
  return httpRequest.put<CommentResponseType>(`${ApiConstants.COMMENT}/${data.id}`, data);
};

export const CommentService = {
  createComment,
  deleteComment,
  editComment,
  createCommentQA,
  createCommentPost,
};
