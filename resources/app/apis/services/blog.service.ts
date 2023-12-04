import { IBlogs } from '@/models/blog';
import httpRequest from '../axios-instance';
import { ApiConstants } from '../endpoints';

const showAllBlog = <T>(page: T, majors_id: T) => {
  return httpRequest.get(`${ApiConstants.BLOGS}/2?page=${page}&majors_id=${majors_id}`);
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
const deleteBlog = async (blogId: number) => {
  const url = `${ApiConstants.DELETE_BLOG}/${blogId}`;
  try {
    const response = await httpRequest.delete(url);
    return response;
  } catch (error) {
    throw new Error('Lỗi khi xóa bài viết');
  }
};

export const BlogService = { createBlog, showAllBlog, showDetailBlog, deleteBlog };
