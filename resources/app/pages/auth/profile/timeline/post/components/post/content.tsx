import { useState } from 'react';
import { usePostItemContext } from '../../contexts';
import { Link } from 'react-router-dom';

export const Content = () => {
  const { post } = usePostItemContext();
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };
  // render
  return (
    <>
      <div className="my-3">
        {expanded ? (
          <>{post?.content}</>
        ) : (
          <>
            {post?.content.length > 800 ? `${post.content.slice(0, 800)}...` : post.content}
            {post?.content.length > 800 && (
              <Link to="#" className="read-more" onClick={toggleExpand}>
                Xem thêm
              </Link>
            )}
          </>
        )}
      </div>
    </>
  );
};
