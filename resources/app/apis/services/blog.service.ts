import { IBlogs } from '@/models/blog';
import httpRequest from '../axios-instance';
import { ApiConstants } from '../endpoints';

const CreateBlog = <T>(data: T) => {
  return httpRequest.post<IBlogs>(ApiConstants.CREATE_BLOG, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const BlogService = { CreateBlog };
