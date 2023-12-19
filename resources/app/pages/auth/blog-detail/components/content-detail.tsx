import {
  Badge,
  Button,
  ButtonGroup,
  Col,
  Dropdown,
  Image,
  ListGroup,
  Modal,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';
import { Card } from '@/components/custom';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbDownOffAltOutlinedIcon from '@mui/icons-material/ThumbDownOffAltOutlined';
import { useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { formatFullName } from '@/utilities/functions';
import { pathName } from '@/routes/path-name';
import parse from 'html-react-parser';
import { CustomModal } from '../../../../utilities/funcReport/modalCustomReport';
import { CustomListItem } from '../../../../utilities/funcReport/listItem';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ReportService } from '@/apis/services/report.service';
import { StorageFunc } from '@/utilities/local-storage/storage-func';
import toast from 'react-hot-toast';
import StarsIcon from '@mui/icons-material/Stars';
import { momentVi } from '@/utilities/functions/moment-locale';
import { BlogService } from '@/apis/services/blog.service';
import { debounce } from 'lodash';

export const ContentBlogDetail = ({ data, commentRef, createLike, BlogsQueryKey }: any) => {
  const [likeStatus, setLikeStatus] = useState(data?.user_like?.emotion || null);
  const queryClient = useQueryClient();
  const [contentReport, setContentReport] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();
  const [showModalReport, setShowModalReport] = useState(false);
  const handleCloseModalReport = () => setShowModalReport(false);
  const handleShowModalReport = () => setShowModalReport(true);

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
    { title: 'Vi phạm điều khoản', onClick: () => handleShow('Vi phạm điều khoản') },
    { title: 'Quấy rối', onClick: () => handleShow('Quấy rối') },
    { title: 'Vi phạm bản quyền', onClick: () => handleShow('Vi phạm bản quyền') },
    { title: 'Bản dịch kém chất lượng', onClick: () => handleShow('Bản dịch kém chất lượng') },
  ];

  const handleContentChange = (event: any) => {
    const content = event.target.value;
    setContentReport(content);
  };
  const QueryKey = ['reportBlog'];
  const createReportMutation = useMutation(ReportService.postReport, {
    onSettled: () => {
      queryClient.invalidateQueries(QueryKey); // Chỉnh sửa tên query nếu cần
    },
  });
  const idUser = StorageFunc.getUserId();
  const postReport = async (idfriend: any, title: any, idblog: any) => {
    try {
      handleClose();
      const formData = {
        reporter_id: idUser,
        reported_id: idfriend,
        report_title: title,
        report_content: contentReport,
        report_type: 'blog',
        report_type_id: idblog,
        report_image: '',
      };
      await createReportMutation.mutateAsync(formData);
      toast.success('Nội dung được báo cáo thành công');
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleLikeClick = async () => {
    try {
      if (likeStatus !== 'like') {
        await createLike('like');
        setLikeStatus('like');
      } else {
        await createLike('like');
        setLikeStatus(null);
      }
    } catch (error) {
      throw error;
    }
  };

  const handleDislikeClick = async () => {
    try {
      if (likeStatus === 'dislike') {
        await createLike('dislike');
        setLikeStatus(null);
      } else {
        await createLike('dislike');
        setLikeStatus('dislike');
      }
    } catch (error) {
      throw error;
    }
  };
  // delete blog
  const handleDelete = async () => {
    try {
      await BlogService.deleteBlog(id);
      toast.success('Xóa thành công bài viết');
      navigate('/blog');
    } catch (error) {
      console.error('Lỗi khi xóa bài viết:', error);
    }
  };
  //comment
  const scrollToComment = () => {
    if (commentRef.current) {
      commentRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const debouncedHandleLikeClick = debounce(handleLikeClick, 1000); // Adjust the delay as needed
  const debouncedHandleDislikeClick = debounce(handleDislikeClick, 1000); // Adjust the delay as needed
  return (
    <>
      <Col lg="12">
        <Card className="card-block card-stretch card-height blog blog-detail">
          <Card.Body>
            <div className="blog-description mt-3">
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <div className="user-image mb-3">
                    <Image className="avatar-50 rounded-circle" src={data?.blog?.user.avatar} alt="Ảnh đại diện" />
                  </div>
                  <div className="ms-3">
                    <Link to={`${pathName.PROFILE}/${data?.blog?.user.id}`}>
                      <div className="d-flex gap-2 align-items-center">
                        <h5>{formatFullName(data?.blog?.user)}</h5>
                        <OverlayTrigger
                          placement="bottom"
                          overlay={<Tooltip>Reputations: {data?.blog?.user?.score}</Tooltip>}
                        >
                          <div className="d-flex gap-1 align-items-center">
                            <StarsIcon />
                            <div>{data?.blog?.user?.score}</div>
                          </div>
                        </OverlayTrigger>
                      </div>
                      <p className="text-black">{data?.blog?.major?.majors_name}</p>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="blog-meta d-flex align-items-center  gap-4 mb-3 position-right-side flex-wrap">
                <div className="date date  d-flex align-items-center">
                  <i className="material-symbols-outlined pe-2 md-18 text-primary">calendar_month</i>
                  Đă đăng vào {momentVi(data?.blog?.created_at).fromNow()}
                </div>
                <ButtonGroup aria-label="Basic example">
                  <Button
                    className="d-flex align-items-center gap-2 "
                    variant="light"
                    onClick={debouncedHandleLikeClick}
                  >
                    {likeStatus === 'like' ? (
                      <ThumbUpIcon className="text-primary" sx={{ fontSize: 20 }} />
                    ) : (
                      <ThumbUpOutlinedIcon className="text-primary" sx={{ fontSize: 20 }} />
                    )}
                    <Badge bg="primary" className=" text-white ml-2">
                      {data?.emotion?.like || '0'}
                    </Badge>
                  </Button>

                  <Button
                    className="d-flex align-items-center"
                    variant="light"
                    onClick={debouncedHandleDislikeClick}
                    data-bs-placement="bottom"
                  >
                    {likeStatus === 'dislike' ? (
                      <ThumbDownIcon className="text-primary" sx={{ fontSize: 20 }} />
                    ) : (
                      <ThumbDownOffAltOutlinedIcon className="text-primary" sx={{ fontSize: 20 }} />
                    )}
                  </Button>
                </ButtonGroup>
                <OverlayTrigger placement="bottom" overlay={<Tooltip>Di chuyển tới bình luận</Tooltip>}>
                  <Link to={'#'} className="d-flex align-items-center cursor-pointer" onClick={scrollToComment}>
                    <i className="material-symbols-outlined pe-2 md-18 text-primary">mode_comment</i>
                    {data?.total_comments} bình luận
                  </Link>
                </OverlayTrigger>

                <div className="bg-soft-primary rounded p-2 pointer text-center p-0">
                  <div className="card-header-toolbar d-flex align-items-center">
                    <Dropdown className="d-flex align-items-center">
                      <Dropdown.Toggle as="span" className="material-symbols-outlined " style={{ cursor: 'pointer' }}>
                        more_horiz
                      </Dropdown.Toggle>
                      <Dropdown.Menu className="dropdown-menu-right">
                        {idUser !== data?.blog?.user.id && (
                          <Dropdown.Item
                            eventKey="five"
                            className="d-flex align-items-center"
                            onClick={handleShowModalReport}
                          >
                            <span className="material-symbols-outlined">report</span>Tìm hỗ trợ hoặc báo cáo
                          </Dropdown.Item>
                        )}
                        {idUser == data?.blog?.user.id && (
                          <Dropdown.Item eventKey="five" className="d-flex align-items-center" onClick={handleDelete}>
                            <span class="material-symbols-outlined">delete</span>Xóa bài viết hiện tại
                          </Dropdown.Item>
                        )}
                      </Dropdown.Menu>
                    </Dropdown>

                    {/* Modal  */}
                    <Modal centered show={showModalReport} onHide={handleCloseModalReport}>
                      <Modal.Header closeButton>
                        <Modal.Title>Nội dung báo cáo</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <p className="py-2">
                          Nếu bạn nhận thấy ai đó đang gặp nguy hiểm, đừng chần chừ mà hãy tìm ngay sự giúp đỡ trước khi
                          báo cáo.
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
                          className="btn btn-info"
                          onClick={() => postReport(data?.blog?.user?.id, modalTitle, data?.blog?.id)}
                        >
                          Báo cáo
                        </button>
                      </Modal.Footer>
                    </CustomModal>
                  </div>
                </div>
              </div>
              <h3 className="mb-3 pb-3 border-bottom">{data?.blog?.title}</h3>

              <p>{data?.blog?.content && parse(JSON.parse(data?.blog?.content))}</p>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
};
