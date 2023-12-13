import { CustomToggle } from '@/components/custom';
import { ILiker } from '@/models/like';
import { tryConvertUniqueLiker } from '@/pages/auth/home/constants';
import { formatFullName } from '@/utilities/functions';
import { Dropdown } from 'react-bootstrap';

type TotalLikeProps = {
  totalLike: number;
  likers: ILiker[];
};
export const TotalLike = ({ totalLike = 0, likers = [] }: TotalLikeProps) => {
  const uniqueUser = tryConvertUniqueLiker(likers);

  return (
    <div className="total-like-block ms-2 me-3">
      <Dropdown>
        <Dropdown.Toggle as={CustomToggle} id="post-option">
          {totalLike} Thích
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {uniqueUser?.map(liker => (
            <Dropdown.Item href="#" key={liker.user?.id}>
              {formatFullName(liker.user)}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};
