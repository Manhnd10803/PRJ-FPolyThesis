import { Modal, ListGroup } from 'react-bootstrap';
import { CustomListItem } from '@/utilities/funcReport/listItem';
import { CustomModal } from '@/utilities/funcReport/modalCustomReport';
export const CustomModalReport = ({
  showModalReport,
  currentPostId,
  postId,
  handleCloseModalReport,
  listItems,
  showCustomModal,
  setShowCustomModal,
  modalTitle,
  handleContentChange,
  postComment,
  friendId,
}: any) => {
  return (
    <>
      <Modal centered show={showModalReport && currentPostId === postId} onHide={handleCloseModalReport}>
        <Modal.Header closeButton>
          <Modal.Title>Báo cáo bình luận</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="py-2">
            Nếu bạn nhận thấy ai đó đang gặp nguy hiểm, đừng chần chừ mà hãy tìm ngay sự giúp đỡ trước khi báo cáo.
          </p>
          <ListGroup>
            {listItems.map((item, index) => (
              <CustomListItem key={index} title={item.title} onClick={item.onClick} />
            ))}
          </ListGroup>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
      {/* Modal item  */}
      <CustomModal show={showCustomModal} onHide={() => setShowCustomModal(false)} title={modalTitle}>
        <div className="mb-3">
          <label htmlFor="commentTextarea" className="form-label">
            Nhận xét (tối đa 225 kí tự)
          </label>
          <textarea
            className="form-control"
            id="commentTextarea"
            name="contentReport"
            onChange={handleContentChange}
            cols="10"
            rows="3"
          ></textarea>
        </div>
        <Modal.Footer className="d-flex justify-content-between">
          <label htmlFor="fileInput" className="form-label">
            Điều khoản dịch vụ của FpolyZone
          </label>
          <button
            className="btn btn-info d-flex align-items-center"
            onClick={() => postComment(friendId, modalTitle, postId)}
          >
            Báo cáo
          </button>
        </Modal.Footer>
      </CustomModal>
    </>
  );
};
