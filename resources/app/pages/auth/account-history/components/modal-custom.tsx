import { Button, Modal } from 'react-bootstrap';

export const DeleteHistoryModal = (props: any) => {
  return (
    <Modal {...props} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Xoá lịch sử hoạt động</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Bạn sẽ không thể hoàn tác hành động này.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Huỷ
        </Button>
        <Button onClick={props.onDelete}>Xoá</Button>
      </Modal.Footer>
    </Modal>
  );
};

export const DeleteHistoryByLogNameModal = (props: any) => {
  return (
    <Modal {...props} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Xoá toàn bộ lịch sử của hoạt động này?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Bạn sẽ không thể hoàn tác hành động này.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Huỷ
        </Button>
        <Button onClick={props.onDelete}>Xoá</Button>
      </Modal.Footer>
    </Modal>
  );
};
