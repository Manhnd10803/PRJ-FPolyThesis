import { GetNewPostResponseType, IPost, LikeCountsByEmotion } from '@/models/post';
import { createContext, useContext } from 'react';

type PostContextType = {
  postList: GetNewPostResponseType[];
};

const PostContext = createContext<PostContextType>({} as PostContextType);

PostContext.displayName = 'PostContext';

export const PostContextProvider = PostContext.Provider;

export const usePostContext = () => useContext(PostContext);

// detail context
type PostDetailContextType = {
  post: GetNewPostResponseType['post'];
  like_counts_by_emotion: GetNewPostResponseType['like_counts_by_emotion'];
  comments: GetNewPostResponseType['comments'];
};

const PostDetailContext = createContext<PostDetailContextType>({} as PostDetailContextType);

PostDetailContext.displayName = 'PostDetailContext';

export const PostDetailContextProvider = PostDetailContext.Provider;

export const usePostDetailContext = () => useContext(PostDetailContext);
