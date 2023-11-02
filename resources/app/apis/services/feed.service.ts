import httpRequest from '@/apis';
import { ApiConstants } from '../endpoints';

type GetFeedResponseType = {
  id: number;
};
const getFeeds = () => {
  return httpRequest.get<GetFeedResponseType>(ApiConstants.POSTS);
};

export const FeedService = {
  getFeeds,
};
