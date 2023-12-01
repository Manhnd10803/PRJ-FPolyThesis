import { ListGroup, Modal } from 'react-bootstrap';

export const CustomListItem = ({ title, onClick }) => {
  return (
    <ListGroup.Item action variant="primary" className="d-flex justify-content-between" onClick={() => onClick(title)}>
      {title}
      <div className="d-flex align-items-center ms-auto">
        <span className="material-symbols-outlined">navigate_next</span>
      </div>
    </ListGroup.Item>
  );
};
