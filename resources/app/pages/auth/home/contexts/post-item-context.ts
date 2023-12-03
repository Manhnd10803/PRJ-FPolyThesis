import { GetNewPostResponseType } from '@/models/post';
import { createContext, useContext } from 'react';

type PostItemContextType = {
  item: GetNewPostResponseType;
  post: GetNewPostResponseType['post'];
  like_counts_by_emotion: GetNewPostResponseType['like_counts_by_emotion'];
  comments: GetNewPostResponseType['comments'];
};

const PostItemContext = createContext<PostItemContextType>({} as PostItemContextType);

PostItemContext.displayName = 'PostItemContext';

export const PostItemContextProvider = PostItemContext.Provider;

export const usePostItemContext = () => useContext(PostItemContext);
