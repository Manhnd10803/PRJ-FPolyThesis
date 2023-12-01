import { CustomToggle } from '@/components/custom';
import { Dropdown } from 'react-bootstrap';
import { usePostDetailContext } from '../../contexts';

export const TotalLikePost = () => {
  const { like_counts_by_emotion } = usePostDetailContext();

  // notdone
  return (
    <div className="total-like-block ms-2 me-3">
      <Dropdown>
        <Dropdown.Toggle as={CustomToggle} id="post-option">
          {like_counts_by_emotion.total_likes} Thích
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
