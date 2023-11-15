import { Link } from 'react-router-dom';

export type CommentItemProps = {
  id?: string;
  avatar: string;
  authorName: string;
  content: string;
  createdAt: string;
};

export const CommentItem = ({ avatar, authorName, content, createdAt }: CommentItemProps) => {
  return (
    <li className="mb-2">
      <div className="d-flex">
        <div className="user-img">
          <img src={avatar} alt="user1" className="avatar-35 rounded-circle img-fluid" />
        </div>
        <div className="comment-data-block ms-3">
          <h6>{authorName}</h6>
          <p className="mb-0">{content}</p>
          <div className="d-flex flex-wrap align-items-center comment-activity">
            {/* =========== More actions =========== */}
            <Link to="#">like</Link>
            <Link to="#">reply</Link>
            <Link to="#">translate</Link>
            <span> {createdAt} </span>
          </div>
        </div>
      </div>
    </li>
  );
};
