import { PostItem } from './post-item';

import { usePostContext } from '../../contexts';

export const PostList = () => {
  const { postList } = usePostContext();
  //render
  return (
    <>
      {postList.map(item => {
        return <PostItem key={item.post.id} item={item} />;
      })}
    </>
  );
};
