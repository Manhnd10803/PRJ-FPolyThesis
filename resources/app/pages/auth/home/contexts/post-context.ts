import { GetNewPostResponseType } from '@/models/post';
import { createContext, useContext } from 'react';

type PostContextType = {
  postList: GetNewPostResponseType[];
  handleShowDetail: (postItem: GetNewPostResponseType) => void;
};

const PostContext = createContext<PostContextType>({} as PostContextType);

PostContext.displayName = 'PostContext';

export const PostContextProvider = PostContext.Provider;

export const usePostContext = () => useContext(PostContext);
