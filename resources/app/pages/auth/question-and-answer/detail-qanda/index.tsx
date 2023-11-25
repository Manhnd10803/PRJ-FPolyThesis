import { QandAService } from '@/apis/services/qanda.service';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { Container, Col, Button, ButtonGroup, Row, Card, Badge, Modal, Form, Dropdown, Spinner } from 'react-bootstrap';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbDownOffAltOutlinedIcon from '@mui/icons-material/ThumbDownOffAltOutlined';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { formatDateFromCreatedAt } from '../../blog/components/format-date';
import { MajorService } from '@/apis/services/major.service';
import toast from 'react-hot-toast';
import { UpdateQandA } from '../update-qanda';
import { FormComment } from '../comments/form-cmt';
import { CommentsQandA } from '../comments/CommentsQandA';
import { CommentService } from '@/apis/services/comment.service';
import { LikeService } from '@/apis/services/like.service';
import parse from 'html-react-parser';
import { StorageFunc } from '@/utilities/local-storage/storage-func';

export const DetailQandAPage = () => {
  const commentRef = useRef(null);
  const [show, setShow] = useState(false);
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
  const handleEdit = () => {
    try {
      navigate(`/quests/update/${id}`);
    } catch (error) {
      console.error('Lỗi khi sửa câu hỏi:', error);
    }
  };
  return (
    <>
      <div id="content-page" className="content-page">
        <Container>
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
                            className="avatar-40 rounded-circle"
                          />
                        </div>

                        <div className="borderbox border rounded p-2">
                          <div className="d-flex align-items-center flex-wrap">
                            <h5>{qAndAData?.qa?.user?.username}</h5>
                            <span className="text-primary ms-1 d-flex align-items-center">
                              <i className="material-symbols-outlined me-2 text-primary md-16">check_circle</i>
                            </span>
                            <Link to="#" className="mb-0">
                              {qAndAData?.qa?.major?.majors_name}
                            </Link>
                            {user_id === qAndAData?.qa?.user_id && (
                              <button className=" btn">
                                <div className="card-header-toolbar d-flex align-items-center">
                                  <Dropdown>
                                    <Dropdown.Toggle as="div" className="lh-1">
                                      <span className="material-symbols-outlined">more_horiz</span>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                      <Dropdown.Item href="#" onClick={handleEdit}>
                                        Sửa câu hỏi
                                      </Dropdown.Item>
                                      <Dropdown.Item href="#" onClick={() => setShow(true)}>
                                        Xóa câu hỏi
                                      </Dropdown.Item>

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
                                    </Dropdown.Menu>
                                  </Dropdown>
                                </div>
                              </button>
                            )}

                            <div className="ms-auto d-flex align-items-center">
                              <div className="ms-auto d-flex align-items-center">
                                {/* { qAndAData.like_counts_by_emotion.total_likes > 0 ? (
                                <>
                                  <i className="material-symbols-outlined md-16"> thumb_up </i>
                                  <span className="mx-1">
                                    <small>{qAndAData.like_counts_by_emotion.total_likes}</small>
                                  </span>
                                </>
                              ) : (
                                <>
                                  <i className="material-symbols-outlined md-16"> thumb_up </i>
                                  <span className="mx-1">
                                    <small>0</small>
                                  </span>
                                </>
                              ) } */}

                                {/* <i className="material-symbols-outlined md-16"> thumb_up </i>
                              <span className="mx-1">
                                <small>0</small>
                              </span> */}
                              </div>

                              <div className="ms-auto d-flex align-items-center">
                                <i className="material-symbols-outlined md-16"> chat_bubble_outline </i>
                                <span className="mx-1">
                                  <small>
                                    {qAndAData && qAndAData?.total_comments ? qAndAData?.total_comments : '0'}
                                  </small>
                                </span>
                              </div>

                              <i className="material-symbols-outlined md-16">schedule</i>
                              <span className="mx-1">
                                <small>{formatDateFromCreatedAt(qAndAData?.qa?.created_at)}</small>
                              </span>
                            </div>
                          </div>

                          <h3 style={{ fontWeight: '600', marginBottom: '15px' }}>{qAndAData?.qa?.title}</h3>

                          <h4 style={{ marginBottom: '15px' }}>
                            {qAndAData?.qa?.content && parse(String(JSON.parse(qAndAData?.qa?.content)))}
                          </h4>
                          <Row className="mt-2">
                            {/* IMAGE */}
                            {/* <Col lg="4" md="6" className="mt-1">
                              <img loading="lazy" src={imageUrl} className="img-fluid rounded" alt="Responsive img" />
                            </Col>
                            <Col lg="4" md="6" className="mt-1">
                              <img loading="lazy" src={imageUrl} className="img-fluid rounded" alt="Responsive img" />
                            </Col>
                            <Col lg="4" md="6" className="mt-1">
                              <img loading="lazy" src={imageUrl} className="img-fluid rounded" alt="Responsive img" />
                            </Col> */}
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
                              >
                                {hashtag}
                              </Badge>
                            ))}
                          </div>

                          {/* Icon like cmt */}
                          <br />
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
