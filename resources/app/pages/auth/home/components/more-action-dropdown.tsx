import { CloudiaryService } from '@/apis/services/cloudinary.service';
import { ReportService } from '@/apis/services/report.service';
import { DropZoneField } from '@/components/custom/drop-zone-field';
import { ReportFormData } from '@/models/report';
import { CustomListItem } from '@/utilities/funcReport/listItem';
import { CustomModal } from '@/utilities/funcReport/modalReport';
import { StorageFunc } from '@/utilities/local-storage/storage-func';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import { Dropdown, ListGroup, Modal } from 'react-bootstrap';
import toast from 'react-hot-toast';

export const MoreActionDropdown = ({ friendId, postId }: any) => {
  const [isLoadingReport, setIsLoadingReport] = useState(false);
  const queryClient = useQueryClient();
  const [contentReport, setContentReport] = useState('');
  const imagesRef = useRef<File[]>([]);
  const [showModalReport, setShowModalReport] = useState(false);
  const [currentPostId, setCurrentPostId] = useState(null);
  const handleShowModalReport = (postId: any) => {
    setCurrentPostId(postId);
    setShowModalReport(true);
    handleClose();
  };
  const handleCloseModalReport = () => setShowModalReport(false);
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');

  const handleClose = () => {
    setShowModal(false);
  };

  const handleShow = (title: any) => {
    setModalTitle(title);
    setShowModal(true);
    handleCloseModalReport();
  };

  const listItems = [
    { title: 'Spam', onClick: () => handleShow('Spam') },
    { title: 'Thông tin sai sự thật', onClick: () => handleShow('Thông tin sai sự thật') },
    { title: 'Quấy rối', onClick: () => handleShow('Quấy rối') },
    { title: 'Bạo lực', onClick: () => handleShow('Bạo lực') },
    { title: 'Bản dịch kém chất lượng', onClick: () => handleShow('Bản dịch kém chất lượng') },
    { title: 'Khủng bố', onClick: () => handleShow('Khủng bố') },
    { title: 'Bán hàng trái phép', onClick: () => handleShow('Bán hàng trái phép') },
  ];
  const handleChangeFiles = (files: File[]) => {
    imagesRef.current = files;
  };
  const handleContentChange = (event: any) => {
    const content = event.target.value;
    setContentReport(content);
  };
  const QueryKey = ['reportPost'];
  const createReportMutation = useMutation(ReportService.postReport, {
    onSettled: () => {
      queryClient.invalidateQueries(QueryKey); // Chỉnh sửa tên query nếu cần
    },
  });
  const idUser = StorageFunc.getUserId();
  const postReport = async (idfriend: any, title: any, idPost: any) => {
    try {
      setIsLoadingReport(true);
      const imageURL = await CloudiaryService.uploadImages(imagesRef.current, 'blog');
      const formData = {
        reporter_id: idUser,
        reported_id: idfriend,
        report_title: title,
        report_content: contentReport,
        report_type: 'post',
        report_type_id: idPost,
        report_image: imageURL[0] || '',
      };
      await createReportMutation.mutateAsync(formData);
      handleClose();
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  return (
    <div className="card-post-toolbar">
      <Dropdown>
        <Dropdown.Toggle variant="bg-transparent">
          <span className="material-symbols-outlined">more_horiz</span>
        </Dropdown.Toggle>
        <Dropdown.Menu className="dropdown-menu m-0 p-0">
          <Dropdown.Item className=" p-3" href="#">
            <div className="d-flex align-items-top">
              <div className="h4 material-symbols-outlined">
                <i className="ri-save-line"></i>
              </div>
              <div className="data ms-2">
                <h6>Lưu bài viết</h6>
                <p className="mb-0">Thêm vào danh sách yêu thích của bạn </p>
              </div>
            </div>
          </Dropdown.Item>
          <Dropdown.Item className="p-3" href="#">
            <div className="d-flex align-items-top">
              <i className="ri-close-circle-line h4"></i>
              <div className="data ms-2">
                <h6>Ẩn bài viết</h6>
                <p className="mb-0">Xem ít hơn các bài viết tương tự.</p>
              </div>
            </div>
          </Dropdown.Item>
          <Dropdown.Item className=" p-3" href="#">
            <div className="d-flex align-items-top">
              <i className="ri-user-unfollow-line h4"></i>
              <div className="data ms-2">
                <h6>Bỏ theo dõi</h6>
                <p className="mb-0">Ngừng xem bài viết nhưng vẫn là bạn bè.</p>
              </div>
            </div>
          </Dropdown.Item>
          <Dropdown.Item className=" p-3" onClick={() => handleShowModalReport(postId)}>
            <div className="d-flex align-items-top">
              <i className="ri-user-unfollow-line h4"></i>
              <div className="data ms-2">
                <h6>Báo cáo</h6>
                <p className="mb-0">Chúng tôi sẽ không cho đối phương biết ai báo cáo.</p>
              </div>
            </div>
          </Dropdown.Item>
          {/* Modal  */}
          <Modal centered show={showModalReport && currentPostId === postId} onHide={handleCloseModalReport}>
            <Modal.Header closeButton>
              <Modal.Title>Báo cáo</Modal.Title>
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
          <CustomModal show={showModal} onHide={handleClose} title={modalTitle}>
            <div className="mb-3">
              <label htmlFor="fileInput" className="form-label">
                Bạn có thể đính kèm hình ảnh (tối đa 1 ảnh)
              </label>
              <DropZoneField onChangeFiles={handleChangeFiles} maxFiles={1} accept={{ 'image/*': [] }} />
            </div>
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
            <Modal.Footer>
              <button
                className="btn btn-info"
                onClick={() => postReport(friendId, modalTitle, postId)}
                disabled={isLoadingReport}
              >
                {isLoadingReport ? 'Đang báo cáo...' : 'Báo cáo'}
              </button>
            </Modal.Footer>
          </CustomModal>
          <Dropdown.Item className=" p-3" href="#">
            <div className="d-flex align-items-top">
              <i className="ri-notification-line h4"></i>
              <div className="data ms-2">
                <h6>Bật thông báo</h6>
                <p className="mb-0">Bật thông báo với bài viết này</p>
              </div>
            </div>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};
