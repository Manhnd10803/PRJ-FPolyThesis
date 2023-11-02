import { CustomToggle } from '@/components/custom';
import { Dropdown } from 'react-bootstrap';

type FeedTotalLikeProps = {
  totalLike: number;
};

export const FeedTotalLike = ({ totalLike }: FeedTotalLikeProps) => {
  return (
    <div className="total-like-block ms-2 me-3">
      <Dropdown>
        <Dropdown.Toggle as={CustomToggle} id="post-option">
          {totalLike} Likes
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item href="#">Max Emum</Dropdown.Item>
          <Dropdown.Item href="#">Bill Yerds</Dropdown.Item>
          <Dropdown.Item href="#">Hap E. Birthday</Dropdown.Item>
          <Dropdown.Item href="#">Tara Misu</Dropdown.Item>
          <Dropdown.Item href="#">Midge Itz</Dropdown.Item>
          <Dropdown.Item href="#">Sal Vidge</Dropdown.Item>
          <Dropdown.Item href="#">Other</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};
