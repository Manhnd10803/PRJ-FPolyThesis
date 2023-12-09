import { Card } from '@/components/custom';
import { StorageFunc } from '@/utilities/local-storage/storage-func';
import { useState } from 'react';
import { Button, Col, Dropdown, Form, Image, ListGroup, Modal, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { formatFullName } from '@/utilities/functions';
import { pathName } from '@/routes/path-name';
import { momentVi } from '@/utilities/functions/moment-locale';
import { ReportService } from '@/apis/services/report.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { CustomModalReport } from './custom-modal';

export const Comments = ({ data, postComment, deleteComment, putComment }: any) => {
  const queryClient = useQueryClient();
  const [replyFormsVisible, setReplyFormsVisible] = useState({});
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [content, setContent] = useState('');
  const [show, setShow] = useState(false);
  const [editCommentId, setEditCommentId] = useState(null);
  const [editedContent, setEditedContent] = useState('');
  // User ID
  const userId = StorageFunc.getUserId();

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
      setShow(false);
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

  const [contentReport, setContentReport] = useState('');
  const [showModalReport, setShowModalReport] = useState(false);
  const [currentPostId, setCurrentPostId] = useState(null);
  const handleShowModalReport = (postId: any) => {
    setCurrentPostId(postId);
    setShowModalReport(true);
    setShowCustomModal(false);
  };
  const listItems = [
    { title: 'Spam', onClick: () => handleShowTitle('Spam') },
    { title: 'Vi phạm điều khoản', onClick: () => handleShowTitle('Vi phạm điều khoản') },
    { title: 'Thông tin sai sự thật', onClick: () => handleShowTitle('Thông tin sai sự thật') },
    { title: 'Quấy rối', onClick: () => handleShowTitle('Quấy rối') },
    { title: 'Bản dịch kém chất lượng', onClick: () => handleShowTitle('Bản dịch kém chất lượng') },
  ];
  const handleCloseModalReport = () => setShowModalReport(false);
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');

  const handleShowTitle = (title: any) => {
    setModalTitle(title);
    setShowCustomModal(true);
    handleCloseModalReport();
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
  const commentReport = async (idfriend: any, title: any, idComment: any) => {
    try {
      setShowCustomModal(false);
      const formData = {
        reporter_id: idUser,
        reported_id: idfriend,
        report_title: title,
        report_content: contentReport,
        report_type: 'comment',
        report_type_id: idComment,
        report_image: '',
      };
      await createReportMutation.mutateAsync(formData);
      toast.success('! Nội dung bình luận được báo cáo thành công');
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  return (
    <>
      <Col lg="12">
        <Card className="card-block card-stretch card-height blog user-comment">
          <Card.Header className="d-flex justify-content-between">
            <div className="header-title">
              <h4 className="card-title">Bình luận người dùng</h4>
            </div>
          </Card.Header>
          <Card.Body>
            {data && data.length > 0 ? (
              data.map((comment: any, index: any) => {
                return (
                  <Row key={index}>
                    <Col lg="12">
                      <Card className="card-block card-stretch card-height blog">
                        <Card.Body>
                          <div className="d-flex justify-content-between">
                            <div className="d-flex align-items-center">
                              <div className="user-image mb-3">
                                <Image className="avatar-50 rounded-circle" src={comment?.user?.avatar} alt="#" />
                              </div>
                              <Link to={`${pathName.PROFILE}/${comment?.user?.id}`} className="ms-3">
                                <h5>{formatFullName(comment?.user)}</h5>
                                <p>@{comment?.user?.username}</p>
                              </Link>
                            </div>
                            <div className="card-header-toolbar d-flex justify-content-center">
                              <Dropdown>
                                <Link to="#">
                                  <Dropdown.Toggle as="span" className="material-symbols-outlined">
                                    more_horiz
                                  </Dropdown.Toggle>
                                </Link>
                                <Dropdown.Menu className="dropdown-menu-right">
                                  {userId === comment?.user?.id ? (
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
                                    <>
                                      <Dropdown.Item
                                        onClick={() => handleShowModalReport(comment?.id)}
                                        className="d-flex align-items-center gap-2"
                                      >
                                        <span className="material-symbols-outlined">error</span> Báo cáo
                                      </Dropdown.Item>
                                      <CustomModalReport
                                        showModalReport={showModalReport}
                                        currentPostId={currentPostId}
                                        postId={comment?.id}
                                        handleCloseModalReport={handleCloseModalReport}
                                        listItems={listItems}
                                        showCustomModal={showCustomModal}
                                        setShowCustomModal={setShowCustomModal}
                                        modalTitle={modalTitle}
                                        handleContentChange={handleContentChange}
                                        postComment={commentReport}
                                        friendId={comment?.user?.id}
                                      />
                                    </>
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
                                  <span>{momentVi(comment?.created_at).fromNow()}</span>
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
                                      <Image className="avatar-50 rounded-circle" src={reply?.user?.avatar} alt="#" />
                                    </div>
                                    <Link to={`${pathName.PROFILE}/${comment?.user?.id}`} className="ms-3">
                                      <h5>{formatFullName(reply?.user)}</h5>
                                      <p>@{reply?.user?.username}</p>
                                    </Link>
                                  </div>
                                  <div className="card-header-toolbar d-flex">
                                    <Dropdown>
                                      <Link to="#">
                                        <Dropdown.Toggle as="span" className="material-symbols-outlined">
                                          more_horiz
                                        </Dropdown.Toggle>
                                      </Link>
                                      <Dropdown.Menu className="dropdown-menu-right">
                                        {userId === reply?.user?.id ? (
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
                                          <>
                                            <Dropdown.Item onClick={() => handleShowModalReport(reply?.id)}>
                                              <i className="ri-user-unfollow-line h4"></i> Báo cáo
                                            </Dropdown.Item>
                                            <CustomModalReport
                                              showModalReport={showModalReport}
                                              currentPostId={currentPostId}
                                              postId={reply?.id}
                                              handleCloseModalReport={handleCloseModalReport}
                                              listItems={listItems}
                                              showCustomModal={showCustomModal}
                                              setShowCustomModal={setShowCustomModal}
                                              modalTitle={modalTitle}
                                              postComment={commentReport}
                                              friendId={reply?.user?.id}
                                            />
                                          </>
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
                                      {/* userId === comment?.user?.id */}
                                      <span className="text-primary">
                                        {reply?.user?.username != reply?.reply_to ? `@${reply?.reply_to}` : ''}
                                      </span>{' '}
                                      {reply?.content}
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
                                        <span>{momentVi(reply?.created_at).fromNow()}</span>
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
              })
            ) : (
              <div className="text-center">Chưa có bình luận nào</div>
            )}
          </Card.Body>
        </Card>
      </Col>
    </>
  );
};
