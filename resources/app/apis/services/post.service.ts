import httpRequest from '@/apis';
import { ApiConstants } from '../endpoints';
import { GetNewPostResponseType, IPost } from '@/models/post';

const getPostNewFeed = () => {
  return httpRequest.get<GetNewPostResponseType[]>(ApiConstants.GET_POSTS_NEW_FEED);
};

const createNewPost = <T>(data: T) => {
  return httpRequest.post<IPost>(ApiConstants.POSTS, data);
};
export const PostService = {
  getPostNewFeed,
  createNewPost,
};
