import { CustomToggle } from '@/components/custom';
import { Card, Dropdown, Image, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const imageUrl = 'https://picsum.photos/50';

export const HeaderMessage = () => {
  return (
    <>
      <Dropdown as="li" className="nav-item">
        <Dropdown.Toggle href="#" as={CustomToggle} variant="d-flex align-items-center">
          <i className="material-symbols-outlined">mail</i>
          <span className="mobile-text d-none ms-3">Tin Nhắn</span>
        </Dropdown.Toggle>
        <Dropdown.Menu className="sub-drop">
          <Card className="shadow-none m-0">
            <Card.Header className="d-flex justify-content-between bg-primary">
              <div className="header-title bg-primary">
                <h5 className="mb-0 text-white">Tin Nhắn</h5>
              </div>
              <small className="badge bg-light text-dark">4</small>
            </Card.Header>
            <Card.Body className="p-0 ">
              <Link to="#" className="iq-sub-card">
                <div className="d-flex  align-items-center">
                  <div className="">
                    <Image className="avatar-40 rounded" src={imageUrl} alt="" loading="lazy" />
                  </div>
                  <div className=" w-100 ms-3">
                    <h6 className="mb-0 ">Bni Emma Watson</h6>
                    <small className="float-left font-size-12">13 Jun</small>
                  </div>
                </div>
              </Link>
              <Link to="#" className="iq-sub-card">
                <div className="d-flex align-items-center">
                  <div className="">
                    <Image className="avatar-40 rounded" src={imageUrl} alt="" loading="lazy" />
                  </div>
                  <div className="ms-3">
                    <h6 className="mb-0 ">Lorem Ipsum Watson</h6>
                    <small className="float-left font-size-12">20 Apr</small>
                  </div>
                </div>
              </Link>
              <Link to="#" className="iq-sub-card">
                <div className="d-flex align-items-center">
                  <div className="">
                    <Image className="avatar-40 rounded" src={imageUrl} alt="" loading="lazy" />
                  </div>
                  <div className="ms-3">
                    <h6 className="mb-0 ">Why do we use it?</h6>
                    <small className="float-left font-size-12">30 Jun</small>
                  </div>
                </div>
              </Link>
              <Link to="#" className="iq-sub-card">
                <div className="d-flex align-items-center">
                  <div className="">
                    <Image className="avatar-40 rounded" src={imageUrl} alt="" loading="lazy" />
                  </div>
                  <div className="ms-3">
                    <h6 className="mb-0 ">Variations Passages</h6>
                    <small className="float-left font-size-12">12 Sep</small>
                  </div>
                </div>
              </Link>
              <Link to="#" className="iq-sub-card">
                <div className="d-flex align-items-center">
                  <div className="">
                    <Image className="avatar-40 rounded" src={imageUrl} alt="" loading="lazy" />
                  </div>
                  <div className="ms-3">
                    <h6 className="mb-0 ">Lorem Ipsum generators</h6>
                    <small className="float-left font-size-12">5 Dec</small>
                  </div>
                </div>
              </Link>
            </Card.Body>
          </Card>
        </Dropdown.Menu>
      </Dropdown>

      <Nav.Item className="nav-item d-none d-lg-none">
        <Link
          to="#"
          className="dropdown-toggle d-flex align-items-center"
          id="mail-drop-1"
          data-bs-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <i className="material-symbols-outlined">mail</i>
          <span className="mobile-text  ms-3">Message</span>
        </Link>
      </Nav.Item>
    </>
  );
};
