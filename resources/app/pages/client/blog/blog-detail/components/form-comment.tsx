import { Card } from '@/components/custom';
import { CommentTextSchema } from '@/validation/zod/auth';
import { useState } from 'react';
import { Col, Button, Form } from 'react-bootstrap';

interface FormCommentProps {
  postComment: (commentText: string) => Promise<void>;
}
export const FormComment: React.FC<FormCommentProps> = ({ postComment }) => {
  const [commentText, setCommentText] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const handleCommentTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    console.log(text);
    setCommentText(text);
    setIsButtonDisabled(text.trim() === '');
  };
  const handleCommentSubmit = async (e: any) => {
    e.preventDefault();
    try {
      if (commentText) {
        CommentTextSchema.parse(commentText);
        console.log(commentText);
        await postComment(commentText);
        setCommentText('');
        setIsButtonDisabled(true);
      } else {
        console.error('Lỗi: commentText không được xác định.');
      }
    } catch (error) {
      console.error('Lỗi kiểm tra Zod: ', error);
    }
  };

  return (
    <>
      <Col lg="12">
        <Card className="card-block card-stretch card-height blog mb-0">
          <Card.Header className="d-flex justify-content-between">
            <div className="header-title">
              <h4 className="card-title">Your Comment</h4>
            </div>
          </Card.Header>
          <Card.Body>
            <Form>
              <Form.Group className="form-group">
                <Form.Label htmlFor="exampleFormControlTextarea1">Comment</Form.Label>
                <Form.Control
                  as="textarea"
                  id="exampleFormControlTextarea1"
                  name="content"
                  rows={4}
                  value={commentText}
                  onChange={handleCommentTextChange}
                />
              </Form.Group>

              <Button
                type="button"
                variant="btn btn-primary me-2 mb-3 d-flex align-items-center"
                onClick={handleCommentSubmit}
                disabled={isButtonDisabled}
              >
                Send <span className="material-symbols-outlined">send</span>
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
};
