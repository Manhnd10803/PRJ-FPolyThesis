import { usePostDetailContext } from '../contexts';

export const Content = () => {
  const { post: post } = usePostDetailContext();
  // render
  return (
    <>
      <div className="my-3">{post?.content}</div>
    </>
  );
};
