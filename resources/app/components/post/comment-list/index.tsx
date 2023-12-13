import { Link } from 'react-router-dom';
import { momentVi } from '@/utilities/functions/moment-locale';
import { IComment } from '@/models/comment';
import { formatFullName } from '@/utilities/functions';

type CommentListProps = {
  comments?: Array<IComment>;
};

export const CommentList = ({ comments }: CommentListProps) => {
  if (!comments || comments.length === 0) return <></>;

  // notdone
  return (
    <ul className="post-comments list-inline p-0 m-0">
      {comments.map(comment => (
        <li className="mb-2" key={comment.id}>
          <div className="d-flex">
            <div className="user-img col-1">
              <img
                src={comment?.user.avatar}
                alt="user1"
                className="avatar-35 rounded-circle img-fluid"
                loading="lazy"
              />
            </div>
            <div className="comment-data-block " style={{ width: '59vh' }}>
              <strong>{formatFullName(comment?.user)}</strong>
              <p className="mb-2">{comment?.content}</p>
              <div className="d-flex flex-wrap align-items-center comment-activity">
                {/* =========== More actions =========== */}
                <span style={{ marginRight: '10px' }}> {momentVi(comment.created_at).fromNow()} </span>
                <strong style={{ marginRight: '10px' }}>
                  <Link to="#">Thích</Link>
                </strong>
                <strong style={{ marginRight: '10px' }}>
                  <Link to="#">Trả lời</Link>
                </strong>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};
