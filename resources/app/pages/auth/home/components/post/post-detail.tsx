import { Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';

type PostDetailProps = {
  handleClose: () => void;
  show: boolean;
};

export const PostDetailModal = ({ handleClose, show }: PostDetailProps) => {
  return (
    <Modal centered fullscreen className="fade" id="post-modal" onHide={handleClose} show={show}>
      <Modal.Header className="d-flex justify-content-between">
        <Modal.Title id="post-modalLabel" className="text-center w-100">
          Đăng trạng thái
        </Modal.Title>
        <Link to="#" className="lh-1" onClick={handleClose}>
          <span className="material-symbols-outlined">close</span>
        </Link>
      </Modal.Header>
      <Modal.Body>
        <h1>MOdal content</h1>
      </Modal.Body>
    </Modal>
  );
};
