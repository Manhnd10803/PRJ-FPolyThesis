import { Button, Modal } from 'react-bootstrap';
export const ModalRequest = ({ show, onHide, onConfirm, title }: any) => {
  return (
    <Modal centered size="sm" show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>{title}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Hủy bỏ
        </Button>
        <Button variant="primary" onClick={onConfirm}>
          Đồng ý
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
