import { IBlogs } from '@/models/blog';
import httpRequest from '../axios-instance';
import { ApiConstants } from '../endpoints';

const showAllBlog = <T>(quantity: T) => {
  return httpRequest.get(`${ApiConstants.BLOGS}/${quantity}`);
};
const showDetailBlog = <T>(id: T) => {
  return httpRequest.get(`${ApiConstants.BLOG_DETAIL}/${id}`);
};

const createBlog = <T>(data: T) => {
  return httpRequest.post<IBlogs>(ApiConstants.BLOGS, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const BlogService = { createBlog, showAllBlog, showDetailBlog };
