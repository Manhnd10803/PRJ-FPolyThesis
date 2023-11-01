import { TokenService } from '@/apis/services/token.service';
import { Card } from '@/components/custom';
import { useState } from 'react';
import { Row, Col, Image, Button, Form, Dropdown, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { formatDateFromCreatedAt } from '../../components/format-date';

export const Comments = ({ data, postComment, deleteComment, putComment }: any) => {
  const [replyFormsVisible, setReplyFormsVisible] = useState({});
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [content, setContent] = useState('');
  const [show, setShow] = useState(false);
  const [editCommentId, setEditCommentId] = useState(null);
  const [editedContent, setEditedContent] = useState('');
  // User ID
  const userId = TokenService.getUser();
  // Name :
  function combineNames(data: any) {
    if (data.first_name && data.last_name) {
      return `${data.first_name} ${data.last_name}`;
    } else {
      return 'Unknown';
    }
  }
  const toggleReplyForm = (commentId: any) => {
    const currentVisibility = replyFormsVisible[commentId];
    const updatedReplyFormsVisible = {};
    if (!currentVisibility) {
      updatedReplyFormsVisible[commentId] = true;
      setContent('');
    }
    setReplyFormsVisible(updatedReplyFormsVisible);
  };

  //Create Comment
  const handleCommentTextChange = (e: any) => {
    const value = e.target.value;
    setContent(value);
    setIsButtonDisabled(value.trim() === '');
  };
  const handleCommentSubmit = async (e: any, parent_id: number, reply_to: string) => {
    e.preventDefault();
    try {
      await postComment(content, parent_id, reply_to);
      setContent('');
      toggleReplyForm(parent_id);
      setIsButtonDisabled(true);
    } catch (error) {
      console.error('Lỗi kiểm tra Zod: ', error);
    }
  };
  // Delete Comment
  const handleSubmitDeleteComment = async (commentId: any) => {
    try {
      await deleteComment(commentId);
    } catch (error) {
      throw error;
    }
  };
  // Edit Comment
  const handleEditComment = (commentId: any, replyId: any) => {
    const commentToEdit = data.find((comment: any) => comment.id === commentId);
    if (commentToEdit) {
      if (replyId !== null) {
        const replyToEdit = commentToEdit.replies.find(reply => reply.id === replyId);
        setEditedContent(replyToEdit.content);
        setEditCommentId(replyId);
      } else {
        setEditedContent(commentToEdit.content);
        setEditCommentId(commentId);
      }
    } else {
      console.error(`Không tìm thấy comment với id ${commentId}`);
    }
  };
  const handleEditChange = (e: any) => {
    const value = e.target.value;
    setEditedContent(value);
    setIsButtonDisabled(value.trim() === '');
  };
  const handleSubmitEditComment = async (e: any, commentId: any) => {
    e.preventDefault();
    try {
      console.log(editedContent);
      await putComment(editedContent, commentId);
      setEditCommentId(null);
    } catch (error) {
      console.error('Error updating comment: ', error);
    }
  };
  const handleCancelEditComment = () => {
    setEditCommentId(null);
  };

  return (
    <>
      <Col lg="12">
        <Card className="card-block card-stretch card-height blog user-comment">
          <Card.Header className="d-flex justify-content-between">
            <div className="header-title">
              <h4 className="card-title">User Comment</h4>
            </div>
          </Card.Header>
          <Card.Body>
            {data &&
              data.map((comment: any, index: any) => {
                return (
                  <Row key={index}>
                    <Col lg="12">
                      <Card className="card-block card-stretch card-height blog">
                        <Card.Body>
                          <div className="d-flex justify-content-between">
                            <div className="d-flex align-items-center">
                              <div className="user-image mb-3">
                                <Image className="avatar-80 rounded" src={comment?.user?.avatar} alt="#" />
                              </div>
                              <div className="ms-3">
                                <h5>{comment?.user ? combineNames(comment?.user) : 'Chưa cập nhật'}</h5>
                                <p>@{comment?.user?.username}</p>
                              </div>
                            </div>
                            <div className="card-header-toolbar d-flex">
                              <Dropdown>
                                <Link to="#">
                                  <Dropdown.Toggle as="span" className="material-symbols-outlined">
                                    more_horiz
                                  </Dropdown.Toggle>
                                </Link>
                                <Dropdown.Menu className="dropdown-menu-right">
                                  {userId.user.id === comment?.user?.id ? (
                                    <>
                                      <Dropdown.Item
                                        onClick={() => setShow(true)}
                                        className="d-flex align-items-center"
                                      >
                                        <span className="material-symbols-outlined me-2">delete</span>
                                        Xóa bình luận này
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
                                          <Button
                                            variant="primary"
                                            onClick={() => handleSubmitDeleteComment(comment?.id)}
                                          >
                                            Đồng ý
                                          </Button>
                                        </Modal.Footer>
                                      </Modal>
                                      <Dropdown.Item
                                        className="d-flex align-items-center"
                                        onClick={() => handleEditComment(comment?.id, null)}
                                      >
                                        <span className="material-symbols-outlined me-2">edit</span>Chỉnh sửa
                                      </Dropdown.Item>
                                    </>
                                  ) : (
                                    <Dropdown.Item>
                                      <i className="ri-pencil-fill me-2"></i>Báo cáo
                                    </Dropdown.Item>
                                  )}
                                </Dropdown.Menu>
                              </Dropdown>
                            </div>
                          </div>

                          {editCommentId === comment.id ? (
                            <>
                              <Form className="comment-text mt-3 gap-2">
                                <Form.Control
                                  as="textarea"
                                  id="exampleFormControlTextarea1"
                                  name="content"
                                  rows={4}
                                  value={editedContent}
                                  onChange={handleEditChange}
                                />
                                <div className="d-flex gap-2 justify-content-end mt-1">
                                  <Button
                                    type="submit"
                                    variant="btn btn-danger mt-1 d-flex align-items-center"
                                    onClick={handleCancelEditComment}
                                  >
                                    Hủy
                                  </Button>
                                  <Button
                                    type="submit"
                                    variant="btn btn-primary mt-1 d-flex align-items-center"
                                    disabled={isButtonDisabled}
                                    onClick={e => handleSubmitEditComment(e, comment?.id)}
                                  >
                                    <span className="material-symbols-outlined">send</span>
                                  </Button>
                                </div>
                              </Form>
                            </>
                          ) : (
                            <div className="blog-description">
                              <p>{comment?.content}</p>
                              <div className="d-flex align-items-center justify-content-between mb-2 position-right-side">
                                <div className="d-flex align-items-center gap-3">
                                  <Link
                                    to="#"
                                    className="comments d-flex align-items-center"
                                    onClick={() => toggleReplyForm(comment.id)}
                                  >
                                    <span className="material-symbols-outlined">reply</span>
                                    reply
                                  </Link>
                                  <Link to="#" className="comments d-flex align-items-center">
                                    <i className="material-symbols-outlined pe-2 md-18 text-primary">mode_comment</i>
                                    <div>
                                      <span>{comment?.replies?.length}</span> comment
                                    </div>
                                  </Link>
                                  <span>{formatDateFromCreatedAt(comment?.created_at)}</span>
                                </div>
                              </div>
                              {replyFormsVisible[comment?.id] && (
                                <Form className="comment-text mt-3 gap-2">
                                  <Form.Control
                                    as="textarea"
                                    id="exampleFormControlTextarea1"
                                    name="content"
                                    rows={4}
                                    value={content}
                                    onChange={handleCommentTextChange}
                                  />
                                  <Button
                                    type="submit"
                                    variant="btn btn-primary mt-1 d-flex align-items-center"
                                    disabled={isButtonDisabled}
                                    onClick={e => handleCommentSubmit(e, comment?.id, comment?.user?.username)}
                                  >
                                    <span className="material-symbols-outlined">send</span>
                                  </Button>
                                </Form>
                              )}
                            </div>
                          )}
                        </Card.Body>
                      </Card>
                    </Col>

                    {comment?.replies?.length > 0 && (
                      <>
                        {comment?.replies.map((reply: any) => (
                          <Col lg="12" key={reply?.id} className="ps-0 ps-md-5">
                            <Card className="card-block card-stretch card-height blog">
                              <Card.Body>
                                <div className="d-flex justify-content-between">
                                  <div className="d-flex align-items-center">
                                    <div className="user-image mb-3">
                                      <Image className="avatar-80 rounded" src={reply?.user?.avatar} alt="#" />
                                    </div>
                                    <div className="ms-3">
                                      <h5>{reply?.user ? combineNames(reply?.user) : 'Chưa cập nhật'}</h5>
                                      <p>@{reply?.user?.username}</p>
                                    </div>
                                  </div>
                                  <div className="card-header-toolbar d-flex">
                                    <Dropdown>
                                      <Link to="#">
                                        <Dropdown.Toggle as="span" className="material-symbols-outlined">
                                          more_horiz
                                        </Dropdown.Toggle>
                                      </Link>
                                      <Dropdown.Menu className="dropdown-menu-right">
                                        {userId.user.id === reply?.user?.id ? (
                                          <>
                                            <Dropdown.Item
                                              onClick={() => setShow(true)}
                                              className="d-flex align-items-center"
                                            >
                                              <span className="material-symbols-outlined me-2">delete</span>
                                              Xóa bình luận này
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
                                                <Button
                                                  variant="primary"
                                                  onClick={() => handleSubmitDeleteComment(reply?.id)}
                                                >
                                                  Đồng ý
                                                </Button>
                                              </Modal.Footer>
                                            </Modal>
                                            <Dropdown.Item
                                              className="d-flex align-items-center"
                                              onClick={() => handleEditComment(comment?.id, reply?.id)}
                                            >
                                              <span className="material-symbols-outlined me-2">edit</span>Chỉnh sửa
                                            </Dropdown.Item>
                                          </>
                                        ) : (
                                          <Dropdown.Item>
                                            <i className="ri-pencil-fill me-2"></i>Báo cáo
                                          </Dropdown.Item>
                                        )}
                                      </Dropdown.Menu>
                                    </Dropdown>
                                  </div>
                                </div>
                                {editCommentId === reply.id ? (
                                  <>
                                    <Form className="comment-text mt-3 gap-2">
                                      <Form.Control
                                        as="textarea"
                                        id="exampleFormControlTextarea1"
                                        name="content"
                                        rows={4}
                                        value={editedContent}
                                        onChange={handleEditChange}
                                      />
                                      <div className="d-flex gap-2 justify-content-end mt-1">
                                        <Button
                                          type="submit"
                                          variant="btn btn-danger mt-1 d-flex align-items-center"
                                          onClick={handleCancelEditComment}
                                        >
                                          Hủy
                                        </Button>
                                        <Button
                                          type="submit"
                                          variant="btn btn-primary mt-1 d-flex align-items-center"
                                          disabled={isButtonDisabled}
                                          onClick={e => handleSubmitEditComment(e, reply?.id)}
                                        >
                                          <span className="material-symbols-outlined">send</span>
                                        </Button>
                                      </div>
                                    </Form>
                                  </>
                                ) : (
                                  <div className="blog-description">
                                    <p>
                                      <span className="text-primary">@{reply?.reply_to}</span> {reply?.content}
                                    </p>
                                    <div className="d-flex align-items-center justify-content-between mb-2 position-right-side">
                                      <div className="d-flex align-items-center gap-3">
                                        <Link
                                          to="#"
                                          className="comments d-flex align-items-center"
                                          onClick={() => toggleReplyForm(reply?.id)}
                                        >
                                          <span className="material-symbols-outlined">reply</span>
                                          reply
                                        </Link>
                                        <span>{formatDateFromCreatedAt(reply?.created_at)}</span>
                                      </div>
                                    </div>
                                    {replyFormsVisible[reply?.id] && (
                                      <Form className="comment-text mt-3 gap-2">
                                        <Form.Control
                                          as="textarea"
                                          id="exampleFormControlTextarea1"
                                          name="content"
                                          rows={4}
                                          value={content}
                                          onChange={handleCommentTextChange}
                                        />
                                        <Button
                                          type="submit"
                                          variant="btn btn-primary mt-1 d-flex align-items-center"
                                          disabled={isButtonDisabled}
                                          onClick={e => handleCommentSubmit(e, comment?.id, reply?.user?.username)}
                                        >
                                          <span className="material-symbols-outlined">send</span>
                                        </Button>
                                      </Form>
                                    )}
                                  </div>
                                )}
                              </Card.Body>
                            </Card>
                          </Col>
                        ))}
                      </>
                    )}
                  </Row>
                );
              })}
          </Card.Body>
        </Card>
      </Col>
    </>
  );
};
