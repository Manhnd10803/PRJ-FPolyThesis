import { QandAService } from '@/apis/services/qanda.service';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { Container, Col, Row, Card, Button, Badge, Modal, Form, Dropdown } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { formatDateFromCreatedAt } from '../../blog/components/format-date';
import { MajorService } from '@/apis/services/major.service';
import toast from 'react-hot-toast';
import { UpdateQandA } from '../update-qanda';
import { FormComment } from '../comments/form-cmt';
import { CommentsQandA } from '../comments/CommentsQandA';
import { CommentService } from '@/apis/services/comment.service';
import { LikeService } from '@/apis/services/like.service';
const imageUrl = 'https://picsum.photos/20';

export const DetailQandAPage = () => {
  const commentRef = useRef(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { id } = useParams();

  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const [qAndAData, setQandAData] = useState(null);
  console.log(qAndAData);
  const QandAsQueryKey = ['qa', id];

  // Create CMT
  const createCommentMutation = useMutation(CommentService.createCommentQA, {
    onSettled: () => {
      queryClient.invalidateQueries(QandAsQueryKey);
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
      console.log('Bình luận đã được đăng thành công', response);
      return response;
    } catch (error) {
      throw error;
    }
  };

  // Delete Comment
  const deleteCommentMutation = useMutation(CommentService.deleteComment, {
    onSettled: () => {
      queryClient.invalidateQueries(QandAsQueryKey);
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
      queryClient.invalidateQueries(QandAsQueryKey);
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
      console.log('Bình luận đã được cập nhật thành công', response);
      return response;
    } catch (error) {
      throw error;
    }
  };

  // Create Like
  const LikeBlogMutation = useMutation(LikeService.postLikeQA, {
    onSettled: () => {
      queryClient.invalidateQueries(QandAsQueryKey);
    },
  });
  const createLike = async (emotion: string) => {
    console.log(emotion);
    try {
      const formData = {
        qa_id: qAndAData?.qa?.id,
        emotion: emotion,
      };
      const response = await LikeBlogMutation.mutateAsync(formData);
      console.log('Like đã được cập nhật thành công', response);
      return response;
    } catch (error) {
      throw error;
    }
  };

  // const fetchDetailQandA = async () => {
  //   const { qAndAData } = await QandAService.getDetailQandA(id);
  //   return qAndAData;
  // };
  // const { qAndAData, isLoading } = useQuery(QandAsQueryKey, { queryFn: fetchDetailQandA });

  useEffect(() => {
    // Tải dữ liệu từ API khi trang được tạo ra
    QandAService.getDetailQandA(id)
      .then(response => {
        const data = response.data;
        console.log(data);
        setQandAData(data);
        console.log(`Chi tiêt câu hỏi với ID ${id}`);
        navigate(`/quest/${id}`);
      })
      .catch(error => {
        console.error('Lỗi khi hiển thị thông tin câu hỏi:', error);
      });
  }, [id]);

  if (!qAndAData) {
    return <div className="text-center">Loading...</div>;
  }

  const handleDelete = async () => {
    try {
      await QandAService.deleteQandA(id);
      toast.success('Xóa câu hỏi thành công');
      navigate('/question-and-answer');
    } catch (error) {
      console.error('Lỗi khi xóa câu hỏi:', error);
    }
  };
  // console.log(qAndAData?.qa?.user?.username);

  return (
    <>
      <div id="content-page" className="content-page">
        <Container>
          <Card>
            <Card.Body>
              <ul className="post-comments p-0 m-0">
                <li className="mb-2">
                  <div>
                    <div className="borderbox1 mt-3 rounded d-flex rounded">
                      <div className="user-img me-2">
                        <img loading="lazy" src={imageUrl} alt="userimg" className="avatar-40 rounded-circle" />
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
                          <button className=" btn">
                            <div className="card-header-toolbar d-flex align-items-center">
                              <Dropdown>
                                <Dropdown.Toggle as="div" className="lh-1">
                                  <span className="material-symbols-outlined">more_horiz</span>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                  <Dropdown.Item href="#" onClick={handleShow}>
                                    Sửa câu hỏi
                                  </Dropdown.Item>
                                  <Dropdown.Item href="#" onClick={handleDelete}>
                                    Xóa câu hỏi
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </div>
                          </button>

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

                              <i className="material-symbols-outlined md-16"> thumb_up </i>
                              <span className="mx-1">
                                <small>0</small>
                              </span>
                            </div>

                            <div className="ms-auto d-flex align-items-center">
                              <i className="material-symbols-outlined md-16"> chat_bubble_outline </i>
                              <span className="mx-1">
                                <small>{qAndAData.total_comments ? qAndAData.total_comments : '0'}</small>
                              </span>
                            </div>

                            <i className="material-symbols-outlined md-16">schedule</i>
                            <span className="mx-1">
                              <small>{formatDateFromCreatedAt(qAndAData.qa.created_at)}</small>
                            </span>
                          </div>
                        </div>

                        <h3 style={{ fontWeight: '600', marginBottom: '15px' }}>{qAndAData.qa.title}</h3>

                        <h4 style={{ marginBottom: '15px' }}>{qAndAData.qa.content}</h4>
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
                          {qAndAData.qa.hashtag.split(',').map((hashtag, index) => (
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
                        <div className="text-center mt-4">
                          <p>Tất cả câu trả lời</p>
                        </div>

                        {/* Cau tra loi */}
                        {/* <ul className="post-comments p-2  card rounded">
                          <li className="mb-2">
                            <div className="d-flex justify-content-between">
                              <div className="user-img">
                                <img src={imageUrl} alt="userimg" className="avatar-40 me-3 rounded-circle img-fluid" />
                              </div>
                              <div className="w-100 text-margin">
                                <div className="">
                                  <h5 className="mb-0 d-inline-block me-1">Emma Labelle</h5>
                                  <h6 className=" mb-0 d-inline-block">2 weeks ago</h6>
                                </div>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
                              </div>
                            </div>
                          </li>
                        </ul> */}

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
            </Card.Body>
          </Card>

          {/*============== MODAL CẬP NHẬT CÂU HỎI =============*/}
          <Modal
            centered
            size="xl"
            className="fade"
            id="post-modal"
            onHide={handleClose}
            show={showModal}
            style={{ paddingTop: '60px', paddingBottom: '30px' }}
          >
            <Modal.Header className="d-flex justify-content-between">
              <Modal.Title id="post-modalLabel">Cập nhật thông tin câu hỏi</Modal.Title>
              <Link to="#" className="lh-1" onClick={handleClose}>
                <span className="material-symbols-outlined">close</span>
              </Link>
            </Modal.Header>
            <Modal.Body>
              <UpdateQandA qAndAData={qAndAData} />
            </Modal.Body>
          </Modal>
        </Container>
      </div>
    </>
  );
};
