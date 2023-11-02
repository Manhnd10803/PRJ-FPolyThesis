import { PostItem } from './components/post-item';

export const ListPost = ({ listPost, isLoading }) => {
  return (
    <>
      {isLoading ? (
        <>
          <h3>Loading...</h3>
        </>
      ) : (
        <>{listPost?.map((item, index) => <PostItem data={item} index={index} />)}</>
      )}
    </>
  );
};
