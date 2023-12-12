import { CustomToggle } from '@/components/custom';
import { Dropdown } from 'react-bootstrap';
import { IUser } from '@/models/user';

type TotalLikeProps = {
  totalLike: number;
  listUserLike: IUser[];
};
export const TotalLike = ({ totalLike = 0, listUserLike = [] }: TotalLikeProps) => {
  return (
    <div className="total-like-block ms-2 me-3">
      <Dropdown>
        <Dropdown.Toggle as={CustomToggle} id="post-option">
          {totalLike} Thích
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {listUserLike?.map(user => (
            <Dropdown.Item href="#" key={user.username}>
              {user?.username}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};
