import { usePostItemContext } from '../../contexts';

export const Content = () => {
  const { post: post } = usePostItemContext();
  // render
  return (
    <>
      <div className="my-3">{post?.content}</div>
    </>
  );
};
