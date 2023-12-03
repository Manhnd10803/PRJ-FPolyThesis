import { CustomToggle } from '@/components/custom';
import { Dropdown } from 'react-bootstrap';
import { usePostItemContext } from '../../contexts';

export const TotalLikePost = () => {
  const { like_counts_by_emotion } = usePostItemContext();

  // notdone
  return (
    <div className="total-like-block ms-2 me-3">
      <Dropdown>
        <Dropdown.Toggle as={CustomToggle} id="post-option">
          {(like_counts_by_emotion && like_counts_by_emotion?.total_likes) || 0} Thích
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item href="#">Max Emum</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};
