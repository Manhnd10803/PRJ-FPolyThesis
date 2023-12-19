import { QandAService } from '@/apis/services/qanda.service';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import {
  Container,
  Button,
  ButtonGroup,
  Row,
  Card,
  Badge,
  Modal,
  Dropdown,
  Spinner,
  ListGroup,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbDownOffAltOutlinedIcon from '@mui/icons-material/ThumbDownOffAltOutlined';
import { Link, useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FormComment } from '../comments/form-cmt';
import { CommentsQandA } from '../comments/CommentsQandA';
import { CommentService } from '@/apis/services/comment.service';
import { LikeService } from '@/apis/services/like.service';
import parse from 'html-react-parser';
import { StorageFunc } from '@/utilities/local-storage/storage-func';
import { CustomListItem } from '@/utilities/funcReport/listItem';
import { CustomModal } from '@/utilities/funcReport/modalCustomReport';
import { ReportService } from '@/apis/services/report.service';
import { momentVi } from '@/utilities/functions/moment-locale';
import StarsIcon from '@mui/icons-material/Stars';
import { formatFullName } from '@/utilities/functions';
import { pathName } from '@/routes/path-name';
import { Loading } from '@/components/shared/loading';
import { debounce } from 'lodash';

export const DetailQandAPage = () => {
  const commentRef = useRef(null);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { id } = useParams();
  const user_id = StorageFunc.getUserId();
  const [qAndAData, setQandAData] = useState(null);

  const [likeStatus, setLikeStatus] = useState(null);
  // Create CMT
  const createCommentMutation = useMutation(CommentService.createCommentQA, {
    onSettled: () => {
      queryClient.invalidateQueries(queryKeyDetailQa);
    },
  });

  const postComment = async (content: any, parent_id: number, reply_to: string) => {
    try {
      const formData = {
        parent_id: parent_id,
        reply_to: reply_to,
        content: content,
        qa_id: qAndAData?.qa?.id,
      };
      const response = await createCommentMutation.mutateAsync(formData);
      return response;
    } catch (error) {
      throw error;
    }
  };

  // Delete Comment
  const deleteCommentMutation = useMutation(CommentService.deleteComment, {
    onSettled: () => {
      queryClient.invalidateQueries(queryKeyDetailQa);
    },
  });

  const deleteComment = async (commentId: any) => {
    try {
      await deleteCommentMutation.mutateAsync(commentId);
    } catch (error) {
      console.error('Lỗi khi xóa bình luận', error);
    }
  };

  // Edit Comment
  const editCommentMutation = useMutation(CommentService.editComment, {
    onSettled: () => {
      queryClient.invalidateQueries(queryKeyDetailQa);
    },
  });
  const putComment = async (content: string, commentId: any) => {
    try {
      const formData = {
        id: commentId,
        content: content,
      };
      const response = await editCommentMutation.mutateAsync(formData);
      return response;
    } catch (error) {
      throw error;
    }
  };

  // Create Like
  const LikeQandAMutation = useMutation(LikeService.postLikeQA, {
    onSettled: () => {
      queryClient.invalidateQueries(queryKeyDetailQa);
    },
  });
  const createLike = async (emotion: string) => {
    try {
      const formData = {
        qa_id: qAndAData?.qa?.id,
        emotion: emotion,
      };
      const response = await LikeQandAMutation.mutateAsync(formData);
      return response;
    } catch (error) {
      throw error;
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
  const getDetailQandA = async () => {
    const { data } = await QandAService.getDetailQandA(id);
    return data;
  };

  const queryKeyDetailQa = ['qanda'];
  const { isLoading: isQaLoading } = useQuery(queryKeyDetailQa, getDetailQandA, {
    onSuccess: data => {
      setQandAData(data);
    },
  });

  const handleDelete = async () => {
    try {
      await QandAService.deleteQandA(id);
      queryClient.invalidateQueries(['qa']);
      toast.success('Xóa câu hỏi thành công');
      navigate(pathName.QUESTS);
    } catch (error) {
      console.error('Lỗi khi xóa câu hỏi:', error);
    }
  };

  const [contentReport, setContentReport] = useState('');

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
  const QueryKey = ['reportQa'];
  const createReportMutation = useMutation(ReportService.postReport, {
    onSettled: () => {
      queryClient.invalidateQueries(QueryKey); // Chỉnh sửa tên query nếu cần
    },
  });
  const postReport = async (idfriend, title, idqa) => {
    try {
      handleClose();
      const idUser = StorageFunc.getUserId();
      const formData = {
        reporter_id: idUser,
        reported_id: idfriend,
        report_title: title,
        report_content: contentReport,
        report_type: 'qa',
        report_type_id: idqa,
        report_image: '',
      };
      await createReportMutation.mutateAsync(formData);
      toast.success('Nội dung được báo cáo thành công');
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  const scrollToComment = () => {
    if (commentRef.current) {
      commentRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!isQaLoading && !qAndAData)
    return (
      <div className="content-page">
        <Loading size={100} textStyle={{ fontSize: '30px' }} textLoading="Tìm linh tinh gì đấy..." />
      </div>
    );

  const debounceLike = debounce(handleLikeClick, 1000);
  const debounceDisLike = debounce(handleDislikeClick, 1000);
  return (
    <>
      <div id="content-page" className="content-page">
        <Container>
          <Modal centered size="sm" show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>Bạn có chắc chắn muốn xóa bình luận này?</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShow(false)}>
                Hủy bỏ
              </Button>
              <Button variant="primary" onClick={handleDelete}>
                Đồng ý
              </Button>
            </Modal.Footer>
          </Modal>
          <Card>
            <Card.Body>
              {isQaLoading || !qAndAData ? (
                <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
                  <Loading size={100} textStyle={{ fontSize: '30px' }} textLoading="Đợi chút nè..." />
                </div>
              ) : (
                <ul className="post-comments p-0 m-0">
                  <li className="mb-2">
                    <div>
                      <div className="borderbox1 mt-3 rounded d-flex">
                        <Link to={`${pathName.PROFILE}/${qAndAData?.qa?.user?.id}`}>
                          <div className="user-img me-2">
                            <img
                              loading="lazy"
                              src={qAndAData?.qa?.user?.avatar}
                              alt="userimg"
                              className="avatar-50 rounded-circle"
                            />
                          </div>
                        </Link>

                        <div className="borderbox border rounded p-2">
                          <div className="d-flex align-items-center flex-wrap">
                            <div>
                              <div className="d-flex gap-2 align-items-center">
                                <Link to={`${pathName.PROFILE}/${qAndAData?.qa?.user?.id}`}>
                                  <h5>{formatFullName(qAndAData?.qa?.user)}</h5>
                                </Link>
                                <OverlayTrigger
                                  placement="bottom"
                                  overlay={<Tooltip>Reputations: {qAndAData?.qa?.user?.score}</Tooltip>}
                                >
                                  <Link to="#" className="text-warning">
                                    <div className="d-flex gap-1 align-items-center">
                                      <StarsIcon />
                                      <div>{qAndAData?.qa?.user?.score}</div>
                                    </div>
                                  </Link>
                                </OverlayTrigger>
                              </div>
                              <p>{qAndAData?.qa?.major?.majors_name}</p>
                            </div>
                          </div>
                          <Row className="mt-2">
                            <div className="d-flex gap-3">
                              <div className="date date  d-flex align-items-center">
                                <i className="material-symbols-outlined pe-2 md-18 text-primary">calendar_month</i>
                                Đă đăng vào {momentVi(qAndAData?.qa?.created_at).fromNow()}
                              </div>
                              <ButtonGroup aria-label="Basic example">
                                <Button
                                  className="d-flex align-items-center gap-2 "
                                  style={{ backgroundColor: qAndAData?.user_like?.emotion === 'like' ? '#b2b5b8' : '' }}
                                  variant="light"
                                  onClick={debounceLike}
                                >
                                  {likeStatus === 'like' ? (
                                    <ThumbUpIcon className="text-primary" sx={{ fontSize: 20 }} />
                                  ) : (
                                    <ThumbUpOutlinedIcon className="text-primary" sx={{ fontSize: 20 }} />
                                  )}
                                  <Badge bg="primary" className=" text-white ml-2">
                                    {qAndAData?.emotion?.like || '0'}
                                  </Badge>
                                </Button>

                                <Button
                                  className="d-flex align-items-center"
                                  variant="light"
                                  onClick={debounceDisLike}
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
                                <Link
                                  to={'#'}
                                  className="d-flex align-items-center cursor-pointer"
                                  onClick={scrollToComment}
                                >
                                  <i className="material-symbols-outlined pe-2 md-18 text-primary">mode_comment</i>
                                  {qAndAData?.total_comments} comments
                                </Link>
                              </OverlayTrigger>
                              <div className="bg-soft-primary rounded p-2 pointer text-center">
                                <div className="card-header-toolbar d-flex align-items-center">
                                  <Dropdown className="d-flex align-items-center">
                                    <Dropdown.Toggle
                                      as="span"
                                      className="material-symbols-outlined "
                                      style={{ cursor: 'pointer' }}
                                    >
                                      more_horiz
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu className="dropdown-menu-right">
                                      {user_id !== qAndAData?.qa?.user_id && (
                                        <Dropdown.Item
                                          eventKey="five"
                                          className="d-flex align-items-center"
                                          onClick={handleShowModalReport}
                                        >
                                          <span className="material-symbols-outlined">report</span>Tìm hỗ trợ hoặc báo
                                          cáo
                                        </Dropdown.Item>
                                      )}
                                      {user_id === qAndAData?.qa?.user_id && (
                                        <Dropdown.Item
                                          eventKey="five"
                                          className="d-flex align-items-center"
                                          onClick={handleDelete}
                                        >
                                          <span className="material-symbols-outlined">delete</span>Xóa câu hỏi này
                                        </Dropdown.Item>
                                      )}
                                    </Dropdown.Menu>
                                  </Dropdown>
                                  <Modal centered show={showModalReport} onHide={handleCloseModalReport}>
                                    <Modal.Header closeButton>
                                      <Modal.Title>Báo cáo</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                      <p className="py-2">
                                        Nếu bạn nhận thấy ai đó đang gặp nguy hiểm, đừng chần chừ mà hãy tìm ngay sự
                                        giúp đỡ trước khi báo cáo.
                                      </p>

                                      <ListGroup>
                                        {listItems.map((item, index) => (
                                          <CustomListItem key={index} title={item.title} onClick={item.onClick} />
                                        ))}
                                      </ListGroup>
                                    </Modal.Body>
                                    <Modal.Footer></Modal.Footer>
                                  </Modal>

                                  <CustomModal show={showModal} onHide={handleClose} title={modalTitle}>
                                    <div className="mb-3"></div>
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
                                        onClick={() =>
                                          postReport(qAndAData?.qa?.user?.id, modalTitle, qAndAData?.qa?.id)
                                        }
                                      >
                                        Báo cáo
                                      </button>
                                    </Modal.Footer>
                                  </CustomModal>
                                </div>
                              </div>
                            </div>
                          </Row>
                          <Row className="mt-2">
                            <h3 style={{ fontWeight: '600', marginBottom: '15px' }}>{qAndAData?.qa?.title}</h3>

                            <h4 style={{ marginBottom: '15px' }}>
                              {qAndAData?.qa?.content && parse(String(JSON.parse(qAndAData?.qa?.content)))}
                            </h4>
                          </Row>
                          {/* HashTag */}
                          <div>
                            {qAndAData?.qa?.hashtag.split(',').map((hashtag, index) => (
                              <Badge
                                as={Link}
                                bg=""
                                to="#"
                                className="badge border border-danger text-danger mt-2 h-1 ms-2 me-2"
                                key={index}
                                style={{ fontSize: '16px' }}
                              >
                                {hashtag}
                              </Badge>
                            ))}
                          </div>

                          <div ref={commentRef}>
                            <CommentsQandA
                              qAndAData={qAndAData?.comments}
                              postComment={postComment}
                              putComment={putComment}
                              deleteComment={deleteComment}
                            />
                          </div>
                          <FormComment postComment={postComment} />
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              )}
            </Card.Body>
          </Card>
        </Container>
      </div>
    </>
  );
};
