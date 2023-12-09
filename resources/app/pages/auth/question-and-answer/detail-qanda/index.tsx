import { QandAService } from '@/apis/services/qanda.service';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import {
  Container,
  Col,
  Button,
  ButtonGroup,
  Row,
  Card,
  Badge,
  Modal,
  Form,
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
import { CustomModal } from '@/utilities/funcReport/modalReport';
import { DropZoneField } from '@/components/custom/drop-zone-field';
import { CloudiaryService } from '@/apis/services/cloudinary.service';
import { ReportService } from '@/apis/services/report.service';
import { momentVi } from '@/utilities/functions/moment-locale';
import StarsIcon from '@mui/icons-material/Stars';
import { formatFullName } from '@/utilities/functions';

export const DetailQandAPage = () => {
  const commentRef = useRef(null);
  const [show, setShow] = useState(false);
  const [isLoadingReport, setIsLoadingReport] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { id } = useParams();
  const user_id = StorageFunc.getUserId();
  const [qAndAData, setQandAData] = useState(null);

  const [likeStatus, setLikeStatus] = useState(qAndAData?.user_like?.emotion || null);

  // Create CMT
  const createCommentMutation = useMutation(CommentService.createCommentQA, {
    onSettled: () => {
      queryClient.invalidateQueries(queryKeyQa);
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
      queryClient.invalidateQueries(queryKeyQa);
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
      queryClient.invalidateQueries(queryKeyQa);
    },
  });
  const putComment = async (content: string, commentId: any) => {
    console.log(content);
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
      queryClient.invalidateQueries(queryKeyQa);
    },
  });
  const createLike = async (emotion: string) => {
    console.log(emotion);
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

  const queryKeyQa = ['qanda'];
  const { isLoading: isQaLoading } = useQuery(queryKeyQa, getDetailQandA, {
    onSuccess: data => {
      setQandAData(data);
    },
  });

  const handleDelete = async () => {
    try {
      await QandAService.deleteQandA(id);
      toast.success('Xóa câu hỏi thành công');
      navigate('/quests');
    } catch (error) {
      console.error('Lỗi khi xóa câu hỏi:', error);
    }
  };

  const [contentReport, setContentReport] = useState('');
  const imagesRef = useRef<File[]>([]);

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
    { title: 'Bản dịch kém chất lượng', onClick: () => handleShow('Bản dịch kém chất lượng') },
    { title: 'Vi phạm bản quyền', onClick: () => handleShow('Vi phạm bản quyền') },
  ];
  const handleChangeFiles = (files: File[]) => {
    imagesRef.current = files;
  };
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
      setIsLoadingReport(true);
      const idUser = StorageFunc.getUserId();
      const imageURL = await CloudiaryService.uploadImages(imagesRef.current, 'qa');
      const formData = {
        reporter_id: idUser,
        reported_id: idfriend,
        report_title: title,
        report_content: contentReport,
        report_type: 'qa',
        report_type_id: idqa,
        report_image: imageURL[0] || '',
      };
      await createReportMutation.mutateAsync(formData);
      handleClose();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

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
                  <Spinner animation="border" className="" variant="primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </div>
              ) : (
                <ul className="post-comments p-0 m-0">
                  <li className="mb-2">
                    <div>
                      <div className="borderbox1 mt-3 rounded d-flex">
                        <div className="user-img me-2">
                          <img
                            loading="lazy"
                            src={qAndAData?.qa?.user?.avatar}
                            alt="userimg"
                            className="avatar-50 rounded-circle"
                          />
                        </div>

                        <div className="borderbox border rounded p-2">
                          <div className="d-flex align-items-center flex-wrap">
                            <div>
                              <div className="d-flex gap-2 align-items-center">
                                <h5>{formatFullName(qAndAData?.qa?.user)}</h5>
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

                            <div className="ms-auto d-flex align-items-center">
                              <div className="ms-auto d-flex align-items-center"></div>

                              <div className="ms-auto d-flex align-items-center">
                                <i className="material-symbols-outlined md-16"> chat_bubble_outline </i>
                                <span className="mx-1">
                                  <small>
                                    {qAndAData && qAndAData?.total_comments ? qAndAData?.total_comments : '0'}
                                  </small>
                                </span>
                              </div>

                              <i className="material-symbols-outlined md-16 text-primary">schedule</i>
                              <span className="mx-1 text-primary">
                                <small>{momentVi(qAndAData?.qa?.created_at).fromNow()}</small>
                              </span>
                            </div>
                            {user_id === qAndAData?.qa?.user_id && (
                              <button className=" btn">
                                <div className="card-header-toolbar d-flex align-items-center">
                                  <Dropdown>
                                    <Dropdown.Toggle as="div" className="lh-1">
                                      <span className="material-symbols-outlined">more_horiz</span>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                      <Dropdown.Item href="#" onClick={() => setShow(true)}>
                                        Xóa câu hỏi
                                      </Dropdown.Item>
                                    </Dropdown.Menu>
                                  </Dropdown>
                                </div>
                              </button>
                            )}
                          </div>

                          <h3 style={{ fontWeight: '600', marginBottom: '15px' }}>{qAndAData?.qa?.title}</h3>

                          <h4 style={{ marginBottom: '15px' }}>
                            {qAndAData?.qa?.content && parse(String(JSON.parse(qAndAData?.qa?.content)))}
                          </h4>
                          <Row className="mt-2"></Row>
                          {/* HashTag */}
                          <div>
                            {qAndAData?.qa?.hashtag.split(',').map((hashtag, index) => (
                              <Badge
                                as={Link}
                                bg=""
                                to="#"
                                className="badge border border-danger text-danger mt-2 h-1 ms-2 me-2"
                                key={index}
                              >
                                {hashtag}
                              </Badge>
                            ))}
                          </div>

                          {/* Icon like cmt */}
                          <br />
                          <div className="d-flex gap-3">
                            <ButtonGroup aria-label="Basic example">
                              <Button
                                className="d-flex align-items-center gap-2 "
                                variant="light"
                                onClick={handleLikeClick}
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
                                onClick={handleDislikeClick}
                                data-bs-placement="bottom"
                              >
                                {likeStatus === 'dislike' ? (
                                  <ThumbDownIcon className="text-primary" sx={{ fontSize: 20 }} />
                                ) : (
                                  <ThumbDownOffAltOutlinedIcon className="text-primary" sx={{ fontSize: 20 }} />
                                )}
                              </Button>
                            </ButtonGroup>
                            {user_id !== qAndAData?.qa?.user_id && (
                              <div className="bg-soft-primary rounded p-2 pointer text-center p-0">
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
                                      <Dropdown.Item
                                        eventKey="five"
                                        className="d-flex align-items-center"
                                        onClick={handleShowModalReport}
                                      >
                                        <span className="material-symbols-outlined">report</span>Tìm hỗ trợ hoặc báo cáo
                                      </Dropdown.Item>
                                    </Dropdown.Menu>
                                  </Dropdown>

                                  {/* Modal  */}
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

                                  {/* Modal item  */}
                                  <CustomModal show={showModal} onHide={handleClose} title={modalTitle}>
                                    <div className="mb-3">
                                      <label htmlFor="fileInput" className="form-label">
                                        Bạn có thể đính kèm hình ảnh (tối đa 1 ảnh)
                                      </label>
                                      <DropZoneField
                                        onChangeFiles={handleChangeFiles}
                                        maxFiles={1}
                                        accept={{ 'image/*': [] }}
                                      />
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
                                        onClick={() =>
                                          postReport(qAndAData?.qa?.user?.id, modalTitle, qAndAData?.qa?.id)
                                        }
                                        disabled={isLoadingReport}
                                      >
                                        {isLoadingReport ? 'Đang báo cáo...' : 'Báo cáo'}
                                      </button>
                                    </Modal.Footer>
                                  </CustomModal>
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Câu trả lời */}

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
