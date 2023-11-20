import { CustomToggle } from '@/components/custom';
import { pathName } from '@/routes/path-name';
import { Card, Dropdown, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const imageUrl = 'https://picsum.photos/50';

export const Notification = () => {
  return (
    <Dropdown as="li" className="nav-item">
      <Dropdown.Toggle href="#" as={CustomToggle} variant="search-toggle d-flex align-items-center">
        <i className="material-symbols-outlined">notifications</i>
      </Dropdown.Toggle>
      <Dropdown.Menu className="sub-drop">
        <Card className="shadow-none m-0">
          <Card.Header className="d-flex justify-content-between bg-primary">
            <div className="header-title bg-primary">
              <h5 className="mb-0 text-white">All Notifications</h5>
            </div>
            <small className="badge  bg-light text-dark">4</small>
          </Card.Header>
          <Card.Body className="p-0">
            <Link to="#" className="iq-sub-card">
              <div className="d-flex align-items-center">
                <div className="">
                  <Image className="avatar-40 rounded" src={imageUrl} alt="" loading="lazy" />
                </div>
                <div className="ms-3 w-100">
                  <h6 className="mb-0 ">Emma Watson Bni</h6>
                  <div className="d-flex justify-content-between align-items-center">
                    <p className="mb-0">95 MB</p>
                    <small className="float-right font-size-12">Just Now</small>
                  </div>
                </div>
              </div>
            </Link>
            <Link to="#" className="iq-sub-card">
              <div className="d-flex align-items-center">
                <div className="">
                  <Image className="avatar-40 rounded" src={imageUrl} alt="" loading="lazy" />
                </div>
                <div className="ms-3 w-100">
                  <h6 className="mb-0 ">New customer is join</h6>
                  <div className="d-flex justify-content-between align-items-center">
                    <p className="mb-0">Cyst Bni</p>
                    <small className="float-right font-size-12">5 days ago</small>
                  </div>
                </div>
              </div>
            </Link>
            <Link to="#" className="iq-sub-card">
              <div className="d-flex align-items-center">
                <div className="">
                  <Image className="avatar-40 rounded" src={imageUrl} alt="" loading="lazy" />
                </div>
                <div className="ms-3 w-100">
                  <h6 className="mb-0 ">Two customer is left</h6>
                  <div className="d-flex justify-content-between align-items-center">
                    <p className="mb-0">Cyst Bni</p>
                    <small className="float-right font-size-12">2 days ago</small>
                  </div>
                </div>
              </div>
            </Link>
            <Link to="#" className="iq-sub-card">
              <div className="d-flex align-items-center">
                <div className="">
                  <Image className="avatar-40 rounded" src={imageUrl} alt="" loading="lazy" />
                </div>
                <div className="w-100 ms-3">
                  <h6 className="mb-0 ">New Mail from Fenny</h6>
                  <div className="d-flex justify-content-between align-items-center">
                    <p className="mb-0">Cyst Bni</p>
                    <small className="float-right font-size-12">3 days ago</small>
                  </div>
                </div>
              </div>
            </Link>
            <Link to={pathName.NOTIFICATION} className="iq-sub-card">
              <div className="d-flex align-items-center justify-content-center">
                <h6 className="mb-0 ">Xem thêm</h6>
              </div>
            </Link>
          </Card.Body>
        </Card>
      </Dropdown.Menu>
    </Dropdown>
  );
};
