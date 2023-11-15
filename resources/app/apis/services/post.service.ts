import httpRequest from '@/apis';
import { ApiConstants } from '../endpoints';
import { GetNewFeedResponseType, IPost } from '@/models/post';

const getNewFeed = () => {
  return httpRequest.get<GetNewFeedResponseType[]>(ApiConstants.GET_POST_NEW_FEED);
};

const createNewFeed = <T>(data: T) => {
  return httpRequest.post<IPost>(ApiConstants.CREATE_NEW_FEED, data);
};
export const PostService = {
  getNewFeed,
  createNewFeed,
};
