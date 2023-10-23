import { CustomToggle } from '@/components/custom';
import { Dropdown } from 'react-bootstrap';

export const FeedTotalComment = () => {
  return (
    <div className="total-comment-block">
      <Dropdown>
        <Dropdown.Toggle as={CustomToggle} id="post-option">
          20 Comment
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
