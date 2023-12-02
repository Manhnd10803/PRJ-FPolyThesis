import { Link } from 'react-router-dom';
import { usePostDetailContext } from '../../contexts';
import moment from 'moment';

export const CommentList = () => {
  const { comments } = usePostDetailContext();
  if (!comments || comments.length === 0) return <></>;

  // notdone
  return (
    <ul className="post-comments list-inline p-0 m-0">
      {comments.map(comment => (
        <li className="mb-2" key={comment.id}>
          <div className="d-flex">
            <div className="user-img">
              <img src={comment?.avatar} alt="user1" className="avatar-35 rounded-circle img-fluid" />
            </div>
            <div className="comment-data-block ms-3">
              <h6>{comment?.authorName}</h6>
              <p className="mb-0">{comment?.content}</p>
              <div className="d-flex flex-wrap align-items-center comment-activity">
                {/* =========== More actions =========== */}
                <Link to="#">like</Link>
                <Link to="#">reply</Link>
                <Link to="#">translate</Link>
                <span> {moment(comment.createdAt)} </span>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};
