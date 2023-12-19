import { CloudiaryService } from '@/apis/services/cloudinary.service';
import { PostService } from '@/apis/services/post.service';
import { ReportService } from '@/apis/services/report.service';
import { DropZoneField } from '@/components/custom/drop-zone-field';
import { usePost } from '@/hooks/usePostQuery';
import { useShowAboutProfile } from '@/hooks/useShowAboutProfile';
import { CustomListItem } from '@/utilities/funcReport/listItem';
import { CustomModal } from '@/utilities/funcReport/modalCustomReport';
import { StorageFunc } from '@/utilities/local-storage/storage-func';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { Button, Dropdown, ListGroup, Modal } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { useLocation } from 'react-router-dom';

export const MoreActionDropdown = ({ friendId, postId, username, postStatus }: any) => {
  const queryClient = useQueryClient();
  const [contentReport, setContentReport] = useState('');
  const imagesRef = useRef<File[]>([]);
  const [showModalReport, setShowModalReport] = useState(false);
  const [currentPostId, setCurrentPostId] = useState(null);
  const handleShowModalReport = (postId: any) => {
    setCurrentPostId(postId);
    setShowModalReport(true);
    setShowCustomModal(false);
  };
  const handleCloseModalReport = () => setShowModalReport(false);
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [showModalDeletePost, setShowModalDeletePost] = useState(false);

  const { pathname } = useLocation();
  const typeQueryKey = pathname.includes('profile') ? 'profile' : 'posts';
  const { manuallyChangeStatusPost, manuallyDeletePost } = usePost(typeQueryKey);

  const handleShowTitle = (title: any) => {
    setModalTitle(title);
    setShowCustomModal(true);
    handleCloseModalReport();
  };

  const listItems = [
    { title: 'Spam', onClick: () => handleShowTitle('Spam') },
    { title: 'Thông tin sai sự thật', onClick: () => handleShowTitle('Thông tin sai sự thật') },
    { title: 'Quấy rối', onClick: () => handleShowTitle('Quấy rối') },
    { title: 'Bạo lực', onClick: () => handleShowTitle('Bạo lực') },
    { title: 'Bản dịch kém chất lượng', onClick: () => handleShowTitle('Bản dịch kém chất lượng') },
    { title: 'Khủng bố', onClick: () => handleShowTitle('Khủng bố') },
    { title: 'Bán hàng trái phép', onClick: () => handleShowTitle('Bán hàng trái phép') },
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
      setShowCustomModal(false);
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
      toast.success('Nội dung được báo cáo thành công');
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleChangeStatusPost = async (postId: number, status: number) => {
    try {
      toast.success('Thay đổi trạng thái bài viết thành công');
      manuallyChangeStatusPost(postId, status);
      await PostService.updateStatusPost(postId, status);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleDeletePost = async (postId: number) => {
    try {
      toast.success('Xoá bài viết thành công');
      manuallyDeletePost(postId);
      await PostService.deletePost(postId);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useShowAboutProfile(showModalReport || showCustomModal, [showModalReport, showCustomModal, currentPostId, postId]);

  return (
    <div className="card-post-toolbar">
      <Dropdown>
        <Dropdown.Toggle variant="bg-transparent">
          <span className="material-symbols-outlined">more_horiz</span>
        </Dropdown.Toggle>
        <Dropdown.Menu className="dropdown-menu m-0 p-0">
          {idUser != friendId ? (
            <>
              <Dropdown.Item className="p-1" onClick={() => handleShowModalReport(postId)}>
                <div className="d-flex align-items-top">
                  <i className="ri-user-unfollow-line h4"></i>
                  <div className="data ms-2">
                    <h5 className="fw-bold">Báo cáo</h5>
                    <p className="mb-0">Chúng tôi sẽ không cho đối phương biết ai báo cáo.</p>
                  </div>
                </div>
              </Dropdown.Item>
              {/* Modal  */}
              <ModalReport
                showModalReport={showModalReport}
                currentPostId={currentPostId}
                postId={postId}
                handleCloseModalReport={handleCloseModalReport}
                listItems={listItems}
                username={username}
              />

              {/* Modal item  */}
              <CustomModal show={showCustomModal} onHide={() => setShowCustomModal(false)} title={modalTitle}>
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
                  <button className="btn btn-info" onClick={() => postReport(friendId, modalTitle, postId)}>
                    Báo cáo
                  </button>
                </Modal.Footer>
              </CustomModal>
            </>
          ) : (
            <>
              <>
                {postStatus !== 2 && (
                  <Dropdown.Item className="p-1" href="#" onClick={() => handleChangeStatusPost(postId, 2)}>
                    <div className="d-flex align-items-top">
                      <i className="ri-notification-line h4"></i>
                      <div className="data ms-2">
                        <h5 className="fw-bold">Ẩn bài viết</h5>
                        <p className="mb-0">Ẩn bài viết khỏi bảng tin</p>
                      </div>
                    </div>
                  </Dropdown.Item>
                )}
              </>
              <>
                {postStatus !== 1 && (
                  <Dropdown.Item className="p-1" href="#" onClick={() => handleChangeStatusPost(postId, 1)}>
                    <div className="d-flex align-items-top">
                      <i className="ri-notification-line h4"></i>
                      <div className="data ms-2">
                        <h5 className="fw-bold">Chỉ hiển thị với bạn bè</h5>
                        <p className="mb-0">Hiển thị bài viết lên bảng tin</p>
                      </div>
                    </div>
                  </Dropdown.Item>
                )}
              </>
              <>
                {postStatus !== 0 && (
                  <Dropdown.Item className="p-1" href="#" onClick={() => handleChangeStatusPost(postId, 0)}>
                    <div className="d-flex align-items-top">
                      <i className="ri-notification-line h4"></i>
                      <div className="data ms-2">
                        <h5 className="fw-bold">Hiển thị bài viết công khai</h5>
                        <p className="mb-0">Hiển thị bài viết lên bảng tin</p>
                      </div>
                    </div>
                  </Dropdown.Item>
                )}
              </>
              <>
                <Dropdown.Item className="p-1" href="#" onClick={() => setShowModalDeletePost(true)}>
                  <div className="d-flex align-items-top">
                    <i className="ri-notification-line h4"></i>
                    <div className="data ms-2">
                      <h5 className="fw-bold">Xoá bài viết</h5>
                    </div>
                  </div>
                </Dropdown.Item>
              </>
              <DeletePostModal
                handleDeletePost={handleDeletePost}
                postId={postId}
                show={showModalDeletePost}
                onHide={() => setShowModalDeletePost(false)}
              />
            </>
          )}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

const DeletePostModal = (props: any) => {
  useShowAboutProfile(props.show, [props.show]);
  return (
    <Modal {...props} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Xoá bài viết</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Sau khi xoá sẽ không thể khôi phục bài viết</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Huỷ
        </Button>
        <Button onClick={() => props.handleDeletePost(props.postId)}>Xác nhận</Button>
      </Modal.Footer>
    </Modal>
  );
};

const ModalReport = (props: any) => {
  return (
    <Modal
      centered
      show={props.showModalReport && props.currentPostId === props.postId}
      onHide={props.handleCloseModalReport}
    >
      <Modal.Header closeButton>
        <Modal.Title>Báo cáo bài đăng của {props.username} </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="py-2">
          Nếu bạn nhận thấy ai đó đang gặp nguy hiểm, đừng chần chừ mà hãy tìm ngay sự giúp đỡ trước khi báo cáo.
        </p>

        <ListGroup>
          {props.listItems.map((item, index) => (
            <CustomListItem key={index} title={item.title} onClick={item.onClick} />
          ))}
        </ListGroup>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
};
