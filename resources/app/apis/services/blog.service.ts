import { IBlogs } from '@/models/blog';
import httpRequest from '../axios-instance';
import { ApiConstants } from '../endpoints';

const showAllBlog = () => {
  return httpRequest.get(ApiConstants.SHOW_BLOGS);
};
const showDetailBlog = <T>(id: T) => {
  return httpRequest.get(`${ApiConstants.SHOW_BLOG_DETAIL}/${id}`);
};

const createBlog = <T>(data: T) => {
  return httpRequest.post<IBlogs>(ApiConstants.CREATE_BLOG, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const BlogService = { createBlog, showAllBlog, showDetailBlog };
