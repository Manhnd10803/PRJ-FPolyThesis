import httpRequest from '../axios-instance';
import { ApiConstants } from '../endpoints';

const BlogPending = () => {
  return httpRequest.get(ApiConstants.BLOG_PENDING);
};

const BlogDetail = (id: number) => {
  return httpRequest.get(`${ApiConstants.BLOG_DETAIL}/${id}`);
};

const BlogApprove = (id: number) => {
  return httpRequest.get(`${ApiConstants.BLOG_APPROVE}/${id}`);
};

export const AdminService = { BlogPending, BlogDetail, BlogApprove };
