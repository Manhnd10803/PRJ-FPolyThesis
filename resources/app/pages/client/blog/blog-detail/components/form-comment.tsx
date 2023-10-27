import { Card } from '@/components/custom';

import { Col, Button, Form } from 'react-bootstrap';

export const FormComment = () => {
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
                <Form.Control as="textarea" id="exampleFormControlTextarea1" name="content" rows={4} />
              </Form.Group>

              <Button type="button" variant="btn btn-primary me-2 mb-3 d-flex align-items-center">
                Send <span className="material-symbols-outlined">send</span>
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
};
