import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

type MoreActionProps = {
  onDetail: () => void;
  onDelete: () => void;
  onSee: () => void;
};
export const MoreAction = ({ onDetail, onDelete, onSee }: MoreActionProps) => {
  return (
    <div className="card-header-toolbar d-flex align-items-center justify-content-center">
      <Dropdown>
        <Link to="#">
          <Dropdown.Toggle as="span" className="material-symbols-outlined">
            more_horiz
          </Dropdown.Toggle>
        </Link>
        <Dropdown.Menu className="dropdown-menu-right">
          <Dropdown.Item href="#" onClick={onSee} className="d-flex align-items-center gap-1">
            <span className="material-symbols-outlined">done</span>Đánh dấu là đã đọc
          </Dropdown.Item>
          <Dropdown.Item href="#" onClick={onDetail} className="d-flex align-items-center gap-1">
            <span className="material-symbols-outlined">visibility</span>Xem chi tiết
          </Dropdown.Item>
          <Dropdown.Item href="#" onClick={onDelete} className="d-flex align-items-center gap-1">
            <span className="material-symbols-outlined">delete</span>Xoá thông báo
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};
