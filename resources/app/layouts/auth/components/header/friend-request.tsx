import { CustomToggle } from '@/components/custom';
import { Card, Dropdown, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const imageUrl = 'https://picsum.photos/50';

export const FriendRequest = () => {
  return (
    <Dropdown as="li" className="nav-item">
      <Dropdown.Toggle href="/" as={CustomToggle} variant="d-flex align-items-center">
        <span className="material-symbols-outlined">group</span>
      </Dropdown.Toggle>
      <Dropdown.Menu className="sub-drop sub-drop-large">
        <Card className="shadow-none m-0">
          <Card.Header className="d-flex justify-content-between bg-primary">
            <div className="header-title">
              <h5 className="mb-0 text-white">Friend Request</h5>
            </div>
            <small className="badge  bg-light text-dark ">4</small>
          </Card.Header>
          <Card.Body className="p-0">
            <div className="iq-friend-request">
              <div className="iq-sub-card iq-sub-card-big d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <Image className="avatar-40 rounded" src={imageUrl} alt="" loading="lazy" />
                  <div className="ms-3">
                    <h6 className="mb-0 ">Jaques Amole</h6>
                    <p className="mb-0">40 friends</p>
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <Link to="#" className="me-3 btn btn-primary rounded">
                    Confirm
                  </Link>
                  <Link to="#" className="me-3 btn btn-secondary rounded">
                    Delete Request
                  </Link>
                </div>
              </div>
            </div>
            <div className="iq-friend-request">
              <div className="iq-sub-card iq-sub-card-big d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <Image className="avatar-40 rounded" src={imageUrl} alt="" loading="lazy" />
                  <div className="ms-3">
                    <h6 className="mb-0 ">Lucy Tania</h6>
                    <p className="mb-0">12 friends</p>
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <Link to="#" className="me-3 btn btn-primary rounded">
                    Confirm
                  </Link>
                  <Link to="#" className="me-3 btn btn-secondary rounded">
                    Delete Request
                  </Link>
                </div>
              </div>
            </div>
            <div className="iq-friend-request">
              <div className="iq-sub-card iq-sub-card-big d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <Image className="avatar-40 rounded" src={imageUrl} alt="" loading="lazy" />
                  <div className=" ms-3">
                    <h6 className="mb-0 ">Manny Petty</h6>
                    <p className="mb-0">3 friends</p>
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <Link to="#" className="me-3 btn btn-primary rounded">
                    Confirm
                  </Link>
                  <Link to="#" className="me-3 btn btn-secondary rounded">
                    Delete Request
                  </Link>
                </div>
              </div>
            </div>
            <div className="iq-friend-request">
              <div className="iq-sub-card iq-sub-card-big d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <Image className="avatar-40 rounded" src={imageUrl} alt="" loading="lazy" />
                  <div className="ms-3">
                    <h6 className="mb-0 ">Marsha Mello</h6>
                    <p className="mb-0">15 friends</p>
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <Link to="#" className="me-3 btn btn-primary rounded">
                    Confirm
                  </Link>
                  <Link to="#" className="me-3 btn btn-secondary rounded">
                    Delete Request
                  </Link>
                </div>
              </div>
            </div>
            <div className="text-center">
              <Link to="#" className=" btn text-primary">
                View More Request
              </Link>
            </div>
          </Card.Body>
        </Card>
      </Dropdown.Menu>
    </Dropdown>
  );
};
