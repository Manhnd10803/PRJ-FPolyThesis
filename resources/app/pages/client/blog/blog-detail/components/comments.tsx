import React, { useState } from 'react';
import { Card } from '@/components/custom';
import { CommentType } from '@/models/blog';
import { Row, Col, Image, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { formatDateFromCreatedAt } from '../../components/format-date';
import { CommentTextSchema } from '@/validation/zod/auth';

interface FormCommentProps {
  postComment: (commentText: string, parent_id: number | null, reply_to: string) => Promise<void>;
}

export const Comments: React.FC<{ data: CommentType[] } & FormCommentProps> = ({ data, postComment }) => {
  const [openReplyFormIds, setOpenReplyFormIds] = useState<{ [key: number]: number | null }>({});
  const [commentText, setCommentText] = useState<Record<number, string | undefined>>({});
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [showReplyComments, setShowReplyComments] = useState({});
  const handleCommentTextChange = (e: React.ChangeEvent<HTMLInputElement>, commentId: number) => {
    const text = e.target.value;
    setCommentText(prevCommentText => ({
      ...prevCommentText,
      [commentId]: text,
    }));
    setIsButtonDisabled(text.trim() === '');
  };

  const toggleReplyForm = (commentId: number, replyId: number) => {
    setOpenReplyFormIds(prevOpenReplyFormIds => ({
      ...prevOpenReplyFormIds,
      [commentId]: replyId,
    }));
  };
  const toggleReplyComments = commentId => {
    setShowReplyComments(prevState => ({
      ...prevState,
      [commentId]: !prevState[commentId],
    }));
  };

  const countReplyComments = (commentId: number) => {
    return data.filter(reply => reply.parent_id === commentId).length;
  };

  const handleCommentSubmit = async (e: any, parent_id: number | null, commentId: number, reply_to: string) => {
    e.preventDefault();

    try {
      CommentTextSchema.parse(commentText[commentId]);
      await postComment(commentText[commentId], parent_id, reply_to);
      setCommentText(prevCommentText => ({
        ...prevCommentText,
        [commentId]: '',
      }));
      setIsButtonDisabled(true);
    } catch (error) {
      console.error('Lỗi kiểm tra Zod: ', error);
    }
  };
  const sortedData = data.slice().sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  return (
    <>
      {sortedData && sortedData.length > 0 && (
        <Col lg="12">
          <Card className="card-block card-stretch card-height blog user-comment">
            <Card.Header className="d-flex justify-content-between">
              <div className="header-title">
                <h4 className="card-title">User Comment</h4>
              </div>
            </Card.Header>
            <Card.Body>
              {sortedData.map(comment => {
                if (!comment.parent_id) {
                  return (
                    <Row key={comment.id}>
                      <Col lg="12">
                        <Card className="card-block card-stretch card-height blog">
                          <Card.Body>
                            {/* Comment content */}
                            <div className="d-flex align-items-center">
                              <div className="user-image mb-3">
                                <Image
                                  className="avatar-80 rounded"
                                  src={comment?.user?.avatar}
                                  alt="#"
                                  data-original-title=""
                                  title=""
                                />
                              </div>
                              <div className="ms-3">
                                <h5>{comment?.user?.username}</h5>
                                <p>{comment?.user?.major?.majors_name}</p>
                              </div>
                            </div>
                            <div className="blog-description">
                              <p>{comment.content}</p>
                              <div className="d-flex align-items-center justify-content-between mb-2 position-right-side">
                                <div className="d-flex align-items-center gap-3">
                                  <Link
                                    to="#"
                                    className="comments d-flex align-items-center"
                                    onClick={e => {
                                      e.preventDefault();
                                      toggleReplyForm(comment.id, comment.id); // Toggle form reply
                                    }}
                                  >
                                    <span className="material-symbols-outlined">reply</span>
                                    reply
                                  </Link>
                                  <Link
                                    to="#"
                                    className="comments d-flex align-items-center"
                                    onClick={e => {
                                      e.preventDefault();
                                      toggleReplyComments(comment.id);
                                    }}
                                  >
                                    <i className="material-symbols-outlined pe-2 md-18 text-primary">mode_comment</i>
                                    <div>
                                      <span>{countReplyComments(comment.id)}</span> comment
                                    </div>
                                  </Link>
                                  <span>{formatDateFromCreatedAt(comment.created_at)}</span>
                                </div>
                              </div>
                              {openReplyFormIds[comment.id] === comment.id && (
                                // Reply form
                                <Form
                                  className="comment-text d-flex align-items-center mt-3 gap-2"
                                  onSubmit={e =>
                                    handleCommentSubmit(e, comment.id, comment.id, comment?.user?.username)
                                  }
                                >
                                  <input
                                    type="text"
                                    className="form-control rounded"
                                    placeholder="Enter Your Comment"
                                    value={commentText[comment.id] || ''}
                                    onChange={e => handleCommentTextChange(e, comment.id)}
                                  />
                                  <Button
                                    type="submit" // Đảm bảo nút có kiểu submit
                                    variant="btn btn-primary d-flex align-items-center "
                                    disabled={isButtonDisabled}
                                  >
                                    <span className="material-symbols-outlined">send</span>
                                  </Button>
                                </Form>
                              )}
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>
                      {showReplyComments[comment.id] && (
                        <>
                          {data
                            .filter(reply => reply.parent_id === comment.id)
                            .map(reply => (
                              <Col key={reply.id} lg="12" className="ps-0 ps-md-5">
                                {reply.parent_id === comment.id && (
                                  // Reply content
                                  <Card className="card-block card-stretch card-height blog">
                                    <Card.Body>
                                      <div className="d-flex align-items-center">
                                        <div className="user-image mb-3">
                                          <Image
                                            className="avatar-80 rounded"
                                            src={reply?.user?.avatar}
                                            alt="#"
                                            data-original-title=""
                                            title=""
                                          />
                                        </div>
                                        <div className="ms-3">
                                          <h5>{reply?.user?.username}</h5>
                                          <p>{reply?.user?.major?.majors_name}</p>
                                        </div>
                                      </div>
                                      <div className="blog-description">
                                        <p>
                                          <span className="text-primary">@{reply?.reply_to}</span> {reply.content}
                                        </p>
                                        <div className="d-flex align-items-center gap-3 mb-2 position-right-side">
                                          <Link
                                            to="#"
                                            className="comments d-flex align-items-center"
                                            onClick={e => {
                                              e.preventDefault();
                                              toggleReplyForm(comment.id, reply.id); // Toggle form reply
                                            }}
                                          >
                                            <span className="material-symbols-outlined">reply</span>
                                            reply
                                          </Link>
                                          <span>{formatDateFromCreatedAt(reply.created_at)}</span>
                                        </div>
                                        {openReplyFormIds[comment.id] === reply.id && (
                                          // Reply form for third-level replies
                                          <Form
                                            className="comment-text d-flex align-items-center mt-3 gap-2"
                                            onSubmit={e =>
                                              handleCommentSubmit(e, comment.id, reply.id, reply?.user?.username)
                                            }
                                          >
                                            <input
                                              type="text"
                                              className="form-control rounded"
                                              placeholder="Enter Your Comment"
                                              value={commentText[reply.id] || ''}
                                              onChange={e => handleCommentTextChange(e, reply.id)}
                                            />
                                            <Button
                                              type="submit"
                                              variant="btn btn-primary d-flex align-items-center"
                                              disabled={isButtonDisabled}
                                            >
                                              <span className="material-symbols-outlined">send</span>
                                            </Button>
                                          </Form>
                                        )}
                                      </div>
                                    </Card.Body>
                                  </Card>
                                )}
                              </Col>
                            ))}
                        </>
                      )}
                    </Row>
                  );
                }
                return null; // Hide comments with a parent_id
              })}
            </Card.Body>
          </Card>
        </Col>
      )}
    </>
  );
};
