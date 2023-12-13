import { GetNewPostResponseType } from '@/models/post';
import { createContext, useContext } from 'react';

type PostDetailContextType = {
  data: GetNewPostResponseType;
  post: GetNewPostResponseType['post'];
  like_counts_by_emotion: GetNewPostResponseType['like_counts_by_emotion'];
  likers: GetNewPostResponseType['likers'];
  total_comments: GetNewPostResponseType['total_comments'];
  comments: GetNewPostResponseType['comments'];
};

const PostDetailContext = createContext<PostDetailContextType>({} as PostDetailContextType);

PostDetailContext.displayName = 'PostDetailContext';

export const PostDetailContextProvider = PostDetailContext.Provider;

export const usePostDetailContext = () => useContext(PostDetailContext);
