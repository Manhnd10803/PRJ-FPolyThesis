import { Modal } from 'react-bootstrap'; // Đảm bảo bạn đã import Modal từ thư viện react-bootstrap

export const CustomModal = ({ show, onHide, title, children }: any) => {
  return (
    <Modal centered show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
};
