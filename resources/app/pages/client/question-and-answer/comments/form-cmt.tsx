import { Card } from '@/components/custom';
import { CommentTextSchema } from '@/validation';
import { useState } from 'react';

import { Col, Button, Form } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

export const FormComment = ({ postComment }: any) => {
  const navigate = useNavigate();
  const { id } = useParams();
  // console.log(id);
  const [content, setContent] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleCommentTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setContent(text);
    setIsButtonDisabled(text.trim() === '');
  };
  const handleCommentSubmit = async (e: any) => {
    e.preventDefault();
    try {
      if (content) {
        CommentTextSchema.parse(content);
        await postComment(content);
        setContent('');
        setIsButtonDisabled(true);
        navigate(`/quests/${id}`);
      } else {
        console.error('Lỗi: commentText không được xác định.');
      }
    } catch (error) {
      console.error('Lỗi kiểm tra Zod: ', error);
    }
  };
  const handleCommentCancel = () => {
    setContent('');
  };

  return (
    <>
      <Col lg="12">
        <Card className="card-block card-stretch card-height blog mb-0">
          <Card.Header className="d-flex justify-content-between">
            <div className="header-title">
              <h4 className="card-title">Trả lời ngay</h4>
            </div>
          </Card.Header>
          <Card.Body>
            <Form>
              <Form.Group className="form-group">
                <Form.Label htmlFor="exampleFormControlTextarea1">Tạo câu trả lời của bạn</Form.Label>
                <Form.Control
                  as="textarea"
                  id="exampleFormControlTextarea1"
                  name="content"
                  rows={4}
                  value={content}
                  onChange={handleCommentTextChange}
                />
              </Form.Group>
              <div className="d-flex gap-2 justify-content-end">
                <Button
                  type="button"
                  variant="btn btn-danger me-2 mb-3 d-flex align-items-center"
                  disabled={isButtonDisabled}
                  onClick={handleCommentCancel}
                >
                  Hủy
                </Button>

                <Button
                  type="button"
                  variant="btn btn-primary me-2 mb-3 d-flex align-items-center"
                  onClick={handleCommentSubmit}
                  disabled={isButtonDisabled}
                >
                  Gửi <span className="material-symbols-outlined">send</span>
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
};
