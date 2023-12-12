import { CustomToggle } from '@/components/custom';
import { IComment } from '@/models/comment';
import { formatFullName } from '@/utilities/functions';
import { Dropdown } from 'react-bootstrap';
import { tryConvertUniqueUser } from '../../../pages/auth/home/constants';

type TotalCommentProps = {
  totalComments?: number;
  comments?: IComment[];
};

export const TotalComment = ({ totalComments = 0, comments = [] }: TotalCommentProps) => {
  const uniqueUser = tryConvertUniqueUser(comments);

  return (
    <div className="total-comment-block">
      <Dropdown>
        <Dropdown.Toggle as={CustomToggle} id="post-option">
          {totalComments} Bình luận
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {uniqueUser.map(comment => (
            <Dropdown.Item href="#" key={comment.user.id}>
              {formatFullName(comment.user)}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};
