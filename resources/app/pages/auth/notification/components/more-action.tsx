import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const MoreAction = () => {
  return (
    <div className="card-header-toolbar d-flex align-items-center">
      <Dropdown>
        <Link to="#">
          <Dropdown.Toggle as="span" className="material-symbols-outlined">
            more_horiz
          </Dropdown.Toggle>
        </Link>
        <Dropdown.Menu className="dropdown-menu-right">
          <Dropdown.Item href="#">
            <i className="ri-eye-fill me-2"></i>View
          </Dropdown.Item>
          <Dropdown.Item href="#">
            <i className="ri-delete-bin-6-fill me-2"></i>Delete
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};
