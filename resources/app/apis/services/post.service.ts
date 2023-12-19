import httpRequest from '@/apis';
import { Paginate } from '@/models/pagination';
import { GetNewPostResponseType } from '@/models/post';
import { ApiConstants } from '../endpoints';

const getPostsNewFeed = (quantity: number, page: number) => {
  return httpRequest.get<Paginate<GetNewPostResponseType>>(
    `${ApiConstants.GET_POSTS_NEW_FEED}/${quantity}?page=${page}`,
  );
};

const getPostDetail = (id: number) => {
  return httpRequest.get<GetNewPostResponseType>(`${ApiConstants.POSTS_DETAIL}/${id}`);
};

const createNewPost = <T>(data: T) => {
  return httpRequest.post<GetNewPostResponseType>(ApiConstants.POSTS, data);
};

const updateStatusPost = (id: number, status: number) => {
  return httpRequest.put(`${ApiConstants.POST_UPDATE_STATUS}/${id}`, { status });
};

const deletePost = (id: number) => {
  return httpRequest.delete(`${ApiConstants.DELETE_POST}/${id}`);
};

export const PostService = {
  getPostsNewFeed,
  createNewPost,
  getPostDetail,
  updateStatusPost,
  deletePost,
};
