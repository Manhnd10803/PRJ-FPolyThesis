import { CustomToggle } from '@/components/custom';
import { Dropdown, OverlayTrigger, Tooltip } from 'react-bootstrap';

//image
const imageUrl = 'https://picsum.photos/20';

export const FeedEmotion = () => {
  return (
    <div className="like-data">
      <Dropdown>
        <Dropdown.Toggle as={CustomToggle}>
          <img src={imageUrl} className="img-fluid" alt="" />
        </Dropdown.Toggle>
        <Dropdown.Menu className=" py-2">
          <OverlayTrigger placement="top" overlay={<Tooltip>Like</Tooltip>} className="ms-2 me-2">
            <img src={imageUrl} className="img-fluid me-2" alt="" />
          </OverlayTrigger>
          <OverlayTrigger placement="top" overlay={<Tooltip>Love</Tooltip>} className="me-2">
            <img src={imageUrl} className="img-fluid me-2" alt="" />
          </OverlayTrigger>
          <OverlayTrigger placement="top" overlay={<Tooltip>Happy</Tooltip>} className="me-2">
            <img src={imageUrl} className="img-fluid me-2" alt="" />
          </OverlayTrigger>
          <OverlayTrigger placement="top" overlay={<Tooltip>HaHa</Tooltip>} className="me-2">
            <img src={imageUrl} className="img-fluid me-2" alt="" />
          </OverlayTrigger>
          <OverlayTrigger placement="top" overlay={<Tooltip>Think</Tooltip>} className="me-2">
            <img src={imageUrl} className="img-fluid me-2" alt="" />
          </OverlayTrigger>
          <OverlayTrigger placement="top" overlay={<Tooltip>Sade</Tooltip>} className="me-2">
            <img src={imageUrl} className="img-fluid me-2" alt="" />
          </OverlayTrigger>
          <OverlayTrigger placement="top" overlay={<Tooltip>Lovely</Tooltip>} className="me-2">
            <img src={imageUrl} className="img-fluid me-2" alt="" />
          </OverlayTrigger>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};
