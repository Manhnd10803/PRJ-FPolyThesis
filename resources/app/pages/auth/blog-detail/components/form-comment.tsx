import { Card } from '@/components/custom';
import { CommentTextSchema } from '@/validation';
import { useState } from 'react';

import { Col, Button, Form } from 'react-bootstrap';

export const FormComment = ({ postComment }: any) => {
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
          <Card.Body>
            <Form>
              <Form.Group className="form-group">
                <Form.Label htmlFor="exampleFormControlTextarea1">Bình luận của bạn</Form.Label>
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
