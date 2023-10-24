import httpRequest from '../axios-instance';
import { ApiConstants } from '../endpoints';

const getBlogs = () => {
  return httpRequest.get(ApiConstants.BLOGS);
};
const getBlogDetail = <T>(id: T) => {
  return httpRequest.get(`${ApiConstants.BLOG_DETAIL}/${id}`);
};
export const BlogService = { getBlogs, getBlogDetail };
