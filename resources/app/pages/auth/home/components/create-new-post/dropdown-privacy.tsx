import { CustomToggle } from '@/components/custom';
import { Dropdown } from 'react-bootstrap';

export const DropdownPrivacy = () => {
  return (
    <div className="card-post-toolbar">
      <Dropdown>
        <Dropdown.Toggle as={CustomToggle} role="button">
          <span className="btn btn-outline-primary px-2 py-1 mt-1">Bạn bè</span>
        </Dropdown.Toggle>
        <Dropdown.Menu className=" m-0 p-0">
          <Dropdown.Item className=" p-3" href="#">
            <div className="d-flex align-items-top">
              <i className="ri-save-line h4"></i>
              <div className="data ms-2">
                <h6>Mọi người</h6>
              </div>
            </div>
          </Dropdown.Item>
          <Dropdown.Item className="p-3" href="#">
            <div className="d-flex align-items-top">
              <i className="ri-close-circle-line h4"></i>
              <div className="data ms-2">
                <h6>Bạn bè</h6>
              </div>
            </div>
          </Dropdown.Item>
          <Dropdown.Item className=" p-3" href="#">
            <div className="d-flex align-items-top">
              <i className="ri-notification-line h4"></i>
              <div className="data ms-2">
                <h6>Chỉ mình tôi</h6>
              </div>
            </div>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};
