import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

type MoreActionProps = {
  onDetail: () => void;
  onDelete: () => void;
};
export const MoreAction = ({ onDetail, onDelete }: MoreActionProps) => {
  return (
    <div className="card-header-toolbar d-flex align-items-center justify-content-center">
      <Dropdown>
        <Link to="#">
          <Dropdown.Toggle as="span" className="material-symbols-outlined">
            more_horiz
          </Dropdown.Toggle>
        </Link>
        <Dropdown.Menu className="dropdown-menu-right">
          <Dropdown.Item href="#" onClick={onDetail}>
            <i className="ri-eye-fill me-2"></i>Xem chi tiết
          </Dropdown.Item>
          <Dropdown.Item href="#" onClick={onDelete}>
            <i className="ri-delete-bin-6-fill me-2"></i>Xoá thông báo
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};
