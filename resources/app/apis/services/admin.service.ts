import { IBlogsAdmin } from '@/models/blog';
import httpRequest from '../axios-instance';
import { ApiConstants } from '../endpoints';

const BlogList = () => {
  return httpRequest.get<IBlogsAdmin>(ApiConstants.BLOGS);
};

const BlogPending = () => {
  return httpRequest.get<IBlogsAdmin>(ApiConstants.BLOG_PENDING);
};

const BlogDetail = (id: number) => {
  return httpRequest.get<IBlogsAdmin>(`${ApiConstants.BLOG_DETAIL}/${id}`);
};

const BlogApprove = (id: number) => {
  return httpRequest.get(`${ApiConstants.BLOG_APPROVE}/${id}`);
};

const BlogReject = (id: number) => {
  return httpRequest.get(`${ApiConstants.BLOG_REJECT}/${id}`);
};

export const AdminService = { BlogList, BlogPending, BlogDetail, BlogApprove, BlogReject };
