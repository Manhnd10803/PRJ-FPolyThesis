import { Button, Col, Form, Row } from 'react-bootstrap';

export const Contact = ({ AccountShow, DataUser, update }: any) => {
  return (
    <>
      <div className="form-card text-left">
        <Row>
          <div className="col-12">
            <h3 className="mb-4">Thông tin liên lạc:</h3>
          </div>
        </Row>
        <Row>
          <Col md="6">
            <Form.Group className="form-group">
              <Form.Label>Email: *</Form.Label>
              <Form.Control type="text" defaultValue={DataUser?.email || ''} disabled />
            </Form.Group>
          </Col>
          <Col md="6">
            <Form.Group className="form-group">
              <Form.Label>Số điện thoại: *</Form.Label>
              <Form.Control
                type="text"
                id="ccno"
                name="phone"
                placeholder="Số điện thoại"
                defaultValue={DataUser?.phone || ''}
                {...update('phone')}
              />
            </Form.Group>
          </Col>
          <Form.Group className="col-md-12 form-group mb-3 ">
            <Form.Label>Địa chỉ: *</Form.Label>
            <Form.Control
              as="textarea"
              name="address"
              id="address"
              rows="5"
              defaultValue={DataUser?.address || ''}
              {...update('address')}
            ></Form.Control>
          </Form.Group>
        </Row>
      </div>
      <Button name="next" className="float-end" value="Next" onClick={() => AccountShow('Personal')}>
        Next
      </Button>
      <Button
        variant="dark"
        name="previous"
        className="previous action-button-previous float-end me-3"
        value="Previous"
        onClick={() => AccountShow('A')}
      >
        Previous
      </Button>
    </>
  );
};
