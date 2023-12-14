import { Link } from 'react-router-dom';
import { momentVi } from '@/utilities/functions/moment-locale';
import { IComment } from '@/models/comment';
import { formatFullName } from '@/utilities/functions';
import { useState } from 'react';

type CommentListProps = {
  comments?: Array<IComment>;
};

export const CommentList = ({ comments }: CommentListProps) => {
  const [expandedComments, setExpandedComments] = useState<Array<number>>([]);

  const toggleExpand = (commentId: number) => {
    if (expandedComments.includes(commentId)) {
      setExpandedComments(expandedComments.filter(id => id !== commentId));
    } else {
      setExpandedComments([...expandedComments, commentId]);
    }
  };
  if (!comments || comments.length === 0) return <></>;
  // notdone
  return (
    <ul className="post-comments list-inline p-0 m-0">
      {comments.map(comment => (
        <li className="mb-2" key={comment.id}>
          <div className="d-flex">
            <div className="user-img col-1">
              <Link to={`/profile/${comment?.user?.id}`}>
                <img
                  src={comment?.user.avatar}
                  alt="user1"
                  className="avatar-35 rounded-circle img-fluid"
                  loading="lazy"
                />
              </Link>
            </div>
            <div className="comment-data-block " style={{ width: '59vh' }}>
              <Link to={`/profile/${comment?.user?.id}`}>
                <strong>{formatFullName(comment?.user)}</strong>
              </Link>
              <p className="mb-2">
                {comment.content.length > 272 && !expandedComments.includes(comment.id)
                  ? `${comment.content.slice(0, 272)}...`
                  : comment.content}
              </p>
              <div className="d-flex flex-wrap align-items-center comment-activity">
                {/* =========== More actions =========== */}
                <span style={{ marginRight: '10px' }}> {momentVi(comment.created_at).fromNow()} </span>
                <strong style={{ marginRight: '10px' }}>
                  <Link to="#">Thích</Link>
                </strong>
                <strong style={{ marginRight: '10px' }}>
                  <Link to="#">Trả lời</Link>
                </strong>
                {comment.content.length > 273 && (
                  <strong style={{ marginRight: '10px' }}>
                    <Link to="#" onClick={() => toggleExpand(comment.id)}>
                      {expandedComments.includes(comment.id) ? 'Thu gọn' : 'Xem thêm'}
                    </Link>
                  </strong>
                )}
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};
