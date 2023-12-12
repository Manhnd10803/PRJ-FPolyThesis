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
            <div className="user-img">
              <img
                src={comment?.user.avatar}
                alt="user1"
                className="avatar-35 rounded-circle img-fluid"
                loading="lazy"
              />
            </div>
            <div className="comment-data-block ms-3">
              <h6>{formatFullName(comment?.user)}</h6>
              <p className="mb-0">{comment?.content}</p>
              <div className="d-flex flex-wrap align-items-center comment-activity">
                {/* =========== More actions =========== */}
                <Link to="#">Thích</Link>
                <Link to="#">Trả lời</Link>
                <span> {momentVi(comment.created_at).fromNow()} </span>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};
